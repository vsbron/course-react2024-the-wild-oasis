import { useState } from "react";

import { useLogin } from "./useLogin";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  // Setting the state for controlled elements
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Getting the isLoading state and mutation function from custom hook
  const { login, isLoading } = useLogin();

  // Submit handler
  function handleSubmit(e) {
    // Preventing default behavior
    e.preventDefault();

    // Guard clause
    if (!email || !password) return;

    // Logging in using mutation function
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  // Returned JSX
  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="dummy@email.com"
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          placeholder="123123"
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
