import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "../../lib/getTranslation";
import CultivationArea from "./CultivationArea";
import ErrorMessage from "../ErrorMessage";
import styled from "styled-components";

export const ALL_CULTIVATION_AREAS_QUERY = gql`
  query ALL_CULTIVATION_AREAS_QUERY {
    allCultivationAreas {
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
      }
    }
  }
`;

const CultivationAreasStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function CultivationAreas() {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(ALL_CULTIVATION_AREAS_QUERY);
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
