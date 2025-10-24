"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

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
          </div>

          {/* Title and Description */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Recuperar Senha
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Insira seu e-mail cadastrado para receber as instruções de
              recuperação.
            </p>
          </div>

          {/* Recovery Form */}
          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="seumail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-4 pr-12 py-3 text-base border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Send Instructions Button */}
            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-base rounded-lg transition-colors cursor-pointer"
            >
              Enviar Instruções
            </Button>

            {/* Back to Login Link */}
            <div className="text-center">
              <span className="text-gray-600 text-sm">Lembrou da senha? </span>
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors cursor-pointer"
              >
                Faça login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
