"use client";

import { Button } from "@/components/ui/button";
import {
  User,
  MapPin,
  Bus,
  MessageCircle,
  Search,
  X,
  Users,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ParentChatPage() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations] = useState([
    {
      id: 1,
      name: "Carlos - Motorista Rota 5",
      lastMessage: "Ok, estou a caminho para...",
      timestamp: "11:32",
      avatar: "CS",
      avatarColor: "from-blue-400 to-blue-600",
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: 2,
      name: "Ana - Mãe do Lucas",
      lastMessage: "Ele já está pronto esperando.",
      timestamp: "10:45",
      avatar: "AL",
      avatarColor: "from-pink-400 to-pink-600",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: 3,
      name: "Escola ABC",
      lastMessage: "Confirmado, obrigado!",
      timestamp: "Ontem",
      avatar: "E",
      avatarColor: "from-green-400 to-green-600",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: 4,
      name: "Motorista João Silva",
      lastMessage: "Certo, estarei lá em 5 minutos.",
      timestamp: "2d atrás",
      avatar: "JS",
      avatarColor: "from-purple-400 to-purple-600",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: 5,
      name: "MIRA Suporte",
      lastMessage: "Sua solicitação #123 foi atualizada.",
      timestamp: "3d atrás",
      avatar: "M",
      avatarColor: "from-gray-400 to-gray-600",
      unreadCount: 0,
      isOnline: false,
    },
  ]);

  // Contatos disponíveis (motoristas dos alunos + ajudantes + escola)
  const [availableContacts] = useState([
    {
      id: 1,
      name: "Carlos Santos",
      role: "Motorista - Rota 5",
      description: "Responsável pelo transporte do João",
      avatar: "CS",
      avatarColor: "from-blue-400 to-blue-600",
      isOnline: true,
      type: "driver",
      hasAssistant: true,
    },
    {
      id: 2,
      name: "Pedro Silva",
      role: "Ajudante",
      description: "Ajudante do Carlos - Rota 5",
      avatar: "PS",
      avatarColor: "from-blue-300 to-blue-500",
      isOnline: true,
      type: "assistant",
      driverId: 1,
    },
    {
      id: 3,
      name: "Ana Costa",
      role: "Motorista - Rota 3",
      description: "Responsável pelo transporte da Maria",
      avatar: "AC",
      avatarColor: "from-green-400 to-green-600",
      isOnline: false,
      type: "driver",
      hasAssistant: true,
    },
    {
      id: 4,
      name: "João Oliveira",
      role: "Ajudante",
      description: "Ajudante da Ana - Rota 3",
      avatar: "JO",
      avatarColor: "from-green-300 to-green-500",
      isOnline: false,
      type: "assistant",
      driverId: 3,
    },
    {
      id: 5,
      name: "Colégio São José",
      role: "Escola",
      description: "Secretaria e coordenação",
      avatar: "CSJ",
      avatarColor: "from-purple-400 to-purple-600",
      isOnline: true,
      type: "school",
    },
    {
      id: 6,
      name: "Escola Municipal Santos",
      role: "Escola",
      description: "Administração escolar",
      avatar: "EMS",
      avatarColor: "from-indigo-400 to-indigo-600",
      isOnline: false,
      type: "school",
    },
  ]);

  const startConversation = (contact: any) => {
    // Aqui seria a lógica para iniciar uma nova conversa
    console.log("Iniciando conversa com:", contact.name);
    setShowContactModal(false);
    // Navegar para a conversa ou criar nova conversa
  };

  // Função para filtrar conversas baseada na busca
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Função para alternar a barra de busca
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      setSearchQuery(""); // Limpar busca ao fechar
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#FFDD00] px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Chat</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSearchBar}
            className="p-2 hover:bg-black/10 rounded-full cursor-pointer"
          >
            <Search className="w-6 h-6 text-black" />
          </Button>
        </div>
      </header>

      {/* Search Bar */}
      {showSearchBar && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar conversas..."
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent"
              autoFocus
            />
            <button
              onClick={() => {
                setSearchQuery("");
                setShowSearchBar(false);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Conversations List */}
      <div className="flex-1 pb-20">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <Link key={conversation.id} href="/chat/conversation">
              <div className="bg-white border-b border-gray-100 px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${conversation.avatarColor} flex items-center justify-center shadow-md`}
                    >
                      <span className="text-white font-bold text-sm">
                        {conversation.avatar}
                      </span>
                    </div>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Conversation Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-semibold text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {conversation.timestamp}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-[#FFDD00] rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-black">
                              {conversation.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Nenhuma conversa encontrada
            </h3>
            <p className="text-sm text-gray-500 text-center">
              {searchQuery
                ? `Não encontramos conversas com "${searchQuery}"`
                : "Você ainda não tem conversas"}
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4">
        <Button
          onClick={() => setShowContactModal(true)}
          className="bg-[#FFDD00] hover:bg-[#E6C700] text-black px-4 py-3 rounded-full shadow-lg border-2 border-black cursor-pointer"
        >
          <span className="text-sm font-semibold">+ Nova Conversa</span>
        </Button>
      </div>

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
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-yellow-500 font-medium">Chat</span>
          </Button>
          <Link href="/transport/parent">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-0.5 p-2 cursor-pointer"
            >
              <Bus className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Transporte</span>
            </Button>
          </Link>
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

      {/* Modal de Seleção de Contatos */}
      {showContactModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-[#FFDD00] px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">Nova Conversa</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContactModal(false)}
                className="p-1 hover:bg-black/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-black" />
              </Button>
            </div>

            {/* Lista de Contatos */}
            <div className="max-h-[60vh] overflow-y-auto">
              {/* Seção Motoristas */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center space-x-2 mb-3">
                  <Bus className="w-4 h-4 text-gray-600" />
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Motoristas
                  </h4>
                </div>

                {availableContacts
                  .filter((contact) => contact.type === "driver")
                  .map((driver) => {
                    const assistants = availableContacts.filter(
                      (contact) =>
                        contact.type === "assistant" &&
                        contact.driverId === driver.id
                    );

                    return (
                      <div key={driver.id} className="mb-6 relative">
                        {/* Linha vertical conectora */}
                        {assistants.length > 0 && (
                          <div className="absolute left-8 top-16 w-0.5 h-8 bg-gray-400 z-0"></div>
                        )}

                        {/* Motorista */}
                        <div
                          onClick={() => startConversation(driver)}
                          className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors relative z-10 bg-white"
                        >
                          {/* Avatar */}
                          <div className="relative">
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-br ${driver.avatarColor} flex items-center justify-center shadow-md`}
                            >
                              <span className="text-white font-bold text-xs">
                                {driver.avatar}
                              </span>
                            </div>
                          </div>

                          {/* Contact Info com tag visual */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h5 className="text-sm font-semibold text-gray-900 truncate">
                                {driver.name}
                              </h5>
                              <span className="px-2 py-0.5 bg-[#FFDD00] text-black text-xs font-bold rounded-full border border-black">
                                Motorista
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 truncate">
                              {driver.id === 1 ? (
                                <>
                                  Responsável pelo transporte do{" "}
                                  <span className="font-semibold text-gray-900">
                                    João
                                  </span>
                                </>
                              ) : driver.id === 3 ? (
                                <>
                                  Responsável pelo transporte da{" "}
                                  <span className="font-semibold text-gray-900">
                                    Maria
                                  </span>
                                </>
                              ) : (
                                driver.description
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Ajudantes com tag visual */}
                        {assistants.map((assistant) => (
                          <div key={assistant.id} className="mt-2 relative">
                            {/* Container do ajudante com identação */}
                            <div
                              onClick={() => startConversation(assistant)}
                              className="flex items-center space-x-3 p-3 ml-6 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors bg-gray-50/30 relative z-10"
                            >
                              {/* Avatar menor para ajudante */}
                              <div className="relative">
                                <div
                                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${assistant.avatarColor} flex items-center justify-center shadow-sm`}
                                >
                                  <span className="text-white font-bold text-xs">
                                    {assistant.avatar}
                                  </span>
                                </div>
                              </div>

                              {/* Contact Info com tag visual */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <h5 className="text-sm font-medium text-gray-800 truncate">
                                    {assistant.name}
                                  </h5>
                                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                    Ajudante
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
              </div>

              {/* Seção Escolas */}
              <div className="px-6 py-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="w-4 h-4 text-gray-600" />
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Escolas
                  </h4>
                </div>

                {availableContacts
                  .filter((contact) => contact.type === "school")
                  .map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => startConversation(contact)}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      {/* Avatar */}
                      <div className="relative">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${contact.avatarColor} flex items-center justify-center shadow-md`}
                        >
                          <span className="text-white font-bold text-xs">
                            {contact.avatar}
                          </span>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-semibold text-gray-900 truncate">
                          {contact.name}
                        </h5>
                        <p className="text-xs text-gray-600 truncate">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Selecione um contato para iniciar uma nova conversa
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

