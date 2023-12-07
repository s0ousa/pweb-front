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
import { IMedicos } from "../../pages/Medicos";

interface IEditarMedicoModal {
    id: number;
    onUpdateMedicos: (medicos: IMedicos[]) => void;
    medicos: IMedicos[];
}

export const EditarMedicoModal = ({
    id,
    onUpdateMedicos,
    medicos,
}: IEditarMedicoModal) => {
    const [open, setOpen] = useState(false);
    const [medicoDadosCompleto, setMedicoDadosCompleto] = useState({
        id: 0,
        nome: "",
        email: "",
        crm: "",
        telefone: "",
        especialidade: "",
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
    //Corrigir rota
    async function handleGetMedicoInfo(id: number) {
        const response = await api.get(`medicos-ms/medicos/todos/${id}`);
        if (response) setMedicoDadosCompleto(response.data);
    }

    async function handleEditar() {

        const { nome, telefone, endereco, id } = medicoDadosCompleto;
        console.log(medicoDadosCompleto);
        const response = await api.put(`medicos-ms/medicos/${id}`, {
            nome,
            telefone,
            endereco,
        });


        const medicosAtualizados = medicos.map((medico) => {
            if (medico.id === id) {
                return { ...response?.data };
            }

            return medico;
        });

        onUpdateMedicos(medicosAtualizados);
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <EditarBtn
                onClick={() => {
                    handleGetMedicoInfo(id);
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

                    {medicoDadosCompleto.email.length > 0 ? (
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
                                placeholder={medicoDadosCompleto.nome}
                                required
                                onChange={(e) => {
                                    setMedicoDadosCompleto((state) => ({
                                        ...state,
                                        nome: e.target.value,
                                    }));
                                }}
                                value={medicoDadosCompleto.nome}
                            />
                            <input
                                type="text"
                                id="email"
                                placeholder={medicoDadosCompleto.email}
                                readOnly
                                value={medicoDadosCompleto.email}
                            />
                            <input
                                type="text"
                                id="crm"
                                placeholder={medicoDadosCompleto.crm}
                                readOnly
                                value={medicoDadosCompleto.crm}
                            />
                            <select id="especialidade" disabled value={medicoDadosCompleto.especialidade} onChange={(e) => {
                                setMedicoDadosCompleto((state) => {
                                    return { ...state, especialidade: e.target.value }
                                })

                            }}>
                                <option value="ORTOPEDIA">ORTOPEDIA</option>
                                <option value="CARDIOLOGIA">CARDIOLOGIA</option>
                                <option value="GINECOLOGIA">GINECOLOGIA</option>
                                <option value="DERMATOLOGIA">DERMATOLOGIA</option>
                            </select>

                            <input
                                type="text"
                                id="telefone"
                                placeholder={medicoDadosCompleto.telefone}
                                required
                                value={medicoDadosCompleto.telefone}
                                onChange={(e) => {
                                    setMedicoDadosCompleto((state) => ({
                                        ...state,
                                        telefone: e.target.value,
                                    }));

                                    console.log(medicoDadosCompleto);
                                }}
                            />
                            <h3>Logradouro</h3>
                            <input
                                type="text"
                                id="cep"
                                placeholder={medicoDadosCompleto.endereco?.cep}
                                value={medicoDadosCompleto.endereco.cep}
                                required
                                onChange={(e) => {
                                    setMedicoDadosCompleto((state) => ({
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
                                placeholder={medicoDadosCompleto.endereco?.logradouro}
                                value={medicoDadosCompleto.endereco.logradouro}
                                onChange={(e) => {
                                    setMedicoDadosCompleto((state) => ({
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
                                placeholder={medicoDadosCompleto.endereco?.numero}
                                value={medicoDadosCompleto.endereco.numero}
                                onChange={(e) => {
                                    setMedicoDadosCompleto((state) => ({
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
                                placeholder={medicoDadosCompleto.endereco?.complemento}
                                value={medicoDadosCompleto.endereco.complemento}
                                onChange={(e) => {
                                    setMedicoDadosCompleto((state) => ({
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
                                placeholder={medicoDadosCompleto.endereco?.bairro}
                                value={medicoDadosCompleto.endereco.bairro}
                                onChange={(e) => {
                                    setMedicoDadosCompleto((state) => ({
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
                                placeholder={medicoDadosCompleto.endereco?.cidade}
                                onChange={(e) => {
                                    setMedicoDadosCompleto((state) => ({
                                        ...state,
                                        endereco: {
                                            ...state.endereco,
                                            cidade: e.target.value,
                                        },
                                    }));
                                }}
                                value={medicoDadosCompleto.endereco.cidade}
                                required
                            />
                            <input
                                type="text"
                                id="estado"
                                placeholder={medicoDadosCompleto.endereco?.uf}
                                onChange={(e) => {
                                    setMedicoDadosCompleto((state) => ({
                                        ...state,
                                        endereco: {
                                            ...state.endereco,
                                            uf: e.target.value,
                                        },
                                    }));
                                }}
                                value={medicoDadosCompleto.endereco.uf}
                                required
                            />
                            <SubmitBtn>Editar Medico</SubmitBtn>
                        </form>
                    ) : null}
                </Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
