import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// 1) Create Context
const ModalContext = createContext();

// 2) Create Parent Component
function Modal({ children }) {
  // State for Modal status
  const [openName, setOpenName] = useState("");

  // Handler functions
  const close = () => setOpenName("");
  const open = setOpenName; // Open is just renamed setter function

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3) Create child components to help implementing the common tasks
function Open({ children, opens: opensWindowName }) {
  // Getting the state variables from the Context
  const { open } = useContext(ModalContext);

  // Cloning the children element to add an event handler
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  // Getting the state variables from the Context
  const { openName, close } = useContext(ModalContext);

  // Getting the ref from the Custom Hook
  const ref = useOutsideClick(close);

  // If name in the state doesn't match to the passed name, window doesn't show up
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4) Add child components as properties to the parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
