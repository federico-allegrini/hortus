import { gql } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useTranslation } from "../lib/getTranslation";
import Nav from "./Nav";
import Search from "./Search";
import SubBarStyles from "./styles/SubBarStyles";
import { useUser } from "./User";

const Logo = styled.h1`
  font-size: 2rem;
  margin: 1rem;
  position: relative;
  z-index: 2;
  background: var(--white);
  border-radius: var(--borderRadius);
  border: 5px solid var(--green);
  font-weight: 900;
  box-shadow: var(--bs);
  transition: all 0.3s;
  &:hover,
  &:focus {
    background: var(--lightHavana);
  }
  a {
    color: var(--green);
    text-decoration: none;
    font-family: "Gascogne Serial";
    padding: 0.5rem 1rem;
    &:hover,
    &:focus {
      outline: none;
      text-decoration: none;
    }
  }
`;

const HeaderStyles = styled.header`
  .bar {
    margin: 14px;
    border-radius: var(--borderRadius);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    box-shadow: var(--bs);
    background: var(--havana);
  }
`;

function getSubBarElements(router, t) {
  const categoryPath = router.asPath.split("/")[1];
  let elements = null;
  switch (categoryPath) {
    case t.cultivationAreasLink:
      const CULTIVATION_AREAS_QUERY = gql`
        query SEARCH_CULTIVATION_AREAS_QUERY($searchTerm: String!) {
          searchTerms: allCultivationAreas(
            where: {
              OR: [
                { name_contains_i: $searchTerm }
                { description_contains_i: $searchTerm }
              ]
            }
          ) {
            id
            name
            photos {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      `;
      elements = (
        <>
          <Search
            query={CULTIVATION_AREAS_QUERY}
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
    default:
      elements = null;
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
