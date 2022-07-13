import styled from "styled-components";

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  margin-top: -2rem;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  a {
    background: var(--green);
    display: inline;
    line-height: 1.3;
    font-size: 3rem;
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
    @media (max-width: 1300px) {
      font-size: 2rem;
    }
    @media (max-width: 700px) {
      font-size: 1.8rem;
    }
  }
`;

export default Title;
