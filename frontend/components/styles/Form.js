import styled, { keyframes } from "styled-components";

const progress = keyframes`
  0%{
    width: 2%;
    background-color: var(--lightGreen);
  }
  100%{
      width: 100%;
      background-color: var(--green);
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: var(--havana);
  border-radius: var(--borderRadius);
  padding: 40px 30px 20px 30px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
    margin-top: 1rem;
    color: var(--green);
    span {
      font-size: 1.2rem;
      color: var(--green);
    }
  }
  h1 {
    span {
      font-style: italic;
      color: var(--green);
    }
  }
  h2 {
    color: var(--green);
    margin-top: 0;
  }
  fieldset > p {
    color: var(--green);
    background: var(--darkHavana);
    padding: 0.5rem;
    font-size: 1.4rem;
    border-radius: var(--borderRadius);
    box-shadow: var(--boxShadow);
    span {
      color: var(--lightGreen);
    }
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.7rem;
    font-size: 1rem;
    font-family: inherit;
    border: none;
    border-radius: var(--borderRadius);
    box-shadow: var(--bs);
    color: var(--green);
    &:focus {
      outline: 0;
    }
  }
  textarea {
    resize: none;
    width: 100%;
  }
  input[type="file"] {
    display: none;
  }
  button,
  input[type="submit"],
  .photosButton {
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
      &:disabled {
        background: var(--green);
      }
    }
    @media (max-width: 700px) {
      width: 100%;
    }
  }
  .photosButton {
    width: 100%;
    text-align: center;
    margin: 30px 0 20px 0;
    background: var(--white);
    color: var(--green);
    letter-spacing: 2px;
    &:hover {
      background: var(--lightHavana);
    }
  }
  input[type="checkbox"] {
    width: auto;
    margin: 0 10px;
    filter: grayscale(1);
  }
  fieldset {
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 6px;
      content: "";
      display: block;
      margin: auto;
      box-shadow: var(--bs);
      border-radius: var(--borderRadius);
      background-color: var(--green);
    }
    &[aria-busy="true"]::before {
      animation: ${progress} 2s infinite alternate;
    }
  }
`;

export default Form;
