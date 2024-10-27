import styled, { css } from "styled-components";

import { RowProps } from "../lib/types";

const Row = styled.div<RowProps>`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `};
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `};
`;

// Setting the default prop for the styled component
Row.defaultProps = { type: "vertical" };

export default Row;
