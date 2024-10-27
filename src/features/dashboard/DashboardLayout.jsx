import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

import { useCabins } from "../cabins/useCabins";

import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import TodayActivity from "../check-in-out/TodayActivity";

import styled from "styled-components";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  // Getting all the needed data from custom hooks
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { isLoading: isLoading2, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  // If some data is still loading, display Spinner
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  // Returned JSX
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
