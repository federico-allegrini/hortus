import { useQuery, gql } from "@apollo/client";
import CultivationArea from "./CultivationArea";
import styled from "styled-components";

const ALL_CULTIVATION_AREAS_QUERY = gql`
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
  const { data, loading, error } = useQuery(ALL_CULTIVATION_AREAS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Eror: {error.message}</p>;
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
