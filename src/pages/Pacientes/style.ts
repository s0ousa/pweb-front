import styled from "styled-components";
import {
  Trigger,
  Content as content,
  Close,
  Overlay,
} from "@radix-ui/react-dialog";

export const PacientesContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 0px 20px;
  h1 {
    font-family: "inter";
    font-size: 2rem;
    letter-spacing: 2px;
    margin-bottom: 32px;
    color: ${(props) => props.theme.white};
  }
`;

export const EditarBtn = styled(Trigger)`
  font-weight: bold;
  color: inherit;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #da913f;
  }
`;

export const CadastroBtn = styled(Trigger)`
  padding: 16px 32px;
  background: ${(props) => props.theme["blue-btn"]};
  border: 0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "roboto";
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 0.75px;
  color: ${(props) => props.theme.white};
  cursor: pointer;
  border: 1px solid transparent;

  margin-bottom: 36px;

  &:hover {
    background: rgba(32, 68, 117, 0.8);
    transition: background-color 0.5s;
    border-color: ${(props) => props.theme["blue-btn"]};
  }
`;

export const PacientesList = styled.div`
  font-family: "roboto";
  height: 420px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  table {
    text-align: left;
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
  }

  th {
    background-color: ${(props) => props.theme["blue-600"]};
    padding: 1rem;
    text-align: left;
    font-size: 0.875rem;
    line-height: 1.6;
    color: ${(props) => props.theme["table-header"]};

    &:first-child {
      border-top-left-radius: 8px;
      padding-left: 1.5rem;
    }

    &:last-child {
      border-top-right-radius: 8px;
      padding-right: 1.5rem;
    }
  }

  td {
    background-color: ${(props) => props.theme["blue-300"]};
    border-top: 4px solid #212127;
    padding: 1rem;
    font-size: 0.875rem;
    line-height: 1.6;
    color: ${(props) => props.theme["table-body"]};
    &:first-child {
      padding-left: 1.5rem;
      width: 35%;
    }

    &:last-child {
      padding-right: 1.5rem;
    }

    &:last-of-type {
      button {
        font-weight: bold;
        color: inherit;
        background: transparent;
        border: 0;
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
          color: #da913f;
        }
      }
    }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  button {
    &:hover {
      transform: scale(1.2);
    }
    &:last-of-type {
    }
  }
`;

export const Content = styled(content)`
  min-width: 40rem;
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  background: ${(props) => props.theme["blue-300"]};
  padding: 40px 40px 50px;
  border-radius: 6px;

  h2 {
    font-size: 2rem;
    color: ${(props) => props.theme.white};

    margin-bottom: 20px;
  }

  form {
    display: grid;
    grid-template-areas:
      "name name name"
      "email email email"
      "cpf cpf telefone"
      "titleLogradouro titleLogradouro titleLogradouro"
      "cep cep cep"
      "logradouro logradouro logradouro"
      "numero complemento complemento"
      "bairro cidade estado "
      "submitBtn submitBtn submitBtn";
    gap: 16px 8px;

    input {
      font-family: "roboto";
      font-size: 1rem;
      padding: 16px;
      border-radius: 6px;
      border: 0;
      outline: 0;
      background: ${(props) => props.theme["blue-600"]};
      color: ${(props) => props.theme.white};
      &::placeholder {
        color: rgba(255, 255, 255, 0.2);
      }

      &:read-only {
        cursor: not-allowed;
        color: rgba(255,255,255, 0.3);
        box-shadow: none;
      }
    }
    #name {
      grid-area: name;
    }
    #email {
      grid-area: email;
    }
    #cpf {
      grid-area: cpf;
    }
    #telefone {
      grid-area: telefone;
    }
    #cep {
      grid-area: cep;
    }
    #logradouro {
      grid-area: logradouro;
    }
    #endereco {
      grid-area: email;
    }
    #numero {
      grid-area: numero;
    }
    #complemento {
      grid-area: complemento;
    }
    #bairro {
      grid-area: bairro;
    }
    #cidade {
      grid-area: cidade;
    }
    #estado {
      grid-area: estado;
    }

    h3 {
      grid-area: titleLogradouro;
      color: ${(props) => props.theme.white};
      font-size: 1.5rem;
      margin: 10px 0;
    }
  }
`;

export const CloseBtn = styled(Close)`
  cursor: pointer;
  background: transparent;
  border: 0;
  position: absolute;
  right: 20px;
  top: 20px;
  line-height: 0;
`;

export const Overlayer = styled(Overlay)`
  background: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export const SubmitBtn = styled.button`
  padding: 16px 32px;
  background: ${(props) => props.theme["blue-btn"]};
  border: 0;
  border-radius: 6px;
  font-family: "roboto";
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 0.75px;
  color: ${(props) => props.theme.white};
  cursor: pointer;
  border: 1px solid transparent;
  grid-area: submitBtn;
  margin-top: 30px;

  &:hover {
    background: rgba(32, 68, 117, 0.8);
    transition: background-color 0.2s;
    border-color: ${(props) => props.theme["blue-btn"]};
  }
`;
