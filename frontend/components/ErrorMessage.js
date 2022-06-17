import styled from "styled-components";
import React from "react";
import { useTranslation } from "../lib/getTranslation";

import PropTypes from "prop-types";

const ErrorStyles = styled.div`
  padding: 0.7rem 1rem;
  background: white;
  margin: 1rem 0 2rem 0;
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-left: 6px solid var(--red);
  border-right: 6px solid var(--red);
  border-radius: var(--borderRadius);
  color: var(--green);
  box-shadow: var(--bs);
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 0.7rem;
  }
`;

function messageTranslation(message, t) {
  return message
    .replace("GraphQL error: ", "")
    .replace("Authentication failed", t.authenticationFailed);
}

const ErrorMessage = ({ error }) => {
  const { t } = useTranslation();
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>{t.error}!</strong>
          {messageTranslation(error.message, t)}
        </p>
      </ErrorStyles>
    ));
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>{t.error}!</strong>
        {messageTranslation(error.message, t)}
      </p>
    </ErrorStyles>
  );
};

ErrorMessage.defaultProps = {
  error: {},
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
