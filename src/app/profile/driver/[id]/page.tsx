"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  Shield,
  Bus,
  Users,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  ArrowLeft,
  School,
  MessageCircle,
  Plus,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DriverProfilePage() {
  const params = useParams();
  const router = useRouter();
  const driverId = params?.id as string;
  const [driver, setDriver] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Dados dos motoristas (simulando API)
  const drivers = [
    {
      id: "1",
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
      schools: ["Colégio São José", "Escola Municipal Vila Madalena"],
      documents: {
        cnh: "válida",
        medicalCertificate: "válido",
        criminalRecord: "válido",
        trainingCertificate: "válido",
      },
    },
    {
      id: "2",
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
      schools: ["Colégio Jardins", "Escola Internacional"],
      documents: {
        cnh: "válida",
        medicalCertificate: "válido",
        criminalRecord: "válido",
        trainingCertificate: "vencido",
      },
    },
    {
      id: "3",
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
      schools: [],
      documents: {
        cnh: "válida",
        medicalCertificate: "vencido",
        criminalRecord: "válido",
        trainingCertificate: "válido",
      },
    },
    {
      id: "4",
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
      schools: ["Colégio Pinheiros"],
      documents: {
        cnh: "vencendo",
        medicalCertificate: "válido",
        criminalRecord: "válido",
        trainingCertificate: "válido",
      },
    },
  ];

  useEffect(() => {
    // Simular busca do motorista por ID
    const foundDriver = drivers.find((d) => d.id === driverId);
    if (foundDriver) {
      setDriver(foundDriver);
    }
    setLoading(false);
  }, [driverId]);

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

  const getStatusColor = (status: string) => {
    return status === "ativo"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const getStatusText = (status: string) => {
    return status === "ativo" ? "Ativo" : "Inativo";
  };

  const getRatingStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "⭐" : "");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFDD00] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Motorista não encontrado
          </h2>
          <p className="text-gray-600 mb-4">
            O motorista solicitado não foi encontrado.
          </p>
          <Button
            onClick={() => router.back()}
            className="bg-[#FFDD00] hover:bg-[#E6C700] text-black cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg mx-auto flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {driver.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {driver.name}
          </h2>
          <Button
            onClick={() => {
              console.log("Adicionar motorista:", driver.id);
            }}
            className="bg-[#FFDD00] hover:bg-[#E6C700] text-black border-2 border-black cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>

        {/* Contact Information */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Informações de Contato
          </h2>
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="font-medium text-gray-900">{driver.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium text-gray-900">{driver.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Professional Information */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Informações Profissionais
          </h2>
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4 space-y-4">
              {driver.vehicle !== "-" && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Bus className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Veículo</p>
                    <p className="font-medium text-gray-900">
                      {driver.vehicle}
                    </p>
                  </div>
                </div>
              )}

              {driver.schools && driver.schools.length > 0 && (
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <School className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">Escolas</p>
                    <div className="flex flex-col gap-1">
                      {driver.schools.map((school: string, index: number) => (
                        <p key={index} className="font-medium text-gray-900">
                          {school}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
    </div>
  );
}
