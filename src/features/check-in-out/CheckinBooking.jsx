import { useEffect, useState } from "react";

import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "../bookings/useCheckin";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

import styled from "styled-components";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox.tsx";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";

import BookingDataBox from "../bookings/BookingDataBox";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  // Setting the state form payment confirmation and breakfast
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  // Getting the booking and the status from the URL
  const { booking, isLoading } = useBooking();

  // Getting the settings data from custom hook
  const { settings, isLoadingSettings } = useSettings();

  // Use effect for changing the state
  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking]);

  // Getting the moving back link and navigate function from hooks
  const moveBack = useMoveBack();

  // Geting the status and mutation function from custom hook
  const { isCheckingIn, checkin } = useCheckin();

  // If data is still loadingm show Spinner
  if (isLoading || isLoadingSettings) return <Spinner />;

  // Destructuring the booking data
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  // Calculating the optional breakfast price
  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  // Checkin handler
  function handleCheckin() {
    // Guard clause
    if (!confirmPaid) return;

    // If breakfast was added, updating a number of fields
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      // Calling the mutation function with empty breakfast object if breakfast wasn't added
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add a breakfast for {formatCurrency(optionalBreakfastPrice)}
            ?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={
            (booking?.isPaid && confirmPaid && !addBreakfast) || isCheckingIn
          }
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
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
