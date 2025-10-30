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
} from "lucide-react";
import { useState, useEffect } from "react";

export default function SchoolProfile() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  // Estados para edição de perfil
  const [profileData, setProfileData] = useState({
    name: "Colégio São José",
    cnpj: "12.345.678/0001-90",
    email: "contato@colegiosanjose.edu.br",
    phone: "(11) 3456-7890",
    address: "Av. Brigadeiro Faria Lima, 456 - Itaim Bibi",
    city: "São Paulo",
    state: "SP",
    cep: "01452-000",
    totalStudents: 1247,
    totalRoutes: 12,
    totalDrivers: 15,
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

  const handleSaveProfile = () => {
    console.log("Salvando perfil:", profileData);
    setShowEditModal(false);
  };

  const handleChangePassword = () => {
    // Resetar erros
    setPasswordErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Validação básica
    if (!passwordData.currentPassword) {
      setPasswordErrors((prev) => ({
        ...prev,
        currentPassword: "Campo obrigatório",
      }));
      return;
    }

    if (!passwordData.newPassword) {
      setPasswordErrors((prev) => ({
        ...prev,
        newPassword: "Campo obrigatório",
      }));
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordErrors((prev) => ({
        ...prev,
        newPassword: "A senha deve ter pelo menos 8 caracteres",
      }));
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrors((prev) => ({
        ...prev,
        confirmPassword: "As senhas não coincidem",
      }));
      return;
    }

    // Aqui seria a integração com a API para alterar a senha
    console.log("Alterando senha...");
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    alert("Senha alterada com sucesso!");
  };

  const handleLogout = () => {
    console.log("Fazendo logout...");
    // Aqui seria a integração com a API de logout
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-10 transition-shadow duration-300 ${
          isScrolled ? "shadow-md bg-white" : "bg-[#FFDD00]"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-md">
              <School className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-black">Perfil da Escola</h1>
              <p className="text-xs text-black/70">Configurações e informações</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 p-4 space-y-6">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg mx-auto flex items-center justify-center">
              <School className="w-12 h-12 text-white" />
            </div>
            <Button
              size="sm"
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#FFDD00] hover:bg-[#E6C700] text-black border-2 border-white shadow-lg p-0"
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
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">CNPJ</p>
                  <p className="font-medium text-gray-900">{profileData.cnpj}</p>
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
                  <p className="text-sm text-gray-500">
                    {profileData.city} - {profileData.state}
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
            <Settings className="w-5 h-5 text-yellow-500" />
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
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
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
                  value={profileData.cnpj}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
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
                  type="text"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      phone: formatPhone(e.target.value),
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CEP
                </label>
                <input
                  type="text"
                  value={profileData.cep}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      cep: formatCEP(e.target.value),
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData({ ...profileData, address: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) =>
                      setProfileData({ ...profileData, city: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <input
                    type="text"
                    value={profileData.state}
                    onChange={(e) =>
                      setProfileData({ ...profileData, state: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                  />
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between">
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
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha Atual
                </label>
                <input
                  type={showPasswordFields ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
                {passwordErrors.currentPassword && (
                  <p className="text-sm text-red-600 mt-1">
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
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
                {passwordErrors.newPassword && (
                  <p className="text-sm text-red-600 mt-1">
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
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={showPasswordFields}
                  onChange={(e) => setShowPasswordFields(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Mostrar senhas</label>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleChangePassword}
                className="bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold cursor-pointer"
              >
                Alterar Senha
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-red-500 px-6 py-4">
              <h3 className="text-lg font-bold text-white">Confirmar Logout</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-center mb-4">
                Tem certeza que deseja sair da sua conta?
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setShowLogoutConfirm(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

