"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  User,
  MapPin,
  Bus,
  MessageCircle,
  Clock,
  Navigation,
  Phone,
  AlertCircle,
  CheckCircle,
  Users,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function TransportParentPage() {
  const [selectedChild, setSelectedChild] = useState(0);

  // Dados dos filhos e suas rotas
  const [children] = useState([
    {
      id: 1,
      name: "João Silva",
      fullName: "João Silva",
      grade: "8º ano - Turma A",
      school: "Colégio São José",
      studentAddress: "Rua das Flores, 123 - Vila Madalena",
      schoolAddress: "Av. Brigadeiro Faria Lima, 456 - Itaim Bibi",
      route: "Rota 5",
      driver: "Carlos Santos",
      driverPhone: "(11) 99999-1234",
      assistant: "Pedro Silva",
      status: "em_transporte", // em_casa, aguardando, em_transporte, na_escola
      currentLocation: "Av. Paulista, 1000",
      estimatedTime: "8 min",
      busNumber: "MIRA-05",
      vehicle: "ABC-1234",
      avatarColor: "from-blue-400 to-blue-600",
      schedule: {
        pickup: "07:15",
        dropoff: "17:30",
      },
    },
    {
      id: 2,
      name: "Maria Silva",
      fullName: "Maria Silva",
      grade: "5º ano - Turma B",
      school: "Escola Municipal Santos",
      studentAddress: "Rua dos Jardins, 789 - Jardins",
      schoolAddress: "Rua Augusta, 321 - Consolação",
      route: "Rota 3",
      driver: "Ana Costa",
      driverPhone: "(11) 99999-5678",
      assistant: "João Oliveira",
      status: "na_escola",
      currentLocation: "Escola Municipal Santos",
      estimatedTime: "Na escola",
      busNumber: "MIRA-03",
      vehicle: "XYZ-5678",
      avatarColor: "from-green-400 to-green-600",
      schedule: {
        pickup: "07:30",
        dropoff: "17:45",
      },
    },
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "em_casa":
        return {
          icon: <User className="w-4 h-4" />,
          text: "Em casa",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
        };
      case "aguardando":
        return {
          icon: <Clock className="w-4 h-4" />,
          text: "Aguardando",
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
        };
      case "em_transporte":
        return {
          icon: <Bus className="w-4 h-4" />,
          text: "Em transporte",
          color: "text-blue-600",
          bgColor: "bg-blue-100",
        };
      case "na_escola":
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: "Na escola",
          color: "text-green-600",
          bgColor: "bg-green-100",
        };
      default:
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          text: "Status desconhecido",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
        };
    }
  };

  const currentChild = children[selectedChild];
  const statusInfo = getStatusInfo(currentChild.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#FFDD00] px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Transporte</h1>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-black/10 rounded-full cursor-pointer"
          >
            <Navigation className="w-6 h-6 text-black" />
          </Button>
        </div>
      </header>

      {/* Student Cards */}
      {children.length > 1 && (
        <div className="p-4">
          <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-2 relative">
            {children.map((child, index) => (
              <Card
                key={child.id}
                className={`min-w-[240px] shadow-lg border-2 hover:shadow-xl transition-all duration-300 cursor-pointer relative ${
                  selectedChild === index
                    ? "bg-gradient-to-br from-[#FFDD00] to-[#E6C700] border-black scale-105 z-10"
                    : "bg-gradient-to-br from-white to-gray-50 border-gray-300 hover:scale-105 z-0"
                }`}
                onClick={() => setSelectedChild(index)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0 ${
                        selectedChild === index
                          ? "bg-gradient-to-br from-white to-gray-100 text-[#E6C700]"
                          : `bg-gradient-to-br ${child.avatarColor} text-white`
                      }`}
                    >
                      {child.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-base font-bold truncate ${
                          selectedChild === index
                            ? "text-black"
                            : "text-gray-900"
                        }`}
                      >
                        {child.fullName}
                      </h3>
                      <p
                        className={`text-sm truncate ${
                          selectedChild === index
                            ? "text-black"
                            : "text-gray-600"
                        }`}
                      >
                        {child.grade}
                      </p>
                      <p
                        className={`text-xs truncate ${
                          selectedChild === index
                            ? "text-black"
                            : "text-gray-500"
                        }`}
                      >
                        {child.school}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Status Card */}
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {/* Student Address */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Endereço do aluno
              </span>
            </div>
            <p className="text-base text-gray-900">
              {currentChild.studentAddress}
            </p>
          </div>

          {/* Route Info */}
          <div className="space-y-4 mb-4">
            {/* School Info */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Escola</p>
              <p className="text-sm font-medium text-gray-900 mb-2">
                {currentChild.school}
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className="w-3 h-3 text-gray-500" />
                  <span className="text-xs font-medium text-gray-600">
                    Endereço da escola
                  </span>
                </div>
                <p className="text-sm text-gray-800">
                  {currentChild.schoolAddress}
                </p>
              </div>
            </div>

            {/* Route Info */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Rota</p>
              <p className="text-sm font-medium text-gray-900">
                {currentChild.route}
              </p>
            </div>
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-blue-600 font-medium mb-1">IDA</p>
              <p className="text-lg font-bold text-blue-900">
                {currentChild.schedule.pickup}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-orange-600 font-medium mb-1">VOLTA</p>
              <p className="text-lg font-bold text-orange-900">
                {currentChild.schedule.dropoff}
              </p>
            </div>
          </div>

          {/* Driver Info */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Equipe de Transporte
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {currentChild.driver}
                    </p>
                    <p className="text-xs text-gray-500">Motorista</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-700 hover:bg-green-50 cursor-pointer"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Ligar
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {currentChild.assistant}
                    </p>
                    <p className="text-xs text-gray-500">Ajudante</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex flex-col items-center space-y-2 h-auto py-4 border-gray-300 hover:bg-gray-50 cursor-pointer"
            >
              <MapPin className="w-6 h-6 text-gray-600" />
              <span className="text-sm text-gray-700">Ver no Mapa</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center space-y-2 h-auto py-4 border-gray-300 hover:bg-gray-50 cursor-pointer"
            >
              <AlertCircle className="w-6 h-6 text-gray-600" />
              <span className="text-sm text-gray-700">Reportar Problema</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <Link href="/dashboard/parent">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Início</span>
            </Button>
          </Link>
          <Link href="/chat">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Chat</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-0.5 p-2"
          >
            <Bus className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-yellow-500 font-medium">
              Transporte
            </span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
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
