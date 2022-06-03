import { useQuery, gql } from "@apollo/client";

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

export default function CultivationAreas() {
  const { data, loading, error } = useQuery(ALL_CULTIVATION_AREAS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Eror: {error.message}</p>;
  return (
    <>
      {data.allCultivationAreas.map((cultivationArea) => (
        <div key={cultivationArea.id}>{cultivationArea.name}</div>
      ))}
    </>
  );
}
