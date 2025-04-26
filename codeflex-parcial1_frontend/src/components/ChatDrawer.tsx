'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

export function ChatDrawer() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, newMessage]);
    setNewMessage("");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="fixed bottom-5 right-5 z-50">Abrir Chat</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80%] max-w-md mx-auto rounded-t-2xl p-4 flex flex-col bg-background">
        <DrawerHeader>
          <DrawerTitle>Chat en tiempo real</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto space-y-4 p-2">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">No hay mensajes aún</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="flex justify-end">
                <div className="bg-blue-500 text-white p-3 rounded-xl max-w-xs break-words">
                  {msg}
                </div>
              </div>
            ))
          )}
        </div>

        <DrawerFooter className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <Button onClick={handleSendMessage}>Enviar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
