import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useTranslation } from "../lib/getTranslation";
import Nav from "./Nav";
import SubBarStyles from "./styles/SubBarStyles";
import { useUser } from "./User";

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  background: var(--green);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }
`;

function getSubBarElements(router, t) {
  const categoryPath = router.asPath.split("/")[1];
  let elements = null;
  // TODO: Add new links
  switch (categoryPath) {
    case t.cultivationAreasLink:
    default:
      elements = (
        <>
          <input
            type={"search"}
            placeholder={`${t.search} ${t.cultivationAreas.toLowerCase()}`}
          />
          <Link href={`/${t.createNewCultivationAreaLink}`}>
            {t.createNewCultivationArea}
          </Link>
          <Link href={`/${t.cultivationAreasLink}`}>
            {t.myCultivationAreas}
          </Link>
        </>
      );
      break;
  }
  return elements;
}

export default function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useUser();
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">{t.logoName}</Link>
        </Logo>
        <Nav user={user} />
      </div>
      {user && <SubBarStyles>{getSubBarElements(router, t)}</SubBarStyles>}
    </HeaderStyles>
  );
}
