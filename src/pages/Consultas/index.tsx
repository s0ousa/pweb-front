import { Eye, Pen, PlusSquare, Trash, X } from "@phosphor-icons/react";
import {
  PacientesContainer,
  PacientesList,
  ActionsContainer,
  Overlayer,
  Content,
  CloseBtn,
  SubmitBtn,
} from "../Pacientes/style";
import {
  CadastroBtn,
  ConsultaForm,
  SelectMedico,
  SelectPaciente,
} from "./styles";
import { useEffect, useState } from "react";
import { IPacientes } from "../Pacientes";
import { IMedicos } from "../Medicos";
import { StatusConsulta } from "./styles";
import { useFetch } from "../../hooks/useFetch";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { EditarConsultaModal } from "../../components/Modal/EditarConsultaModal";

export interface IConsultas {
  id: number;
  pacienteID: number;
  medicoID: number;
  agendamento: string;
  ativo: boolean;
  motivoDeCancelamento: string;
}

interface IConsultaPost {
  pacienteID: number;
  medicoID: number;
  agendamento: string;
}

export function Consultas() {
  const [consultas, setConsultas] = useState<IConsultas[]>([]);
  const [pacientes, setPacientes] = useState<IPacientes[]>([]);
  const [medicos, setMedicos] = useState<IMedicos[]>([]);

  const { register, handleSubmit, reset } = useForm();

  const { request: requestConsultas } = useFetch();
  const { request: requestMedicos } = useFetch();
  const { request: requestPacientes } = useFetch();

  const { request: postConsultas } = useFetch();
  const { request: deleteConsulta } = useFetch();

  useEffect(() => {
    async function fetchApiConsultas() {
      const request = await requestConsultas("get", "consultas-ms/consultas");
      if (request) setConsultas(request.data.content);
    }

    async function fetchApiPacientes() {
      const request = await requestPacientes("get", "pacientes-ms/pacientes");
      if (request) setPacientes(request.data.content);
    }

    async function fetchApiMedicos() {
      const request = await requestMedicos("get", "medicos-ms/medicos/");
      if (request) setMedicos(request.data.content);
    }

    fetchApiConsultas();
    fetchApiPacientes();
    fetchApiMedicos();
  }, [requestConsultas, requestMedicos, requestPacientes]);

  function getPacientName(id: number) {
    const paciente = pacientes.find((paciente) => paciente.id === id);
    const nameCapitalized = `${paciente?.nome[0].toLocaleUpperCase()}${paciente?.nome.slice(
      1
    )}`;

    return nameCapitalized;
  }

  function getDoctorName(id: number) {
    const medico = medicos.find((medico) => medico.id === id);
    const nameCapitalized = `${medico?.nome[0].toLocaleUpperCase()}${medico?.nome.slice(
      1
    )}`;

    return nameCapitalized;
  }

  async function fetchConsultaPost(bodyPost: IConsultaPost) {
    const response = await postConsultas(
      "post",
      "consultas-ms/consultas",
      bodyPost
    );
    if (response) setConsultas((state) => [{ ...response.data }, ...state]);
  }

  function handleCadastrarMedico(data: any) {
    const bodyPost = {
      pacienteID: data.pacienteSelected,
      medicoID: data.medicoSelected,
      agendamento: data.dataAgendamento,
    };
    fetchConsultaPost(bodyPost);
    reset();
  }

  function onUpdateConsultas(consultas: IConsultas[]) {
    setConsultas(consultas)
  }

  return (
    <section>
      <PacientesContainer>
        <h1>Consultas</h1>
        <Dialog.Root>
          <CadastroBtn>
            CADASTRAR CONSULTA
            <PlusSquare size={28} color="#FFFFFF" />
          </CadastroBtn>
          <Dialog.Portal>
            <Overlayer />
            <Content>
              <CloseBtn>
                <X size={20} color="#5c5d5e" weight="bold" />
              </CloseBtn>
              <Dialog.Title>Nova Consulta</Dialog.Title>
              <ConsultaForm onSubmit={handleSubmit(handleCadastrarMedico)}>
                <SelectPaciente {...register("pacienteSelected")}>
                  {pacientes.map((paciente) => {
                    return (
                      <option value={paciente.id} key={paciente.id}>
                        {paciente.nome}
                      </option>
                    );
                  })}
                </SelectPaciente>
                <SelectMedico {...register("medicoSelected")}>
                  {medicos.map((medico) => {
                    return (
                      <option key={medico.id} value={medico.id}>
                        {medico.nome}
                      </option>
                    );
                  })}
                </SelectMedico>
                <input
                  type="text"
                  id="data de agendamento"
                  placeholder="Data de agendamento"
                  required
                  {...register("dataAgendamento")}
                />
                <SubmitBtn>Cadastrar</SubmitBtn>
              </ConsultaForm>
            </Content>
          </Dialog.Portal>
        </Dialog.Root>
        <PacientesList>
          <table>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Medico</th>
                <th>Data da consulta</th>
                <th>Status</th>
                <th>Motivo de Cancelamento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {consultas?.map((consulta) => {
                return (
                  <tr key={consulta.id}>
                    <td>{getPacientName(consulta.pacienteID)}</td>
                    <td>{getDoctorName(consulta.medicoID)}</td>
                    <td>{consulta.agendamento}</td>
                    <StatusConsulta ativo={consulta.ativo.toString()}>
                      {consulta.ativo ? "Ativa" : "Cancelada"}
                    </StatusConsulta>
                    <td>
                      {consulta.motivoDeCancelamento
                        ? consulta.motivoDeCancelamento
                        : "-"}
                    </td>
                    <td>
                      <ActionsContainer>
                        <EditarConsultaModal id={consulta.id} consultas={consultas} onUpdateConsultas={onUpdateConsultas} />
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
