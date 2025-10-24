"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  QrCode,
  ScanLine,
  CheckCircle,
  Users,
  Car,
  Bus,
  GraduationCap,
  Shield,
  Smartphone,
  MapPin,
  MessageCircle,
  Lock,
  BarChart3,
  Zap,
  Star,
  Calendar,
  MessageSquare,
  LogIn,
} from "lucide-react";

// Componente para animação das palavras
function AnimatedWord() {
  const words = ["Seguro", "Tranquilo", "Confiável", "Rastreável"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 300); // Duração da animação
    }, 2000); // Muda a cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="bg-yellow-400 text-black px-2 pt-2 pb-3 rounded-lg inline-block relative text-4xl md:text-5xl lg:text-6xl font-bold">
      <span
        className={`block transition-all duration-300 ease-in-out ${
          isAnimating
            ? "blur-sm transform translate-y-full opacity-0"
            : "blur-0 transform translate-y-0 opacity-100"
        }`}
      >
        {words[currentWordIndex]}
      </span>
    </span>
  );
}

// Componente FAQ Item
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <span className="font-semibold text-slate-900 dark:text-slate-100 pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50"
            : "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <a href="#" className="cursor-pointer">
                <Image
                  src="/images/Logo MIRA.webp"
                  alt="MIRA Logo"
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#recursos"
                className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors text-sm font-medium cursor-pointer"
              >
                Recursos
              </a>
              <a
                href="#como-funciona"
                className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors text-sm font-medium cursor-pointer"
              >
                Como Funciona
              </a>
              <a
                href="#beneficios"
                className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors text-sm font-medium cursor-pointer"
              >
                Benefícios
              </a>
              <a
                href="#faq"
                className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors text-sm font-medium cursor-pointer"
              >
                FAQ
              </a>
              <a
                href="#contato"
                className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors text-sm font-medium cursor-pointer"
              >
                Contato
              </a>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-full text-sm cursor-pointer">
                Começar Agora
              </Button>
              <Button
                variant="outline"
                className="font-medium px-6 py-2 rounded-full text-sm cursor-pointer"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col space-y-4 pt-4">
                <a
                  href="#recursos"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors text-sm font-medium cursor-pointer"
                >
                  Recursos
                </a>
                <a
                  href="#como-funciona"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors text-sm font-medium cursor-pointer"
                >
                  Como Funciona
                </a>
                <a
                  href="#beneficios"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors text-sm font-medium cursor-pointer"
                >
                  Benefícios
                </a>
                <a
                  href="#faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors text-sm font-medium cursor-pointer"
                >
                  FAQ
                </a>
                <a
                  href="#contato"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors text-sm font-medium cursor-pointer"
                >
                  Contato
                </a>
                <div className="flex flex-col space-y-2 pt-2">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-full text-sm cursor-pointer w-full">
                    Começar Agora
                  </Button>
                  <Button
                    variant="outline"
                    className="font-medium px-6 py-2 rounded-full text-sm cursor-pointer w-full"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                Transporte escolar <br></br> mais <AnimatedWord />
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                Ofereça mais segurança e tranquilidade aos pais com
                monitoramento em tempo real, QR Codes individuais e comunicação
                automática via WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-3 rounded-full cursor-pointer"
              >
                Implementar na Escola →
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 rounded-full font-medium cursor-pointer"
                asChild
              >
                <a href="#contato">
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Demonstração
                </a>
              </Button>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  200+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Escolas Atendidas
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  15k+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Alunos Monitorados
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  100%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Satisfação dos Pais
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/MIRA Hero.webp"
                alt="MIRA - Transporte Escolar Seguro"
                width={800}
                height={450}
                className="w-full h-auto object-cover aspect-[16/9]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="recursos" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
            Recursos que garantem{" "}
            <span className="bg-yellow-400 text-black px-2 py-1 rounded-lg inline-block">
              segurança
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tecnologia avançada para monitoramento completo do transporte
            escolar
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* QR Code Individual */}
            <div className="text-center">
              <div className="mb-6 mx-auto w-64 h-40">
                <Image
                  src="/images/QR Code.webp"
                  alt="QR Code Individual"
                  width={256}
                  height={160}
                  className="w-64 h-40 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                QR Code Individual
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Cada aluno possui um código único para embarque e desembarque
                seguro
              </p>
            </div>

            {/* Rastreamento em Tempo Real */}
            <div className="text-center">
              <div className="mb-6 mx-auto w-64 h-40">
                <Image
                  src="/images/Mapa.webp"
                  alt="Rastreamento em Tempo Real"
                  width={256}
                  height={160}
                  className="w-64 h-40 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Rastreamento em Tempo Real
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Acompanhe a localização do veículo e o trajeto em tempo real
              </p>
            </div>

            {/* Notificações WhatsApp */}
            <div className="text-center">
              <div className="mb-6 mx-auto w-64 h-40">
                <Image
                  src="/images/Notificação.webp"
                  alt="Notificações WhatsApp"
                  width={256}
                  height={160}
                  className="w-64 h-40 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Notificações WhatsApp
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Receba alertas automáticos sobre embarque, desembarque e
                proximidade
              </p>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Histórico Completo */}
            <div className="text-center">
              <div className="mb-6 mx-auto w-64 h-40">
                <Image
                  src="/images/Histórico Completo.webp"
                  alt="Histórico Completo"
                  width={256}
                  height={160}
                  className="w-64 h-40 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Histórico Completo
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Acesse o histórico de todas as viagens e horários dos alunos
              </p>
            </div>

            {/* Alertas de Proximidade */}
            <div className="text-center">
              <div className="mb-6 mx-auto w-64 h-40">
                <Image
                  src="/images/Alerta de Proximidade.webp"
                  alt="Alertas de Proximidade"
                  width={256}
                  height={160}
                  className="w-64 h-40 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Alertas de Proximidade
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Seja notificado quando o transporte estiver chegando ao destino
              </p>
            </div>

            {/* Segurança Total */}
            <div className="text-center">
              <div className="mb-6 mx-auto w-64 h-40">
                <Image
                  src="/images/Segurança.webp"
                  alt="Segurança Total"
                  width={256}
                  height={160}
                  className="w-64 h-40 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Segurança Total
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Sistema robusto com backup automático de todos os dados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="como-funciona"
        className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-800"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
            Como funciona o{" "}
            <span className="bg-yellow-400 text-black px-2 py-1 rounded-lg inline-block">
              MIRA
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Sistema intuitivo e fácil de usar em apenas 4 passos
          </p>
        </div>

        {/* Video Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <video className="w-full h-auto" autoPlay loop muted playsInline>
              <source src="/media/Como Funciona.webm" type="video/webm" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 - Apresenta QR Code no Embarque */}
            <div className="text-center relative">
              <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 relative">
                <QrCode className="w-8 h-8 text-black" />
                <div className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  01
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Apresentar QR Code
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Aluno apresenta o QR Code no embarque
              </p>
            </div>

            {/* Step 2 - Motorista Escaneia Embarque */}
            <div className="text-center relative">
              <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 relative">
                <ScanLine className="w-8 h-8 text-black" />
                <div className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  02
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Confirmar Embarque
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Motorista escaneia o QR Code, confirmando o embarque do aluno
              </p>
            </div>

            {/* Step 3 - Apresenta QR Code no Desembarque */}
            <div className="text-center relative">
              <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 relative">
                <QrCode className="w-8 h-8 text-black" />
                <div className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  03
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                QR Code no Destino
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Ao desembarcar, o aluno apresenta o QR Code
              </p>
            </div>

            {/* Step 4 - Motorista Escaneia Desembarque */}
            <div className="text-center relative">
              <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 relative">
                <CheckCircle className="w-8 h-8 text-black" />
                <div className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  04
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Confirmar Desembarque
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Motorista escaneia o QR Code, confirmando o desembarque do aluno
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
            Por que as escolas escolhem o{" "}
            <span className="bg-yellow-400 text-black px-2 py-1 rounded-lg inline-block">
              MIRA
            </span>
            ?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Recursos desenvolvidos especificamente para atender as necessidades
            das instituições de ensino
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle className="text-xl">Controle de Acesso</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                QR Codes individuais garantem que apenas alunos autorizados da
                sua escola utilizem o transporte.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">
                Monitoramento em Tempo Real
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Ofereça tranquilidade aos pais com rastreamento por GPS e
                atualizações constantes do trajeto.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Comunicação Automática</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Mantenha os pais informados automaticamente via WhatsApp,
                reduzindo ligações para a escola.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Segurança Garantida</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Proteja seus alunos com controle rigoroso de embarque e
                desembarque, garantindo máxima segurança no transporte.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Gestão Inteligente</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Relatórios completos para otimizar rotas, controlar custos e
                melhorar a eficiência.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle className="text-xl">Implementação Simples</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Sistema fácil de implementar na sua escola, com treinamento
                completo da equipe.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits for Everyone Section */}
      <section
        id="beneficios"
        className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-800"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
            Benefícios para{" "}
            <span className="bg-yellow-400 text-black px-2 py-1 rounded-lg inline-block">
              todos
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Uma solução completa que atende pais, motoristas e escolas
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Para Pais */}
            <Card className="border-2 border-dashed border-gray-400 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-xl">Para Pais</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-2">
                  <li>✓ Acompanhamento em tempo real</li>
                  <li>✓ Notificações personalizadas</li>
                  <li>✓ Histórico completo de viagens</li>
                  <li>✓ Tranquilidade no dia a dia</li>
                </ul>
              </CardContent>
            </Card>

            {/* Para Motoristas */}
            <Card className="border-2 border-dashed border-gray-400 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Bus className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-xl">Para Motoristas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-2">
                  <li>✓ Gestão simplificada de rotas</li>
                  <li>✓ Registro automático de embarques</li>
                  <li>✓ Comunicação direta com pais</li>
                  <li>✓ Controle de horários</li>
                </ul>
              </CardContent>
            </Card>

            {/* Para Escolas */}
            <Card className="border-2 border-dashed border-gray-400 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-xl">Para Escolas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-2">
                  <li>✓ Controle total do transporte</li>
                  <li>✓ Relatórios detalhados</li>
                  <li>✓ Maior segurança dos alunos</li>
                  <li>✓ Gestão eficiente</li>
                </ul>
              </CardContent>
            </Card>

            {/* Para Todos */}
            <Card className="border-2 border-dashed border-gray-400 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-xl">Para Todos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-2">
                  <li>✓ Interface intuitiva</li>
                  <li>✓ Suporte dedicado</li>
                  <li>✓ Atualizações constantes</li>
                  <li>✓ Dados protegidos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Mais de 200 famílias e instituições confiam no MIRA para garantir a
            segurança no transporte escolar
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Testimonial 1 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  "Finalmente consegui acompanhar meu filho no ônibus escolar.
                  Agora tenho paz de espírito sabendo exatamente quando ele
                  chegou na escola."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    AS
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                      Ana Paula Santos
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      Mãe de aluno
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  "Implementamos o MIRA e a satisfação dos pais aumentou
                  drasticamente. O sistema é intuitivo e os relatórios nos
                  ajudam muito."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    CL
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                      Carlos Bouzada Lima
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      Diretor Escolar
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  "A tranquilidade que o MIRA me trouxe é incrível. Posso focar
                  no trabalho sabendo que minha filha está segura."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    JC
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                      Júlia Costa
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      Mãe de aluna
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 4 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  "O sistema do QR Code facilitou muito meu trabalho. Agora o
                  controle é automático e os pais ficam mais tranquilos."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    RA
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                      Roberto Arruda
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      Motorista de van escolar
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-12 text-black">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para revolucionar o transporte da sua escola?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a mais de 200 escolas que já transformaram seu transporte
              escolar com o MIRA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-100 cursor-pointer"
              >
                Implementar Agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-black text-black hover:bg-black hover:text-white cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Falar com Consultor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contato"
        className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-800"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
              Entre em{" "}
              <span className="bg-yellow-400 text-black px-2 py-1 rounded-lg inline-block">
                Contato
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Pronto para transformar o transporte escolar da sua instituição?
              Entre em contato conosco e descubra como o MIRA pode ajudar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Solicite uma Demonstração
                </CardTitle>
                <CardDescription>
                  Preencha o formulário e nossa equipe entrará em contato em até
                  24 horas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      Nome *
                    </label>
                    <Input placeholder="Seu nome completo" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      Cargo
                    </label>
                    <Input placeholder="Diretor, Coordenador, etc." />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Nome da Escola *
                  </label>
                  <Input placeholder="Nome da sua instituição" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      E-mail *
                    </label>
                    <Input type="email" placeholder="seu@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      Telefone *
                    </label>
                    <Input placeholder="(11) 99999-9999" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Número de Alunos
                  </label>
                  <Input placeholder="Quantos alunos utilizam transporte escolar?" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Mensagem
                  </label>
                  <Input placeholder="Conte-nos mais sobre suas necessidades..." />
                </div>

                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 cursor-pointer">
                  Solicitar Demonstração
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Fale Conosco Diretamente
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          WhatsApp
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          (11) 99999-9999
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          E-mail
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          contato@mira.com.br
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Por que escolher o MIRA?
                  </h3>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Implementação rápida e fácil</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Suporte técnico especializado</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Treinamento completo da equipe</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Garantia de satisfação</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
              Perguntas{" "}
              <span className="bg-yellow-400 text-black px-2 py-1 rounded-lg inline-block">
                Frequentes
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Tire suas dúvidas sobre o MIRA e descubra como nossa solução pode
              transformar o transporte escolar da sua instituição.
            </p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="Como funciona o sistema de QR Code do MIRA?"
              answer="Cada aluno recebe um QR Code único que deve ser apresentado no embarque e desembarque. O motorista escaneia o código com o aplicativo, registrando automaticamente a presença do aluno e enviando notificações em tempo real para os pais via WhatsApp."
              isOpen={openFAQ === 0}
              onToggle={() => setOpenFAQ(openFAQ === 0 ? null : 0)}
            />

            <FAQItem
              question="Quanto tempo leva para implementar o MIRA na nossa escola?"
              answer="A implementação é rápida e simples. Em média, leva de 1 a 3 dias úteis para configurar o sistema, cadastrar os alunos e treinar a equipe. Nosso time de suporte acompanha todo o processo para garantir uma transição suave."
              isOpen={openFAQ === 1}
              onToggle={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
            />

            <FAQItem
              question="Os pais precisam instalar algum aplicativo?"
              answer="Não! Os pais recebem todas as notificações diretamente pelo WhatsApp, sem necessidade de instalar aplicativos adicionais. Isso torna o sistema mais acessível e fácil de usar para todas as famílias."
              isOpen={openFAQ === 2}
              onToggle={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
            />

            <FAQItem
              question="O sistema funciona sem internet?"
              answer="O MIRA funciona online para garantir notificações em tempo real. Porém, em caso de instabilidade na conexão, o sistema armazena os dados localmente e sincroniza automaticamente quando a internet é restabelecida."
              isOpen={openFAQ === 3}
              onToggle={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
            />

            <FAQItem
              question="Qual o custo do MIRA para nossa escola?"
              answer="O investimento varia conforme o número de alunos e funcionalidades desejadas. Oferecemos planos flexíveis e personalizados para cada instituição. Entre em contato conosco para receber uma proposta adequada às suas necessidades."
              isOpen={openFAQ === 4}
              onToggle={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
            />

            <FAQItem
              question="Como garantimos a segurança dos dados dos alunos?"
              answer="A segurança é nossa prioridade. Utilizamos criptografia de ponta a ponta, servidores seguros e seguimos rigorosamente a LGPD. Todos os dados são protegidos e apenas pessoas autorizadas têm acesso às informações dos alunos."
              isOpen={openFAQ === 5}
              onToggle={() => setOpenFAQ(openFAQ === 5 ? null : 5)}
            />

            <FAQItem
              question="O que acontece se um aluno esquecer o QR Code?"
              answer="O motorista pode registrar manualmente a presença do aluno através do aplicativo, buscando pelo nome na lista. O sistema também permite que os pais tenham acesso ao QR Code pelo WhatsApp a qualquer momento."
              isOpen={openFAQ === 6}
              onToggle={() => setOpenFAQ(openFAQ === 6 ? null : 6)}
            />

            <FAQItem
              question="Oferecemos suporte técnico e treinamento?"
              answer="Sim! Oferecemos treinamento completo para toda a equipe, suporte técnico especializado e acompanhamento contínuo. Nossa equipe está sempre disponível para esclarecer dúvidas e garantir o melhor uso do sistema."
              isOpen={openFAQ === 7}
              onToggle={() => setOpenFAQ(openFAQ === 7 ? null : 7)}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contato"
        className="border-t border-slate-200 dark:border-slate-800"
      >
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <a
                href="#"
                className="flex items-center space-x-3 cursor-pointer"
              >
                <Image
                  src="/images/Logo MIRA.webp"
                  alt="MIRA Logo"
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    MIRA
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Monitoramento Infantil em Rota Assistida
                  </span>
                </div>
              </a>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors cursor-pointer"
                >
                  Privacidade
                </a>
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors cursor-pointer"
                >
                  Termos
                </a>
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors cursor-pointer"
                >
                  Suporte
                </a>
              </div>

              <Separator
                orientation="vertical"
                className="hidden md:block h-6"
              />

              <p className="text-slate-600 dark:text-slate-400 text-sm">
                © 2025 MIRA. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
