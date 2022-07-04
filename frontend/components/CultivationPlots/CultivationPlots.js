import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "../../lib/getTranslation";
import CultivationPlot from "./CultivationPlot";
import ErrorMessage from "../ErrorMessage";
import styled from "styled-components";
import { perPage } from "../../config";
import Link from "next/link";
import Loader from "../Loader";
import { useRouter } from "next/router";
import { NoItemsStyles } from "../styles/AllItemsStyles";

export const ALL_CULTIVATION_PLOTS_QUERY = gql`
  query ALL_CULTIVATION_PLOTS_QUERY(
    $skip: Int = 0
    $first: Int
    $cultivationArea: ID!
  ) {
    allCultivationPlots(
      skip: $skip
      first: $first
      where: { cultivationArea: { id: $cultivationArea } }
    ) {
      id
      name
      description
      height
      width
      type
    }
  }
`;

// TODO: Same for areas and plots
const CultivationPlotsStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  margin-bottom: 10px;
`;

export default function CultivationPlots({ page, cultivationArea }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, loading, error } = useQuery(ALL_CULTIVATION_PLOTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
      cultivationArea: cultivationArea,
    },
  });
  console.log(page * perPage - perPage, perPage);
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  const allCultivationPlots = data.allCultivationPlots;
  if (allCultivationPlots.length === 0 && page === 1)
    return (
      <NoItemsStyles>
        {/* TODO: translation */}
        <h3>{t.noCultivationPlotsCreated}</h3>
        <Link href={`/${t.createNewCultivationPlotLink}`}>
          {t.createNewCultivationPlot}
        </Link>
      </NoItemsStyles>
    );
  else if (allCultivationPlots.length === 0 && page > 1)
    router.push({ pathname: `/${t.cultivationPlotsLink}` });
  return (
    <CultivationPlotsStyles>
      {allCultivationPlots.map((cultivationPlot) => (
        <CultivationPlot
          key={cultivationPlot.id}
          cultivationPlot={cultivationPlot}
        />
      ))}
    </CultivationPlotsStyles>
  );
}
