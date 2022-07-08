import styled from "styled-components";

// TODO: Fix CSS

const SelectStyles = styled.div`
  width: 100%x;
  margin: 1em 0;
  position: relative;
  cursor: pointer;
  input[type="radio"] {
    position: absolute;
    left: -9999px;
  }

  .title {
    display: block;
    margin-bottom: 1rem;
    margin-top: 1rem;
    color: var(--green);
    display: block;
    width: 100%;
    border-radius: var(--borderRadius);
    box-shadow: var(--bs);
    border: 0;
    font-size: 1.5rem;
    font-weight: 600;
    font-family: "Gascogne Serial";
    padding: 0.5rem 1.2rem;
    margin: 10px 15px 5px 0;
    /* transition: all 0.3s ease-in-out; */
    text-align: center;
    background: var(--white);
    color: var(--green);
    letter-spacing: 2px;
  }

  &:hover {
    .title {
      background: var(--lightHavana);
    }

    .objects {
      max-height: 540px;
      background: var(--green);
      input[type="radio"] + span {
        position: relative;
        top: 0;
        &:hover {
          background: var(--lightGreen);
          color: var(--white);
        }
      }

      label:nth-last-of-type(1) {
        input[type="radio"]:checked + span {
          border-radius: var(--borderRadius);
        }
      }
    }
    input[type="radio"]:checked + span {
      border-radius: var(--borderRadius);
    }
  }

  .objects {
    position: absolute;
    top: 0;
    padding-top: 2.1em;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    max-height: 0;
    /* transition: all 500ms ease; */
    margin-bottom: 20px;
    border-radius: var(--borderRadius);
    margin-bottom: 50px;
  }

  input[type="radio"] + span {
    background: var(--white);
    color: var(--green);
    padding: 1em;
    display: block;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    margin: 1em 0;
    width: 90%;
    left: 5%;
    font-family: "Gascogne Serial";
    /* transition: all 500ms ease-in-out; */
    border-radius: var(--borderRadius);
    box-shadow: var(--bs);
    background: var(--lightHavana);
  }

  input[type="radio"]:checked + span {
    /* background: var(--lightGreen); */
    position: absolute;
    top: 0;
    margin: 0;
    border-radius: var(--borderRadius);
    font-family: "Gascogne Serial";
  }
`;

export { SelectStyles };
