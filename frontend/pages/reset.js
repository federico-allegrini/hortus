import styled from "styled-components";
import RequestReset from "../components/Authentication/RequestReset";
import Reset from "../components/Authentication/Reset";
import { useTranslation } from "../lib/getTranslation";

const ResetStyles = styled.div`
  & > p {
    color: var(--green);
    text-align: center;
  }
`;

export default function ResetPage({ query }) {
  const { t } = useTranslation();
  const { token } = query;
  if (!token) {
    return (
      <ResetStyles>
        <p>
          {t.sorry}, {t.youMustSupplyAToken.toLowerCase()}.
        </p>
        <RequestReset />
      </ResetStyles>
    );
  }
  return <Reset token={token} />;
}
