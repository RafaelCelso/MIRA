"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Users,
  Bus,
  MessageCircle,
  School,
  Search,
  Plus,
  Route,
  MapPin,
  Clock,
  UserCheck,
  Trash2,
  X,
  ArrowUp,
  ArrowDown,
  User,
  ArrowLeft,
  Edit,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RoutesManagement() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [showEditRouteModal, setShowEditRouteModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState<number | null>(null);
  const [editingRouteId, setEditingRouteId] = useState<number | null>(null);
  const [routeType, setRouteType] = useState<"IDA" | "VOLTA">("IDA");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [routeTime, setRouteTime] = useState("");
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [routeFilter, setRouteFilter] = useState<"TODOS" | "IDA" | "VOLTA">("TODOS");
  const [routeSearchTerm, setRouteSearchTerm] = useState("");

  // Opções de horários padrão
  const timeOptions = [
    "06:00", "06:15", "06:30", "06:45",
    "07:00", "07:15", "07:30", "07:45",
    "08:00", "08:15", "08:30", "08:45",
    "09:00", "09:15", "09:30", "09:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45",
    "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45",
    "15:00", "15:15", "15:30", "15:45",
    "16:00", "16:15", "16:30", "16:45",
    "17:00", "17:15", "17:30", "17:45",
    "18:00", "18:15", "18:30", "18:45",
    "19:00", "19:15", "19:30", "19:45",
    "20:00"
  ];

  // Dados dos motoristas
  const drivers = [
    {
      id: 1,
      name: "Carlos Santos",
      vehicle: "MIRA-01",
      status: "ativo",
    },
    {
      id: 2,
      name: "Ana Silva",
      vehicle: "MIRA-03",
      status: "ativo",
    },
    {
      id: 3,
      name: "Pedro Costa",
      vehicle: "-",
      status: "inativo",
    },
    {
      id: 4,
      name: "Maria Oliveira",
      vehicle: "MIRA-02",
      status: "ativo",
    },
  ];

  // Dados dos alunos (mesmos dados da página students/school)
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
    {
      id: 5,
      name: "Mariana Ferreira",
      grade: "4º Ano B",
      route: "Rota 2 - Pinheiros",
      parent: "Paulo Ferreira",
      phone: "(11) 99999-5555",
      email: "paulo.ferreira@email.com",
      address: "Rua Teodoro Sampaio, 789 - Pinheiros",
      status: "ativo",
      busNumber: "MIRA-02",
      pickupTime: "07:15",
      dropoffTime: "17:30",
    },
  ];

  // Dados das rotas
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: "Rota 1 - Vila Madalena",
      driver: "Carlos Santos",
      driverId: 1,
      vehicle: "MIRA-01",
      type: "IDA",
      students: [1, 4],
      time: "07:30",
    },
    {
      id: 2,
      name: "Rota 1 - Vila Madalena",
      driver: "Carlos Santos",
      driverId: 1,
      vehicle: "MIRA-01",
      type: "VOLTA",
      students: [1, 4],
      time: "17:30",
    },
  ]);

  // Filtrar alunos ativos
  const activeStudents = students.filter((s) => s.status === "ativo");

  // Filtrar alunos por busca
  const filteredActiveStudents = activeStudents.filter((student) =>
    student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(studentSearchTerm.toLowerCase())
  );

  // Filtrar rotas por tipo e busca
  const filteredRoutes = routes.filter((route) => {
    const matchesFilter = routeFilter === "TODOS" || route.type === routeFilter;
    
    const matchesSearch = routeSearchTerm === "" || 
      route.students.some((studentId) => {
        const student = students.find((s) => s.id === studentId);
        return student && student.name.toLowerCase().includes(routeSearchTerm.toLowerCase());
      });

    return matchesFilter && matchesSearch;
  });

  // Função para alternar seleção de aluno
  const toggleStudentSelection = (studentId: number) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Função para abrir modal de editar
  const handleOpenEditModal = (routeId: number) => {
    const route = routes.find((r) => r.id === routeId);
    if (route) {
      setEditingRouteId(routeId);
      setRouteType(route.type);
      setSelectedStudents([...route.students]);
      setRouteTime(route.time);
      setShowEditRouteModal(true);
    }
  };

  // Função para salvar nova rota
  const handleSaveRoute = () => {
    if (selectedStudents.length === 0) {
      alert("Selecione pelo menos um aluno para a rota");
      return;
    }

    if (!routeTime) {
      alert("Selecione um horário para a rota");
      return;
    }

    const newRoute = {
      id: routes.length + 1,
      name: "Rota " + (routes.length + 1) + " - Nova",
      driver: "Motorista a definir",
      driverId: 0,
      vehicle: "A definir",
      type: routeType,
      students: selectedStudents,
      time: routeTime,
    };

    setRoutes([...routes, newRoute]);
    setShowAddRouteModal(false);
    setSelectedStudents([]);
    setRouteType("IDA");
    setRouteTime("");
    setStudentSearchTerm("");
  };

  // Função para salvar edição de rota
  const handleSaveEdit = () => {
    if (selectedStudents.length === 0) {
      alert("Selecione pelo menos um aluno para a rota");
      return;
    }

    if (!routeTime) {
      alert("Selecione um horário para a rota");
      return;
    }

    if (editingRouteId) {
      setRoutes(
        routes.map((route) =>
          route.id === editingRouteId
            ? {
                ...route,
                type: routeType,
                students: selectedStudents,
                time: routeTime,
              }
            : route
        )
      );
    }

    setShowEditRouteModal(false);
    setEditingRouteId(null);
    setSelectedStudents([]);
    setRouteType("IDA");
    setRouteTime("");
    setStudentSearchTerm("");
  };

  const handleDeleteRoute = () => {
    if (routeToDelete) {
      setRoutes(routes.filter((r) => r.id !== routeToDelete));
      setShowDeleteConfirmModal(false);
      setRouteToDelete(null);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#F8F8F5" }}>
      {/* Header */}
      <header className="bg-[#FFDD00] px-4 py-4 shadow-sm border-b border-[#E6C700]">
        <div className="flex items-center justify-between">
          <Image
            src="/images/Simplificado 1.webp"
            alt="MIRA Logo"
            width={100}
            height={32}
          />
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Gerenciar Rotas
          </h1>
          <p className="text-sm text-gray-600">
            Administração de Rotas do Transporte Escolar
          </p>
        </div>

        {/* Routes List */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Rotas Cadastradas ({filteredRoutes.length})
              </h2>
              <Button
                onClick={() => setShowAddRouteModal(true)}
                className="bg-[#FFDD00] hover:bg-[#E6C700] text-black border-2 border-black cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Rota
              </Button>
            </div>

            {/* Filtros e Busca */}
            <div className="mb-4 space-y-3">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar por aluno..."
                    value={routeSearchTerm}
                    onChange={(e) => setRouteSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  />
                </div>
                <select
                  value={routeFilter}
                  onChange={(e) => setRouteFilter(e.target.value as "TODOS" | "IDA" | "VOLTA")}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent cursor-pointer"
                >
                  <option value="TODOS">Todos os Tipos</option>
                  <option value="IDA">Apenas IDA</option>
                  <option value="VOLTA">Apenas VOLTA</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredRoutes.map((route) => (
                <div
                  key={route.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        {route.type === "IDA" ? (
                          <ArrowUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowDown className="w-5 h-5 text-blue-600" />
                        )}
                        <h3 className="text-lg font-bold text-gray-900">
                          {route.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            route.type === "IDA"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {route.type}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <UserCheck className="w-4 h-4" />
                            <span>
                              <strong>Motorista:</strong> {route.driver}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Bus className="w-4 h-4" />
                            <span>
                              <strong>Veículo:</strong> {route.vehicle}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>
                              <strong>Horário:</strong> {route.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>
                              <strong>Alunos:</strong> {route.students.length}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Lista de alunos */}
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Alunos da Rota:</p>
                        <div className="flex flex-wrap gap-2">
                          {route.students.map((studentId) => {
                            const student = students.find((s) => s.id === studentId);
                            return student ? (
                              <span
                                key={studentId}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#FFDD00] text-black"
                              >
                                {student.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 md:flex-none border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          handleOpenEditModal(route.id);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 md:flex-none border-red-300 text-red-700 hover:bg-red-50 cursor-pointer"
                        onClick={() => {
                          setRouteToDelete(route.id);
                          setShowDeleteConfirmModal(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {routes.length === 0 && (
                <div className="text-center py-12">
                  <Route className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Nenhuma rota cadastrada</p>
                </div>
              )}
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
          <Link href="/students/school">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Alunos</span>
            </Button>
          </Link>
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
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Perfil</span>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Padding bottom para compensar a navegação fixa */}
      <div className="h-20"></div>

      {/* Modal de Adicionar Rota */}
      {showAddRouteModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowAddRouteModal(false);
            setStudentSearchTerm("");
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">Nova Rota</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowAddRouteModal(false);
                  setStudentSearchTerm("");
                }}
                className="p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-black" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Seleção do Tipo de Rota */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de Rota *
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setRouteType("IDA")}
                    className={`flex-1 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      routeType === "IDA"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <ArrowUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="font-semibold text-gray-900">IDA</p>
                    <p className="text-sm text-gray-600">Casa → Escola</p>
                  </button>
                  <button
                    onClick={() => setRouteType("VOLTA")}
                    className={`flex-1 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      routeType === "VOLTA"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <ArrowDown className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="font-semibold text-gray-900">VOLTA</p>
                    <p className="text-sm text-gray-600">Escola → Casa</p>
                  </button>
                </div>
              </div>

              {/* Campo de Horário */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={routeTime}
                    onChange={(e) => setRouteTime(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent cursor-pointer appearance-none bg-white"
                  >
                    <option value="">Selecione o horário</option>
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seleção de Alunos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Selecione os Alunos *
                </label>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar aluno..."
                    value={studentSearchTerm}
                    onChange={(e) => setStudentSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  />
                </div>
                <div className="border border-gray-300 rounded-lg p-4 max-h-[300px] overflow-y-auto">
                  {filteredActiveStudents.length === 0 ? (
                    <p className="text-center text-gray-600">
                      {studentSearchTerm ? "Nenhum aluno encontrado" : "Nenhum aluno disponível"}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {filteredActiveStudents.map((student) => (
                        <div
                          key={student.id}
                          onClick={() => toggleStudentSelection(student.id)}
                          className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedStudents.includes(student.id)
                              ? "bg-[#FFDD00] border-2 border-black"
                              : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                          }`}
                        >
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            {selectedStudents.includes(student.id) ? (
                              <UserCheck className="w-5 h-5 text-black" />
                            ) : (
                              <User className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.grade}</p>
                          </div>
                          {selectedStudents.includes(student.id) && (
                            <div className="text-xs font-bold text-black">✓</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {selectedStudents.length > 0 && (
                  <p className="mt-2 text-sm text-gray-600">
                    {selectedStudents.length} aluno(s) selecionado(s)
                  </p>
                )}
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddRouteModal(false);
                  setSelectedStudents([]);
                  setRouteType("IDA");
                  setRouteTime("");
                  setStudentSearchTerm("");
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveRoute}
                className="bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Rota
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editar Rota */}
      {showEditRouteModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowEditRouteModal(false);
            setEditingRouteId(null);
            setSelectedStudents([]);
            setRouteType("IDA");
            setRouteTime("");
            setStudentSearchTerm("");
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">Editar Rota</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowEditRouteModal(false);
                  setEditingRouteId(null);
                  setSelectedStudents([]);
                  setRouteType("IDA");
                  setRouteTime("");
                  setStudentSearchTerm("");
                }}
                className="p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-black" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Seleção do Tipo de Rota */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de Rota *
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setRouteType("IDA")}
                    className={`flex-1 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      routeType === "IDA"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <ArrowUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="font-semibold text-gray-900">IDA</p>
                    <p className="text-sm text-gray-600">Casa → Escola</p>
                  </button>
                  <button
                    onClick={() => setRouteType("VOLTA")}
                    className={`flex-1 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      routeType === "VOLTA"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <ArrowDown className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="font-semibold text-gray-900">VOLTA</p>
                    <p className="text-sm text-gray-600">Escola → Casa</p>
                  </button>
                </div>
              </div>

              {/* Campo de Horário */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={routeTime}
                    onChange={(e) => setRouteTime(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent cursor-pointer appearance-none bg-white"
                  >
                    <option value="">Selecione o horário</option>
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seleção de Alunos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Selecione os Alunos *
                </label>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar aluno..."
                    value={studentSearchTerm}
                    onChange={(e) => setStudentSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  />
                </div>
                <div className="border border-gray-300 rounded-lg p-4 max-h-[300px] overflow-y-auto">
                  {filteredActiveStudents.length === 0 ? (
                    <p className="text-center text-gray-600">
                      {studentSearchTerm ? "Nenhum aluno encontrado" : "Nenhum aluno disponível"}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {filteredActiveStudents.map((student) => (
                        <div
                          key={student.id}
                          onClick={() => toggleStudentSelection(student.id)}
                          className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedStudents.includes(student.id)
                              ? "bg-[#FFDD00] border-2 border-black"
                              : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                          }`}
                        >
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            {selectedStudents.includes(student.id) ? (
                              <UserCheck className="w-5 h-5 text-black" />
                            ) : (
                              <User className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.grade}</p>
                          </div>
                          {selectedStudents.includes(student.id) && (
                            <div className="text-xs font-bold text-black">✓</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {selectedStudents.length > 0 && (
                  <p className="mt-2 text-sm text-gray-600">
                    {selectedStudents.length} aluno(s) selecionado(s)
                  </p>
                )}
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditRouteModal(false);
                  setEditingRouteId(null);
                  setSelectedStudents([]);
                  setRouteType("IDA");
                  setRouteTime("");
                  setStudentSearchTerm("");
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold cursor-pointer"
              >
                <Edit className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteConfirmModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowDeleteConfirmModal(false);
            setRouteToDelete(null);
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Conteúdo do Modal */}
            <div className="p-6 text-center">
              {/* Ícone de Alerta */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>

              {/* Título */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Excluir Rota
              </h3>

              {/* Mensagem */}
              <p className="text-sm text-gray-600 mb-6">
                Tem certeza que deseja excluir esta rota? Esta ação não pode ser
                desfeita.
              </p>

              {/* Botões */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteConfirmModal(false);
                    setRouteToDelete(null);
                  }}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleDeleteRoute}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold cursor-pointer"
                >
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

