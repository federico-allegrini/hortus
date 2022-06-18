import styled from "styled-components";

const PaginationStyles = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  align-content: center;
  margin: 3rem auto;
  font-size: 0.7em;
  color: var(--green);
  border-radius: var(--borderRadius);
  box-shadow: var(--bs);
  background: var(--havana);
  padding: 0;
  @media (max-width: 700px) {
    margin: 0 auto 3rem auto;
  }
  & > * {
    margin: 0;
    padding: 0.5rem;
    height: 100%;
    &:first-child {
      color: var(--white);
      border-radius: 6px 0 0 6px;
    }
    &:nth-child(2) {
      border-right: 3px solid var(--lightGreen);
    }
    &:last-child {
      border-right: 0;
      color: var(--white);
      border-radius: 0 6px 6px 0;
    }
  }
  a {
    background: var(--green);
    font-family: "Gascogne Serial";
    transition: all 0.3s ease-in-out;
    font-weight: bold;
    &:hover {
      text-decoration: none;
      background-color: var(--lightGreen);
    }
  }
  a[aria-disabled="true"] {
    color: var(--havana);
    pointer-events: none;
    cursor: not-allowed;
  }
`;

export default PaginationStyles;
