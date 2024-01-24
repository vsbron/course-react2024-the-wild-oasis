import { useBookings } from "./useBookings";

import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Pagination from "../../ui/Pagination";

import BookingRow from "./BookingRow";

function BookingTable() {
  // Getting the isLoading state and the data from Custom hook
  const { isLoading, bookings, count } = useBookings();

  // Guard clause, if data is still loading display Loading spinner
  if (isLoading) return <Spinner />;

  // Display "Empty message" if there's no booking
  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
