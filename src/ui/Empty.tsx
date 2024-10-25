import { EmptyProps } from "../lib/types";

function Empty({ resourceName }: EmptyProps) {
  // Returned JSX
  return <p>No {resourceName} could be found.</p>;
}

export default Empty;
