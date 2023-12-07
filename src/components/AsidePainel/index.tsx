import { Users, FirstAidKit, CalendarX, UserSquare, BagSimple, Question } from "@phosphor-icons/react";
import { PainelHeader, UserInfo, UserRole, UserName, NavMenu, MenuContainer, NavList } from "./styles";
import * as Avatar from '@radix-ui/react-avatar'

export function AsidePainel() {
  return (
    <aside>
      <PainelHeader>
        <Avatar.Root className="AvatarRoot">
          <Avatar.Image
            className="AvatarImage"
            src="https://github.com/s0ousa.png"
            alt="Luis"
          />
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            ADM
          </Avatar.Fallback>
        </Avatar.Root>
        <UserInfo>
          <UserRole>Administrador</UserRole>
          <UserName>admin</UserName>
        </UserInfo>
      </PainelHeader>

      <NavMenu>
        <MenuContainer>
          <strong>PROFISSIONAL</strong>

          <NavList>
            <li>
              <a href="/pacientes">
                <Users size={20} color="#7C8EA7" weight="bold" /> Pacientes{" "}

              </a>
            </li>
            <li>
              <a href="/medicos">
                <FirstAidKit size={20} color="#7C8EA7" weight="bold" />
                Medicos
              </a>
            </li>
            <li>
              <a href="/consultas">
                <CalendarX size={20} color="#7C8EA7" weight="bold" />
                Consultas
              </a>
            </li>
          </NavList>
        </MenuContainer>

        <MenuContainer>
          <strong>ADMINISTRADOR</strong>
          <NavList>
            <li> <a href="">
              <UserSquare size={20} weight="fill" color="#7C8EA7" />
              Usuários
            </a></li>
            <li> <a href="">
              <BagSimple size={20} color="#7C8EA7" />
              Financeiro
            </a></li>
            <li> <a href="">
              <Question size={20} color="#7C8EA7" weight="bold" />
              Central de ajuda
            </a></li>
          </NavList>



        </MenuContainer>
      </NavMenu>
    </aside>
  )
}