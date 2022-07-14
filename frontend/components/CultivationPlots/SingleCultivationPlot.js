import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "../../lib/getTranslation";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import alertRedirect from "../../lib/alertRedirect";
import formatSize from "../../lib/formatSize";

// TODO: Same for areas and plots
const CultivationPlotStyles = styled.div`
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
      &:first-child:last-child > * {
        border-radius: 0 0 var(--borderRadius) var(--borderRadius);
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

export const SINGLE_CULTIVATION_PLOT = gql`
  query SINGLE_CULTIVATION_PLOT($id: ID!, $cultivationAreaId: ID!) {
    allCultivationPlots(
      where: {
        AND: [{ id: $id }, { cultivationArea: { id: $cultivationAreaId } }]
      }
    ) {
      id
      name
      description
      width
      height
      type
      cultivationArea {
        name
      }
    }
  }
`;

export default function SingleCultivationPlot({ id, cultivationAreaId }) {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(SINGLE_CULTIVATION_PLOT, {
    variables: {
      id,
      cultivationAreaId,
    },
  });
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  const [CultivationPlot] = data.allCultivationPlots;
  if (
    alertRedirect(
      CultivationPlot,
      t.noCultivationPlotsFound,
      `/${t.cultivationPlotsLink}?cultivation-area-id=${cultivationAreaId}`
    )
  )
    return null;
  return (
    <CultivationPlotStyles>
      <Head>
        <title>Hortus | {CultivationPlot.name}</title>
      </Head>
      <div className="details">
        <h2>{CultivationPlot.name}</h2>
        <p>
          {CultivationPlot.description}
          <br></br>
          {t.dimensions}: {formatSize(CultivationPlot.width, "m")}x
          {formatSize(CultivationPlot.height, "m", true, true)}
          <br></br>
          {t.type}: {CultivationPlot.type}
          <br></br>
          {t.cultivationArea}: {CultivationPlot.cultivationArea.name}
        </p>
      </div>
    </CultivationPlotStyles>
  );
}
