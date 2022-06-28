import Link from "next/link";
import styled from "styled-components";
import { useTranslation } from "../lib/getTranslation";

const HomeStyles = styled.div`
  display: block;
  color: var(--lightGreen);
  text-align: center;
  h3 {
    margin-top: 0;
  }
  a {
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
      text-decoration: none;
      &:disabled {
        background: var(--green);
      }
    }
    @media (max-width: 700px) {
      width: 100%;
    }
  }
`;

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <HomeStyles>
      <h1>{t.welcomeInHortus}!</h1>
      <h3>{t.startFormYourCultivatonAreas}</h3>
      <Link href={`/${t.cultivationAreasLink}`}>{t.cultivationAreas}</Link>
    </HomeStyles>
  );
}
