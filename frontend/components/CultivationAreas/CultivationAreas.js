import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "../../lib/getTranslation";
import CultivationArea from "./CultivationArea";
import ErrorMessage from "../ErrorMessage";
import { perPageArea } from "../../config";
import Link from "next/link";
import Loader from "../Loader";
import { useRouter } from "next/router";
import { GridItemsStyles, NoItemsStyles } from "../styles/AllItemsStyles";

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

export default function CultivationAreas({ page, user }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, loading, error } = useQuery(ALL_CULTIVATION_AREAS_QUERY, {
    variables: {
      skip: page * perPageArea - perPageArea,
      first: perPageArea,
      user: user.id,
    },
  });
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  const allCultivationAreas = data.allCultivationAreas;
  if (allCultivationAreas.length === 0 && page === 1)
    return (
      <NoItemsStyles>
        <h3>{t.noCultivationAreasCreated}</h3>
        <Link href={`/${t.createNewCultivationAreaLink}`}>
          {t.createNewCultivationArea}
        </Link>
      </NoItemsStyles>
    );
  else if (allCultivationAreas.length === 0 && page > 1)
    router.push({ pathname: `/${t.cultivationAreasLink}` });
  return (
    <GridItemsStyles>
      {allCultivationAreas.map((cultivationArea) => (
        <CultivationArea
          key={cultivationArea.id}
          cultivationArea={cultivationArea}
        />
      ))}
    </GridItemsStyles>
  );
}
