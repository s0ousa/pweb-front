import { Eye, PlusSquare, Trash, X } from "@phosphor-icons/react";
import {
  PacientesContainer,
  PacientesList,
  ActionsContainer,
  SubmitBtn,
  Overlayer,
  Content,
  CloseBtn,
} from "../Pacientes/style";

import { CadastroBtn, SelectEspecialidade } from "./styles";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import * as  Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { EditarMedicoModal } from "../../components/Modal/EditarMedicoModal";


export interface IMedicos {
  id: number;
  nome: string;
  email: string;
  crm: string;
  especialidade: string;
}

interface ICadastrarMedico {
  nome: string;
  email: string;
  telefone: string;
  crm: string;
  especialidade: string
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

export function Medicos() {
  const [medicos, setMedicos] = useState<IMedicos[]>([]);
  const { register, handleSubmit, reset } = useForm();
  const { request } = useFetch();

  const { request: postMedico } = useFetch();
  const { request: deleteMedico } = useFetch();

  async function fetchMedicosPost(bodyPost: ICadastrarMedico) {
    const response = await postMedico(
      "post",
      "medicos-ms/medicos",
      bodyPost
    );
    if (response) setMedicos((state) => [{ ...response.data }, ...state]);
  }

  async function fetchMedicoDelete(id: number) {
    const response = await deleteMedico("delete", "medicos-ms/medicos", undefined, id)
    console.log(response);

  }

  function handleCadastrarMedico(data: any) {
    const bodyPost = {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      crm: data.crm,
      especialidade: data.especialidade,
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
    fetchMedicosPost(bodyPost);
    reset();
  }

  function onUpdateMedicos(medicos: IMedicos[]) {
    setMedicos(medicos)
  }


  useEffect(() => {
    async function fetchAPI() {
      const response = await request("get", "medicos-ms/medicos/")
      if (response) setMedicos(response.data.content)
    }

    fetchAPI();
  }, [request]);

  //1. criar modal de criar
  //2. criar modal de editar
  //3. configurar post
  //4. configurar put e delete

  return (
    <section>
      <PacientesContainer>
        <h1>Medicos</h1>
        <Dialog.Root>
          <CadastroBtn>
            NOVO MEDICO <PlusSquare size={28} color="#FFFFFF" />
          </CadastroBtn>
          <Dialog.Portal>
            <Overlayer />
            <Content>
              <CloseBtn>
                <X size={20} color="#5c5d5e" weight="bold" />
              </CloseBtn>
              <Dialog.Title>Novo Medico</Dialog.Title>
              <form onSubmit={handleSubmit(handleCadastrarMedico)}>
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
                  id="crm"
                  placeholder="CRM"
                  required
                  {...register("crm")}
                />
                <SelectEspecialidade id="especialidade" defaultValue={"ORTOPEDIA"} {...register("especialidade")} required>
                  <option value="ORTOPEDIA" >ORTOPEDIA</option>
                  <option value="CARDIOLOGIA">CARDIOLOGIA</option>
                  <option value="GINECOLOGIA">GINECOLOGIA</option>
                  <option value="DERMATOLOGIA">DERMATOLOGIA</option>
                </SelectEspecialidade>
                <input
                  type="text"
                  id="telefone"
                  placeholder="Telefone"
                  required
                  {...register("telefone")}
                />
                <h3>Endereço</h3>
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
                <th>Especialidade</th>
                <th>CRM</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {medicos?.map((medico) => {
                const nameCapitalized = `${medico.nome[0].toLocaleUpperCase()}${medico.nome.slice(
                  1
                )}`;

                return (
                  <tr key={medico.id}>
                    <td>{nameCapitalized}</td>
                    <td>{medico.especialidade}</td>
                    <td>{medico.crm}</td>
                    <td>{medico.email}</td>
                    <td>
                      <ActionsContainer>
                        <EditarMedicoModal id={medico.id} medicos={medicos} onUpdateMedicos={onUpdateMedicos} />
                        <button onClick={() => {
                          fetchMedicoDelete(medico.id);
                        }}>
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
