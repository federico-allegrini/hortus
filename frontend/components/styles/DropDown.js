import styled, { keyframes } from "styled-components";

const DropDown = styled.div`
  position: absolute;
  width: 90%;
  left: 5%;
  margin-top: 10px;
  z-index: 2;
  border-radius: var(--borderRadius);
  box-shadow: var(--bs);
  background: var(--havana);
  @media (max-width: 700px) {
    width: 95%;
    left: 2.5%;
    margin-top: 10px;
  }
`;

const DropDownItem = styled.div`
  color: var(--green);
  font-weight: 600;
  font-size: 1rem;
  font-family: "Gascogne Serial";
  background: var(--havana);
  margin-bottom: 2px;
  background: ${(props) =>
    props.highlighted ? "var(--havana)" : "var(--lightHavana)"};
  padding: 0.5rem;
  transition: all 0.2s;
  ${(props) => (props.highlighted ? "padding-left: 2rem;" : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${(props) =>
      props.highlighted ? "var(--lightGreen)" : "var(--darkHavana)"};
  img {
    margin-right: 10px;
    border-radius: var(--borderRadius);
    box-shadow: var(--bs);
  }
  &:first-child {
    border-radius: var(--borderRadius) var(--borderRadius) 0 0;
  }
  &:last-child {
    border-radius: 0 0 var(--borderRadius) var(--borderRadius);
    margin-bottom: 0;
  }
  cursor: pointer;
`;

const glow = keyframes`
  from {
    background: var(--lightGreen)
  }

  to {
    background: var(--darkHavana);
  }
`;

const SearchStyles = styled.div`
  position: relative;
  [role="combobox"] {
    height: 100%;
  }
  @media (max-width: 700px) {
    width: 100%;
    border-bottom: 2px solid var(--white);
  }
  input {
    width: 100%;
    border: 0;
    font-size: 0.7em;
    border-radius: var(--borderRadius) 0 0 var(--borderRadius);
    height: 100%;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
    @media (max-width: 700px) {
      border-radius: var(--borderRadius) var(--borderRadius) 0 0;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
