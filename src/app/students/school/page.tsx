"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Users,
  Bus,
  Settings,
  MessageCircle,
  School,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export default function StudentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");

  // Dados dos alunos
  const students = [
    {
      id: 1,
      name: "Ana Clara Silva",
      grade: "5º Ano A",
      route: "Rota 1 - Vila Madalena",
      parent: "Maria Silva",
      phone: "(11) 99999-1111",
      email: "maria.silva@email.com",
      address: "Rua das Flores, 123 - Vila Madalena",
      status: "ativo",
      busNumber: "MIRA-01",
      pickupTime: "07:30",
      dropoffTime: "17:45",
    },
    {
      id: 2,
      name: "João Pedro Santos",
      grade: "3º Ano B",
      route: "Rota 3 - Jardins",
      parent: "Carlos Santos",
      phone: "(11) 99999-2222",
      email: "carlos.santos@email.com",
      address: "Av. Paulista, 456 - Jardins",
      status: "ativo",
      busNumber: "MIRA-03",
      pickupTime: "07:45",
      dropoffTime: "18:00",
    },
    {
      id: 3,
      name: "Beatriz Costa",
      grade: "7º Ano C",
      route: "Rota 5 - Itaim Bibi",
      parent: "Ana Costa",
      phone: "(11) 99999-3333",
      email: "ana.costa@email.com",
      address: "Rua Augusta, 789 - Itaim Bibi",
      status: "inativo",
      busNumber: "MIRA-05",
      pickupTime: "08:00",
      dropoffTime: "18:15",
    },
    {
      id: 4,
      name: "Lucas Oliveira",
      grade: "2º Ano A",
      route: "Rota 1 - Vila Madalena",
      parent: "Pedro Oliveira",
      phone: "(11) 99999-4444",
      email: "pedro.oliveira@email.com",
      address: "Rua dos Pinheiros, 321 - Vila Madalena",
      status: "ativo",
      busNumber: "MIRA-01",
      pickupTime: "07:30",
      dropoffTime: "17:45",
    },
  ];

  // Estatísticas
  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter((s) => s.status === "ativo").length,
    inactiveStudents: students.filter((s) => s.status === "inativo").length,
    totalRoutes: [...new Set(students.map((s) => s.route))].length,
  };

  const getStatusColor = (status: string) => {
    return status === "ativo"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const getStatusText = (status: string) => {
    return status === "ativo" ? "Ativo" : "Inativo";
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.route.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "todos" || student.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

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
        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Gerenciar Alunos
          </h1>
          <p className="text-sm text-gray-600">
            Administração de Alunos do Transporte Escolar
          </p>
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
                  <p className="text-sm text-gray-600">Total de Alunos</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.totalStudents}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alunos Ativos</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.activeStudents}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alunos Inativos</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.inactiveStudents}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Bus className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rotas Ativas</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.totalRoutes}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por nome, turma ou rota..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="todos">Todos os Status</option>
                  <option value="ativo">Apenas Ativos</option>
                  <option value="inativo">Apenas Inativos</option>
                </select>
                <Button className="bg-[#FFDD00] hover:bg-[#E6C700] text-black border-2 border-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Aluno
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Lista de Alunos ({filteredStudents.length})
              </h2>
            </div>
            <div className="space-y-3">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-[#FFDD00] rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {student.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {student.grade}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            student.status
                          )}`}
                        >
                          {getStatusText(student.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-2">
                          <Bus className="w-4 h-4" />
                          <span>{student.route}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{student.parent}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{student.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Embarque: {student.pickupTime} | Desembarque:{" "}
                            {student.dropoffTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{student.address}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
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
          <Link href="/dashboard/school">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <School className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Início</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
          >
            <Users className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-yellow-500 font-medium">Alunos</span>
          </Button>
          <Link href="/drivers/school">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <Bus className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Motoristas</span>
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
