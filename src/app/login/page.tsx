"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardContent className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-6">
              <Image
                src="/images/Logo MIRA.webp"
                alt="MIRA Logo"
                width={120}
                height={120}
                className="mx-auto rounded-lg"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">MIRA</h1>
            <p className="text-gray-600 text-sm">
              Monitoramento Infantil em Rota Assistida
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-4 pr-12 py-3 text-base border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-4 pr-12 py-3 text-base border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-mira-yellow hover:bg-mira-yellow-dark text-black font-semibold py-3 text-base rounded-lg transition-colors cursor-pointer"
            >
              Entrar
            </Button>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-gray-600 text-sm">
                Ainda não tem conta?{" "}
              </span>
              <Link
                href="/register"
                className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
              >
                Cadastre-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
