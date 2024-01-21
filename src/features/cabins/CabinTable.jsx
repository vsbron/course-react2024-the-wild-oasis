import { useSearchParams } from "react-router-dom";

import useCabins from "./useCabins";

import CabinRow from "./CabinRow";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  // Getting the isLoading state and the data from Custom hook
  const { isLoading, cabins } = useCabins();

  // Getting the state from the URL
  const [searchParams] = useSearchParams();

  // Guard clause, if data is still loading display Loading spinner
  if (isLoading) return <Spinner />;

  // Getting the filter value from the URL state
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
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
