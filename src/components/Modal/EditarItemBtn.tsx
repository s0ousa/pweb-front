import { Pen, X } from "@phosphor-icons/react";
import {
  Content,
  CloseBtn,
  Overlayer,
  SubmitBtn,
  EditarBtn,
} from "../../pages/Pacientes/style";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "../../lib/api";
import { IPacientes } from "../../pages/Pacientes";

interface EditarItemBtnProps {
  id: number;
  onUpdatePacientes: (pacientes: IPacientes[]) => void;
  pacientes: IPacientes[];
}
export const EditarItemBtn = ({
  id,
  onUpdatePacientes,
  pacientes,
}: EditarItemBtnProps) => {
  const [open, setOpen] = useState(false);
  const [pacienteDadosCompleto, setPacienteDadosCompleto] = useState({
    id: 0,
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    endereco: {
      logradouro: "",
      complemento: "",
      bairro: "",
      numero: "",
      cidade: "",
      uf: "",
      cep: "",
    },
  });

  async function handleGetPacienteInfo(id: number) {
    const response = await api.get(`pacientes-ms/pacientes/${id}`);
    if (response) setPacienteDadosCompleto(response.data);
  }

  async function handleEditar() {
    const { nome, telefone, endereco, id } = pacienteDadosCompleto;
    const response = await api.put(`pacientes-ms/pacientes/${id}`, {
      nome,
      telefone,
      endereco,
    });

    const pacientesAtualizados = pacientes.map((paciente) => {
      if (paciente.id === id) {
        return { ...response?.data };
      }

      return paciente;
    });

    onUpdatePacientes(pacientesAtualizados);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <EditarBtn
        onClick={() => {
          handleGetPacienteInfo(id);
        }}
      >
        <Pen size={28} />
      </EditarBtn>

      <Dialog.Portal>
        <Overlayer />
        <Content>
          <CloseBtn>
            <X size={20} color="#5c5d5e" weight="bold" />
          </CloseBtn>
          <Dialog.Title>Editar paciente</Dialog.Title>

          {pacienteDadosCompleto.email.length > 0 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditar();
                setOpen(false);
              }}
            >
              <input
                type="text"
                id="name"
                placeholder={pacienteDadosCompleto.nome}
                required
                onChange={(e) => {
                  setPacienteDadosCompleto((state) => ({
                    ...state,
                    nome: e.target.value,
                  }));
                }}
                value={pacienteDadosCompleto.nome}
              />
              <input
                type="text"
                id="email"
                placeholder={pacienteDadosCompleto.email}
                readOnly
                value={pacienteDadosCompleto.email}
              />
              <input
                type="text"
                id="cpf"
                placeholder={pacienteDadosCompleto.cpf}
                readOnly
                value={pacienteDadosCompleto.cpf}
              />
              <input
                type="text"
                id="name"
                placeholder={pacienteDadosCompleto.nome}
                required
                onChange={(e) => {
                  setPacienteDadosCompleto((state) => ({
                    ...state,
                    nome: e.target.value,
                  }));
                }}
                value={pacienteDadosCompleto.nome}
              />

              <input
                type="text"
                id="telefone"
                placeholder={pacienteDadosCompleto.telefone}
                required
                value={pacienteDadosCompleto.telefone}
                onChange={(e) => {
                  setPacienteDadosCompleto((state) => ({
                    ...state,
                    telefone: e.target.value,
                  }));

                  console.log(pacienteDadosCompleto);
                }}
              />
              <h3>Logradouro</h3>
              <input
                type="text"
                id="cep"
                placeholder={pacienteDadosCompleto.endereco?.cep}
                value={pacienteDadosCompleto.endereco.cep}
                required
                onChange={(e) => {
                  setPacienteDadosCompleto((state) => ({
                    ...state,
                    endereco: {
                      ...state.endereco,
                      cep: e.target.value,
                    },
                  }));
                }}
              />
              <input
                required
                type="text"
                id="logradouro"
                placeholder={pacienteDadosCompleto.endereco?.logradouro}
                value={pacienteDadosCompleto.endereco.logradouro}
                onChange={(e) => {
                  setPacienteDadosCompleto((state) => ({
                    ...state,
                    endereco: {
                      ...state.endereco,
                      logradouro: e.target.value,
                    },
                  }));
                }}
              />
              <input
                type="text"
                id="numero"
                placeholder={pacienteDadosCompleto.endereco?.numero}
                value={pacienteDadosCompleto.endereco.numero}
                onChange={(e) => {
                  setPacienteDadosCompleto((state) => ({
                    ...state,
                    endereco: {
                      ...state.endereco,
                      numero: e.target.value,
                    },
                  }));
                }}
              />
              <input
                type="text"
                id="complemento"
                placeholder={pacienteDadosCompleto.endereco?.complemento}
                value={pacienteDadosCompleto.endereco.complemento}
                onChange={(e) => {
                  setPacienteDadosCompleto((state) => ({
                    ...state,
                    endereco: {
                      ...state.endereco,
                      complemento: e.target.value,
                    },
                  }));
                }}
              />
              <input
                type="text"
                id="bairro"
                placeholder={pacienteDadosCompleto.endereco?.bairro}
                value={pacienteDadosCompleto.endereco.bairro}
                onChange={(e) => {
                  setPacienteDadosCompleto((state) => ({
                    ...state,
                    endereco: {
                      ...state.endereco,
                      bairro: e.target.value,
                    },
                  }));
                }}
                required
              />
              <input
                type="text"
                id="cidade"
                placeholder={pacienteDadosCompleto.endereco?.cidade}
                onChange={(e) => {
                  setPacienteDadosCompleto((state) => ({
                    ...state,
                    endereco: {
                      ...state.endereco,
                      cidade: e.target.value,
                    },
                  }));
                }}
                value={pacienteDadosCompleto.endereco.cidade}
                required
              />
              <input
                type="text"
                id="estado"
                placeholder={pacienteDadosCompleto.endereco?.uf}
                onChange={(e) => {
                  setPacienteDadosCompleto((state) => ({
                    ...state,
                    endereco: {
                      ...state.endereco,
                      uf: e.target.value,
                    },
                  }));
                }}
                value={pacienteDadosCompleto.endereco.uf}
                required
              />
              <SubmitBtn>Editar Paciente</SubmitBtn>
            </form>
          ) : null}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
