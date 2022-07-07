import styled, { css } from "styled-components";

const baseButtonStyles = css`
  margin: 1rem 0;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  a {
    background: var(--green);
    display: inline;
    line-height: 1.3;
    font-size: 1.3rem;
    text-align: center;
    color: var(--white);
    padding: 0.7rem 1.4rem;
    transition: all 0.3s ease-in-out;
    border-radius: var(--borderRadius);
    box-shadow: var(--bs);
    font-family: "Gascogne Serial";
    &:hover {
      text-decoration: none;
      background: var(--lightGreen);
    }
  }
`;

const SmallButtonGreen = styled.h4`
  ${baseButtonStyles}
`;

const SmallButtonWhite = styled.h4`
  ${baseButtonStyles}
  a {
    background: var(--white);
    color: var(--green);
    &:hover {
      background: var(--lightHavana);
    }
  }
`;

export { SmallButtonGreen, SmallButtonWhite };
