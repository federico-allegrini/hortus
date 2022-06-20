import styled from "styled-components";

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  a,
  button,
  select,
  option {
    color: var(--green);
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 400;
    font-size: 0.8em;
    background: none;
    border: 0;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    option {
      font-size: 0.7em;
    }
    &:after {
      height: 2px;
      opacity: 0.8;
      background: var(--green);
      content: "";
      border-radius: var(--borderRadius);
      width: 90%;
      margin-top: 2.5rem;
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
  }
  select {
    font-size: 0.6em;
    border-left: 3px solid var(--darkHavana);
    font-weight: 600;
    height: 101%;
    font-family: 'Plain';
    padding-right: 0px;
    padding-left: 13px;
    margin-right: 8px;
    padding-top: 9px;
    margin-left: 14px;
}

  }
  @media (max-width: 1300px) {
    width: 100%;
    justify-content: right;
    font-size: 1.5rem;
  }
`;

export default NavStyles;
