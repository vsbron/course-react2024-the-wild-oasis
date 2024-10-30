import { useSearchParams } from "react-router-dom";

import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import CabinRow from "./CabinRow";

function CabinTable() {
  // Getting the isLoading state and the data from Custom hook
  const { isLoading, cabins } = useCabins();

  // Getting the state from the URL
  const [searchParams] = useSearchParams();

  // Guard clause
  if (!cabins) return <div>No cabins found</div>;

  // Guard clause, if data is still loading display Loading spinner
  if (isLoading) return <Spinner />;

  // Display "Empty message" if there's no cabins
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // Getting the Filter value from the URL state
  const filterValue = searchParams.get("discount") || "all";

  // Setting the new cabins array but this time, with filters
  let filteredCabins;
  // Displaying all cabins
  if (filterValue === "all") filteredCabins = cabins;
  // Displaying cabins with no discount
  else if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  // Displaying cabins with discount
  else filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // Getting the Sort value from the URL state
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-"); // Separating the URL sort state
  const modifier = direction === "asc" ? 1 : -1; // Creating modifier to change the direction

  // Sorting the filtered cabins
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  // Returned JSX
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
