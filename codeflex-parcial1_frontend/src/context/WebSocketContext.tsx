'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface ChatMessage {
  type: 'system' | 'chat';
  content: string;
  username?: string;
}

interface WebSocketContextType {
  sendMessage: (msg: string) => void;
  messages: ChatMessage[];
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const code = localStorage.getItem("current_invitation_code");
    const WS_BASE_URL = process.env.NEXT_PUBLIC_WS;

    if (!code || !accessToken || !WS_BASE_URL) return;

    const ws = new WebSocket(`${WS_BASE_URL}/ws/room/${code}/?token=${accessToken}`);

    ws.onopen = () => {
      console.log("✅ Conectado al WebSocket.");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📨 Mensaje recibido:", data);

      if (data.type === "presence" && data.event === "join") {
        setMessages(prev => [
          ...prev,
          { type: "system", content: `${data.user.username} se ha unido al proyecto`, username: data.user.username }
        ]);
      } else if (data.type === "chat_message") {
        setMessages(prev => [
          ...prev,
          { type: "chat", content: data.content, username: data.user?.username || "Anonimo" }
        ]);
      }
    };

    ws.onerror = (error) => {
      console.error("❌ Error en WebSocket:", error);
    };

    ws.onclose = () => {
      console.log("👋 WebSocket cerrado");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [accessToken]);

  const sendMessage = (msg: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const username = localStorage.getItem("current_username") || "Anonimo";

      socket.send(
        JSON.stringify({
          type: "chat_message",
          message: msg,
          user: {
            username,
          },
        })
      );
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket debe usarse dentro de WebSocketProvider");
  }
  return context;
};
