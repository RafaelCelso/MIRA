"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function SchoolRegisterPage() {
  const [formData, setFormData] = useState({
    nomeEscola: "",
    cnpj: "",
    cep: "",
    rua: "",
    numero: "",
    semNumero: false,
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    telefoneContato: "",
    email: "",
    nomeResponsavel: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Função para máscara de CNPJ
  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 14) {
      return numbers
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2");
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

  // Handlers com máscaras
  const handleCNPJChange = (value: string) => {
    const formatted = formatCNPJ(value);
    handleInputChange("cnpj", formatted);
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleInputChange("telefoneContato", formatted);
  };

  const handleCEPChange = (value: string) => {
    const formatted = formatCEP(value);
    handleInputChange("cep", formatted);
  };

  const handleNumberChange = (value: string) => {
    const formatted = formatNumbers(value);
    handleInputChange("numero", formatted);
  };

  const handleResponsavelNameChange = (value: string) => {
    const formatted = formatName(value);
    handleInputChange("nomeResponsavel", formatted);
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
            Cadastro de Escola
          </h1>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            {/* Title and Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Crie sua Conta Institucional
              </h2>
              <p className="text-sm text-gray-600">
                Preencha os dados abaixo para cadastrar a instituição de ensino
                na plataforma MIRA.
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Escola*
                  </label>
                  <Input
                    placeholder="Digite o nome da escola"
                    value={formData.nomeEscola}
                    onChange={(e) =>
                      handleInputChange("nomeEscola", e.target.value)
                    }
                    className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CNPJ*
                  </label>
                  <Input
                    placeholder="00.000.000/0000-00"
                    value={formData.cnpj}
                    onChange={(e) => handleCNPJChange(e.target.value)}
                    maxLength={18}
                    className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                  />
                </div>

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
                    placeholder="Nome da rua"
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
                      placeholder="Ex: 123"
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
                          className="mr-2 w-4 h-4 border-2 border-gray-300 rounded checked:bg-yellow-400 checked:border-black focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
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
                      placeholder="Apto, bloco, etc."
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
                      placeholder="Nome da cidade"
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
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone de Contato*
                  </label>
                  <Input
                    placeholder="(00) 00000-0000"
                    value={formData.telefoneContato}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    maxLength={15}
                    className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail*
                  </label>
                  <Input
                    type="email"
                    placeholder="contato@escola.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Responsável*
                  </label>
                  <Input
                    placeholder="Nome completo do responsável"
                    value={formData.nomeResponsavel}
                    onChange={(e) =>
                      handleResponsavelNameChange(e.target.value)
                    }
                    className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#FFDD00] hover:bg-[#E6C700] text-black font-semibold py-3 text-base rounded-lg transition-colors cursor-pointer"
              >
                Cadastrar Instituição
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
