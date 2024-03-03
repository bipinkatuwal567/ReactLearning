import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button variation="primary" disabled={isCheckingOut} onClick={() => checkout(bookingId)} size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
