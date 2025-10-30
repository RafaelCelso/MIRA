"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  User,
  MapPin,
  MessageCircle,
  Bus,
  Settings,
  Phone,
  Mail,
  Edit,
  Shield,
  HelpCircle,
  LogOut,
  Camera,
  Save,
  X,
  Check,
  Eye,
  EyeOff,
  Users,
  Plus,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ParentProfile() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showEmergencyContact, setShowEmergencyContact] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Dados dos alunos cadastrados
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "João Silva",
      age: "13",
      gender: "masculino",
      grade: "8º ano - Turma A",
      period: "manha",
      specialCare: "nao",
      school: "Colégio São José",
      avatarColor: "from-blue-400 to-blue-600",
    },
    {
      id: 2,
      name: "Maria Silva",
      age: "10",
      gender: "feminino",
      grade: "5º ano - Turma B",
      period: "tarde",
      specialCare: "sim",
      school: "Escola Municipal Santos",
      avatarColor: "from-green-400 to-green-600",
    },
  ]);

  // Estados para adicionar novo aluno
  const [newStudentData, setNewStudentData] = useState({
    name: "",
    age: "",
    gender: "",
    grade: "",
    period: "",
    specialCare: "",
  });

  // Estados para editar aluno
  const [editStudentData, setEditStudentData] = useState({
    name: "",
    age: "",
    gender: "",
    grade: "",
    period: "",
    specialCare: "",
  });

  // Estados para edição de perfil
  const [profileData, setProfileData] = useState({
    name: "Ana Paula Silva",
    responsibility: "mae",
    gender: "feminino",
    cpf: "123.456.789-00",
    email: "ana.paula@email.com",
    phone: "(11) 99999-9999",
    cep: "01234-567",
    street: "Rua das Flores",
    number: "123",
    noNumber: false,
    complement: "",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    address: "Rua das Flores, 123 - Centro",
    emergencyContactName: "João Silva",
    emergencyContactPhone: "(11) 88888-8888",
    emergencyContactRelation: "pai",
    emergencyContact: "João Silva - (11) 88888-8888",
  });

  // Estados para alteração de senha
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Estados para erros de validação
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Função para limpar erro específico quando o usuário digita
  const clearPasswordError = (field: string) => {
    if (passwordErrors[field as keyof typeof passwordErrors]) {
      setPasswordErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Função para validar requisitos da senha em tempo real
  const validatePasswordRequirements = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
    };
  };

  // Função para adicionar novo aluno
  const handleAddStudent = () => {
    if (
      !newStudentData.name ||
      !newStudentData.age ||
      !newStudentData.gender ||
      !newStudentData.grade ||
      !newStudentData.period ||
      !newStudentData.specialCare
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Cores disponíveis para avatares
    const avatarColors = [
      "from-blue-400 to-blue-600",
      "from-green-400 to-green-600",
      "from-purple-400 to-purple-600",
      "from-red-400 to-red-600",
      "from-yellow-400 to-yellow-600",
      "from-pink-400 to-pink-600",
      "from-indigo-400 to-indigo-600",
      "from-teal-400 to-teal-600",
    ];

    const newStudent = {
      id: students.length + 1,
      name: newStudentData.name,
      age: newStudentData.age,
      gender: newStudentData.gender,
      grade: newStudentData.grade,
      period: newStudentData.period,
      specialCare: newStudentData.specialCare,
      school: "Escola MIRA", // Valor padrão ou pode ser configurável
      avatarColor: avatarColors[students.length % avatarColors.length],
    };

    setStudents([...students, newStudent]);
    setNewStudentData({
      name: "",
      age: "",
      gender: "",
      grade: "",
      period: "",
      specialCare: "",
    });
    setShowAddStudentModal(false);
  };

  // Função para abrir modal de edição de aluno
  const handleEditStudent = (student: any) => {
    setSelectedStudent(student);
    setEditStudentData({
      name: student.name,
      age: student.age || "",
      gender: student.gender || "",
      grade: student.grade,
      period: student.period || "",
      specialCare: student.specialCare || "",
    });
    setShowEditStudentModal(true);
  };

  // Função para salvar alterações do aluno
  const handleSaveStudentChanges = () => {
    if (
      !editStudentData.name ||
      !editStudentData.age ||
      !editStudentData.gender ||
      !editStudentData.grade ||
      !editStudentData.period ||
      !editStudentData.specialCare
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const updatedStudents = students.map((student) =>
      student.id === selectedStudent?.id
        ? {
            ...student,
            name: editStudentData.name,
            age: editStudentData.age,
            gender: editStudentData.gender,
            grade: editStudentData.grade,
            period: editStudentData.period,
            specialCare: editStudentData.specialCare,
          }
        : student
    );

    setStudents(updatedStudents);
    setShowEditStudentModal(false);
    setSelectedStudent(null);
    setEditStudentData({
      name: "",
      age: "",
      gender: "",
      grade: "",
      period: "",
      specialCare: "",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mostrar seção de contato de emergência se houver dados preenchidos
  useEffect(() => {
    if (profileData.emergencyContactName || profileData.emergencyContactPhone) {
      setShowEmergencyContact(true);
    }
  }, [profileData.emergencyContactName, profileData.emergencyContactPhone]);

  const handleSaveProfile = () => {
    // Aqui seria a integração com a API para salvar os dados
    console.log("Salvando perfil:", profileData);
    setShowEditModal(false);
  };

  // Função para máscara de CEP
  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  // Função para máscara de CPF
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2");
    }
    return value;
  };

  // Função para máscara de telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  // Função para permitir apenas letras, espaços e acentos
  const formatName = (value: string) => {
    return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
  };

  // Handlers com máscaras
  const handleNameChange = (value: string) => {
    const formatted = formatName(value);
    setProfileData({ ...profileData, name: formatted });
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    setProfileData({ ...profileData, cpf: formatted });
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setProfileData({ ...profileData, phone: formatted });
  };

  // Handler para CEP com máscara
  const handleCEPChangeProfile = (value: string) => {
    const formatted = formatCEP(value);
    setProfileData({ ...profileData, cep: formatted });
  };

  // Handlers para contato de emergência
  const handleEmergencyNameChange = (value: string) => {
    const formatted = formatName(value);
    setProfileData({ ...profileData, emergencyContactName: formatted });
  };

  const handleEmergencyPhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setProfileData({ ...profileData, emergencyContactPhone: formatted });
  };

  // Função para buscar endereço pelo CEP
  const buscarCEP = async () => {
    const cep = profileData.cep.replace(/\D/g, "");

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
      setProfileData((prev) => ({
        ...prev,
        street: data.logradouro || "",
        neighborhood: data.bairro || "",
        city: data.localidade || "",
        state: data.uf || "",
        // Atualiza também o campo address para compatibilidade
        address: `${data.logradouro || ""}, ${prev.number} - ${
          data.bairro || ""
        }`,
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar CEP. Tente novamente.");
    }
  };

  const handleSavePassword = () => {
    // Limpar erros anteriores
    setPasswordErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    let hasErrors = false;
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    // Validar senha atual
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Senha atual é obrigatória";
      hasErrors = true;
    }

    // Validar nova senha
    if (!passwordData.newPassword) {
      newErrors.newPassword = "Nova senha é obrigatória";
      hasErrors = true;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "A senha deve ter pelo menos 8 caracteres";
      hasErrors = true;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)
    ) {
      newErrors.newPassword =
        "A senha deve conter ao menos uma letra maiúscula, uma minúscula e um número";
      hasErrors = true;
    }

    // Validar confirmação de senha
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
      hasErrors = true;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
      hasErrors = true;
    }

    if (hasErrors) {
      setPasswordErrors(newErrors);
      return;
    }

    // Aqui seria a integração com a API para alterar a senha
    console.log("Alterando senha");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordModal(false);
  };

  const handleLogout = () => {
    // Aqui seria a lógica de logout
    console.log("Fazendo logout...");
    setShowLogoutConfirm(false);
  };

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
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg mx-auto">
              <Image
                src="/images/parent-avatar.jpg"
                alt="Ana Paula Silva"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
              <div className="hidden w-full h-full flex items-center justify-center font-bold text-2xl bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                AP
              </div>
            </div>
            <Button
              size="sm"
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#FFDD00] hover:bg-[#E6C700] text-black border-2 border-white shadow-lg p-0"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Ana Paula Silva
          </h2>
          <span className="px-3 py-1 bg-[#FFDD00] text-black text-sm font-bold rounded-full border border-black">
            Responsável
          </span>
        </div>

        {/* Student Cards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Alunos Cadastrados
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-2 relative">
            {students.map((student, index) => (
              <Card
                key={student.id}
                onClick={() => handleEditStudent(student)}
                className="min-w-[240px] shadow-lg border-2 hover:shadow-xl transition-all duration-300 cursor-pointer relative bg-gradient-to-br from-[#FFDD00] to-[#E6C700] border-black hover:scale-105 z-0"
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0 bg-gradient-to-br ${student.avatarColor} text-white`}
                    >
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold truncate text-black">
                        {student.name}
                      </h3>
                      <p className="text-sm truncate text-black">
                        {student.grade}
                      </p>
                      <p className="text-xs truncate text-black">
                        {student.school}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Botão Adicionar Aluno */}
            <Card
              onClick={() => setShowAddStudentModal(true)}
              className="min-w-[240px] shadow-lg border-2 hover:shadow-xl transition-all duration-300 cursor-pointer relative bg-white border-dashed border-gray-300 hover:border-[#FFDD00] hover:bg-gray-50 hover:scale-105 z-0"
            >
              <CardContent className="p-3 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-gray-100 text-gray-400">
                    <Plus className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    Adicionar Aluno
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Informações Pessoais
            </h2>
            <Button
              onClick={() => setShowEditModal(true)}
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Nome Completo</p>
                  <p className="font-medium text-gray-900">
                    {profileData.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Responsabilidade</p>
                  <p className="font-medium text-gray-900">
                    {profileData.responsibility === "pai"
                      ? "Pai"
                      : profileData.responsibility === "mae"
                      ? "Mãe"
                      : "Responsável"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Sexo</p>
                  <p className="font-medium text-gray-900">
                    {profileData.gender === "masculino"
                      ? "Masculino"
                      : "Feminino"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">CPF</p>
                  <p className="font-medium text-gray-900">{profileData.cpf}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="font-medium text-gray-900">
                    {profileData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium text-gray-900">
                    {profileData.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Endereço</p>
                  <p className="font-medium text-gray-900">
                    {profileData.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Contato de Emergência</p>
                  <p className="font-medium text-gray-900">
                    {profileData.emergencyContactName} -{" "}
                    {profileData.emergencyContactPhone}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {profileData.emergencyContactRelation === "pai"
                      ? "Pai"
                      : profileData.emergencyContactRelation === "mae"
                      ? "Mãe"
                      : profileData.emergencyContactRelation === "avo"
                      ? "Avô/Avó"
                      : profileData.emergencyContactRelation === "tio"
                      ? "Tio/Tia"
                      : profileData.emergencyContactRelation === "irmao"
                      ? "Irmão/Irmã"
                      : profileData.emergencyContactRelation === "responsavel"
                      ? "Responsável Legal"
                      : profileData.emergencyContactRelation === "outro"
                      ? "Outro"
                      : ""}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Settings Menu */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Configurações
          </h2>

          <div className="space-y-3">
            {/* Segurança */}
            <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <Button
                  onClick={() => {
                    setShowPasswordModal(true);
                    // Limpar erros ao abrir o modal
                    setPasswordErrors({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  variant="ghost"
                  className="w-full p-4 justify-start hover:bg-gray-50 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">Segurança</p>
                    <p className="text-sm text-gray-500">
                      Alterar senha e configurações de segurança
                    </p>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Ajuda */}
            <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className="w-full p-4 justify-start hover:bg-gray-50 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">Ajuda e Suporte</p>
                    <p className="text-sm text-gray-500">
                      FAQ, tutoriais e contato com suporte
                    </p>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Logout */}
            <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <Button
                  onClick={() => setShowLogoutConfirm(true)}
                  variant="ghost"
                  className="w-full p-4 justify-start hover:bg-red-50 text-red-600 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-red-600">Sair da Conta</p>
                    <p className="text-sm text-red-400">
                      Fazer logout do aplicativo
                    </p>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* App Info */}
        <section className="pt-4">
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
            <CardContent className="p-4 text-center">
              <Image
                src="/images/Simplificado 1.webp"
                alt="MIRA Logo"
                width={80}
                height={26}
                className="mx-auto mb-2"
              />
              <p className="text-xs text-gray-500 mb-1">
                MIRA | Monitoramento Infantil em Rota Assistida
              </p>
              <p className="text-xs text-gray-400">Versão 1.0.0</p>
            </CardContent>
          </Card>
        </section>
      </main>

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
          <Link href="/transport/parent">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <Bus className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Transporte</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
          >
            <User className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-yellow-500 font-medium">Perfil</span>
          </Button>
        </div>
      </nav>

      {/* Padding bottom para compensar a navegação fixa */}
      <div className="h-20"></div>

      {/* Modal de Edição de Perfil */}
      {showEditModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">Editar Perfil</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-black" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsabilidade
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="responsibility"
                      value="pai"
                      checked={profileData.responsibility === "pai"}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          responsibility: e.target.value,
                        })
                      }
                      className="mr-2 text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="text-sm text-gray-700">Pai</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="responsibility"
                      value="mae"
                      checked={profileData.responsibility === "mae"}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          responsibility: e.target.value,
                        })
                      }
                      className="mr-2 text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="text-sm text-gray-700">Mãe</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="responsibility"
                      value="responsavel"
                      checked={profileData.responsibility === "responsavel"}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          responsibility: e.target.value,
                        })
                      }
                      className="mr-2 text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="text-sm text-gray-700">Responsável</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sexo
                </label>
                <select
                  value={profileData.gender}
                  onChange={(e) =>
                    setProfileData({ ...profileData, gender: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  value={profileData.cpf}
                  onChange={(e) => handleCPFChange(e.target.value)}
                  maxLength={14}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  placeholder="000.000.000-00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  maxLength={15}
                  placeholder="(00) 00000-0000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              {/* Seção de Endereço */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">
                  Endereço
                </h4>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CEP*
                      </label>
                      <input
                        type="text"
                        value={profileData.cep}
                        onChange={(e) => handleCEPChangeProfile(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                        placeholder="00000-000"
                        maxLength={9}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={buscarCEP}
                      className="mt-6 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors cursor-pointer"
                    >
                      Buscar
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rua*
                    </label>
                    <input
                      type="text"
                      value={profileData.street}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          street: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                      placeholder="Nome da sua rua"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número*
                      </label>
                      <input
                        type="text"
                        value={profileData.number}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            number: e.target.value,
                          })
                        }
                        disabled={profileData.noNumber}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent disabled:bg-gray-100"
                        placeholder="123"
                      />
                      <div className="mt-2">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profileData.noNumber}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                noNumber: e.target.checked,
                                number: e.target.checked ? "S/N" : "",
                              })
                            }
                            className="mr-2 w-4 h-4 border-2 border-gray-300 rounded checked:bg-[#FFDD00] checked:border-black focus:ring-2 focus:ring-[#FFDD00] focus:ring-opacity-50"
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
                      <input
                        type="text"
                        value={profileData.complement}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            complement: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                        placeholder="Apto, Bloco"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bairro*
                    </label>
                    <input
                      type="text"
                      value={profileData.neighborhood}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          neighborhood: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                      placeholder="Nome do bairro"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade*
                      </label>
                      <input
                        type="text"
                        value={profileData.city}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            city: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                        placeholder="Sua cidade"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado*
                      </label>
                      <select
                        value={profileData.state}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            state: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
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
              {/* Seção de Contato de Emergência */}
              <div>
                {!showEmergencyContact ? (
                  <button
                    type="button"
                    onClick={() => setShowEmergencyContact(true)}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#FFDD00] hover:bg-[#FFDD00]/5 transition-colors cursor-pointer flex items-center justify-center text-gray-600 hover:text-gray-800"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Contato de Emergência
                  </button>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-md font-semibold text-gray-800">
                        Contato de Emergência
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowEmergencyContact(false)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome*
                        </label>
                        <input
                          type="text"
                          value={profileData.emergencyContactName}
                          onChange={(e) =>
                            handleEmergencyNameChange(e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                          placeholder="Nome completo do contato"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Telefone*
                        </label>
                        <input
                          type="tel"
                          value={profileData.emergencyContactPhone}
                          onChange={(e) =>
                            handleEmergencyPhoneChange(e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                          placeholder="(00) 00000-0000"
                          maxLength={15}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Relação
                        </label>
                        <select
                          value={profileData.emergencyContactRelation}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              emergencyContactRelation: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                        >
                          <option value="">
                            Selecione a relação (opcional)
                          </option>
                          <option value="pai">Pai</option>
                          <option value="mae">Mãe</option>
                          <option value="avo">Avô/Avó</option>
                          <option value="tio">Tio/Tia</option>
                          <option value="irmao">Irmão/Irmã</option>
                          <option value="responsavel">Responsável Legal</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveProfile}
                className="flex-1 bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold cursor-pointer"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Alteração de Senha */}
      {showPasswordModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h3 className="text-lg font-bold text-black">Alterar Senha</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPasswordModal(false)}
                className="p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-black" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha Atual
                </label>
                <div className="relative">
                  <input
                    type={showPasswordFields ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => {
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      });
                      clearPasswordError("currentPassword");
                    }}
                    className={`w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent ${
                      passwordErrors.currentPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Digite sua senha atual"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPasswordFields(!showPasswordFields)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                  >
                    {showPasswordFields ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.currentPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova Senha
                </label>
                <input
                  type={showPasswordFields ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => {
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    });
                    clearPasswordError("newPassword");
                  }}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent ${
                    passwordErrors.newPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Digite a nova senha"
                />
                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.newPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type={showPasswordFields ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => {
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    });
                    clearPasswordError("confirmPassword");
                  }}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent ${
                    passwordErrors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirme a nova senha"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Requisitos da senha */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-2">
                  A senha deve conter:
                </p>
                <ul className="text-xs space-y-1">
                  {(() => {
                    const requirements = validatePasswordRequirements(
                      passwordData.newPassword
                    );
                    return (
                      <>
                        <li
                          className={`flex items-center gap-2 ${
                            requirements.minLength
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {requirements.minLength ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <span className="w-3 h-3 text-center">•</span>
                          )}
                          Pelo menos 8 caracteres
                        </li>
                        <li
                          className={`flex items-center gap-2 ${
                            requirements.hasUppercase
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {requirements.hasUppercase ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <span className="w-3 h-3 text-center">•</span>
                          )}
                          Uma letra maiúscula
                        </li>
                        <li
                          className={`flex items-center gap-2 ${
                            requirements.hasLowercase
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {requirements.hasLowercase ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <span className="w-3 h-3 text-center">•</span>
                          )}
                          Uma letra minúscula
                        </li>
                        <li
                          className={`flex items-center gap-2 ${
                            requirements.hasNumber
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {requirements.hasNumber ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <span className="w-3 h-3 text-center">•</span>
                          )}
                          Um número
                        </li>
                      </>
                    );
                  })()}
                </ul>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3 rounded-b-3xl">
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSavePassword}
                disabled={
                  !passwordData.currentPassword ||
                  !passwordData.newPassword ||
                  !passwordData.confirmPassword
                }
                className="flex-1 bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4 mr-2" />
                Alterar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Logout */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Conteúdo do Modal */}
            <div className="p-6 text-center">
              {/* Ícone de Logout */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>

              {/* Título */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Sair da Conta
              </h3>

              {/* Mensagem */}
              <p className="text-sm text-gray-600 mb-6">
                Tem certeza que deseja sair da sua conta? Você precisará fazer
                login novamente para acessar o aplicativo.
              </p>

              {/* Botões */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleLogout}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold cursor-pointer"
                >
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Adicionar Aluno */}
      {showAddStudentModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowAddStudentModal(false);
            setNewStudentData({
              name: "",
              age: "",
              gender: "",
              grade: "",
              period: "",
              specialCare: "",
            });
          }}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h3 className="text-lg font-bold text-black">Adicionar Aluno</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowAddStudentModal(false);
                  setNewStudentData({
                    name: "",
                    age: "",
                    gender: "",
                    grade: "",
                    period: "",
                    specialCare: "",
                  });
                }}
                className="p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-black" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-4">
              {/* Nome Completo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo do Aluno *
                </label>
                <input
                  type="text"
                  value={newStudentData.name}
                  onChange={(e) =>
                    setNewStudentData({
                      ...newStudentData,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  placeholder="Digite o nome completo do aluno"
                />
              </div>

              {/* Idade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade *
                </label>
                <input
                  type="number"
                  min="3"
                  max="18"
                  value={newStudentData.age}
                  onChange={(e) =>
                    setNewStudentData({
                      ...newStudentData,
                      age: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  placeholder="Digite a idade do aluno"
                />
              </div>

              {/* Sexo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sexo *
                </label>
                <select
                  value={newStudentData.gender}
                  onChange={(e) =>
                    setNewStudentData({
                      ...newStudentData,
                      gender: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                >
                  <option value="">Selecione o sexo</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>

              {/* Turma */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turma *
                </label>
                <input
                  type="text"
                  value={newStudentData.grade}
                  onChange={(e) =>
                    setNewStudentData({
                      ...newStudentData,
                      grade: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  placeholder="Ex: 8º ano - Turma A"
                />
              </div>

              {/* Período */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Período *
                </label>
                <select
                  value={newStudentData.period}
                  onChange={(e) =>
                    setNewStudentData({
                      ...newStudentData,
                      period: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                >
                  <option value="">Selecione o período</option>
                  <option value="manha">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="integral">Integral</option>
                </select>
              </div>

              {/* Cuidados Especiais */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuidados especiais *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="specialCare"
                      value="sim"
                      checked={newStudentData.specialCare === "sim"}
                      onChange={(e) =>
                        setNewStudentData({
                          ...newStudentData,
                          specialCare: e.target.value,
                        })
                      }
                      className="mr-2 text-[#FFDD00] focus:ring-[#FFDD00]"
                    />
                    <span className="text-sm text-gray-700">Sim</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="specialCare"
                      value="nao"
                      checked={newStudentData.specialCare === "nao"}
                      onChange={(e) =>
                        setNewStudentData({
                          ...newStudentData,
                          specialCare: e.target.value,
                        })
                      }
                      className="mr-2 text-[#FFDD00] focus:ring-[#FFDD00]"
                    />
                    <span className="text-sm text-gray-700">Não</span>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">* Campos obrigatórios</p>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3 rounded-b-3xl">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddStudentModal(false);
                  setNewStudentData({
                    name: "",
                    age: "",
                    gender: "",
                    grade: "",
                    period: "",
                    specialCare: "",
                  });
                }}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddStudent}
                disabled={
                  !newStudentData.name ||
                  !newStudentData.age ||
                  !newStudentData.gender ||
                  !newStudentData.grade ||
                  !newStudentData.period ||
                  !newStudentData.specialCare
                }
                className="flex-1 bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold disabled:opacity-50 cursor-pointer"
              >
                <Users className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editar Aluno */}
      {showEditStudentModal && selectedStudent && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowEditStudentModal(false);
            setSelectedStudent(null);
            setEditStudentData({
              name: "",
              age: "",
              gender: "",
              grade: "",
              period: "",
              specialCare: "",
            });
          }}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h3 className="text-lg font-bold text-black">Editar Aluno</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowEditStudentModal(false);
                  setSelectedStudent(null);
                  setEditStudentData({
                    name: "",
                    age: "",
                    gender: "",
                    grade: "",
                    period: "",
                    specialCare: "",
                  });
                }}
                className="p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-black" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-4">
              {/* Nome Completo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo do Aluno *
                </label>
                <input
                  type="text"
                  value={editStudentData.name}
                  onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  placeholder="Digite o nome completo do aluno"
                />
              </div>

              {/* Idade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade *
                </label>
                <input
                  type="number"
                  min="3"
                  max="18"
                  value={editStudentData.age}
                  onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      age: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  placeholder="Digite a idade do aluno"
                />
              </div>

              {/* Sexo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sexo *
                </label>
                <select
                  value={editStudentData.gender}
                  onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      gender: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                >
                  <option value="">Selecione o sexo</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>

              {/* Turma */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turma *
                </label>
                <input
                  type="text"
                  value={editStudentData.grade}
                  onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      grade: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  placeholder="Ex: 8º ano - Turma A"
                />
              </div>

              {/* Período */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Período *
                </label>
                <select
                  value={editStudentData.period}
                  onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      period: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                >
                  <option value="">Selecione o período</option>
                  <option value="manha">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="integral">Integral</option>
                </select>
              </div>

              {/* Cuidados Especiais */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuidados especiais *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="editSpecialCare"
                      value="sim"
                      checked={editStudentData.specialCare === "sim"}
                      onChange={(e) =>
                        setEditStudentData({
                          ...editStudentData,
                          specialCare: e.target.value,
                        })
                      }
                      className="mr-2 text-[#FFDD00] focus:ring-[#FFDD00]"
                    />
                    <span className="text-sm text-gray-700">Sim</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="editSpecialCare"
                      value="nao"
                      checked={editStudentData.specialCare === "nao"}
                      onChange={(e) =>
                        setEditStudentData({
                          ...editStudentData,
                          specialCare: e.target.value,
                        })
                      }
                      className="mr-2 text-[#FFDD00] focus:ring-[#FFDD00]"
                    />
                    <span className="text-sm text-gray-700">Não</span>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">* Campos obrigatórios</p>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3 rounded-b-3xl">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditStudentModal(false);
                  setSelectedStudent(null);
                  setEditStudentData({
                    name: "",
                    age: "",
                    gender: "",
                    grade: "",
                    period: "",
                    specialCare: "",
                  });
                }}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveStudentChanges}
                disabled={
                  !editStudentData.name ||
                  !editStudentData.age ||
                  !editStudentData.gender ||
                  !editStudentData.grade ||
                  !editStudentData.period ||
                  !editStudentData.specialCare
                }
                className="flex-1 bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
