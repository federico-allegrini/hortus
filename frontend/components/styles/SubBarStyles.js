import styled from "styled-components";

const SubBarStyles = styled.div`
  margin: 16px 33px;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  border-radius: var(--borderRadius);
  box-shadow: var(--bs);
  background: var(--green);
  select {
    font-size: 0.9em;
  }
  a,
  button,
  select,
  option,
  input {
    color: var(--white);
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 400;
    font-size: 0.7em;
    background: none;
    border: 0;
    cursor: pointer;
    &::placeholder {
      color: var(--transparentWhite);
      font-family: "Plain";
    }
    @media (max-width: 700px) {
      font-size: 15px;
      padding: 10px;
      border-bottom: 2px solid var(--white);
      width: 100%;
    }
    &:before {
      content: "";
      width: 2px;
      opacity: 0.8;
      background: var(--transparentWhite);
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 1.8px;
      opacity: 0.8;
      background: var(--white);
      content: "";
      border-radius: var(--borderRadius);
      width: 90%;
      margin-top: 2rem;
      content: "";
      position: absolute;
      left: 5%;
      pointer-events: none;
      transform-origin: 100% 50%;
      transform: scale3d(0, 1, 1);
      transition: transform 0.3s ease-in-out;
    }
    &:hover,
    &:focus {
      outline: none;
      text-decoration: none;
      &:after {
        transform-origin: 0% 50%;
        transform: scale3d(1, 1, 1);
        transition: transform 0.3s ease-in-out;
      }
    }
    @media (max-width: 700px) {
      text-align: center;
      justify-content: center;
      &:before,
      &:after {
        content: none;
      }
      &:hover,
      &:focus {
        outline-color: none;
        text-decoration: none;
        &:after {
          width: auto;
        }
        @media (max-width: 700px) {
          width: 100%;
          text-align: center;
        }
      }
    }
  }
  input {
    font-style: italic;
    min-width: 390px;
  }
  @media (max-width: 1300px) {
    font-size: 1.5rem;
    input {
      min-width: 322px;
      height: 100%;
    }
  }
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default SubBarStyles;
