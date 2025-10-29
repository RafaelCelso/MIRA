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

  // Estados para edição de perfil
  const [profileData, setProfileData] = useState({
    name: "Ana Paula Silva",
    email: "ana.paula@email.com",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - Centro",
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
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Ana Paula Silva
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            Mãe de João e Maria Silva
          </p>
          <p className="text-gray-500 text-xs">Membro desde Janeiro 2024</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">2</div>
              <div className="text-xs text-blue-700">Filhos</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">98%</div>
              <div className="text-xs text-green-700">Presença</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">45</div>
              <div className="text-xs text-yellow-700">Mensagens</div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Information */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Informações Pessoais
            </h2>
            <Button
              onClick={() => setShowEditModal(true)}
              variant="outline"
              size="sm"
              className="border-[#FFDD00] text-black hover:bg-[#FFDD00]/10"
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
                    {profileData.emergencyContact}
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
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
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
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contato de Emergência
                </label>
                <input
                  type="text"
                  value={profileData.emergencyContact}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      emergencyContact: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
                />
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
