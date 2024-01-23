import { useEffect, useState } from "react";
import styled from "styled-components";

import useBooking from "../bookings/useBooking";
import BookingDataBox from "../bookings/BookingDataBox";
import useCheckin from "../bookings/useCheckin";
import { formatCurrency } from "../../utils/helpers";
import { useMoveBack } from "../../hooks/useMoveBack";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  // Setting the state form payment confirmation
  const [confirmPaid, setConfirmPaid] = useState(false);

  // Getting the booking and the status from the URL
  const { booking, isLoading } = useBooking();

  // Use effect for changing the state
  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking]);

  // Getting the moving back link and navigate function from hooks
  const moveBack = useMoveBack();

  // Geting the status and mutation function from custom hook
  const { isCheckingIn, checkin } = useCheckin();

  // If data is still loadingm show Spinner
  if (isLoading) return <Spinner />;

  // Destructuring the booking data
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  // Checkin handler
  function handleCheckin() {
    // Guard clause
    if (!confirmPaid) return;

    // Calling the mutation function
    checkin(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={(booking?.isPaid && confirmPaid) || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
