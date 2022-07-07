import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import SignInMessage from "./Authentication/SignInMessage";
import Header from "./Header";
import { useUser } from "./User";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Plain';
    src: url('/static/Plain-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Gascogne Serial';
    src: url('/static/GascogneSerial-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    --green: #07503F;
    --lightGreen: #6A968B;
    --red: #c62828;
    --yellow: #FADC15;
    --black: #393939;
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --white: #ffffff;
    --transparentWhite: rgba(255,255,255,0.75);
    --offWhite: #ededed;
    --havana: #E8E7DD;
    --darkHavana: #d0cfc6;
    --lightHavana: #F8f7f4;
    --maxWidth: 1250px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    --borderRadius: 10px;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Plain', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
    background-color: var(--white);
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'Plain', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  h1, h2 {
    font-family: 'Gascogne Serial';
    color: var(--green);
    margin: 0;
    text-align: center ;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

export default function Page({ children }) {
  const user = useUser();
  const router = useRouter();
  return (
    <div>
      <GlobalStyles />
      <Header />
      {!user && router.pathname !== "/signin" ? (
        <SignInMessage />
      ) : (
        <InnerStyles>{children}</InnerStyles>
      )}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
