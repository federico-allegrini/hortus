import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "../../lib/getTranslation";
import CultivationArea from "./CultivationArea";
import ErrorMessage from "../ErrorMessage";
import styled from "styled-components";
import { perPage } from "../../config";
import { useUser } from "../User";

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
`;

export default function CultivationAreas({ page }) {
  const { t } = useTranslation();
  const user = useUser();
  const { data, loading, error } = useQuery(ALL_CULTIVATION_AREAS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
      user: user?.id,
    },
  });
  if (loading) return <h3>{t.loading}...</h3>;
  if (error) return <ErrorMessage error={error} />;
  return (
    <CultivationAreasStyles>
      {data.allCultivationAreas.map((cultivationArea) => (
        <CultivationArea
          key={cultivationArea.id}
          cultivationArea={cultivationArea}
        />
      ))}
    </CultivationAreasStyles>
  );
}
