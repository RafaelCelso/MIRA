"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  User,
  MapPin,
  Bus,
  MessageCircle,
  Clock,
  Navigation,
  Phone,
  AlertCircle,
  CheckCircle,
  Users,
  QrCode,
  HelpCircle,
  X,
  Check,
  Calendar,
  ArrowRight,
  Home,
  School,
  Filter,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TransportParentPage() {
  const router = useRouter();
  const [selectedChild, setSelectedChild] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<"ida" | "volta">("ida");
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedHelpOption, setSelectedHelpOption] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });
  const [loadedDays, setLoadedDays] = useState(3); // Começar com 3 dias
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  // Dados dos filhos e suas rotas
  const [children] = useState([
    {
      id: 1,
      name: "João Silva",
      fullName: "João Silva",
      grade: "8º ano - Turma A",
      school: "Colégio São José",
      studentAddress: "Rua das Flores, 123 - Vila Madalena",
      schoolAddress: "Av. Brigadeiro Faria Lima, 456 - Itaim Bibi",
      route: "Rota 5",
      status: "em_transporte", // em_casa, aguardando, em_transporte, na_escola
      currentLocation: "Av. Paulista, 1000",
      estimatedTime: "8 min",
      busNumber: "MIRA-05",
      avatarColor: "from-blue-400 to-blue-600",
      schedule: {
        pickup: "07:15",
        dropoff: "17:30",
      },
      transport: {
        ida: {
          driver: "Carlos Santos",
          driverPhone: "(11) 99999-1234",
          assistant: "Pedro Silva",
          assistantPhone: "(11) 99999-1235",
        },
        volta: {
          driver: "Carlos Santos",
          driverPhone: "(11) 99999-1234",
          assistant: "Pedro Silva",
          assistantPhone: "(11) 99999-1235",
        },
      },
    },
    {
      id: 2,
      name: "Maria Silva",
      fullName: "Maria Silva",
      grade: "5º ano - Turma B",
      school: "Escola Municipal Santos",
      studentAddress: "Rua dos Jardins, 789 - Jardins",
      schoolAddress: "Rua Augusta, 321 - Consolação",
      route: "Rota 3",
      status: "na_escola",
      currentLocation: "Escola Municipal Santos",
      estimatedTime: "Na escola",
      busNumber: "MIRA-03",
      avatarColor: "from-green-400 to-green-600",
      schedule: {
        pickup: "07:30",
        dropoff: "17:45",
      },
      transport: {
        ida: {
          driver: "Ana Costa",
          driverPhone: "(11) 99999-5678",
          assistant: "João Oliveira",
          assistantPhone: "(11) 99999-5679",
        },
        volta: {
          driver: "Roberto Silva",
          driverPhone: "(11) 99999-5680",
          assistant: "Maria Santos",
          assistantPhone: "(11) 99999-5681",
        },
      },
    },
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "em_casa":
        return {
          icon: <User className="w-4 h-4" />,
          text: "Em casa",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
        };
      case "aguardando":
        return {
          icon: <Clock className="w-4 h-4" />,
          text: "Aguardando",
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
        };
      case "em_transporte":
        return {
          icon: <Bus className="w-4 h-4" />,
          text: "Em transporte",
          color: "text-blue-600",
          bgColor: "bg-blue-100",
        };
      case "na_escola":
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: "Na escola",
          color: "text-green-600",
          bgColor: "bg-green-100",
        };
      default:
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          text: "Status desconhecido",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
        };
    }
  };

  // Função para abrir chat com contato específico
  const openChatWithContact = (
    contactName: string,
    contactPhone: string,
    contactType: string
  ) => {
    // Criar um objeto com os dados do contato para passar para a página de chat
    const contactData = {
      name: contactName,
      phone: contactPhone,
      type: contactType,
      childName: currentChild.name,
      route: currentChild.route,
      busNumber: currentChild.busNumber,
    };

    // Navegar para a página de conversação com os dados do contato
    // Usando query parameters para passar os dados
    const queryParams = new URLSearchParams({
      contactName: contactData.name,
      contactPhone: contactData.phone,
      contactType: contactData.type,
      childName: contactData.childName,
      route: contactData.route,
      busNumber: contactData.busNumber,
    });

    router.push(`/chat/conversation?${queryParams.toString()}`);
  };

  const currentChild = children[selectedChild];
  const statusInfo = getStatusInfo(currentChild.status);

  const handleHelpOption = (option: string) => {
    setSelectedHelpOption(option);
    setShowHelpModal(false);
    setShowConfirmationModal(true);
  };

  // Função para obter datas formatadas
  const getFormattedDate = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  // Função para gerar opções de meses
  const getMonthOptions = () => {
    const months = [];
    const now = new Date();

    for (let i = 0; i < 6; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const label = date.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      });
      months.push({
        value,
        label: label.charAt(0).toUpperCase() + label.slice(1),
      });
    }

    return months;
  };

  // Função para gerar dados de histórico
  const generateTripHistory = (totalDays: number) => {
    const history = [];

    for (let i = 0; i < totalDays; i++) {
      let dayName;
      if (i === 0) dayName = "Hoje";
      else if (i === 1) dayName = "Ontem";
      else if (i === 2) dayName = "Anteontem";
      else dayName = `${i + 1} dias atrás`;

      const trips = [];

      // Sempre adicionar viagem de ida
      trips.push({
        type: "ida",
        startTime: "07:15",
        endTime: `07:${35 + Math.floor(Math.random() * 20)}`, // Variação no tempo
        status: i === 0 && Math.random() > 0.5 ? "completed" : "completed",
        pickup: "Casa",
        dropoff: "Escola",
      });

      // Adicionar viagem de volta (às vezes pode não ter)
      if (Math.random() > 0.1) {
        // 90% de chance de ter volta
        trips.push({
          type: "volta",
          startTime: "17:30",
          endTime: `17:${45 + Math.floor(Math.random() * 20)}`, // Variação no tempo
          status: i === 0 && Math.random() > 0.7 ? "scheduled" : "completed",
          pickup: "Escola",
          dropoff: "Casa",
        });
      }

      history.push({
        date: dayName,
        formattedDate: getFormattedDate(i),
        trips: trips,
      });
    }

    return history;
  };

  // Dados do histórico de viagens
  const allTripHistory = generateTripHistory(30); // Gerar 30 dias de histórico

  // Função para filtrar viagens
  const getFilteredHistory = () => {
    // Simular dados diferentes para meses diferentes
    let baseData = allTripHistory;

    // Se não for o mês atual, simular dados reduzidos
    const currentMonth = `${new Date().getFullYear()}-${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}`;
    if (selectedMonth !== currentMonth) {
      // Para meses anteriores, mostrar apenas dados simulados reduzidos
      baseData = [
        {
          date: "Início do mês",
          formattedDate: "01/" + selectedMonth.split("-")[1],
          trips: [
            {
              type: "ida",
              startTime: "07:15",
              endTime: "07:40",
              status: "completed",
              pickup: "Casa",
              dropoff: "Escola",
            },
            {
              type: "volta",
              startTime: "17:30",
              endTime: "17:55",
              status: "completed",
              pickup: "Escola",
              dropoff: "Casa",
            },
          ],
        },
        {
          date: "Meio do mês",
          formattedDate: "15/" + selectedMonth.split("-")[1],
          trips: [
            {
              type: "ida",
              startTime: "07:15",
              endTime: "07:45",
              status: "completed",
              pickup: "Casa",
              dropoff: "Escola",
            },
          ],
        },
      ];
    } else {
      // Para o mês atual, limitar aos dias carregados
      baseData = allTripHistory.slice(0, loadedDays);
    }

    // Aplicar filtro de tipo de viagem
    if (selectedFilter !== "todos") {
      baseData = baseData
        .map((day) => ({
          ...day,
          trips: day.trips.filter((trip) => trip.type === selectedFilter),
        }))
        .filter((day) => day.trips.length > 0);
    }

    return baseData;
  };

  const tripHistory = getFilteredHistory();

  // Função para carregar mais dados
  const loadMoreData = () => {
    if (isLoading || !hasMoreData) return;

    setIsLoading(true);

    // Simular delay de carregamento
    setTimeout(() => {
      const newLoadedDays = loadedDays + 5; // Carregar mais 5 dias

      if (newLoadedDays >= 30) {
        setHasMoreData(false); // Não há mais dados para carregar
      }

      setLoadedDays(newLoadedDays);
      setIsLoading(false);
    }, 1000);
  };

  // Detectar scroll para carregar mais dados
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Carregar mais quando estiver próximo do final (200px antes)
      if (scrollTop + windowHeight >= documentHeight - 200) {
        loadMoreData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadedDays, isLoading, hasMoreData]);

  // Reset quando mudar filtros
  useEffect(() => {
    setLoadedDays(3);
    setHasMoreData(true);
  }, [selectedFilter, selectedMonth]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#FFDD00] px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Transporte</h1>
        </div>
      </header>

      {/* Student Cards */}
      {children.length > 1 && (
        <div className="p-4">
          <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-2 relative">
            {children.map((child, index) => (
              <Card
                key={child.id}
                className={`min-w-[240px] shadow-lg border-2 hover:shadow-xl transition-all duration-300 cursor-pointer relative ${
                  selectedChild === index
                    ? "bg-gradient-to-br from-[#FFDD00] to-[#E6C700] border-black scale-105 z-10"
                    : "bg-gradient-to-br from-white to-gray-50 border-gray-300 hover:scale-105 z-0"
                }`}
                onClick={() => setSelectedChild(index)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0 ${
                        selectedChild === index
                          ? "bg-gradient-to-br from-white to-gray-100 text-[#E6C700]"
                          : `bg-gradient-to-br ${child.avatarColor} text-white`
                      }`}
                    >
                      {child.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-base font-bold truncate ${
                          selectedChild === index
                            ? "text-black"
                            : "text-gray-900"
                        }`}
                      >
                        {child.fullName}
                      </h3>
                      <p
                        className={`text-sm truncate ${
                          selectedChild === index
                            ? "text-black"
                            : "text-gray-600"
                        }`}
                      >
                        {child.grade}
                      </p>
                      <p
                        className={`text-xs truncate ${
                          selectedChild === index
                            ? "text-black"
                            : "text-gray-500"
                        }`}
                      >
                        {child.school}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* QR Code Section */}
      <div className="px-4 pb-4">
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#FFDD00] border border-black rounded flex items-center justify-center">
                  <QrCode className="w-4 h-4 text-black" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700">
                  QR Code do Aluno
                </h3>
              </div>
              <Button
                onClick={() => setShowHelpModal(true)}
                variant="outline"
                size="sm"
                className="bg-transparent hover:bg-gray-100 text-gray-600 border-gray-400 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 mr-1" />
                Ajuda
              </Button>
            </div>

            <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6">
              {/* QR Code realista */}
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
                  <rect x="14" y="0" width="7" height="7" fill="black" />
                  <rect x="15" y="1" width="5" height="5" fill="white" />
                  <rect x="16" y="2" width="3" height="3" fill="black" />

                  {/* Canto inferior esquerdo (7x7) */}
                  <rect x="0" y="14" width="7" height="7" fill="black" />
                  <rect x="1" y="15" width="5" height="5" fill="white" />
                  <rect x="2" y="16" width="3" height="3" fill="black" />

                  {/* Separadores brancos */}
                  <rect x="7" y="0" width="1" height="9" fill="white" />
                  <rect x="0" y="7" width="9" height="1" fill="white" />
                  <rect x="13" y="0" width="1" height="9" fill="white" />
                  <rect x="14" y="7" width="7" height="1" fill="white" />
                  <rect x="7" y="13" width="1" height="8" fill="white" />
                  <rect x="0" y="13" width="9" height="1" fill="white" />

                  {/* Linhas de timing */}
                  <rect x="8" y="6" width="1" height="1" fill="black" />
                  <rect x="10" y="6" width="1" height="1" fill="black" />
                  <rect x="12" y="6" width="1" height="1" fill="black" />
                  <rect x="6" y="8" width="1" height="1" fill="black" />
                  <rect x="6" y="10" width="1" height="1" fill="black" />
                  <rect x="6" y="12" width="1" height="1" fill="black" />

                  {/* Padrão de alinhamento central */}
                  <rect x="16" y="16" width="5" height="5" fill="black" />
                  <rect x="17" y="17" width="3" height="3" fill="white" />
                  <rect x="18" y="18" width="1" height="1" fill="black" />

                  {/* Dados simulados - padrão realista */}
                  <rect x="9" y="0" width="1" height="1" fill="black" />
                  <rect x="11" y="0" width="1" height="1" fill="black" />
                  <rect x="9" y="1" width="1" height="1" fill="black" />
                  <rect x="10" y="2" width="1" height="1" fill="black" />
                  <rect x="12" y="2" width="1" height="1" fill="black" />
                  <rect x="8" y="3" width="1" height="1" fill="black" />
                  <rect x="10" y="3" width="1" height="1" fill="black" />
                  <rect x="12" y="3" width="1" height="1" fill="black" />
                  <rect x="9" y="4" width="1" height="1" fill="black" />
                  <rect x="11" y="4" width="1" height="1" fill="black" />
                  <rect x="8" y="5" width="1" height="1" fill="black" />
                  <rect x="10" y="5" width="1" height="1" fill="black" />
                  <rect x="12" y="5" width="1" height="1" fill="black" />

                  <rect x="0" y="9" width="1" height="1" fill="black" />
                  <rect x="2" y="9" width="1" height="1" fill="black" />
                  <rect x="4" y="9" width="1" height="1" fill="black" />
                  <rect x="1" y="10" width="1" height="1" fill="black" />
                  <rect x="3" y="10" width="1" height="1" fill="black" />
                  <rect x="5" y="10" width="1" height="1" fill="black" />
                  <rect x="0" y="11" width="1" height="1" fill="black" />
                  <rect x="2" y="11" width="1" height="1" fill="black" />
                  <rect x="4" y="11" width="1" height="1" fill="black" />
                  <rect x="1" y="12" width="1" height="1" fill="black" />
                  <rect x="3" y="12" width="1" height="1" fill="black" />
                  <rect x="5" y="12" width="1" height="1" fill="black" />

                  <rect x="8" y="9" width="1" height="1" fill="black" />
                  <rect x="10" y="9" width="1" height="1" fill="black" />
                  <rect x="12" y="9" width="1" height="1" fill="black" />
                  <rect x="14" y="9" width="1" height="1" fill="black" />
                  <rect x="16" y="9" width="1" height="1" fill="black" />
                  <rect x="18" y="9" width="1" height="1" fill="black" />
                  <rect x="20" y="9" width="1" height="1" fill="black" />

                  <rect x="9" y="10" width="1" height="1" fill="black" />
                  <rect x="11" y="10" width="1" height="1" fill="black" />
                  <rect x="13" y="10" width="1" height="1" fill="black" />
                  <rect x="15" y="10" width="1" height="1" fill="black" />
                  <rect x="19" y="10" width="1" height="1" fill="black" />

                  <rect x="8" y="11" width="1" height="1" fill="black" />
                  <rect x="10" y="11" width="1" height="1" fill="black" />
                  <rect x="12" y="11" width="1" height="1" fill="black" />
                  <rect x="14" y="11" width="1" height="1" fill="black" />
                  <rect x="20" y="11" width="1" height="1" fill="black" />

                  <rect x="9" y="12" width="1" height="1" fill="black" />
                  <rect x="11" y="12" width="1" height="1" fill="black" />
                  <rect x="13" y="12" width="1" height="1" fill="black" />
                  <rect x="15" y="12" width="1" height="1" fill="black" />
                  <rect x="19" y="12" width="1" height="1" fill="black" />

                  <rect x="8" y="14" width="1" height="1" fill="black" />
                  <rect x="10" y="14" width="1" height="1" fill="black" />
                  <rect x="12" y="14" width="1" height="1" fill="black" />
                  <rect x="14" y="14" width="1" height="1" fill="black" />
                  <rect x="9" y="15" width="1" height="1" fill="black" />
                  <rect x="11" y="15" width="1" height="1" fill="black" />
                  <rect x="13" y="15" width="1" height="1" fill="black" />
                  <rect x="15" y="15" width="1" height="1" fill="black" />

                  <rect x="8" y="17" width="1" height="1" fill="black" />
                  <rect x="10" y="17" width="1" height="1" fill="black" />
                  <rect x="12" y="17" width="1" height="1" fill="black" />
                  <rect x="14" y="17" width="1" height="1" fill="black" />
                  <rect x="9" y="18" width="1" height="1" fill="black" />
                  <rect x="11" y="18" width="1" height="1" fill="black" />
                  <rect x="13" y="18" width="1" height="1" fill="black" />
                  <rect x="15" y="18" width="1" height="1" fill="black" />

                  <rect x="8" y="19" width="1" height="1" fill="black" />
                  <rect x="10" y="19" width="1" height="1" fill="black" />
                  <rect x="12" y="19" width="1" height="1" fill="black" />
                  <rect x="14" y="19" width="1" height="1" fill="black" />
                  <rect x="9" y="20" width="1" height="1" fill="black" />
                  <rect x="11" y="20" width="1" height="1" fill="black" />
                  <rect x="13" y="20" width="1" height="1" fill="black" />
                  <rect x="15" y="20" width="1" height="1" fill="black" />
                </svg>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-600 mb-2">
                Apresente este QR Code para o motorista
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span>ID: {currentChild.id.toString().padStart(4, "0")}</span>
                <span>•</span>
                <span>Rota: {currentChild.route}</span>
                <span>•</span>
                <span>Ônibus: {currentChild.busNumber}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Card */}
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {/* Student Address */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Endereço do aluno
              </span>
            </div>
            <p className="text-base text-gray-900">
              {currentChild.studentAddress}
            </p>
          </div>

          {/* Route Info */}
          <div className="space-y-4 mb-4">
            {/* School Info */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Escola</p>
              <p className="text-sm font-medium text-gray-900 mb-2">
                {currentChild.school}
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className="w-3 h-3 text-gray-500" />
                  <span className="text-xs font-medium text-gray-600">
                    Endereço da escola
                  </span>
                </div>
                <p className="text-sm text-gray-800">
                  {currentChild.schoolAddress}
                </p>
              </div>
            </div>

            {/* Route Info */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Rota</p>
              <p className="text-sm font-medium text-gray-900">
                {currentChild.route}
              </p>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4 mb-6">
            <p className="text-sm text-gray-500">Horários</p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setSelectedPeriod("ida")}
                variant="ghost"
                className={`h-auto p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  selectedPeriod === "ida"
                    ? "bg-[#FFDD00] border-black text-black hover:bg-[#E6C700]"
                    : "bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100"
                }`}
              >
                <div className="w-full">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock
                      className={`w-4 h-4 ${
                        selectedPeriod === "ida"
                          ? "text-black"
                          : "text-gray-600"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        selectedPeriod === "ida"
                          ? "text-black"
                          : "text-gray-700"
                      }`}
                    >
                      IDA
                    </span>
                  </div>
                  <p
                    className={`text-xl font-bold ${
                      selectedPeriod === "ida" ? "text-black" : "text-gray-900"
                    }`}
                  >
                    {currentChild.schedule.pickup}
                  </p>
                </div>
              </Button>
              <Button
                onClick={() => setSelectedPeriod("volta")}
                variant="ghost"
                className={`h-auto p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  selectedPeriod === "volta"
                    ? "bg-[#FFDD00] border-black text-black hover:bg-[#E6C700]"
                    : "bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100"
                }`}
              >
                <div className="w-full">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock
                      className={`w-4 h-4 ${
                        selectedPeriod === "volta"
                          ? "text-black"
                          : "text-gray-600"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        selectedPeriod === "volta"
                          ? "text-black"
                          : "text-gray-700"
                      }`}
                    >
                      VOLTA
                    </span>
                  </div>
                  <p
                    className={`text-xl font-bold ${
                      selectedPeriod === "volta"
                        ? "text-black"
                        : "text-gray-900"
                    }`}
                  >
                    {currentChild.schedule.dropoff}
                  </p>
                </div>
              </Button>
            </div>
          </div>

          {/* Driver Info */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-[#FFDD00] border border-black rounded flex items-center justify-center">
                <Bus className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-sm font-semibold text-gray-700">
                Equipe de Transporte - {selectedPeriod.toUpperCase()}
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {currentChild.transport[selectedPeriod].driver}
                      </p>
                      <span className="px-2 py-0.5 bg-[#FFDD00] text-black text-xs font-bold rounded-full border border-black">
                        Motorista
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {currentChild.transport[selectedPeriod].driverPhone}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    openChatWithContact(
                      currentChild.transport[selectedPeriod].driver,
                      currentChild.transport[selectedPeriod].driverPhone,
                      "Motorista"
                    )
                  }
                  className="bg-[#FFDD00] hover:bg-[#E6C700] text-black border-black cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {currentChild.transport[selectedPeriod].assistant}
                      </p>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        Ajudante
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {currentChild.transport[selectedPeriod].assistantPhone}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    openChatWithContact(
                      currentChild.transport[selectedPeriod].assistant,
                      currentChild.transport[selectedPeriod].assistantPhone,
                      "Ajudante"
                    )
                  }
                  className="bg-[#FFDD00] hover:bg-[#E6C700] text-black border-black cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip History */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <div className="mb-4">
            {/* Título da seção */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-[#FFDD00] border border-black rounded flex items-center justify-center">
                <Calendar className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-sm font-semibold text-gray-700">
                Histórico de Viagens
              </h3>
            </div>

            {/* Filtros */}
            <div className="flex items-center space-x-2">
              {/* Filtro de mês */}
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-xs font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent cursor-pointer"
                >
                  {getMonthOptions().map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
              </div>

              {/* Filtro de período */}
              <div className="relative">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-xs font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent cursor-pointer"
                >
                  <option value="todos">Todas</option>
                  <option value="ida">Apenas IDA</option>
                  <option value="volta">Apenas VOLTA</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {tripHistory.map((day, dayIndex) => (
              <div key={dayIndex} className="relative">
                {/* Data */}
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {day.date} - {day.formattedDate}
                  </span>
                </div>

                {/* Viagens do dia */}
                <div className="space-y-3 ml-4">
                  {day.trips.map((trip, tripIndex) => (
                    <div key={tripIndex} className="relative">
                      {/* Linha da timeline */}
                      {!(
                        dayIndex === tripHistory.length - 1 &&
                        tripIndex === day.trips.length - 1
                      ) && (
                        <div className="absolute left-1.5 top-8 w-0.5 h-12 bg-gray-200"></div>
                      )}

                      <div className="flex items-center space-x-3">
                        {/* Ícone da viagem */}
                        <div className="w-3 h-3 rounded-full bg-[#FFDD00] border border-black shadow-sm z-0"></div>

                        {/* Detalhes da viagem */}
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  trip.type === "ida"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {trip.type.toUpperCase()}
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  trip.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : trip.status === "scheduled"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {trip.status === "completed"
                                  ? "Concluída"
                                  : trip.status === "scheduled"
                                  ? "Agendada"
                                  : "Cancelada"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">
                                {trip.pickup}
                              </span>
                              <ArrowRight className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">
                                {trip.dropoff}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>
                                {trip.startTime} - {trip.endTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Indicador de carregamento */}
          {isLoading && (
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-[#FFDD00] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-500">
                  Carregando mais viagens...
                </span>
              </div>
            </div>
          )}

          {!hasMoreData && !isLoading && (
            <div className="mt-4 text-center">
              <span className="text-xs text-gray-400">Fim do histórico</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
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
          <Link href="/chat/parent">
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
            <Bus className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-yellow-500 font-medium">
              Transporte
            </span>
          </Button>
          <Link href="/profile/parent">
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

      {/* Modal de Ajuda QR Code */}
      {showHelpModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowHelpModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-bold text-black">
                Ajuda com QR Code
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHelpModal(false)}
                className="p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-black" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6">
                Selecione o tipo de problema que você está enfrentando com o QR
                Code:
              </p>

              <div className="space-y-3">
                {/* Alterar QR Code */}
                <Button
                  onClick={() => handleHelpOption("Alterar QR Code")}
                  variant="outline"
                  className="w-full justify-start text-left p-4 h-auto border-gray-200 hover:bg-[#FFDD00] hover:border-black transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Alterar QR Code
                      </p>
                      <p className="text-xs text-gray-500">
                        Solicitar um novo QR Code
                      </p>
                    </div>
                  </div>
                </Button>

                {/* Perdi o QR Code */}
                <Button
                  onClick={() => handleHelpOption("Perdi o QR Code")}
                  variant="outline"
                  className="w-full justify-start text-left p-4 h-auto border-gray-200 hover:bg-[#FFDD00] hover:border-black transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Perdi o QR Code
                      </p>
                      <p className="text-xs text-gray-500">
                        Não consigo encontrar o QR Code
                      </p>
                    </div>
                  </div>
                </Button>

                {/* QR Danificado */}
                <Button
                  onClick={() => handleHelpOption("QR Danificado")}
                  variant="outline"
                  className="w-full justify-start text-left p-4 h-auto border-gray-200 hover:bg-[#FFDD00] hover:border-black transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <X className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">QR Danificado</p>
                      <p className="text-xs text-gray-500">
                        O QR Code está danificado ou ilegível
                      </p>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-2xl">
              <p className="text-xs text-gray-500 text-center">
                Sua solicitação será enviada para a direção da escola
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      {showConfirmationModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowConfirmationModal(false);
            setSelectedHelpOption("");
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Conteúdo do Modal de Confirmação */}
            <div className="p-6 text-center">
              {/* Ícone de Sucesso */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>

              {/* Título */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Solicitação Enviada!
              </h3>

              {/* Mensagem */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600 mb-1">
                  Problema reportado:
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {selectedHelpOption}
                </p>
              </div>

              {/* Informação */}
              <div className="bg-blue-50 rounded-lg p-3 mb-6">
                <p className="text-sm text-blue-800 font-medium mb-1">
                  Direção da escola notificada
                </p>
                <p className="text-xs text-blue-700">
                  A escola entrará em contato em breve para resolver sua
                  solicitação
                </p>
              </div>

              {/* Botão OK */}
              <Button
                onClick={() => {
                  setShowConfirmationModal(false);
                  setSelectedHelpOption("");
                }}
                className="w-full bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold py-3 rounded-lg transition-all duration-200 cursor-pointer"
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
