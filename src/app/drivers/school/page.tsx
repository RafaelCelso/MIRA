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
  Phone,
  Mail,
  Calendar,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  FileText,
  Award,
  AlertTriangle,
  User,
  X,
  Route,
} from "lucide-react";
import { useState } from "react";

export default function DriversManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [showDriversModal, setShowDriversModal] = useState(false);
  const [modalSearchTerm, setModalSearchTerm] = useState("");

  // Dados dos motoristas
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "Carlos Santos",
      phone: "(11) 99999-1111",
      email: "carlos.santos@email.com",
      license: "CNH-A/D",
      licenseExpiry: "2025-08-15",
      experience: "8 anos",
      status: "ativo",
      currentRoute: "Rota 1 - Vila Madalena",
      vehicle: "MIRA-01",
      studentsAssigned: 45,
      rating: 4.8,
      lastMedicalExam: "2024-03-15",
      emergencyContact: "Maria Santos - (11) 98888-2222",
      address: "Rua das Palmeiras, 123 - Vila Madalena",
      hireDate: "2020-02-10",
      documents: {
        cnh: "válida",
        medicalCertificate: "válido",
        criminalRecord: "válido",
        trainingCertificate: "válido",
      },
    },
    {
      id: 2,
      name: "Ana Silva",
      phone: "(11) 99999-2222",
      email: "ana.silva@email.com",
      license: "CNH-A/D",
      licenseExpiry: "2024-12-20",
      experience: "5 anos",
      status: "ativo",
      currentRoute: "Rota 3 - Jardins",
      vehicle: "MIRA-03",
      studentsAssigned: 38,
      rating: 4.9,
      lastMedicalExam: "2024-01-20",
      emergencyContact: "João Silva - (11) 97777-3333",
      address: "Av. Paulista, 456 - Jardins",
      hireDate: "2021-05-15",
      documents: {
        cnh: "válida",
        medicalCertificate: "válido",
        criminalRecord: "válido",
        trainingCertificate: "vencido",
      },
    },
    {
      id: 3,
      name: "Pedro Costa",
      phone: "(11) 99999-3333",
      email: "pedro.costa@email.com",
      license: "CNH-A/D",
      licenseExpiry: "2025-03-10",
      experience: "12 anos",
      status: "inativo",
      currentRoute: "-",
      vehicle: "-",
      studentsAssigned: 0,
      rating: 4.7,
      lastMedicalExam: "2023-11-30",
      emergencyContact: "Lucia Costa - (11) 96666-4444",
      address: "Rua Augusta, 789 - Itaim Bibi",
      hireDate: "2018-08-20",
      documents: {
        cnh: "válida",
        medicalCertificate: "vencido",
        criminalRecord: "válido",
        trainingCertificate: "válido",
      },
    },
    {
      id: 4,
      name: "Maria Oliveira",
      phone: "(11) 99999-4444",
      email: "maria.oliveira@email.com",
      license: "CNH-A/D",
      licenseExpiry: "2024-11-05",
      experience: "3 anos",
      status: "ativo",
      currentRoute: "Rota 2 - Pinheiros",
      vehicle: "MIRA-02",
      studentsAssigned: 42,
      rating: 4.6,
      lastMedicalExam: "2024-02-10",
      emergencyContact: "Carlos Oliveira - (11) 95555-5555",
      address: "Rua dos Pinheiros, 321 - Pinheiros",
      hireDate: "2022-01-10",
      documents: {
        cnh: "vencendo",
        medicalCertificate: "válido",
        criminalRecord: "válido",
        trainingCertificate: "válido",
      },
    },
  ]);

  // Estatísticas
  const stats = {
    totalDrivers: drivers.length,
    activeDrivers: drivers.filter((d) => d.status === "ativo").length,
    inactiveDrivers: drivers.filter((d) => d.status === "inativo").length,
    documentsExpiring: drivers.filter(
      (d) =>
        Object.values(d.documents).includes("vencendo") ||
        Object.values(d.documents).includes("vencido")
    ).length,
    totalStudentsAssigned: drivers.reduce(
      (sum, driver) => sum + driver.studentsAssigned,
      0
    ),
  };

  const getStatusColor = (status: string) => {
    return status === "ativo"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const getStatusText = (status: string) => {
    return status === "ativo" ? "Ativo" : "Inativo";
  };

  const toggleDriverStatus = (driverId: number) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) =>
        driver.id === driverId
          ? {
              ...driver,
              status: driver.status === "ativo" ? "inativo" : "ativo",
            }
          : driver
      )
    );
  };

  const getDocumentStatus = (document: string) => {
    switch (document) {
      case "válido":
        return {
          color: "text-green-600",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "vencendo":
        return {
          color: "text-yellow-600",
          icon: <AlertTriangle className="w-4 h-4" />,
        };
      case "vencido":
        return {
          color: "text-red-600",
          icon: <AlertCircle className="w-4 h-4" />,
        };
      default:
        return {
          color: "text-gray-600",
          icon: <AlertCircle className="w-4 h-4" />,
        };
    }
  };

  const getRatingStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "⭐" : "");
  };

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.currentRoute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "todos" || driver.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  // Filtro para motoristas no modal
  const filteredModalDrivers = drivers.filter((driver) => {
    const matchesModalSearch =
      driver.name.toLowerCase().includes(modalSearchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(modalSearchTerm.toLowerCase()) ||
      driver.phone.includes(modalSearchTerm);

    return matchesModalSearch;
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
            Gerenciar Motoristas
          </h1>
          <p className="text-sm text-gray-600">
            Administração de Motoristas do Transporte Escolar
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total de Motoristas</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.totalDrivers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Motoristas Ativos</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.activeDrivers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alunos Atendidos</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.totalStudentsAssigned}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Docs. Vencendo</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.documentsExpiring}
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
                  placeholder="Buscar por nome, rota ou veículo..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent cursor-pointer"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="todos">Todos os Status</option>
                  <option value="ativo">Apenas Ativos</option>
                  <option value="inativo">Apenas Inativos</option>
                </select>
                <Button
                  onClick={() => {
                    setShowDriversModal(true);
                    setModalSearchTerm("");
                  }}
                  className="bg-[#FFDD00] hover:bg-[#E6C700] text-black border-2 border-black cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Motorista
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drivers List */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Lista de Motoristas ({filteredDrivers.length})
              </h2>
            </div>
            <div className="space-y-4">
              {filteredDrivers.map((driver) => (
                <div
                  key={driver.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-[#FFDD00] rounded-full flex items-center justify-center">
                          <UserCheck className="w-5 h-5 text-black" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {driver.name}
                          </h3>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleDriverStatus(driver.id);
                          }}
                          className={`relative inline-flex h-7 w-12 items-center rounded-full shadow-inner transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:ring-offset-2 cursor-pointer border-2 ${
                            driver.status === "ativo"
                              ? "bg-green-500 border-green-600"
                              : "bg-gray-300 border-gray-400"
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform border border-gray-300 ${
                              driver.status === "ativo"
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                        <span className="text-xs text-gray-600 min-w-[60px]">
                          {getStatusText(driver.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>{driver.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>{driver.email}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>Alunos: {driver.studentsAssigned}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Bus className="w-4 h-4" />
                            <span>Veículo: {driver.vehicle}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Perfil
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <Route className="w-4 h-4 mr-1" />
                        Rotas
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-700 hover:bg-red-50 cursor-pointer"
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
          <Link href="/students/school">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Alunos</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
          >
            <Bus className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-yellow-500 font-medium">
              Motoristas
            </span>
          </Button>
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

      {/* Modal de Lista de Motoristas */}
      {showDriversModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDriversModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">
                Selecionar Motorista
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDriversModal(false)}
                className="p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-black" />
              </Button>
            </div>

            {/* Barra de Busca */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por nome, email ou telefone..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  value={modalSearchTerm}
                  onChange={(e) => setModalSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Lista de Motoristas */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {filteredModalDrivers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Nenhum motorista encontrado</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredModalDrivers.map((driver) => (
                    <Link
                      href={`/profile/driver/${driver.id}`}
                      key={driver.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer block"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-[#FFDD00] rounded-full flex items-center justify-center flex-shrink-0">
                          <UserCheck className="w-6 h-6 text-black" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {driver.name}
                          </h4>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Mail className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{driver.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 flex-shrink-0" />
                              <span>{driver.phone}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Aqui seria a lógica para adicionar o motorista
                            console.log("Adicionar motorista:", driver.id);
                          }}
                          className="bg-[#FFDD00] hover:bg-[#E6C700] text-black border-2 border-black cursor-pointer whitespace-nowrap flex-shrink-0"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
              <Button
                onClick={() => setShowDriversModal(false)}
                className="bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold cursor-pointer"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
