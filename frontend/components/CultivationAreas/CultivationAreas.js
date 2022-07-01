import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "../../lib/getTranslation";
import CultivationArea from "./CultivationArea";
import ErrorMessage from "../ErrorMessage";
import styled from "styled-components";
import { perPage } from "../../config";
import Link from "next/link";
import Loader from "../Loader";
import { useRouter } from "next/router";

export const ALL_CULTIVATION_AREAS_QUERY = gql`
  query ALL_CULTIVATION_AREAS_QUERY($skip: Int = 0, $first: Int, $user: ID!) {
    allCultivationAreas(
      skip: $skip
      first: $first
      where: { user: { id: $user } }
    ) {
      id
      name
      description
      active
      width
      height
      photos {
        id
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

const CultivationAreasStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  margin-bottom: 10px;
`;

const NoAreasStyles = styled.div`
  display: block;
  color: var(--lightGreen);
  text-align: center;
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

export default function CultivationAreas({ page, user }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, loading, error } = useQuery(ALL_CULTIVATION_AREAS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
      user: user.id,
    },
  });
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  const allCultivationAreas = data.allCultivationAreas;
  if (allCultivationAreas.length === 0 && page === 1)
    return (
      <NoAreasStyles>
        <h3>{t.noCultivationAreasCreated}</h3>
        <Link href={`/${t.createNewCultivationAreaLink}`}>
          {t.createNewCultivationArea}
        </Link>
      </NoAreasStyles>
    );
  else if (allCultivationAreas.length === 0 && page > 1)
    router.push({ pathname: `/${t.cultivationAreasLink}` });
  return (
    <CultivationAreasStyles>
      {allCultivationAreas.map((cultivationArea) => (
        <CultivationArea
          key={cultivationArea.id}
          cultivationArea={cultivationArea}
        />
      ))}
    </CultivationAreasStyles>
  );
}
