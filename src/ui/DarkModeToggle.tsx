import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import { useDarkMode } from "../context/DarkModeContext";

import ButtonIcon from "./ButtonIcon";

function DarkModeToggle() {
  // Getting the dark mode data from custom hook
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Returned JSX
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
