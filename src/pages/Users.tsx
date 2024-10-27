import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function NewUsers() {
  // Returned JSX
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
