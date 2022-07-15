import styled, { css } from "styled-components";

const baseButtonStyles = css`
  margin: 1rem 0;
  z-index: 1;
  background: var(--green);
  border-radius: var(--borderRadius);
  box-shadow: var(--bs);
  transition: all 0.3s ease-in-out;
  margin: 10px auto;
  font-weight: 600;
  &:hover {
    background: var(--lightGreen);
  }
  a {
    display: block;
    line-height: 1.3;
    font-size: 1.3rem;
    text-align: center;
    color: var(--white);
    padding: 0.7rem 1.4rem;
    transition: all 0.3s ease-in-out;
    font-family: "Gascogne Serial";
    &:hover {
      text-decoration: none;
    }
  }
`;

const SmallButtonGreen = styled.div`
  ${baseButtonStyles}
`;

const SmallButtonWhite = styled.div`
  ${baseButtonStyles}
  background: var(--white);
  a {
    color: var(--green);
  }
  &:hover {
    background: var(--lightHavana);
  }
`;

export { SmallButtonGreen, SmallButtonWhite };
