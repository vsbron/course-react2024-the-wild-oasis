import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { useLogout } from "./useLogout";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  // Getting the logout function and isLoading state
  const { logout, isLoading } = useLogout();

  // Returned JSX
  return (
    <ButtonIcon onClick={logout} disabled={isLoading}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
