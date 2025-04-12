"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { login } from "@/lib/api";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);

      localStorage.setItem("access", data.token.access);
      localStorage.setItem("refresh", data.token.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-white p-8 rounded-md shadow-md"
      >
        <div className="mb-6 text-center space-y-2">
          <h1 className="text-2xl font-semibold">Sign up</h1>
          <p className="text-sm text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="test@youtube.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
              />
              <Label htmlFor="remember-me" className="text-gray-700">
                Remember me
              </Label>
            </div>
            <button type="button" className="text-gray-600 hover:text-gray-800 underline">
              Forgot password?
            </button>
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900">
            Sign in
          </Button>
        </form>

        <div className="my-6 flex items-center text-gray-500 text-sm">
          <span className="flex-1 h-px bg-gray-200" />
          <span className="px-3">OR CONTINUE WITH</span>
          <span className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex flex-col space-y-3">
          <Button variant="outline" className="w-full flex items-center justify-center">
            <Github size={18} className="mr-2" />
            Github
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5..." />
            </svg>
            Google
          </Button>
        </div>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="font-medium text-gray-800 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}