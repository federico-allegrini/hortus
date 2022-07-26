import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { blurDataURL_CultivationArea } from "../../config";
import { useTranslation } from "../../lib/getTranslation";
import formatSize from "../../lib/formatSize";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import Link from "next/link";
import { SmallButtonGreen } from "../styles/Button";
import alertRedirect from "../../lib/alertRedirect";
import { ItemStyles } from "../styles/SingleItemStyles";

export const SINGLE_CULTIVATION_AREA = gql`
  query SINGLE_CULTIVATION_AREA($id: ID!, $user: ID!) {
    allCultivationAreas(
      where: { AND: [{ id: $id }, { user: { id: $user } }] }
    ) {
      id
      name
      description
      active
      width
      height
      photos {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
      user {
        id
      }
    }
  }
`;

export default function SingleCultivationArea({ id, user }) {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(SINGLE_CULTIVATION_AREA, {
    variables: {
      id,
      user: user.id,
    },
  });
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  const [CultivationArea] = data.allCultivationAreas;
  if (
    alertRedirect(
      CultivationArea,
      t.noCultivationAreasFound,
      `/${t.cultivationAreasLink}`
    )
  )
    return null;
  return (
    <ItemStyles>
      <Head>
        <title>Hortus | {CultivationArea.name}</title>
      </Head>
      <div className="details">
        <h2>{CultivationArea.name}</h2>
        <p>
          {CultivationArea.description}
          <br></br>
          {t.dimensions}: {formatSize(CultivationArea.width, "m")}x
          {formatSize(CultivationArea.height, "m", true, true)}
          <br></br>
        </p>
        <SmallButtonGreen>
          <Link
            href={{
              pathname: `/${t.cultivationPlotsLink}`,
              query: {
                [t.cultivationAreaId]: CultivationArea.id,
              },
            }}
          >
            {t.cultivationPlots}
          </Link>
        </SmallButtonGreen>
        <SmallButtonGreen>
          <Link
            href={{
              pathname: `/${t.cultivationPlotsLink}/create`,
              query: {
                [t.cultivationAreaId]: CultivationArea.id,
              },
            }}
          >
            {t.createNewPlot}
          </Link>
        </SmallButtonGreen>
      </div>
      <div className="image-parent">
        {CultivationArea?.photos?.map((photo) => (
          <div className="unset-img" key={photo.altText}>
            <Image
              className="custom-img"
              src={photo.image.publicUrlTransformed}
              alt={photo.altText}
              layout="fill"
              loading="lazy"
              placeholder="blur"
              blurDataURL={blurDataURL_CultivationArea}
            />
          </div>
        ))}
      </div>
    </ItemStyles>
  );
}
