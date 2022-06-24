import styled, { keyframes } from "styled-components";

const lds_ellipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;
const lds_ellipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;
const lds_ellipsis3 = keyframes`
 0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const LoaderStyles = styled.div`
  display: block;
  margin: 20px auto;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--green);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: ${lds_ellipsis1} 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: ${lds_ellipsis2} 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: ${lds_ellipsis2} 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: ${lds_ellipsis3} 0.6s infinite;
  }
`;

const Loader = () => {
  return (
    <LoaderStyles>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoaderStyles>
  );
};

export default Loader;
