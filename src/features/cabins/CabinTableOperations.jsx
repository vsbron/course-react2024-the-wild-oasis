import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
