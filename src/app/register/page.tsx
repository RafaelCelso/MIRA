"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, Bus } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
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
              Crie sua conta MIRA
            </h1>
            <p className="text-gray-600 text-sm">
              Selecione o seu tipo de perfil para continuar.
            </p>
          </div>

          {/* Account Type Selection */}
          <div className="space-y-4">
            {/* Parent/Guardian Option */}
            <Button
              variant="outline"
              className="w-full h-16 bg-white hover:bg-[#FFDD00] hover:text-black text-gray-900 font-semibold border-2 border-gray-200 rounded-lg transition-colors cursor-pointer flex items-center justify-start px-6"
              asChild
            >
              <Link href="/register/parent">
                <Users className="w-6 h-6 mr-4" />
                <span className="text-base">Sou Pai/Mãe ou Responsável</span>
              </Link>
            </Button>

            {/* School Option */}
            <Button
              variant="outline"
              className="w-full h-16 bg-white hover:bg-[#FFDD00] hover:text-black text-gray-900 font-semibold border-2 border-gray-200 rounded-lg transition-colors cursor-pointer flex items-center justify-start px-6"
              asChild
            >
              <Link href="/register/school">
                <GraduationCap className="w-6 h-6 mr-4" />
                <span className="text-base">Sou uma Escola</span>
              </Link>
            </Button>

            {/* Driver Option */}
            <Button
              variant="outline"
              className="w-full h-16 bg-white hover:bg-[#FFDD00] hover:text-black text-gray-900 font-semibold border-2 border-gray-200 rounded-lg transition-colors cursor-pointer flex items-center justify-start px-6"
              asChild
            >
              <Link href="/register/driver">
                <Bus className="w-6 h-6 mr-4" />
                <span className="text-base">Sou Motorista</span>
              </Link>
            </Button>
          </div>

          {/* Already have account link */}
          <div className="text-center mt-8">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            >
              Já tenho uma conta
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
