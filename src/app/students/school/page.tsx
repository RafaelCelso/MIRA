"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  User,
  AlertTriangle,
  X,
  Clock,
  QrCode,
  Download,
  Share2,
  Check,
} from "lucide-react";
import { useState } from "react";

export default function StudentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  const [showViewStudentModal, setShowViewStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [modalSearchTerm, setModalSearchTerm] = useState("");
  const [addingStudentId, setAddingStudentId] = useState<number | null>(null);
  const [completedStudentId, setCompletedStudentId] = useState<number | null>(
    null
  );

  // Lista geral de alunos disponíveis para adicionar (mock)
  const [availableStudents] = useState([
    {
      id: 10,
      name: "Isabella Martins",
      grade: "6º Ano B",
      periodo: "Manhã",
      sexo: "Feminino",
      idade: 11,
      cuidadosEspeciais: "Nenhum",
      relationship: "Mãe",
      route: "-",
      parent: "Juliana Martins",
      phone: "(11) 98888-1111",
      email: "juliana.martins@email.com",
      address: "Rua Oscar Freire, 123 - Jardins",
      cep: "01426-000",
      rua: "Rua Oscar Freire",
      numero: "123",
      semNumero: false,
      complemento: "",
      bairro: "Jardins",
      cidade: "São Paulo",
      estado: "SP",
      status: "ativo",
      busNumber: "-",
      pickupTime: "07:30",
      dropoffTime: "17:45",
    },
    {
      id: 11,
      name: "Gabriel Lima",
      grade: "4º Ano C",
      periodo: "Tarde",
      sexo: "Masculino",
      idade: 9,
      cuidadosEspeciais: "Nenhum",
      relationship: "Pai",
      route: "-",
      parent: "Roberto Lima",
      phone: "(11) 98888-2222",
      email: "roberto.lima@email.com",
      address: "Av. Faria Lima, 456 - Itaim Bibi",
      cep: "04538-132",
      rua: "Av. Faria Lima",
      numero: "456",
      semNumero: false,
      complemento: "Conj. 501",
      bairro: "Itaim Bibi",
      cidade: "São Paulo",
      estado: "SP",
      status: "ativo",
      busNumber: "-",
      pickupTime: "07:45",
      dropoffTime: "18:00",
    },
    {
      id: 12,
      name: "Sophia Ribeiro",
      grade: "8º Ano A",
      periodo: "Integral",
      sexo: "Feminino",
      idade: 13,
      cuidadosEspeciais: "Diabetes",
      relationship: "Mãe",
      route: "-",
      parent: "Patricia Ribeiro",
      phone: "(11) 98888-3333",
      email: "patricia.ribeiro@email.com",
      address: "Rua Mourato Coelho, 789 - Vila Madalena",
      cep: "05417-012",
      rua: "Rua Mourato Coelho",
      numero: "789",
      semNumero: false,
      complemento: "",
      bairro: "Vila Madalena",
      cidade: "São Paulo",
      estado: "SP",
      status: "ativo",
      busNumber: "-",
      pickupTime: "08:00",
      dropoffTime: "18:15",
    },
  ]);

  // Dados dos alunos
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ana Clara Silva",
      grade: "5º Ano A",
      periodo: "Manhã",
      sexo: "Feminino",
      idade: 10,
      cuidadosEspeciais: "Nenhum",
      relationship: "Mãe",
      route: "Rota 1 - Vila Madalena",
      parent: "Maria Silva",
      phone: "(11) 99999-1111",
      email: "maria.silva@email.com",
      address: "Rua das Flores, 123 - Vila Madalena",
      cep: "05400-000",
      rua: "Rua das Flores",
      numero: "123",
      semNumero: false,
      complemento: "",
      bairro: "Vila Madalena",
      cidade: "São Paulo",
      estado: "SP",
      status: "ativo",
      busNumber: "MIRA-01",
      pickupTime: "07:30",
      dropoffTime: "17:45",
    },
    {
      id: 2,
      name: "João Pedro Santos",
      grade: "3º Ano B",
      periodo: "Tarde",
      sexo: "Masculino",
      idade: 8,
      cuidadosEspeciais: "Asma",
      relationship: "Pai",
      route: "Rota 3 - Jardins",
      parent: "Carlos Santos",
      phone: "(11) 99999-2222",
      email: "carlos.santos@email.com",
      address: "Av. Paulista, 456 - Jardins",
      cep: "01310-100",
      rua: "Av. Paulista",
      numero: "456",
      semNumero: false,
      complemento: "Apto 1201",
      bairro: "Jardins",
      cidade: "São Paulo",
      estado: "SP",
      status: "ativo",
      busNumber: "MIRA-03",
      pickupTime: "07:45",
      dropoffTime: "18:00",
    },
    {
      id: 3,
      name: "Beatriz Costa",
      grade: "7º Ano C",
      periodo: "Integral",
      sexo: "Feminino",
      idade: 12,
      cuidadosEspeciais: "Nenhum",
      relationship: "Mãe",
      route: "Rota 5 - Itaim Bibi",
      parent: "Ana Costa",
      phone: "(11) 99999-3333",
      email: "ana.costa@email.com",
      address: "Rua Augusta, 789 - Itaim Bibi",
      cep: "04530-001",
      rua: "Rua Augusta",
      numero: "789",
      semNumero: false,
      complemento: "",
      bairro: "Itaim Bibi",
      cidade: "São Paulo",
      estado: "SP",
      status: "inativo",
      busNumber: "MIRA-05",
      pickupTime: "08:00",
      dropoffTime: "18:15",
    },
    {
      id: 4,
      name: "Lucas Oliveira",
      grade: "2º Ano A",
      periodo: "Manhã",
      sexo: "Masculino",
      idade: 7,
      cuidadosEspeciais: "Dieta especial",
      relationship: "Pai",
      route: "Rota 1 - Vila Madalena",
      parent: "Pedro Oliveira",
      phone: "(11) 99999-4444",
      email: "pedro.oliveira@email.com",
      address: "Rua dos Pinheiros, 321 - Vila Madalena",
      cep: "05400-050",
      rua: "Rua dos Pinheiros",
      numero: "S/N",
      semNumero: true,
      complemento: "",
      bairro: "Vila Madalena",
      cidade: "São Paulo",
      estado: "SP",
      status: "ativo",
      busNumber: "MIRA-01",
      pickupTime: "07:30",
      dropoffTime: "17:45",
    },
  ]);

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

  const handleDeleteStudent = () => {
    if (studentToDelete) {
      setStudents(students.filter((s) => s.id !== studentToDelete));
      setShowDeleteConfirmModal(false);
      setStudentToDelete(null);
    }
  };

  const toggleStudentStatus = (studentId: number) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              status: student.status === "ativo" ? "inativo" : "ativo",
            }
          : student
      )
    );
  };

  const handleAddStudent = (studentToAdd: any) => {
    // Ativar animação de loading
    setAddingStudentId(studentToAdd.id);

    // Após 400ms, mostrar animação de sucesso
    setTimeout(() => {
      setAddingStudentId(null);
      setCompletedStudentId(studentToAdd.id);

      // Após 300ms, adicionar o aluno e fechar o modal
      setTimeout(() => {
        // Adicionar o aluno à lista de alunos da escola
        setStudents((prevStudents) => [...prevStudents, studentToAdd]);
        // Fechar o modal
        setShowAddStudentModal(false);
        // Limpar a busca
        setModalSearchTerm("");
        // Resetar a animação
        setCompletedStudentId(null);
      }, 300);
    }, 400);
  };

  // Funções auxiliares para formatação
  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  const formatNumbers = (value: string) => {
    return value.replace(/\D/g, "");
  };

  // Função para lidar com o checkbox "Sem número"
  const handleSemNumeroChange = (checked: boolean) => {
    setEditingStudent({
      ...editingStudent,
      semNumero: checked,
      numero: checked ? "S/N" : "",
    });
  };

  // Função para buscar endereço pelo CEP
  const buscarCEP = async () => {
    if (!editingStudent) return;

    const cep = editingStudent.cep.replace(/\D/g, "");

    if (cep.length !== 8) {
      alert("CEP deve ter 8 dígitos");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado");
        return;
      }

      // Preenche os campos automaticamente
      setEditingStudent({
        ...editingStudent,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      });
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar CEP. Tente novamente.");
    }
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

  // Filtro para alunos no modal (apenas alunos disponíveis que ainda não foram adicionados)
  const filteredModalStudents = availableStudents
    .filter((student) => !students.some((s) => s.id === student.id))
    .filter((student) => {
      const matchesModalSearch =
        student.name.toLowerCase().includes(modalSearchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(modalSearchTerm.toLowerCase()) ||
        student.phone.includes(modalSearchTerm);

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
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent cursor-pointer"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="todos">Todos os Status</option>
                  <option value="ativo">Apenas Ativos</option>
                  <option value="inativo">Apenas Inativos</option>
                </select>
                <Button
                  className="bg-[#FFDD00] hover:bg-[#E6C700] text-black border-2 border-black cursor-pointer"
                  onClick={() => setShowAddStudentModal(true)}
                >
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
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {student.name}
                          </h3>
                          <p className="text-sm text-gray-600 truncate">
                            {student.grade}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleStudentStatus(student.id);
                            }}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full shadow-inner transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:ring-offset-2 cursor-pointer border-2 ${
                              student.status === "ativo"
                                ? "bg-green-500 border-green-600"
                                : "bg-gray-300 border-gray-400"
                            }`}
                          >
                            <span
                              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform border border-gray-300 ${
                                student.status === "ativo"
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                          <span className="text-xs text-gray-600 whitespace-nowrap">
                            {getStatusText(student.status)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{student.parent}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{student.phone}</span>
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
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowViewStudentModal(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setEditingStudent(student);
                          setShowEditStudentModal(true);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-700 hover:bg-red-50 cursor-pointer"
                        onClick={() => {
                          setStudentToDelete(student.id);
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
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Perfil</span>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Padding bottom para compensar a navegação fixa */}
      <div className="h-20"></div>

      {/* Modal de Visualização de Aluno */}
      {showViewStudentModal && selectedStudent && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => {
            setShowViewStudentModal(false);
            setSelectedStudent(null);
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">
                Informações do Aluno
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowViewStudentModal(false);
                  setSelectedStudent(null);
                }}
                className="p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-black" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="space-y-6">
                {/* Avatar e Nome */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-[#FFDD00] rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedStudent.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedStudent.grade} - {selectedStudent.periodo}
                    </p>
                  </div>
                  <span
                    className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
                      selectedStudent.status === "ativo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedStudent.status === "ativo" ? "Ativo" : "Inativo"}
                  </span>
                </div>

                {/* QR Code */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    QR Code
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    {/* QR Code simulado */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <svg
                          width="128"
                          height="128"
                          viewBox="0 0 21 21"
                          className="w-32 h-32"
                        >
                          {/* Fundo branco */}
                          <rect width="21" height="21" fill="white" />

                          {/* Canto superior esquerdo (7x7) */}
                          <rect x="0" y="0" width="7" height="7" fill="black" />
                          <rect x="1" y="1" width="5" height="5" fill="white" />
                          <rect x="2" y="2" width="3" height="3" fill="black" />

                          {/* Canto superior direito (7x7) */}
                          <rect
                            x="14"
                            y="0"
                            width="7"
                            height="7"
                            fill="black"
                          />
                          <rect
                            x="15"
                            y="1"
                            width="5"
                            height="5"
                            fill="white"
                          />
                          <rect
                            x="16"
                            y="2"
                            width="3"
                            height="3"
                            fill="black"
                          />

                          {/* Canto inferior esquerdo (7x7) */}
                          <rect
                            x="0"
                            y="14"
                            width="7"
                            height="7"
                            fill="black"
                          />
                          <rect
                            x="1"
                            y="15"
                            width="5"
                            height="5"
                            fill="white"
                          />
                          <rect
                            x="2"
                            y="16"
                            width="3"
                            height="3"
                            fill="black"
                          />

                          {/* Separadores brancos */}
                          <rect x="7" y="0" width="1" height="9" fill="white" />
                          <rect x="0" y="7" width="9" height="1" fill="white" />
                          <rect
                            x="13"
                            y="0"
                            width="1"
                            height="9"
                            fill="white"
                          />
                          <rect
                            x="14"
                            y="7"
                            width="7"
                            height="1"
                            fill="white"
                          />
                          <rect
                            x="7"
                            y="13"
                            width="1"
                            height="8"
                            fill="white"
                          />
                          <rect
                            x="0"
                            y="13"
                            width="9"
                            height="1"
                            fill="white"
                          />

                          {/* Linhas de timing */}
                          <rect x="8" y="6" width="1" height="1" fill="black" />
                          <rect
                            x="10"
                            y="6"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="12"
                            y="6"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect x="6" y="8" width="1" height="1" fill="black" />
                          <rect
                            x="6"
                            y="10"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="6"
                            y="12"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="13"
                            y="8"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="13"
                            y="10"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="13"
                            y="12"
                            width="1"
                            height="1"
                            fill="black"
                          />

                          {/* Dots aleatórios */}
                          <rect x="8" y="9" width="1" height="1" fill="black" />
                          <rect x="9" y="9" width="1" height="1" fill="black" />
                          <rect
                            x="11"
                            y="9"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="8"
                            y="11"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="8"
                            y="13"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="9"
                            y="13"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="11"
                            y="13"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="14"
                            y="10"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="15"
                            y="10"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="17"
                            y="10"
                            width="1"
                            height="1"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Botões de ação */}
                    <div className="flex gap-2 justify-center flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartilhar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Imprimir
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Dados Pessoais */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Dados Pessoais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Sexo</p>
                        <p className="font-medium text-gray-900">
                          {selectedStudent.sexo}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Idade</p>
                        <p className="font-medium text-gray-900">
                          {selectedStudent.idade} anos
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">
                          Cuidados Especiais
                        </p>
                        <p className="font-medium text-gray-900">
                          {selectedStudent.cuidadosEspeciais}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Responsável */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Responsável
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Nome</p>
                        <p className="font-medium text-gray-900">
                          {selectedStudent.parent}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Relação</p>
                        <p className="font-medium text-gray-900">
                          {selectedStudent.relationship}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Telefone</p>
                        <p className="font-medium text-gray-900">
                          {selectedStudent.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">E-mail</p>
                        <p className="font-medium text-gray-900">
                          {selectedStudent.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Endereço
                  </h3>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Localização</p>
                      <p className="font-medium text-gray-900">
                        {selectedStudent.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
              <Button
                onClick={() => {
                  setShowViewStudentModal(false);
                  setSelectedStudent(null);
                }}
                className="bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold cursor-pointer"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Lista de Alunos */}
      {showAddStudentModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddStudentModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">Selecionar Aluno</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddStudentModal(false)}
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

            {/* Lista de Alunos */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {filteredModalStudents.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Nenhum aluno encontrado</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredModalStudents.map((student) => (
                    <div
                      key={student.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-[#FFDD00] rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-black" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {student.name}
                          </h4>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Mail className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{student.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 flex-shrink-0" />
                              <span>{student.phone}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddStudent(student);
                          }}
                          disabled={
                            addingStudentId === student.id ||
                            completedStudentId === student.id
                          }
                          className={`${
                            completedStudentId === student.id
                              ? "bg-green-500 hover:bg-green-500"
                              : "bg-[#FFDD00] hover:bg-[#E6C700]"
                          } text-black border-2 border-black cursor-pointer whitespace-nowrap flex-shrink-0 transition-all duration-300 transform ${
                            completedStudentId === student.id ? "scale-105" : ""
                          }`}
                        >
                          {addingStudentId === student.id ? (
                            <>
                              <div className="w-4 h-4 mr-2 border-2 border-black border-t-transparent rounded-full animate-spin" />
                              Adicionando...
                            </>
                          ) : completedStudentId === student.id ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Adicionado!
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Adicionar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
              <Button
                onClick={() => setShowAddStudentModal(false)}
                className="bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold cursor-pointer"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição de Aluno */}
      {showEditStudentModal && editingStudent && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => {
            setShowEditStudentModal(false);
            setEditingStudent(null);
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">
                Editar Informações do Aluno
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowEditStudentModal(false);
                  setEditingStudent(null);
                }}
                className="p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-black" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="space-y-6">
                {/* Avatar e Nome */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-[#FFDD00] rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingStudent.name}
                    </h2>
                    <p className="text-gray-600">
                      {editingStudent.grade} - {editingStudent.periodo}
                    </p>
                  </div>
                  <span
                    className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
                      editingStudent.status === "ativo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {editingStudent.status === "ativo" ? "Ativo" : "Inativo"}
                  </span>
                </div>

                {/* QR Code */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    QR Code
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    {/* QR Code simulado */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <svg
                          width="128"
                          height="128"
                          viewBox="0 0 21 21"
                          className="w-32 h-32"
                        >
                          {/* Fundo branco */}
                          <rect width="21" height="21" fill="white" />

                          {/* Canto superior esquerdo (7x7) */}
                          <rect x="0" y="0" width="7" height="7" fill="black" />
                          <rect x="1" y="1" width="5" height="5" fill="white" />
                          <rect x="2" y="2" width="3" height="3" fill="black" />

                          {/* Canto superior direito (7x7) */}
                          <rect
                            x="14"
                            y="0"
                            width="7"
                            height="7"
                            fill="black"
                          />
                          <rect
                            x="15"
                            y="1"
                            width="5"
                            height="5"
                            fill="white"
                          />
                          <rect
                            x="16"
                            y="2"
                            width="3"
                            height="3"
                            fill="black"
                          />

                          {/* Canto inferior esquerdo (7x7) */}
                          <rect
                            x="0"
                            y="14"
                            width="7"
                            height="7"
                            fill="black"
                          />
                          <rect
                            x="1"
                            y="15"
                            width="5"
                            height="5"
                            fill="white"
                          />
                          <rect
                            x="2"
                            y="16"
                            width="3"
                            height="3"
                            fill="black"
                          />

                          {/* Separadores brancos */}
                          <rect x="7" y="0" width="1" height="9" fill="white" />
                          <rect x="0" y="7" width="9" height="1" fill="white" />
                          <rect
                            x="13"
                            y="0"
                            width="1"
                            height="9"
                            fill="white"
                          />
                          <rect
                            x="14"
                            y="7"
                            width="7"
                            height="1"
                            fill="white"
                          />
                          <rect
                            x="7"
                            y="13"
                            width="1"
                            height="8"
                            fill="white"
                          />
                          <rect
                            x="0"
                            y="13"
                            width="9"
                            height="1"
                            fill="white"
                          />

                          {/* Linhas de timing */}
                          <rect x="8" y="6" width="1" height="1" fill="black" />
                          <rect
                            x="10"
                            y="6"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="12"
                            y="6"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect x="6" y="8" width="1" height="1" fill="black" />
                          <rect
                            x="6"
                            y="10"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="6"
                            y="12"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="13"
                            y="8"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="13"
                            y="10"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="13"
                            y="12"
                            width="1"
                            height="1"
                            fill="black"
                          />

                          {/* Dots aleatórios */}
                          <rect x="8" y="9" width="1" height="1" fill="black" />
                          <rect x="9" y="9" width="1" height="1" fill="black" />
                          <rect
                            x="11"
                            y="9"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="8"
                            y="11"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="8"
                            y="13"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="9"
                            y="13"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="11"
                            y="13"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="14"
                            y="10"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="15"
                            y="10"
                            width="1"
                            height="1"
                            fill="black"
                          />
                          <rect
                            x="17"
                            y="10"
                            width="1"
                            height="1"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Botões de ação */}
                    <div className="flex gap-2 justify-center flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <QrCode className="w-4 h-4 mr-2" />
                        Novo QR Code
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartilhar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Imprimir
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Dados Pessoais */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Dados Pessoais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Sexo</p>
                        <p className="font-medium text-gray-900">
                          {editingStudent.sexo}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Idade</p>
                        <p className="font-medium text-gray-900">
                          {editingStudent.idade} anos
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">
                          Cuidados Especiais
                        </p>
                        <p className="font-medium text-gray-900">
                          {editingStudent.cuidadosEspeciais}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Responsável */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Responsável
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Nome</p>
                        <p className="font-medium text-gray-900">
                          {editingStudent.parent}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Relação</p>
                        <p className="font-medium text-gray-900">
                          {editingStudent.relationship}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Telefone</p>
                        <p className="font-medium text-gray-900">
                          {editingStudent.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">E-mail</p>
                        <p className="font-medium text-gray-900">
                          {editingStudent.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Endereço
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CEP*
                        </label>
                        <Input
                          placeholder="00000-000"
                          value={editingStudent.cep}
                          onChange={(e) =>
                            setEditingStudent({
                              ...editingStudent,
                              cep: formatCEP(e.target.value),
                            })
                          }
                          maxLength={9}
                          className="w-full"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={buscarCEP}
                        className="mt-6 px-4 cursor-pointer"
                      >
                        Buscar
                      </Button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rua*
                      </label>
                      <Input
                        placeholder="Nome da rua"
                        value={editingStudent.rua}
                        onChange={(e) =>
                          setEditingStudent({
                            ...editingStudent,
                            rua: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Número*
                        </label>
                        <Input
                          placeholder="Ex: 123"
                          value={editingStudent.numero}
                          onChange={(e) =>
                            setEditingStudent({
                              ...editingStudent,
                              numero: formatNumbers(e.target.value),
                            })
                          }
                          disabled={editingStudent.semNumero}
                          className="w-full"
                        />
                        <div className="mt-2">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingStudent.semNumero}
                              onChange={(e) =>
                                handleSemNumeroChange(e.target.checked)
                              }
                              className="mr-2 w-4 h-4 border-2 border-gray-300 rounded checked:bg-yellow-400 checked:border-black focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                            />
                            <span className="text-sm text-gray-700">
                              Sem número
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Complemento
                        </label>
                        <Input
                          placeholder="Apto, bloco, etc."
                          value={editingStudent.complemento}
                          onChange={(e) =>
                            setEditingStudent({
                              ...editingStudent,
                              complemento: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bairro*
                      </label>
                      <Input
                        placeholder="Nome do bairro"
                        value={editingStudent.bairro}
                        onChange={(e) =>
                          setEditingStudent({
                            ...editingStudent,
                            bairro: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cidade*
                        </label>
                        <Input
                          placeholder="Nome da cidade"
                          value={editingStudent.cidade}
                          onChange={(e) =>
                            setEditingStudent({
                              ...editingStudent,
                              cidade: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Estado*
                        </label>
                        <select
                          value={editingStudent.estado}
                          onChange={(e) =>
                            setEditingStudent({
                              ...editingStudent,
                              estado: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent cursor-pointer"
                        >
                          <option value="">UF</option>
                          <option value="SP">SP</option>
                          <option value="RJ">RJ</option>
                          <option value="MG">MG</option>
                          <option value="RS">RS</option>
                          <option value="PR">PR</option>
                          <option value="SC">SC</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditStudentModal(false);
                  setEditingStudent(null);
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  // Atualizar o aluno na lista
                  setStudents(
                    students.map((s) =>
                      s.id === editingStudent.id ? editingStudent : s
                    )
                  );
                  setShowEditStudentModal(false);
                  setEditingStudent(null);
                }}
                className="bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold cursor-pointer"
              >
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteConfirmModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => {
            setShowDeleteConfirmModal(false);
            setStudentToDelete(null);
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
                Excluir Aluno
              </h3>

              {/* Mensagem */}
              <p className="text-sm text-gray-600 mb-6">
                Tem certeza que deseja excluir este aluno? Esta ação não pode
                ser desfeita.
              </p>

              {/* Botões */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteConfirmModal(false);
                    setStudentToDelete(null);
                  }}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleDeleteStudent}
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
