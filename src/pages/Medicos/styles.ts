import { Trigger } from "@radix-ui/react-dialog";
import styled from "styled-components";

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

export const SelectEspecialidade = styled.select`
-webkit-appearance: none;
  appearance: none;
  border: 0;
  border-radius: 6px;
  padding: 16px;
  color:${(props) => props.theme.white};
  font-family: "Roboto";
  font-size: 1rem;
  background: ${(props) => props.theme["blue-600"]};
  outline: 0;

  background-image: url("/caret-down.svg");
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: calc(100% - 8px) center;
`