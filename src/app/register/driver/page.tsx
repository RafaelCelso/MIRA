"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function DriverRegisterPage() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    sexo: "",
    cpf: "",
    cnh: "",
    categoria: "",
    email: "",
    telefone: "",
    cep: "",
    rua: "",
    numero: "",
    semNumero: false,
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    modeloVeiculo: "",
    placa: "",
    anoFabricacao: "",
  });

  const [ajudantes, setAjudantes] = useState<
    Array<{
      nomeCompleto: string;
      telefone: string;
      sexo: string;
    }>
  >([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  // Função para máscara de CNH
  const formatCNH = (value: string) => {
    return value.replace(/\D/g, "");
  };

  // Função para permitir apenas números no ano
  const formatYear = (value: string) => {
    return value.replace(/\D/g, "");
  };

  // Função para máscara de CEP
  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  // Função para permitir apenas números
  const formatNumbers = (value: string) => {
    return value.replace(/\D/g, "");
  };

  // Função para permitir apenas letras, espaços e acentos
  const formatName = (value: string) => {
    return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
  };

  // Função para converter placa para maiúsculas
  const formatPlacaUpperCase = (value: string) => {
    return value.toUpperCase();
  };

  // Handlers com máscaras
  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    handleInputChange("cpf", formatted);
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleInputChange("telefone", formatted);
  };

  const handleCNHChange = (value: string) => {
    const formatted = formatCNH(value);
    handleInputChange("cnh", formatted);
  };

  const handleYearChange = (value: string) => {
    const formatted = formatYear(value);
    handleInputChange("anoFabricacao", formatted);
  };

  const handleCEPChange = (value: string) => {
    const formatted = formatCEP(value);
    handleInputChange("cep", formatted);
  };

  const handleNumberChange = (value: string) => {
    const formatted = formatNumbers(value);
    handleInputChange("numero", formatted);
  };

  const handleNameChange = (value: string) => {
    const formatted = formatName(value);
    handleInputChange("nomeCompleto", formatted);
  };

  const handlePlacaChange = (value: string) => {
    const formatted = formatPlacaUpperCase(value);
    handleInputChange("placa", formatted);
  };

  // Funções para gerenciar ajudantes
  const handleAjudanteChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setAjudantes((prev) =>
      prev.map((ajudante, i) =>
        i === index ? { ...ajudante, [field]: value } : ajudante
      )
    );
  };

  const handleAjudanteNameChange = (index: number, value: string) => {
    const formatted = formatName(value);
    handleAjudanteChange(index, "nomeCompleto", formatted);
  };

  const handleAjudantePhoneChange = (index: number, value: string) => {
    const formatted = formatPhone(value);
    handleAjudanteChange(index, "telefone", formatted);
  };

  const addAjudante = () => {
    setAjudantes((prev) => [
      ...prev,
      {
        nomeCompleto: "",
        telefone: "",
        sexo: "",
      },
    ]);
  };

  const removeAjudante = (index: number) => {
    setAjudantes((prev) => prev.filter((_, i) => i !== index));
  };

  // Função para lidar com o checkbox "Sem número"
  const handleSemNumeroChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      semNumero: checked,
      numero: checked ? "S/N" : "",
    }));
  };

  // Função para buscar endereço pelo CEP
  const buscarCEP = async () => {
    const cep = formData.cep.replace(/\D/g, "");

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
      setFormData((prev) => ({
        ...prev,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar CEP. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 pt-4">
          <Link href="/register" className="mr-4 cursor-pointer">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-medium text-gray-700">
            Cadastro de Motorista
          </h1>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <form className="space-y-6">
              {/* Dados Pessoais Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Dados Pessoais
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo*
                    </label>
                    <Input
                      placeholder="Digite seu nome completo"
                      value={formData.nomeCompleto}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sexo*
                    </label>
                    <select
                      value={formData.sexo}
                      onChange={(e) =>
                        handleInputChange("sexo", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option value="">Selecione</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CPF*
                    </label>
                    <Input
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={(e) => handleCPFChange(e.target.value)}
                      maxLength={14}
                      className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CNH*
                      </label>
                      <Input
                        placeholder="Número da CNH"
                        value={formData.cnh}
                        onChange={(e) => handleCNHChange(e.target.value)}
                        maxLength={11}
                        className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoria
                      </label>
                      <select
                        value={formData.categoria}
                        onChange={(e) =>
                          handleInputChange("categoria", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      >
                        <option value="">Ex: B, C, D</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail*
                    </label>
                    <Input
                      type="email"
                      placeholder="seumail@exemplo.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone*
                    </label>
                    <Input
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      maxLength={15}
                      className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Seu Endereço Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Seu Endereço
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CEP*
                      </label>
                      <Input
                        placeholder="00000-000"
                        value={formData.cep}
                        onChange={(e) => handleCEPChange(e.target.value)}
                        maxLength={9}
                        className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rua*
                    </label>
                    <Input
                      placeholder="Nome da sua rua"
                      value={formData.rua}
                      onChange={(e) => handleInputChange("rua", e.target.value)}
                      className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número*
                      </label>
                      <Input
                        placeholder="123"
                        value={formData.numero}
                        onChange={(e) => handleNumberChange(e.target.value)}
                        disabled={formData.semNumero}
                        className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                      />
                      <div className="mt-2">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.semNumero}
                            onChange={(e) =>
                              handleSemNumeroChange(e.target.checked)
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
                      <Input
                        placeholder="Apto, Bloco"
                        value={formData.complemento}
                        onChange={(e) =>
                          handleInputChange("complemento", e.target.value)
                        }
                        className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bairro*
                    </label>
                    <Input
                      placeholder="Nome do bairro"
                      value={formData.bairro}
                      onChange={(e) =>
                        handleInputChange("bairro", e.target.value)
                      }
                      className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade*
                      </label>
                      <Input
                        placeholder="Sua cidade"
                        value={formData.cidade}
                        onChange={(e) =>
                          handleInputChange("cidade", e.target.value)
                        }
                        className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado*
                      </label>
                      <select
                        value={formData.estado}
                        onChange={(e) =>
                          handleInputChange("estado", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      >
                        <option value="">UF</option>
                        <option value="SP">SP</option>
                        <option value="RJ">RJ</option>
                        <option value="MG">MG</option>
                        <option value="RS">RS</option>
                        <option value="PR">PR</option>
                        <option value="SC">SC</option>
                        <option value="BA">BA</option>
                        <option value="GO">GO</option>
                        <option value="PE">PE</option>
                        <option value="CE">CE</option>
                        <option value="PA">PA</option>
                        <option value="MA">MA</option>
                        <option value="PB">PB</option>
                        <option value="ES">ES</option>
                        <option value="PI">PI</option>
                        <option value="AL">AL</option>
                        <option value="RN">RN</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="DF">DF</option>
                        <option value="SE">SE</option>
                        <option value="AM">AM</option>
                        <option value="RO">RO</option>
                        <option value="AC">AC</option>
                        <option value="AP">AP</option>
                        <option value="RR">RR</option>
                        <option value="TO">TO</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações do Veículo Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Informações do Veículo
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Modelo do Veículo*
                    </label>
                    <Input
                      placeholder="Ex: Fiat Ducato"
                      value={formData.modeloVeiculo}
                      onChange={(e) =>
                        handleInputChange("modeloVeiculo", e.target.value)
                      }
                      className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Placa*
                      </label>
                      <Input
                        placeholder="ABC-1234"
                        value={formData.placa}
                        onChange={(e) => handlePlacaChange(e.target.value)}
                        maxLength={8}
                        className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ano de Fabricação*
                      </label>
                      <Input
                        placeholder="Ex: 2023"
                        value={formData.anoFabricacao}
                        onChange={(e) => handleYearChange(e.target.value)}
                        maxLength={4}
                        className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seção de Ajudantes */}
              {ajudantes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Ajudantes
                  </h3>

                  {ajudantes.map((ajudante, index) => (
                    <div
                      key={index}
                      className="space-y-4 p-4 border border-gray-200 rounded-lg mb-4"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-md font-medium text-gray-800">
                          Ajudante {index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAjudante(index)}
                          className="text-red-600 border-red-300 hover:bg-red-50 cursor-pointer"
                        >
                          Remover
                        </Button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Completo*
                        </label>
                        <Input
                          placeholder="Nome completo do ajudante"
                          value={ajudante.nomeCompleto}
                          onChange={(e) =>
                            handleAjudanteNameChange(index, e.target.value)
                          }
                          className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                        />
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefone*
                          </label>
                          <Input
                            placeholder="(00) 00000-0000"
                            value={ajudante.telefone}
                            onChange={(e) =>
                              handleAjudantePhoneChange(index, e.target.value)
                            }
                            maxLength={15}
                            className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sexo*
                          </label>
                          <select
                            value={ajudante.sexo}
                            onChange={(e) =>
                              handleAjudanteChange(
                                index,
                                "sexo",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          >
                            <option value="">Selecione</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Botão Adicionar Ajudante */}
              <Button
                type="button"
                variant="outline"
                onClick={addAjudante}
                className="w-full h-12 border-2 border-dashed border-[#FFDD00] text-gray-600 hover:bg-[#FFDD00]/10 cursor-pointer flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar ajudante
              </Button>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold py-3 text-base rounded-lg transition-colors cursor-pointer"
              >
                Cadastrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
