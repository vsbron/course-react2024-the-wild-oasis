import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ProtectedRouteProps } from "../lib/types";

import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Getting the navigate function from useNavigate hook
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there's NO authenticated user -> Redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading, show Spinner
  if (isLoading)
    // Returned JSX
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user -> Render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
