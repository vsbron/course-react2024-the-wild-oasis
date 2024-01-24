import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useBooking } from "./useBooking";
import { useCheckout } from "./useCheckout";
import { useMoveBack } from "../../hooks/useMoveBack";

import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  // Getting the data from custom hooks
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();

  // Getting the moving back link and navigate function from hooks
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  // If data is still loading return Spinner
  if (isLoading) return <Spinner />;

  // Getting the current status form the booking
  const { status, id } = booking;

  // List of statues and their colors
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
        )}
        {status === "checked-in" && (
          <Button
            onClick={() => {
              checkout(id);
            }}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
