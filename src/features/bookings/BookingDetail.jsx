import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiTrash } from "react-icons/hi2";

import { useBooking } from "./useBooking";
import { useCheckout } from "./useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Heading from "../../ui/Heading";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal";
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
  const { deleteBooking, isDeleting } = useDeleteBooking();

  // Getting the moving back link and navigate function from hooks
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  // If data is still loading return Spinner
  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

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
      <Modal>
        <ButtonGroup>
          {/* Check-in button (active if booking's status is unconfirmed) */}
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
          )}

          {/* Check-out button (active if booking's status is checked in) */}
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

          {/* Delete button with which is part of the Modal coponent also */}
          <Modal.Open opens="delete">
            <Button variation="danger" icon={<HiTrash />}>
              Delete Booking
            </Button>
          </Modal.Open>

          {/* Back button */}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        {/* Modal window for Delete */}
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => {
              deleteBooking(id, {
                onSettled: () => {
                  navigate(-1);
                },
              });
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
