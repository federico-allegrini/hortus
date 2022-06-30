import Link from "next/link";
import styled from "styled-components";
import { useTranslation } from "../../lib/getTranslation";

const SignInMessageStyles = styled.div`
  display: block;
  margin: 60px auto 20px auto;
  text-align: center;
  color: var(--green);
  a {
    font-weight: bold;
    color: var(--green);
  }
`;

export default function SignInMessage() {
  const { t } = useTranslation();
  return (
    <SignInMessageStyles>
      <Link href={`/${t.signInLink}`}>{t.signIn}</Link>
      <span> {t.toViewThisPage.toLowerCase()}.</span>
    </SignInMessageStyles>
  );
}
