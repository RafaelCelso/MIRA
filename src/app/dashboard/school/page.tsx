"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Users,
  MapPin,
  MessageCircle,
  Bus,
  Settings,
  Bell,
  Calendar,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCheck,
  Route,
  School,
  Phone,
  Mail,
  Filter,
  Search,
  Plus,
  Eye,
  BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function SchoolDashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");

  // Dados da escola
  const schoolData = {
    name: "Colégio São José",
    address: "Av. Brigadeiro Faria Lima, 456 - Itaim Bibi",
    phone: "(11) 3456-7890",
    email: "contato@colegiosanjose.edu.br",
    totalStudents: 1247,
    totalRoutes: 12,
    activeRoutes: 10,
    totalDrivers: 15,
    activeDrivers: 12,
  };

  // Estatísticas do dia
  const todayStats = {
    studentsPresent: 1180,
    studentsAbsent: 67,
    routesActive: 10,
    routesCompleted: 8,
    alerts: 3,
    messages: 15,
  };

  // Rotas ativas
  const activeRoutes = [
    {
      id: 1,
      name: "Rota 1 - Vila Madalena",
      driver: "Carlos Santos",
      students: 45,
      status: "em_andamento",
      currentLocation: "Av. Paulista, 1000",
      estimatedTime: "15 min",
      busNumber: "MIRA-01",
    },
    {
      id: 2,
      name: "Rota 3 - Jardins",
      driver: "Ana Silva",
      students: 38,
      status: "concluida",
      currentLocation: "Colégio São José",
      estimatedTime: "Concluída",
      busNumber: "MIRA-03",
    },
    {
      id: 3,
      name: "Rota 5 - Itaim Bibi",
      driver: "Pedro Costa",
      students: 42,
      status: "em_andamento",
      currentLocation: "Rua Augusta, 500",
      estimatedTime: "8 min",
      busNumber: "MIRA-05",
    },
  ];

  // Alertas recentes
  const recentAlerts = [
    {
      id: 1,
      type: "atraso",
      message: "Rota 7 com atraso de 15 minutos devido ao trânsito",
      time: "08:45",
      severity: "medium",
    },
    {
      id: 2,
      type: "ausencia",
      message: "3 alunos faltaram na Rota 2 - responsáveis notificados",
      time: "08:30",
      severity: "low",
    },
    {
      id: 3,
      type: "manutencao",
      message: "Ônibus MIRA-08 em manutenção preventiva",
      time: "07:00",
      severity: "high",
    },
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em_andamento":
        return "bg-blue-100 text-blue-700";
      case "concluida":
        return "bg-green-100 text-green-700";
      case "atrasada":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-l-red-500 bg-red-50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50";
      case "low":
        return "border-l-blue-500 bg-blue-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F8F5" }}>
      {/* Header */}
      <header className="bg-[#FFDD00] px-4 py-4 shadow-sm border-b border-[#E6C700]">
        <div className="flex items-center">
          <Image
            src="/images/Simplificado 1.webp"
            alt="MIRA Logo"
            width={100}
            height={32}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* School Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {schoolData.name}
          </h1>
          <p className="text-sm text-gray-600">Dashboard Escolar</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alunos Presentes</p>
                  <p className="text-xl font-bold text-gray-900">
                    {todayStats.studentsPresent}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Bus className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rotas Ativas</p>
                  <p className="text-xl font-bold text-gray-900">
                    {todayStats.routesActive}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alertas</p>
                  <p className="text-xl font-bold text-gray-900">
                    {todayStats.alerts}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mensagens</p>
                  <p className="text-xl font-bold text-gray-900">
                    {todayStats.messages}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Ações Rápidas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#FFDD00] rounded-full flex items-center justify-center border-2 border-black">
                  <Users className="w-7 h-7 text-black" />
                </div>
                <span className="text-sm text-gray-700">Gerenciar Alunos</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#FFDD00] rounded-full flex items-center justify-center border-2 border-black">
                  <Route className="w-7 h-7 text-black" />
                </div>
                <span className="text-sm text-gray-700">Rotas</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#FFDD00] rounded-full flex items-center justify-center border-2 border-black">
                  <Bus className="w-7 h-7 text-black" />
                </div>
                <span className="text-sm text-gray-700">
                  Gerenciar Motoristas
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#FFDD00] rounded-full flex items-center justify-center border-2 border-black">
                  <BarChart3 className="w-7 h-7 text-black" />
                </div>
                <span className="text-sm text-gray-700">Relatórios</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Routes */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Rotas em Tempo Real
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Todas
              </Button>
            </div>
            <div className="space-y-3">
              {activeRoutes.map((route) => (
                <div
                  key={route.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-[#FFDD00] rounded-full flex items-center justify-center">
                          <Bus className="w-4 h-4 text-black" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {route.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {route.driver} • {route.students} alunos
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>📍 {route.currentLocation}</span>
                        <span>🚌 {route.busNumber}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          route.status
                        )}`}
                      >
                        {route.status === "em_andamento"
                          ? "Em Andamento"
                          : "Concluída"}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        {route.estimatedTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Alertas Recentes
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Ver Todos
              </Button>
            </div>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border-l-4 p-3 rounded-r-lg ${getAlertColor(
                    alert.severity
                  )}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {alert.message}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 ml-4">
                      {alert.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
          >
            <School className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-yellow-500 font-medium">Início</span>
          </Button>
          <Link href="/students/school">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Alunos</span>
            </Button>
          </Link>
          <Link href="/routes/school">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <Bus className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Rotas</span>
            </Button>
          </Link>
          <Link href="/chat/school">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Chat</span>
            </Button>
          </Link>
          <Link href="/profile/school">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <Settings className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Perfil</span>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Padding bottom para compensar a navegação fixa */}
      <div className="h-20"></div>
    </div>
  );
}
