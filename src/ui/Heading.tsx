import styled, { css } from "styled-components";

import { HeadingProps } from "../lib/types";

import { device } from "../styles/GlobalStyles";

// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: yellow;"}
// `;

const Heading = styled.h1<HeadingProps>`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 30px;
      font-weight: 600;
    `};
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `};
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `};
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;

      @media ${device.mobile} {
        font-size: 2.5rem;
      }
    `};

  line-height: 1.4;
`;

export default Heading;
