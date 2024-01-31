import Button from "../../ui/Button";
import { useCheckout } from "../bookings/useCheckout";

function CheckoutButton({ bookingId }) {
  // Getting the checkout mutation function and isCheckingOutstate from custom hook
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      size="small"
      onClick={() => {
        checkout(bookingId);
      }}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
