"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  User,
  MapPin,
  CheckCircle,
  Bus,
  AlertTriangle,
  Bell,
  MessageCircle,
  UserX,
  X,
  Send,
  Check,
  Calendar,
  Maximize2,
  Minimize2,
  QrCode,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ParentDashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("joao");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [showAbsenceModal, setShowAbsenceModal] = useState(false);
  const [showAbsenceConfirmation, setShowAbsenceConfirmation] = useState(false);
  const [showFullscreenMap, setShowFullscreenMap] = useState(false);

  // Mensagens rápidas predefinidas
  const quickMessages = [
    "Já estou indo",
    "Estou descendo",
    "Só um minuto, por favor",
    "Pode aguardar um pouco?",
    "Estou chegando",
    "Obrigado pela paciência",
  ];

  // Função para enviar mensagem rápida
  const sendQuickMessage = (message: string) => {
    // Aqui seria a integração com a API para enviar a mensagem
    console.log("Enviando mensagem:", message);
    setSentMessage(message);
    setShowMessageModal(false);
    setShowConfirmationModal(true);
  };

  // Função para enviar mensagem personalizada
  const sendCustomMessage = () => {
    if (customMessage.trim()) {
      // Aqui seria a integração com a API para enviar a mensagem
      console.log("Enviando mensagem personalizada:", customMessage);
      setSentMessage(customMessage);
      setCustomMessage("");
      setShowMessageModal(false);
      setShowConfirmationModal(true);
    }
  };

  // Função para confirmar ausência
  const confirmAbsence = () => {
    // Aqui seria a integração com a API para registrar a ausência
    console.log("Registrando ausência do aluno");
    setShowAbsenceModal(false);
    setShowAbsenceConfirmation(true);
  };

  // Componente de Mapa Reutilizável
  const MapComponent = ({ isFullscreen = false }) => (
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
          <span className="text-xs font-bold text-green-500">C</span>
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
          <span className="font-medium text-gray-700">Ônibus Escolar</span>
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

      {/* Status de velocidade - apenas no mapa compacto */}
      {!isFullscreen && (
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md border border-gray-200">
          <div className="text-xs text-gray-600">Velocidade</div>
          <div className="text-sm font-bold text-gray-900">35 km/h</div>
        </div>
      )}

      {/* Tempo estimado - apenas no mapa compacto */}
      {!isFullscreen && (
        <div className="absolute top-2 right-2 bg-[#FFDD00]/90 backdrop-blur-sm rounded-lg p-2 shadow-md border border-black">
          <div className="text-xs text-black font-medium">Chegada em</div>
          <div className="text-sm font-bold text-black">8 min</div>
        </div>
      )}

      {/* Botão Expandir/Minimizar */}
      {!isFullscreen && (
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md border border-gray-200 hover:bg-white transition-colors duration-200">
          <Maximize2 className="w-4 h-4 text-gray-700" />
        </div>
      )}
    </div>
  );

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
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/Simplificado 1.webp"
              alt="MIRA Logo"
              width={100}
              height={32}
            />
          </div>
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

        {/* QR Code Section */}
        <section>
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-[#FFDD00] border border-black rounded flex items-center justify-center">
                  <QrCode className="w-4 h-4 text-black" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700">
                  QR Code do Aluno
                </h3>
              </div>

              <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6">
                {/* QR Code simulado */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="w-32 h-32 bg-black relative">
                    {/* Padrão QR Code simulado */}
                    <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-px p-1">
                      {/* Cantos de posicionamento */}
                      <div className="bg-white col-span-3 row-span-3 border-2 border-black">
                        <div className="w-full h-full bg-black m-1"></div>
                      </div>
                      <div className="bg-white"></div>
                      <div className="bg-white"></div>
                      <div className="bg-white col-span-3 row-span-3 border-2 border-black">
                        <div className="w-full h-full bg-black m-1"></div>
                      </div>

                      {/* Linha de separação */}
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-white"></div>

                      {/* Padrão central */}
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>

                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>

                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>

                      {/* Canto inferior esquerdo */}
                      <div className="bg-white col-span-3 row-span-3 border-2 border-black">
                        <div className="w-full h-full bg-black m-1"></div>
                      </div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-600 mb-2">
                  Apresente este QR Code para o motorista
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span>
                    ID: {selectedStudent === "joao" ? "0001" : "0002"}
                  </span>
                  <span>•</span>
                  <span>
                    Rota: {selectedStudent === "joao" ? "Rota 5" : "Rota 3"}
                  </span>
                  <span>•</span>
                  <span>
                    Ônibus: {selectedStudent === "joao" ? "MIRA-05" : "MIRA-03"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Real-time Location */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Localização em Tempo Real
          </h2>
          <Card className="bg-white shadow-sm border-2 border-black">
            <CardContent className="p-0">
              <div
                className="h-80 bg-gray-200 rounded-lg overflow-hidden relative cursor-pointer hover:bg-gray-300 transition-colors duration-200"
                onClick={() => setShowFullscreenMap(true)}
              >
                <MapComponent />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Action Buttons */}
        <section>
          <div className="grid grid-cols-2 gap-3">
            {/* Mensagem para Motorista */}
            <Button
              onClick={() => setShowMessageModal(true)}
              className="flex items-center justify-center space-x-2 bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold py-3 px-3 rounded-lg border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[50px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Mensagem</span>
            </Button>

            {/* Confirmar Ausência */}
            <Button
              onClick={() => setShowAbsenceModal(true)}
              className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-3 rounded-lg border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[50px]"
            >
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
            className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
          >
            <MapPin className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-yellow-500 font-medium">Início</span>
          </Button>
          <Link href="/chat/parent">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Chat</span>
            </Button>
          </Link>
          <Link href="/transport/parent">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <Bus className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Transporte</span>
            </Button>
          </Link>
          <Link href="/profile/parent">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Perfil</span>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Padding bottom para compensar a navegação fixa */}
      <div className="h-20"></div>

      {/* Modal de Mensagens Rápidas */}
      {showMessageModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowMessageModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">
                Mensagem para o Motorista
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMessageModal(false)}
                className="p-1 hover:bg-black/10 rounded-full"
              >
                <X className="w-5 h-5 text-black" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Informações do Motorista */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600 mb-1">Enviando para:</p>
                <p className="font-semibold text-gray-900">Carlos Santos</p>
                <p className="text-xs text-gray-500">Veículo ABC-1234</p>
              </div>

              {/* Mensagens Rápidas */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Mensagens Rápidas
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {quickMessages.map((message, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => sendQuickMessage(message)}
                      className="justify-start text-left p-3 h-auto border-gray-200 hover:bg-[#FFDD00]/10 hover:border-[#FFDD00] transition-all duration-200"
                    >
                      <MessageCircle className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-700">{message}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Mensagem Personalizada */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Mensagem Personalizada
                </h4>
                <div className="space-y-3">
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Digite sua mensagem personalizada..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                    rows={3}
                    maxLength={200}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {customMessage.length}/200 caracteres
                    </span>
                    <Button
                      onClick={sendCustomMessage}
                      disabled={!customMessage.trim()}
                      className="bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                As mensagens são enviadas através do chat interno do MIRA
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Mensagem Enviada */}
      {showConfirmationModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowConfirmationModal(false);
            setSentMessage("");
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Conteúdo do Modal de Confirmação */}
            <div className="p-6 text-center">
              {/* Ícone de Sucesso */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>

              {/* Título */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Mensagem Enviada!
              </h3>

              {/* Mensagem enviada */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600 mb-1">Mensagem enviada:</p>
                <p className="text-sm font-medium text-gray-900 italic">
                  "{sentMessage}"
                </p>
              </div>

              {/* Informações do destinatário */}
              <div className="bg-[#FFDD00]/10 rounded-lg p-3 mb-6">
                <p className="text-xs text-gray-600 mb-1">Enviado para:</p>
                <p className="text-sm font-semibold text-gray-900">
                  Carlos Santos
                </p>
                <p className="text-xs text-gray-500">via Chat MIRA</p>
              </div>

              {/* Botão OK */}
              <Button
                onClick={() => {
                  setShowConfirmationModal(false);
                  setSentMessage("");
                }}
                className="w-full bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold py-3 rounded-lg transition-all duration-200"
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Ausência */}
      {showAbsenceModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAbsenceModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-red-500 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-bold text-white">
                Confirmar Ausência
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAbsenceModal(false)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5 text-white" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              {/* Ícone de Alerta */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>

              {/* Informações do aluno */}
              <div className="text-center mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Registrar Ausência
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Você está prestes a registrar a ausência de:
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-900">
                    {selectedStudent === "joao" ? "João Silva" : "Maria Silva"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedStudent === "joao"
                      ? "8º ano - Turma A"
                      : "5º ano - Turma B"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedStudent === "joao"
                      ? "Colégio São José"
                      : "Escola Municipal Santos"}
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <div className="flex items-start space-x-2">
                    <Calendar className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-yellow-800">
                        Data: Hoje ({new Date().toLocaleDateString("pt-BR")})
                      </p>
                      <p className="text-xs text-yellow-700">
                        O motorista será notificado automaticamente
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAbsenceModal(false)}
                  className="flex-1 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={confirmAbsence}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white"
                >
                  Confirmar Ausência
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Ausência Registrada */}
      {showAbsenceConfirmation && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAbsenceConfirmation(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Conteúdo do Modal de Confirmação */}
            <div className="p-6 text-center">
              {/* Ícone de Sucesso */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>

              {/* Título */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Ausência Registrada!
              </h3>

              {/* Informações da ausência */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600 mb-1">Aluno:</p>
                <p className="text-sm font-medium text-gray-900">
                  {selectedStudent === "joao" ? "João Silva" : "Maria Silva"}
                </p>
              </div>

              {/* Confirmação */}
              <div className="bg-green-50 rounded-lg p-3 mb-6">
                <p className="text-xs text-green-700 mb-1">
                  ✓ Motorista notificado
                </p>
                <p className="text-xs text-green-700 mb-1">
                  ✓ Escola informada
                </p>
                <p className="text-xs text-green-700">
                  ✓ Ausência registrada para hoje
                </p>
              </div>

              {/* Botão OK */}
              <Button
                onClick={() => {
                  setShowAbsenceConfirmation(false);
                }}
                className="w-full bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold py-3 rounded-lg transition-all duration-200"
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Mapa em Tela Cheia */}
      {showFullscreenMap && (
        <div
          className="fixed inset-0 bg-black z-50 flex flex-col"
          onClick={() => setShowFullscreenMap(false)}
        >
          {/* Header do Mapa */}
          <div className="bg-[#FFDD00] px-4 py-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-black">
              Localização em Tempo Real
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullscreenMap(false)}
              className="p-2 hover:bg-black/10 rounded-full"
            >
              <X className="w-6 h-6 text-black" />
            </Button>
          </div>

          {/* Mapa em Tela Cheia */}
          <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
            <MapComponent isFullscreen={true} />
          </div>

          {/* Footer com Informações */}
          <div className="bg-black/80 backdrop-blur-sm px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#FFDD00] rounded-full"></div>
                  <span className="text-sm">Ônibus em movimento</span>
                </div>
                <div className="text-sm">
                  Velocidade: <span className="font-bold">35 km/h</span>
                </div>
              </div>
              <div className="text-sm">
                Chegada em:{" "}
                <span className="font-bold text-[#FFDD00]">8 min</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
