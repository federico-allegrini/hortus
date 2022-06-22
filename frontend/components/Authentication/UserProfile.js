import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "../../lib/getTranslation";
import { useUser } from "../User";

const UserProfileStyles = styled.div`
  background: var(--havana);
  border-radius: var(--borderRadius);
  box-shadow: var(--bs);
  padding-top: 20px;
  h2 {
    font-family: "Gascogne Serial";
    text-align: center;
    color: var(--green);
    font-weight: 900;
    padding: 0 10px;
    box-shadow: var(--bs);
    background-color: var(--lightHavana);
    margin: 0 auto 0 auto;
    display: block;
    width: fit-content;
    border-radius: var(--borderRadius);
  }
  p {
    line-height: 2;
    font-weight: 400;
    flex-grow: 1;
    padding: 0 3rem 0.5rem 3rem;
    font-size: 1.3rem;
    color: var(--green);
    padding-bottom: 20px;
  }
  max-width: var(--maxWidth);
`;

export default function UserProfile() {
  const { t } = useTranslation();
  const user = useUser();
  return (
    <UserProfileStyles>
      <Head>
        <title>
          Hortus | {t.user} {user.name}
        </title>
      </Head>
      <div className="details">
        <h2>{t.yourProfile}</h2>
        <p>
          {t.userName}: <strong>{user.name}</strong>
          <br></br>
          {t.email}: <strong>{user.email}</strong>
        </p>
      </div>
    </UserProfileStyles>
  );
}
