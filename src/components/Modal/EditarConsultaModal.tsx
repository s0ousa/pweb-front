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
import { IConsultas } from "../../pages/Consultas";
import { ConsultasForm, SelectMotivoDeCancelamento } from "../../pages/Consultas/styles";

interface IEditarConsultaModal {
    id: number;
    onUpdateConsultas: (consultas: IConsultas[]) => void;
    consultas: IConsultas[];
}

export const EditarConsultaModal = ({
    id,
    onUpdateConsultas,
    consultas,
}: IEditarConsultaModal) => {

    const [open, setOpen] = useState(false);
    const [dadosConsulta, setDadosConsulta] = useState({
        id: 0,
        motivoDeCancelamento: ""
    });

    async function handleDelete() {

        const { motivoDeCancelamento, id } = dadosConsulta;
        console.log(dadosConsulta);

        const response = await api.delete(`consultas-ms/consultas/${id}`, {
            data: { motivoDeCancelamento }
        });


        // const medicosAtualizados = medicos.map((medico) => {
        //     if (medico.id === id) {
        //         return { ...response?.data };
        //     }

        //     return medico;
        // });

        // onUpdateMedicos(medicosAtualizados);
    }

    async function handleGetConsultaInfo(id: number) {
        const response = await api.get(`consultas-ms/consultas/${id}`)
        if (response) setDadosConsulta(response.data)
    }


    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <EditarBtn
                onClick={() => {
                    handleGetConsultaInfo(id);
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
                    <Dialog.Title>Editar consulta</Dialog.Title>

                    {dadosConsulta.id > 0 ? (
                        <ConsultasForm
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleDelete();
                                setOpen(false);
                            }}
                        >
                            <SelectMotivoDeCancelamento id="MotivoDeCancelamento" value={dadosConsulta.motivoDeCancelamento} onChange={(e) => {
                                setDadosConsulta((state) => {
                                    return { ...state, motivoDeCancelamento: e.target.value }
                                })
                            }}>
                                <option value="PACIENTE_DESISTIU">PACIENTE DESISTIU</option>
                                <option value="MEDICO_CANCELOU">MEDICO CANCELOU</option>
                                <option value="OUTROS">OUTROS</option>
                            </SelectMotivoDeCancelamento>


                            <SubmitBtn>Editar Consulta</SubmitBtn>
                        </ConsultasForm>
                    ) : null}
                </Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
