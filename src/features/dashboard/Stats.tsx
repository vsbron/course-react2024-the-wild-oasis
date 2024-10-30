import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

import { StatsProps } from "../../lib/types";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
  // 1. Calculating the number of bookings
  const numBookings = bookings.length;

  // 2. Calculating the amount of money from all the bookings
  const sales = bookings.reduce(
    (acc: number, cur: { totalPrice: number }) => acc + cur.totalPrice,
    0
  );

  // 3. Calculate how many check-ins there were in chosen period
  const checkIns = confirmedStays.length;

  // 4. Calculating the occupation rate
  const occupation =
    confirmedStays.reduce(
      (acc: number, cur: { numNights: number }) => acc + cur.numNights,
      0
    ) /
    (numDays * cabinCount);

  // Returned JSX
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={String(numBookings)}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={String(checkIns)}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
