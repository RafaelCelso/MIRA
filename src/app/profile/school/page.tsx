"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  School,
  Users,
  Bus,
  MessageCircle,
  Settings,
  Phone,
  Mail,
  Edit,
  Shield,
  HelpCircle,
  LogOut,
  Camera,
  MapPin,
  Building,
  X,
  CheckCircle,
  Save,
  Eye,
  EyeOff,
  Check,
  User,
} from "lucide-react";
import { useState } from "react";

export default function SchoolProfile() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Estados para edição de perfil
  const [profileData, setProfileData] = useState({
    name: "Colégio São José",
    cnpj: "12.345.678/0001-90",
    email: "contato@colegiosanjose.edu.br",
    phone: "(11) 3456-7890",
    nomeResponsavel: "João Silva",
    cep: "01452-000",
    rua: "Av. Brigadeiro Faria Lima",
    numero: "456",
    semNumero: false,
    complemento: "",
    bairro: "Itaim Bibi",
    city: "São Paulo",
    state: "SP",
    totalStudents: 1247,
    totalRoutes: 12,
    totalDrivers: 15,
  });

  // Estado temporário para edição no modal
  const [tempProfileData, setTempProfileData] = useState(profileData);

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

  const handleSaveProfile = () => {
    // Só atualiza quando clicar em salvar
    setProfileData(tempProfileData);
    setShowEditModal(false);
    setShowSuccessModal(true);
  };

  const handleOpenEditModal = () => {
    // Ao abrir o modal, copia os dados atuais para o estado temporário
    setTempProfileData(profileData);
    setShowEditModal(true);
  };

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

  const handleChangePassword = () => {
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
    console.log("Fazendo logout...");
    // Aqui seria a integração com a API de logout
    window.location.href = "/login";
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 14) {
      return numbers
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
    return value;
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  // Função para permitir apenas números
  const formatNumbers = (value: string) => {
    return value.replace(/\D/g, "");
  };

  // Função para lidar com o checkbox "Sem número"
  const handleSemNumeroChange = (checked: boolean) => {
    setTempProfileData({
      ...tempProfileData,
      semNumero: checked,
      numero: checked ? "S/N" : "",
    });
  };

  // Função para buscar endereço pelo CEP
  const buscarCEP = async () => {
    const cep = tempProfileData.cep.replace(/\D/g, "");

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
      setTempProfileData({
        ...tempProfileData,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        city: data.localidade || "",
        state: data.uf || "",
      });
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar CEP. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg mx-auto flex items-center justify-center">
              <School className="w-12 h-12 text-white" />
            </div>
            <Button
              size="sm"
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#FFDD00] hover:bg-[#E6C700] text-black border-2 border-white shadow-lg p-0 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {profileData.name}
          </h2>
          <span className="px-3 py-1 bg-[#FFDD00] text-black text-sm font-bold rounded-full border border-black">
            Escola
          </span>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-700 border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {profileData.totalStudents}
              </p>
              <p className="text-xs text-blue-100">Alunos</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-700 border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Bus className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {profileData.totalRoutes}
              </p>
              <p className="text-xs text-purple-100">Rotas</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-700 border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {profileData.totalDrivers}
              </p>
              <p className="text-xs text-green-100">Motoristas</p>
            </CardContent>
          </Card>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Informações da Escola
            </h2>
            <Button
              onClick={handleOpenEditModal}
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
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Nome da Escola</p>
                  <p className="font-medium text-gray-900">
                    {profileData.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Nome do Responsável</p>
                  <p className="font-medium text-gray-900">
                    {profileData.nomeResponsavel}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">CNPJ</p>
                  <p className="font-medium text-gray-900">
                    {profileData.cnpj}
                  </p>
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
                  <p className="text-sm text-gray-500">Telefone de Contato</p>
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
                    {profileData.rua}, {profileData.numero}
                    {profileData.complemento && ` - ${profileData.complemento}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {profileData.bairro} - {profileData.city}/
                    {profileData.state}
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
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
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
              {/* Formulário de edição */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Escola
                </label>
                <input
                  type="text"
                  value={tempProfileData.name}
                  onChange={(e) =>
                    setTempProfileData({
                      ...tempProfileData,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Responsável
                </label>
                <input
                  type="text"
                  value={tempProfileData.nomeResponsavel}
                  onChange={(e) =>
                    setTempProfileData({
                      ...tempProfileData,
                      nomeResponsavel: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNPJ
                </label>
                <input
                  type="text"
                  value={tempProfileData.cnpj}
                  onChange={(e) =>
                    setTempProfileData({
                      ...tempProfileData,
                      cnpj: formatCNPJ(e.target.value),
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={tempProfileData.email}
                  onChange={(e) =>
                    setTempProfileData({
                      ...tempProfileData,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone de Contato
                </label>
                <input
                  type="text"
                  value={tempProfileData.phone}
                  onChange={(e) =>
                    setTempProfileData({
                      ...tempProfileData,
                      phone: formatPhone(e.target.value),
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    value={tempProfileData.cep}
                    onChange={(e) =>
                      setTempProfileData({
                        ...tempProfileData,
                        cep: formatCEP(e.target.value),
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rua
                </label>
                <input
                  type="text"
                  value={tempProfileData.rua}
                  onChange={(e) =>
                    setTempProfileData({
                      ...tempProfileData,
                      rua: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número
                  </label>
                  <input
                    type="text"
                    value={tempProfileData.numero}
                    onChange={(e) =>
                      setTempProfileData({
                        ...tempProfileData,
                        numero: formatNumbers(e.target.value),
                      })
                    }
                    disabled={tempProfileData.semNumero}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  />
                  <div className="mt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempProfileData.semNumero}
                        onChange={(e) =>
                          handleSemNumeroChange(e.target.checked)
                        }
                        className="mr-2 w-4 h-4 border-2 border-gray-300 rounded checked:bg-[#FFDD00] checked:border-black focus:ring-2 focus:ring-[#FFDD00] focus:ring-opacity-50"
                      />
                      <span className="text-sm text-gray-700">Sem número</span>
                    </label>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={tempProfileData.complemento}
                    onChange={(e) =>
                      setTempProfileData({
                        ...tempProfileData,
                        complemento: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro
                </label>
                <input
                  type="text"
                  value={tempProfileData.bairro}
                  onChange={(e) =>
                    setTempProfileData({
                      ...tempProfileData,
                      bairro: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={tempProfileData.city}
                    onChange={(e) =>
                      setTempProfileData({
                        ...tempProfileData,
                        city: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    value={tempProfileData.state}
                    onChange={(e) =>
                      setTempProfileData({
                        ...tempProfileData,
                        state: e.target.value,
                      })
                    }
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent cursor-pointer"
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
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveProfile}
                className="bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold cursor-pointer"
              >
                Salvar Alterações
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
                onClick={handleChangePassword}
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

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#FFDD00] px-6 py-4">
              <h3 className="text-lg font-bold text-black">
                Informações Atualizadas
              </h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <p className="text-gray-700 text-center text-lg font-medium">
                  Suas informações foram atualizadas com sucesso!
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-center border-t border-gray-200">
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold cursor-pointer"
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
