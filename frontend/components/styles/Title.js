import styled from "styled-components";

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  margin-top: -3rem;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  a {
    background: var(--green);
    display: inline;
    line-height: 1.3;
    font-size: 4rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
`;

export default Title;