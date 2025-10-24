"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ParentRegisterPage() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    responsabilidade: "",
    sexo: "",
    cpf: "",
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
  });

  const [alunos, setAlunos] = useState([
    {
      nomeAluno: "",
      idade: "",
      sexoAluno: "",
      turma: "",
      periodo: "",
      cuidadosEspeciais: "",
    },
  ]);

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
  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    handleInputChange("cpf", formatted);
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleInputChange("telefone", formatted);
  };

  const handleCEPChange = (value: string) => {
    const formatted = formatCEP(value);
    handleInputChange("cep", formatted);
  };

  const handleNumberChange = (value: string) => {
    const formatted = formatNumbers(value);
    handleInputChange("numero", formatted);
  };

  // Função para lidar com o checkbox "Sem número"
  const handleSemNumeroChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      semNumero: checked,
      numero: checked ? "S/N" : "",
    }));
  };

  const handleAgeChange = (index: number, value: string) => {
    const formatted = formatNumbers(value);
    handleAlunoChange(index, "idade", formatted);
  };

  // Handlers para campos de nome
  const handleNameChange = (value: string) => {
    const formatted = formatName(value);
    handleInputChange("nomeCompleto", formatted);
  };

  const handleAlunoNameChange = (index: number, value: string) => {
    const formatted = formatName(value);
    handleAlunoChange(index, "nomeAluno", formatted);
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

  // Função para atualizar dados de um aluno específico
  const handleAlunoChange = (index: number, field: string, value: string) => {
    setAlunos((prev) =>
      prev.map((aluno, i) =>
        i === index ? { ...aluno, [field]: value } : aluno
      )
    );
  };

  // Função para adicionar um novo aluno
  const addAluno = () => {
    setAlunos((prev) => [
      ...prev,
      {
        nomeAluno: "",
        idade: "",
        sexoAluno: "",
        turma: "",
        periodo: "",
        cuidadosEspeciais: "",
      },
    ]);
  };

  // Função para remover um aluno
  const removeAluno = (index: number) => {
    if (alunos.length > 1) {
      setAlunos((prev) => prev.filter((_, i) => i !== index));
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
            Cadastro de Responsável
          </h1>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            {/* Title and Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Crie sua conta
              </h2>
              <p className="text-sm text-gray-600">
                Preencha os campos abaixo para acompanhar o transporte escolar
                do aluno com segurança.
              </p>
            </div>

            <form className="space-y-6">
              {/* Seus Dados Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Seus Dados
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
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Responsabilidade*
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="responsabilidade"
                          value="pai"
                          checked={formData.responsabilidade === "pai"}
                          onChange={(e) =>
                            handleInputChange(
                              "responsabilidade",
                              e.target.value
                            )
                          }
                          className="mr-2 text-yellow-400 focus:ring-yellow-400"
                        />
                        <span className="text-sm text-gray-700">Pai</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="responsabilidade"
                          value="mae"
                          checked={formData.responsabilidade === "mae"}
                          onChange={(e) =>
                            handleInputChange(
                              "responsabilidade",
                              e.target.value
                            )
                          }
                          className="mr-2 text-yellow-400 focus:ring-yellow-400"
                        />
                        <span className="text-sm text-gray-700">Mãe</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="responsabilidade"
                          value="responsavel"
                          checked={formData.responsabilidade === "responsavel"}
                          onChange={(e) =>
                            handleInputChange(
                              "responsabilidade",
                              e.target.value
                            )
                          }
                          className="mr-2 text-yellow-400 focus:ring-yellow-400"
                        />
                        <span className="text-sm text-gray-700">
                          Responsável
                        </span>
                      </label>
                    </div>
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
                      className="w-full"
                    />
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
                      className="w-full"
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
                      className="w-full"
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
                        className="w-full"
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
                      className="w-full"
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
                        className="w-full"
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
                        placeholder="Apto, Bloco"
                        value={formData.complemento}
                        onChange={(e) =>
                          handleInputChange("complemento", e.target.value)
                        }
                        className="w-full"
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
                      className="w-full"
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
                        className="w-full"
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
                </div>
              </div>

              {/* Dados dos Alunos Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Dados dos Alunos
                </h3>

                {alunos.map((aluno, index) => (
                  <div
                    key={index}
                    className="space-y-4 p-4 border border-gray-200 rounded-lg mb-4"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium text-gray-800">
                        Aluno {index + 1}
                      </h4>
                      {alunos.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAluno(index)}
                          className="text-red-600 border-red-300 hover:bg-red-50 cursor-pointer"
                        >
                          Remover
                        </Button>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo do Aluno*
                      </label>
                      <Input
                        placeholder="Nome completo do aluno"
                        value={aluno.nomeAluno}
                        onChange={(e) =>
                          handleAlunoNameChange(index, e.target.value)
                        }
                        className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                      />
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Idade*
                        </label>
                        <Input
                          placeholder="Ex: 8"
                          value={aluno.idade}
                          onChange={(e) =>
                            handleAgeChange(index, e.target.value)
                          }
                          maxLength={2}
                          className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sexo*
                        </label>
                        <select
                          value={aluno.sexoAluno}
                          onChange={(e) =>
                            handleAlunoChange(
                              index,
                              "sexoAluno",
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

                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Turma*
                        </label>
                        <Input
                          placeholder="Ex: 1º Ano A, 2º Ano B"
                          value={aluno.turma}
                          onChange={(e) =>
                            handleAlunoChange(index, "turma", e.target.value)
                          }
                          className="w-full border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Período*
                        </label>
                        <select
                          value={aluno.periodo}
                          onChange={(e) =>
                            handleAlunoChange(index, "periodo", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        >
                          <option value="">Selecione o período</option>
                          <option value="manha">Manhã</option>
                          <option value="tarde">Tarde</option>
                          <option value="integral">Integral</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cuidados especiais*
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={`cuidadosEspeciais-${index}`}
                            value="sim"
                            checked={aluno.cuidadosEspeciais === "sim"}
                            onChange={(e) =>
                              handleAlunoChange(
                                index,
                                "cuidadosEspeciais",
                                e.target.value
                              )
                            }
                            className="mr-2 w-4 h-4 border-2 border-gray-300 checked:border-black checked:bg-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                          />
                          <span className="text-sm text-gray-700">Sim</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={`cuidadosEspeciais-${index}`}
                            value="nao"
                            checked={aluno.cuidadosEspeciais === "nao"}
                            onChange={(e) =>
                              handleAlunoChange(
                                index,
                                "cuidadosEspeciais",
                                e.target.value
                              )
                            }
                            className="mr-2 w-4 h-4 border-2 border-gray-300 checked:border-black checked:bg-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                          />
                          <span className="text-sm text-gray-700">Não</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Another Child Button */}
              <Button
                type="button"
                variant="outline"
                onClick={addAluno}
                className="w-full h-12 border-2 border-dashed border-yellow-400 text-yellow-600 hover:bg-yellow-50 cursor-pointer flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar outro filho
              </Button>

              {/* Terms and Privacy */}
              <div className="text-center text-xs text-gray-600">
                <p>
                  Eu li e concordo com os{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Termos de Uso
                  </Link>{" "}
                  e a{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Política de Privacidade
                  </Link>
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-base rounded-lg transition-colors cursor-pointer"
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
