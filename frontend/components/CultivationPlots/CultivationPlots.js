import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "../../lib/getTranslation";
import CultivationPlot from "./CultivationPlot";
import ErrorMessage from "../ErrorMessage";
import styled from "styled-components";
import { perPage } from "../../config";
import Link from "next/link";
import Loader from "../Loader";
import { useRouter } from "next/router";
import { GridItemsStyles, NoItemsStyles } from "../styles/AllItemsStyles";

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

export default function CultivationPlots({ page, cultivationArea }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, loading, error } = useQuery(ALL_CULTIVATION_PLOTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
      cultivationArea,
    },
  });
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  const allCultivationPlots = data.allCultivationPlots;
  if (allCultivationPlots.length === 0 && page === 1)
    return (
      <NoItemsStyles>
        <h3>{t.noCultivationPlotsCreated}</h3>
        <Link href={`/${t.createNewCultivationPlotLink}`}>
          {t.createNewCultivationPlot}
        </Link>
      </NoItemsStyles>
    );
  else if (allCultivationPlots.length === 0 && page > 1)
    router.push({ pathname: `/${t.cultivationPlotsLink}` });
  return (
    <GridItemsStyles>
      {allCultivationPlots.map((cultivationPlot) => (
        <CultivationPlot
          key={cultivationPlot.id}
          cultivationPlot={cultivationPlot}
        />
      ))}
    </GridItemsStyles>
  );
}
