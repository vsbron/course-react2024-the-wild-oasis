import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;

  z-index: 200;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  & span {
    white-space: nowrap;
  }
`;

// Compound Component Pattern
// 1) Create Context
const MenusContext = createContext();

// 2) Create Parent Component
function Menus({ children }) {
  // State to keep track of opened context menu
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  // Setter functions
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

// 3) Create child components to help implementing the common tasks
function Toggle({ id }) {
  // Getting the state from Context API
  const { openId, close, open, setPosition } = useContext(MenusContext);

  // Click handler
  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: 0,
      y: rect.height + 8,
    });

    // Checks the current id, decides whether open or close the context menu
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  // Getting the state from Context API
  const { openId, position, close } = useContext(MenusContext);

  // Getting the ref to detect the outside click
  const ref = useOutsideClick(() => {
    close();
  }, false); // Adding "false" to catch events in the bubbling phase

  // Guard clause, return nothing if IDs do not match
  if (openId !== id || !position) return null;

  return (
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>
  );
}

function Button({ children, icon, onClick }) {
  // Getting the state from Context API
  const { close } = useContext(MenusContext);

  // Click handker that executes the function and closes context menu
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

// 4) Add child components as properties to the parent component
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
