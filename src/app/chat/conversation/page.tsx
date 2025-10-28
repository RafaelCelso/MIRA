"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  MapPin,
  Bus,
  MessageCircle,
  ArrowLeft,
  Send,
  Phone,
  MoreVertical,
  Clock,
  Check,
  CheckCheck,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ConversationPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "parent",
      content: "Boa tarde, Carlos! Como está o trânsito hoje?",
      timestamp: "14:32",
      status: "read",
    },
    {
      id: 2,
      sender: "driver",
      content:
        "Boa tarde! Está tranquilo, sem congestionamentos. Devo chegar no horário normal.",
      timestamp: "14:33",
      status: "delivered",
    },
    {
      id: 3,
      sender: "parent",
      content: "Perfeito! Obrigada pela informação 😊",
      timestamp: "14:34",
      status: "read",
    },
    {
      id: 4,
      sender: "driver",
      content: "Estou chegando na sua rua em aproximadamente 5 minutos.",
      timestamp: "15:42",
      status: "delivered",
    },
    {
      id: 5,
      sender: "parent",
      content: "Já estou indo",
      timestamp: "15:43",
      status: "sent",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "parent",
        content: message,
        timestamp: currentTime,
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getMessageStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-[#FFDD00]" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#FFDD00] px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/chat">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-black/10 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-black" />
              </Button>
            </Link>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 shadow-md">
                <div className="w-full h-full flex items-center justify-center font-bold text-sm text-white">
                  CS
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-black">Carlos Santos</h1>
                <p className="text-xs text-black/70">Motorista • Online</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-black/10 rounded-full"
            >
              <Phone className="w-5 h-5 text-black" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-black/10 rounded-full"
            >
              <MoreVertical className="w-5 h-5 text-black" />
            </Button>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Data Separator */}
        <div className="flex items-center justify-center">
          <div className="bg-gray-200 rounded-full px-3 py-1">
            <span className="text-xs text-gray-600 font-medium">Hoje</span>
          </div>
        </div>

        {/* Messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "parent" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.sender === "parent"
                  ? "bg-[#FFDD00] text-black rounded-br-md"
                  : "bg-white text-gray-900 rounded-bl-md shadow-sm border border-gray-200"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <div
                className={`flex items-center justify-end space-x-1 mt-1 ${
                  msg.sender === "parent" ? "text-black/70" : "text-gray-500"
                }`}
              >
                <span className="text-xs">{msg.timestamp}</span>
                {msg.sender === "parent" && getMessageStatus(msg.status)}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator (opcional) */}
        <div className="flex justify-start">
          <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-200">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Messages */}
      <div className="px-4 py-2 bg-white border-t border-gray-200">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMessage("Já estou indo")}
            className="whitespace-nowrap text-xs px-3 py-1 h-8 bg-[#FFDD00] border-2 border-black text-black hover:bg-[#E6C700] hover:text-black"
          >
            Já estou indo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMessage("Estou descendo")}
            className="whitespace-nowrap text-xs px-3 py-1 h-8 bg-[#FFDD00] border-2 border-black text-black hover:bg-[#E6C700] hover:text-black"
          >
            Estou descendo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMessage("Só um minuto, por favor")}
            className="whitespace-nowrap text-xs px-3 py-1 h-8 bg-[#FFDD00] border-2 border-black text-black hover:bg-[#E6C700] hover:text-black"
          >
            Só um minuto
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMessage("Obrigado!")}
            className="whitespace-nowrap text-xs px-3 py-1 h-8 bg-[#FFDD00] border-2 border-black text-black hover:bg-[#E6C700] hover:text-black"
          >
            Obrigado!
          </Button>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="pr-12 py-3 text-sm border-gray-300 rounded-full focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent resize-none"
              maxLength={500}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-xs text-gray-400">
                {message.length}/500
              </span>
            </div>
          </div>
          <Button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-[#FFDD00] hover:bg-[#E6C700] text-black p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2">
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
              <MessageCircle className="w-5 h-5 text-yellow-500" />
              <span className="text-xs text-yellow-500 font-medium">Chat</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-0.5 p-2"
          >
            <Bus className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Transporte</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-0.5 p-2"
          >
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Perfil</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
