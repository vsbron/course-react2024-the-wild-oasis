import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";

import Logout from "../features/authentication/Logout";

import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";

import styled from "styled-components";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  // Getting the navigate function from useNavigate hook
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
