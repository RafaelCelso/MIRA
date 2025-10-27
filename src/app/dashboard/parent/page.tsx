"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  MapPin,
  CheckCircle,
  Bus,
  AlertTriangle,
  Bell,
  MessageCircle,
  UserX,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ParentDashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("joao");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F8F5" }}>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FFDD00]/80 backdrop-blur-md border-b border-white/20"
            : "bg-[#FFDD00] border-b border-[#E6C700]"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/Simplificado 1.webp"
              alt="MIRA Logo"
              width={100}
              height={32}
            />
          </div>
          <Button variant="ghost" size="lg" className="p-3 hover:bg-black/10">
            <User className="w-12 h-12 text-black" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 p-4 space-y-6">
        {/* Welcome Message */}
        <div className="mb-8 relative z-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Olá, Ana Paula! 👋
          </h2>
          <p className="text-gray-600 text-sm">
            Acompanhe o transporte dos seus filhos em tempo real
          </p>
        </div>

        {/* Student Cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-2 relative">
          {/* João Silva Card */}
          <Card
            className={`min-w-[320px] shadow-lg border-2 hover:shadow-xl transition-all duration-300 cursor-pointer relative ${
              selectedStudent === "joao"
                ? "bg-gradient-to-br from-[#FFDD00] to-[#E6C700] border-black scale-105 z-10"
                : "bg-gradient-to-br from-white to-gray-50 border-gray-300 hover:scale-105 z-0"
            }`}
            onClick={() => setSelectedStudent("joao")}
          >
            <CardContent className="p-4">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 shadow-md">
                    <Image
                      src="/images/student-avatar.jpg"
                      alt="João Silva"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove(
                          "hidden"
                        );
                      }}
                    />
                    <div
                      className={`hidden w-full h-full flex items-center justify-center font-bold text-lg ${
                        selectedStudent === "joao"
                          ? "bg-gradient-to-br from-white to-gray-100 text-[#E6C700]"
                          : "bg-gradient-to-br from-blue-400 to-blue-600 text-white"
                      }`}
                    >
                      JS
                    </div>
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold ${
                        selectedStudent === "joao"
                          ? "text-black"
                          : "text-gray-900"
                      }`}
                    >
                      João Silva
                    </h3>
                    <p
                      className={`text-sm ${
                        selectedStudent === "joao"
                          ? "text-black"
                          : "text-gray-600"
                      }`}
                    >
                      8º ano - Turma A
                    </p>
                    <p
                      className={`text-xs ${
                        selectedStudent === "joao"
                          ? "text-black"
                          : "text-gray-500"
                      }`}
                    >
                      Colégio São José
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
                      <Bus className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        A caminho da escola
                      </p>
                      <p className="text-xs text-gray-600">
                        Chegada prevista: 07:45
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-gray-500">Motorista</p>
                    <p className="font-medium text-gray-900">Carlos Santos</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-gray-500">Veículo</p>
                    <p className="font-medium text-gray-900">ABC-1234</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    Atualizado às {currentTime}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maria Silva Card */}
          <Card
            className={`min-w-[320px] shadow-lg border-2 hover:shadow-xl transition-all duration-300 cursor-pointer relative ${
              selectedStudent === "maria"
                ? "bg-gradient-to-br from-[#FFDD00] to-[#E6C700] border-black scale-105 z-10"
                : "bg-gradient-to-br from-white to-gray-50 border-gray-300 hover:scale-105 z-0"
            }`}
            onClick={() => setSelectedStudent("maria")}
          >
            <CardContent className="p-4">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-green-600 shadow-md">
                    <div
                      className={`w-full h-full flex items-center justify-center font-bold text-lg ${
                        selectedStudent === "maria"
                          ? "bg-gradient-to-br from-white to-gray-100 text-[#E6C700]"
                          : "bg-gradient-to-br from-green-400 to-green-600 text-white"
                      }`}
                    >
                      MS
                    </div>
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold ${
                        selectedStudent === "maria"
                          ? "text-black"
                          : "text-gray-900"
                      }`}
                    >
                      Maria Silva
                    </h3>
                    <p
                      className={`text-sm ${
                        selectedStudent === "maria"
                          ? "text-black"
                          : "text-gray-600"
                      }`}
                    >
                      5º ano - Turma B
                    </p>
                    <p
                      className={`text-xs ${
                        selectedStudent === "maria"
                          ? "text-black"
                          : "text-gray-500"
                      }`}
                    >
                      Escola Municipal Santos
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-sm">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Na escola
                      </p>
                      <p className="text-xs text-gray-600">Chegou às 07:32</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-gray-500">Motorista</p>
                    <p className="font-medium text-gray-900">Ana Costa</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-gray-500">Veículo</p>
                    <p className="font-medium text-gray-900">XYZ-5678</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    Atualizado às {currentTime}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Location */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Localização em Tempo Real
          </h2>
          <Card className="bg-white shadow-sm border-2 border-black">
            <CardContent className="p-0">
              <div className="h-80 bg-gray-200 rounded-lg overflow-hidden relative">
                {/* Mapa simulado com ruas e pontos de referência */}
                <div className="w-full h-full relative bg-gradient-to-br from-green-50 to-blue-50">
                  {/* Ruas principais */}
                  <div className="absolute inset-0">
                    {/* Rua horizontal principal */}
                    <div className="absolute top-1/3 left-0 right-0 h-3 bg-gray-300 border-t border-b border-gray-400"></div>
                    <div className="absolute top-1/3 left-0 right-0 h-1 bg-yellow-200 mt-1"></div>

                    {/* Rua vertical principal */}
                    <div className="absolute left-2/3 top-0 bottom-0 w-3 bg-gray-300 border-l border-r border-gray-400"></div>
                    <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-yellow-200 ml-1"></div>

                    {/* Rua horizontal secundária */}
                    <div className="absolute top-2/3 left-0 right-0 h-2 bg-gray-400"></div>

                    {/* Rua vertical secundária */}
                    <div className="absolute left-1/3 top-0 bottom-0 w-2 bg-gray-400"></div>
                  </div>

                  {/* Pontos de referência */}
                  {/* Escola */}
                  <div className="absolute top-4 right-4 bg-blue-500 rounded-lg p-2 shadow-md border-2 border-white">
                    <div className="w-4 h-4 bg-white rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-500">E</span>
                    </div>
                  </div>

                  {/* Casa */}
                  <div className="absolute bottom-4 left-4 bg-green-500 rounded-lg p-2 shadow-md border-2 border-white">
                    <div className="w-4 h-4 bg-white rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-green-500">
                        C
                      </span>
                    </div>
                  </div>

                  {/* Parque */}
                  <div className="absolute top-4 left-1/4 bg-green-300 rounded-full w-8 h-8 border-2 border-green-600 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>

                  {/* Shopping */}
                  <div className="absolute bottom-1/4 right-1/4 bg-purple-400 rounded-lg p-1 shadow-md border border-white">
                    <div className="w-3 h-3 bg-white rounded"></div>
                  </div>

                  {/* Rota do ônibus (linha tracejada) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path
                      d="M 20 240 Q 100 200 180 160 Q 220 140 260 120"
                      stroke="#FFDD00"
                      strokeWidth="3"
                      strokeDasharray="8,4"
                      fill="none"
                      opacity="0.8"
                    />
                  </svg>

                  {/* Ônibus em movimento */}
                  <div
                    className="absolute animate-pulse"
                    style={{ top: "45%", left: "55%" }}
                  >
                    <div className="w-10 h-10 bg-[#FFDD00] rounded-full flex items-center justify-center shadow-lg border-2 border-black transform -rotate-12">
                      <Bus className="w-6 h-6 text-black" />
                    </div>
                    {/* Sombra do ônibus */}
                    <div className="absolute -bottom-1 left-1 w-8 h-2 bg-black/20 rounded-full blur-sm"></div>
                  </div>

                  {/* Informações do mapa */}
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md border border-gray-200">
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-2 h-2 bg-[#FFDD00] rounded-full"></div>
                      <span className="font-medium text-gray-700">
                        Ônibus Escolar
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs mt-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Escola</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Casa</span>
                    </div>
                  </div>

                  {/* Status de velocidade */}
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md border border-gray-200">
                    <div className="text-xs text-gray-600">Velocidade</div>
                    <div className="text-sm font-bold text-gray-900">
                      35 km/h
                    </div>
                  </div>

                  {/* Tempo estimado */}
                  <div className="absolute top-2 right-2 bg-[#FFDD00]/90 backdrop-blur-sm rounded-lg p-2 shadow-md border border-black">
                    <div className="text-xs text-black font-medium">
                      Chegada em
                    </div>
                    <div className="text-sm font-bold text-black">8 min</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Action Buttons */}
        <section>
          <div className="grid grid-cols-2 gap-3">
            {/* Mensagem para Motorista */}
            <Button className="flex items-center justify-center space-x-2 bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold py-3 px-3 rounded-lg border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[50px]">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Mensagem</span>
            </Button>

            {/* Confirmar Ausência */}
            <Button className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-3 rounded-lg border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[50px]">
              <UserX className="w-4 h-4" />
              <span className="text-xs font-medium">Ausência</span>
            </Button>
          </div>
        </section>

        {/* Latest Notifications */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Últimas Notificações
          </h2>
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-300"></div>

            <div className="space-y-6">
              {/* Notification 1 - Chegada na escola */}
              <div className="relative">
                <Card className="bg-gradient-to-r from-green-50 to-green-100 shadow-md border border-green-300 hover:shadow-lg transition-all duration-300 ml-12">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-green-800 text-sm">
                            João chegou na escola
                          </p>
                          <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full font-medium">
                            Sucesso
                          </span>
                        </div>
                        <p className="text-xs text-green-700 mb-1">
                          Chegada confirmada no Colégio São José
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                          07:25 - Hoje
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Timeline dot */}
                <div className="absolute left-0 top-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md border-4 border-white z-10">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Notification 2 - Início da rota */}
              <div className="relative">
                <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 shadow-md border border-yellow-300 hover:shadow-lg transition-all duration-300 ml-12">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-yellow-800 text-sm">
                            Ônibus iniciou a rota
                          </p>
                          <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full font-medium">
                            Em andamento
                          </span>
                        </div>
                        <p className="text-xs text-yellow-700 mb-1">
                          Motorista Carlos Santos - Veículo ABC-1234
                        </p>
                        <p className="text-xs text-yellow-600 font-medium">
                          07:02 - Hoje
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Timeline dot */}
                <div className="absolute left-0 top-4 w-12 h-12 bg-[#FFDD00] rounded-full flex items-center justify-center shadow-md border-4 border-white z-10">
                  <Bus className="w-6 h-6 text-black" />
                </div>
              </div>

              {/* Notification 3 - Alerta de trânsito */}
              <div className="relative">
                <Card className="bg-gradient-to-r from-orange-50 to-orange-100 shadow-md border border-orange-300 hover:shadow-lg transition-all duration-300 ml-12">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-orange-800 text-sm">
                            Trânsito lento detectado
                          </p>
                          <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full font-medium">
                            Alerta
                          </span>
                        </div>
                        <p className="text-xs text-orange-700 mb-1">
                          Congestionamento na Av. Principal - Atraso estimado: 5
                          min
                        </p>
                        <p className="text-xs text-orange-600 font-medium">
                          07:18 - Hoje
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Timeline dot */}
                <div className="absolute left-0 top-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-md border-4 border-white z-10">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2"
          >
            <MapPin className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-yellow-500 font-medium">Início</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2"
          >
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Notificações</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2"
          >
            <Bus className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Transporte</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2"
          >
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Perfil</span>
          </Button>
        </div>
      </nav>

      {/* Padding bottom para compensar a navegação fixa */}
      <div className="h-20"></div>
    </div>
  );
}
