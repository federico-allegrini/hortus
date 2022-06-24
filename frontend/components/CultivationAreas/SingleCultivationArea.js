import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { blurDataURL_CultivationArea } from "../../config";
import { useTranslation } from "../../lib/getTranslation";
import formatSize from "../../lib/formatSize";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";

const CultivationAreaStyles = styled.div`
  background: var(--havana);
  border-radius: var(--borderRadius);
  box-shadow: var(--bs);
  padding-top: 20px;
  h2 {
    font-family: "Gascogne Serial";
    text-align: center;
    color: var(--green);
    font-weight: 900;
    padding: 0 10px;
    box-shadow: var(--bs);
    background-color: var(--lightHavana);
    margin: 0 auto 0 auto;
    display: block;
    width: fit-content;
    border-radius: var(--borderRadius);
  }
  p {
    line-height: 2;
    font-weight: 400;
    flex-grow: 1;
    padding: 0 3rem 0.5rem 3rem;
    font-size: 1.3rem;
    color: var(--green);
  }
  max-width: var(--maxWidth);
  .image-parent {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    & > * {
      &:first-child > * {
        border-radius: 0 0 0 var(--borderRadius);
      }
      &:last-child > * {
        border-radius: 0 0 var(--borderRadius) 0;
      }
      @media (max-width: 700px) {
        &:first-child > * {
          border-radius: 0;
        }
        &:last-child > * {
          border-radius: 0 0 var(--borderRadius) var(--borderRadius);
        }
      }
    }
    .custom-img {
      object-fit: cover;
      width: 100% !important;
      position: relative !important;
      height: unset !important;
      min-height: 300px !important;
      max-height: 300px !important;
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

export default function SingleCultivationArea({ id }) {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(SINGLE_CULTIVATION_AREA, {
    variables: {
      id,
    },
  });
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  const { CultivationArea } = data;
  return (
    <CultivationAreaStyles>
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
