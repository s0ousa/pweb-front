import { Eye, PlusSquare, Trash, X } from "@phosphor-icons/react";
import {
  PacientesContainer,
  CadastroBtn,
  PacientesList,
  ActionsContainer,
  Content,
  CloseBtn,
  Overlayer,
  SubmitBtn,
} from "./style";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { EditarItemBtn } from "../../components/Modal/EditarItemBtn";

export interface IPacientes {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

interface ICadastrarPaciente {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: {
    logradouro: string;
    complemento: string;
    bairro: string;
    numero: number;
    cidade: string;
    uf: string;
    cep: string;
  };
}

export function Pacientes() {
  const [pacientes, setPacientes] = useState<IPacientes[]>([]);
  const { register, handleSubmit, reset } = useForm();

  const { request: getPacientes } = useFetch();
  const { request: postPaciente } = useFetch();
  const { request: deletePaciente } = useFetch();

  useEffect(() => {
    const fetchPacientesGET = async () => {
      const response = await getPacientes("get", "pacientes-ms/pacientes");
      if (response) setPacientes(response.data.content);
    };

    fetchPacientesGET();
  }, [getPacientes]);

  async function fetchPacientesPOST(bodyPost: ICadastrarPaciente) {
    const response = await postPaciente(
      "post",
      "pacientes-ms/pacientes",
      bodyPost
    );
    if (response) setPacientes((state) => [{ ...response.data }, ...state]);
  }

  function handleCadastrarPaciente(data: any) {
    const bodyPost = {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      cpf: data.cpf,
      endereco: {
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        numero: Number(data.numero),
        cidade: data.cidade,
        uf: data.estado,
        cep: data.cep,
      },
    };
    fetchPacientesPOST(bodyPost);
    reset();
  }

  function handleDeletePaciente(id: number) {
    deletePaciente("delete", "pacientes-ms/pacientes", undefined, id);
  }

  function onUpdatePacientes(pacientes: IPacientes[]) {
    setPacientes(pacientes)
  }

  return (
    <section>
      <PacientesContainer>
        <h1>Pacientes</h1>
        <Dialog.Root>
          <CadastroBtn>
            NOVO PACIENTE <PlusSquare size={28} color="#FFFFFF" />
          </CadastroBtn>

          <Dialog.Portal>
            <Overlayer />
            <Content>
              <CloseBtn>
                <X size={20} color="#5c5d5e" weight="bold" />
              </CloseBtn>
              <Dialog.Title>Novo Paciente</Dialog.Title>
              <form onSubmit={handleSubmit(handleCadastrarPaciente)}>
                <input
                  type="text"
                  id="name"
                  placeholder="Nome"
                  required
                  {...register("nome")}
                />
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  required
                  {...register("email")}
                />
                <input
                  type="text"
                  id="cpf"
                  placeholder="CPF"
                  required
                  {...register("cpf")}
                />
                <input
                  type="text"
                  id="telefone"
                  placeholder="Telefone"
                  required
                  {...register("telefone")}
                />
                <h3>Logradouro</h3>
                <input
                  type="text"
                  id="cep"
                  placeholder="Cep"
                  required
                  {...register("cep")}
                />
                <input
                  type="text"
                  id="logradouro"
                  placeholder="Logradouro"
                  required
                  {...register("logradouro")}
                />
                <input
                  type="text"
                  id="numero"
                  placeholder="Numero"
                  {...register("numero")}
                />
                <input
                  type="text"
                  id="complemento"
                  placeholder="Complemento"
                  {...register("complemento")}
                />
                <input
                  type="text"
                  id="bairro"
                  placeholder="Bairro"
                  required
                  {...register("bairro")}
                />
                <input
                  type="text"
                  id="cidade"
                  placeholder="Cidade"
                  required
                  {...register("cidade")}
                />
                <input
                  type="text"
                  id="estado"
                  placeholder="Estado"
                  required
                  {...register("estado")}
                />
                <SubmitBtn>Cadastrar</SubmitBtn>
              </form>
            </Content>
          </Dialog.Portal>
        </Dialog.Root>
        <PacientesList>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacientes?.map((paciente) => {
                const nameCapitalized = `${paciente.nome[0].toLocaleUpperCase()}${paciente.nome.slice(
                  1
                )}`;

                return (
                  <tr key={paciente.id}>
                    <td>{nameCapitalized}</td>
                    <td>{paciente.email}</td>
                    <td>{paciente.cpf}</td>
                    <td>
                      <ActionsContainer>
                        <EditarItemBtn
                          id={paciente.id}
                          onUpdatePacientes={onUpdatePacientes}
                          pacientes={pacientes}
                        />
                        <button
                          onClick={() => {
                            handleDeletePaciente(paciente.id);
                          }}
                        >
                          <Trash size={28} color="#EB5160" />
                        </button>
                      </ActionsContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </PacientesList>
      </PacientesContainer>
    </section>
  );
}
