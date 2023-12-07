import styled from "styled-components";

export const PainelHeader = styled.div`
  display: flex;
  background: ${(props) => props.theme["blue-600"]};
  padding: 20px 26px;
  gap: 20px;
  align-items: center;

  img {
    width: 40px;
    border-radius: 6px;
    border: 2px solid ${(props) => props.theme["table-body"]};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-family: "inter";
  font-size: 0.875rem;
  color: ${(props) => props.theme["blue-500"]};
`;

export const UserRole = styled.span`
  font-family: "inter";
  font-size: 1rem;
  color: ${(props) => props.theme.white};
`;

export const NavMenu = styled.nav`
  font-family: 'roboto';
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 30px 26px;
  height: calc(100vh - 80px);
  background: ${(props) => props.theme["blue-300"]};
`;

export const MenuContainer = styled.div`
  strong {
    margin-bottom: 20px;
    display: inline-block;
    font-size: 0.75rem;
    letter-spacing: 1px;
    color: ${props => props.theme["blue-100"]}
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  li a{
    display: flex;
    gap: 12px;
    align-items: center;
    color: ${props => props.theme.links};
    font-size: 0.875rem;
    transition: color .2s;

    &:hover {
      color: ${props => props.theme.white};
    }

    &:hover svg{
      fill: ${props => props.theme["blue-btn"]}
    }
  }
`;
