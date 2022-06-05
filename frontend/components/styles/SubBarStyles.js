import styled from "styled-components";

const SubBarStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  border-bottom: 6px solid var(--black, black);
  select {
    font-size: 0.9em;
  }
  input {
    min-width: 390px;
  }
  a,
  button,
  select,
  option,
  input {
    color: var(--black);
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 0.5em;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 15px;
      padding: 10px;
    }
    option {
      font-size: 0.7em;
    }
    &:before {
      content: "";
      width: 2px;
      background: var(--lightGray);
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: var(--green);
      content: "";
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(0.8, 0.3, 0, 1.2);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      text-decoration: none;
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
    @media (max-width: 700px) {
      width: 100%;
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
  @media (max-width: 1300px) {
    border-top: 1px solid var(--lightGray);
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
    input {
      min-width: 322px;
    }
  }
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default SubBarStyles;
