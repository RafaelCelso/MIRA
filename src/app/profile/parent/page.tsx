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
  Bell,
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
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ParentProfile() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  // Dados dos alunos cadastrados
  const students = [
    {
      id: 1,
      name: "João Silva",
      grade: "8º ano - Turma A",
      school: "Colégio São José",
      avatarColor: "from-blue-400 to-blue-600",
    },
    {
      id: 2,
      name: "Maria Silva",
      grade: "5º ano - Turma B",
      school: "Escola Municipal Santos",
      avatarColor: "from-green-400 to-green-600",
    },
  ];

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

  // Estados para configurações de notificação
  const [notifications, setNotifications] = useState({
    busLocation: true,
    arrival: true,
    departure: true,
    delays: true,
    emergencies: true,
    messages: true,
    weeklyReport: false,
  });

  // Estados para alteração de senha
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    // Aqui seria a integração com a API para alterar a senha
    console.log("Alterando senha");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordModal(false);
  };

  const handleSaveNotifications = () => {
    // Aqui seria a integração com a API para salvar as configurações
    console.log("Salvando configurações:", notifications);
    setShowNotificationSettings(false);
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
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
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
            {/* Notificações */}
            <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <Button
                  onClick={() => setShowNotificationSettings(true)}
                  variant="ghost"
                  className="w-full p-4 justify-start hover:bg-gray-50"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">Notificações</p>
                    <p className="text-sm text-gray-500">
                      Gerencie suas preferências de notificação
                    </p>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Segurança */}
            <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <Button
                  onClick={() => setShowPasswordModal(true)}
                  variant="ghost"
                  className="w-full p-4 justify-start hover:bg-gray-50"
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
                  className="w-full p-4 justify-start hover:bg-gray-50"
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
                  className="w-full p-4 justify-start hover:bg-red-50 text-red-600"
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
                MIRA - Transporte Escolar
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
              className="flex flex-col items-center space-y-0.5 p-2"
            >
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Início</span>
            </Button>
          </Link>
          <Link href="/chat">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2"
            >
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Chat</span>
            </Button>
          </Link>
          <Link href="/transport/parent">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2"
            >
              <Bus className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Transporte</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-0.5 p-2"
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
                className="p-1 hover:bg-black/10 rounded-full"
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
                <h4 className="text-md font-semibold text-gray-800 mb-3">
                  Contato de Emergência
                </h4>

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
                      Relação*
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
                      <option value="">Selecione a relação</option>
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
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveProfile}
                className="flex-1 bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Configurações de Notificação */}
      {showNotificationSettings && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNotificationSettings(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-blue-500 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Notificações</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotificationSettings(false)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5 text-white" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {/* Localização do Ônibus */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Localização do Ônibus
                    </p>
                    <p className="text-sm text-gray-500">
                      Atualizações em tempo real
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        busLocation: !notifications.busLocation,
                      })
                    }
                    className={`w-12 h-6 rounded-full p-0 ${
                      notifications.busLocation ? "bg-[#FFDD00]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                        notifications.busLocation
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </Button>
                </div>

                {/* Chegada na Escola */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Chegada na Escola
                    </p>
                    <p className="text-sm text-gray-500">
                      Quando o aluno chegar
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        arrival: !notifications.arrival,
                      })
                    }
                    className={`w-12 h-6 rounded-full p-0 ${
                      notifications.arrival ? "bg-[#FFDD00]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                        notifications.arrival
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </Button>
                </div>

                {/* Saída da Escola */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Saída da Escola</p>
                    <p className="text-sm text-gray-500">
                      Quando o ônibus sair
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        departure: !notifications.departure,
                      })
                    }
                    className={`w-12 h-6 rounded-full p-0 ${
                      notifications.departure ? "bg-[#FFDD00]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                        notifications.departure
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </Button>
                </div>

                {/* Atrasos */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Atrasos</p>
                    <p className="text-sm text-gray-500">
                      Notificações de trânsito
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        delays: !notifications.delays,
                      })
                    }
                    className={`w-12 h-6 rounded-full p-0 ${
                      notifications.delays ? "bg-[#FFDD00]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                        notifications.delays ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </Button>
                </div>

                {/* Emergências */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Emergências</p>
                    <p className="text-sm text-gray-500">Alertas importantes</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        emergencies: !notifications.emergencies,
                      })
                    }
                    className={`w-12 h-6 rounded-full p-0 ${
                      notifications.emergencies ? "bg-[#FFDD00]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                        notifications.emergencies
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </Button>
                </div>

                {/* Mensagens */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Mensagens</p>
                    <p className="text-sm text-gray-500">Chat com motorista</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        messages: !notifications.messages,
                      })
                    }
                    className={`w-12 h-6 rounded-full p-0 ${
                      notifications.messages ? "bg-[#FFDD00]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                        notifications.messages
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </Button>
                </div>

                {/* Relatório Semanal */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Relatório Semanal
                    </p>
                    <p className="text-sm text-gray-500">Resumo da semana</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        weeklyReport: !notifications.weeklyReport,
                      })
                    }
                    className={`w-12 h-6 rounded-full p-0 ${
                      notifications.weeklyReport
                        ? "bg-[#FFDD00]"
                        : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                        notifications.weeklyReport
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <Button
                onClick={handleSaveNotifications}
                className="w-full bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold py-3"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Configurações
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-green-500 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Alterar Senha</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPasswordModal(false)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5 text-white" />
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
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova Senha
                </label>
                <input
                  type={showPasswordFields ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Digite a nova senha"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type={showPasswordFields ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Confirme a nova senha"
                />
              </div>

              {/* Requisitos da senha */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-2">
                  A senha deve conter:
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Pelo menos 8 caracteres</li>
                  <li>• Uma letra maiúscula</li>
                  <li>• Uma letra minúscula</li>
                  <li>• Um número</li>
                </ul>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
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
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold disabled:opacity-50"
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
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleLogout}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold"
                >
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
