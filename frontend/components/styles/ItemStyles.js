import styled from "styled-components";

const ItemStyles = styled.div`
  background: var(--havana);
  border-radius: var(--borderRadius);
  box-shadow: var(--bs);
  position: relative;
  display: flex;
  flex-direction: column;
  .image-div {
    width: 100%;
    height: 400px;
    position: relative;
    img {
      border-radius: var(--borderRadius) var(--borderRadius) 0 0;
    }
  }
  p {
    line-height: 2;
    font-weight: 400;
    flex-grow: 1;
    padding: 0 3rem 0.5rem 3rem;
    font-size: 1.3rem;
    color: var(--green);
  }
  .buttonList {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 3px;
    & > * {
      border: 0;
      color: var(--white);
      background: var(--green);
      font-size: 1rem;
      padding: 1rem;
      transition: all 0.3s ease-in-out;
      &:first-child {
        border-radius: 0 0 0 var(--borderRadius);
      }
      &:last-child {
        border-radius: 0 0 var(--borderRadius) 0;
      }
      @media (max-width: 550px) {
        &:first-child {
          border-radius: 0 0 0 0;
        }
        &:last-child {
          border-radius: 0 0 var(--borderRadius) var(--borderRadius);
        }
      }
    }
    a,
    button {
      text-align: center;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        text-decoration: none;
        background-color: var(--lightGreen);
      }
    }
  }
`;

export default ItemStyles;
