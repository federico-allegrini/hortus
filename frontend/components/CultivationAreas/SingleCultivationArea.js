import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { blurDataURL_CultivationArea } from "../../config";
import formatSize from "../../lib/formatSize";
import ErrorMessage from "../ErrorMessage";

const CultivationAreaStyles = styled.div`
  max-width: var(--maxWidth);
  .image-parent {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 10px;
    .custom-img {
      object-fit: cover;
      width: 100% !important;
      position: relative !important;
      height: unset !important;
      min-height: 300px !important;
    }
    .unset-img {
      width: 100%;
      span {
        position: unset !important;
      }
    }
    @media (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const SINGLE_CULTIVATION_AREA = gql`
  query SINGLE_CULTIVATION_AREA($id: ID!) {
    CultivationArea(where: { id: $id }) {
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
    }
  }
`;

export default function SingleCultivationArea({ id, t }) {
  const { data, loading, error } = useQuery(SINGLE_CULTIVATION_AREA, {
    variables: {
      id,
    },
  });
  if (loading) return <h3>{t.loading}...</h3>;
  if (error) return <ErrorMessage error={error} t={t} />;
  const { CultivationArea } = data;
  return (
    <CultivationAreaStyles>
      <Head>
        <title>Hortus | {CultivationArea.name}</title>
      </Head>
      <div className="details">
        <h2>{CultivationArea.name}</h2>
        <p>{CultivationArea.description}</p>
        <p>
          {t.dimensions}: {formatSize(CultivationArea.width, "m")}x
          {formatSize(CultivationArea.height, "m", true, true)}
        </p>
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
    </CultivationAreaStyles>
  );
}
