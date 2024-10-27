import React from "react";
import styled from "styled-components";

import { FormRowProps } from "../lib/types";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }: FormRowProps) {
  // Type guard to ensure children is a valid React element
  const childElement = React.isValidElement(children) ? children : null;

  // Returned JSX
  return (
    <StyledFormRow>
      {label && childElement && (
        <Label htmlFor={childElement.props.id}>{label}</Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
