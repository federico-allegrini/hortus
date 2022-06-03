import NProgress from "nprogress";
import Router from "next/router";
import Page from "../components/Page";
import getTranslation from "../lib/getTranslation";
import "../components/styles/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apolloClient";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} t={getTranslation()} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default MyApp;
