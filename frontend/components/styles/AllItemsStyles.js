import styled from "styled-components";

const NoItemsStyles = styled.div`
  display: block;
  color: var(--lightGreen);
  text-align: center;
  a {
    width: auto;
    background: var(--green);
    border-radius: var(--borderRadius);
    box-shadow: var(--bs);
    color: white;
    border: 0;
    font-size: 1.5rem;
    font-weight: 600;
    font-family: "Gascogne Serial";
    padding: 0.5rem 1.2rem;
    margin: 10px 15px 5px 0;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      background: var(--lightGreen);
      text-decoration: none;
      &:disabled {
        background: var(--green);
      }
    }
    @media (max-width: 700px) {
      width: 100%;
    }
  }
`;

const GridItemsStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  margin-bottom: 10px;
`;

export { NoItemsStyles, GridItemsStyles };
