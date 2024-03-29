import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import ClientOnly from "../../components/ClientOnly";
import SingleCultivationArea from "../../components/CultivationAreas/SingleCultivationArea";
import CultivationPlots from "../../components/CultivationPlots/CultivationPlots";
import Pagination from "../../components/Pagination";
import { useTranslation } from "../../lib/getTranslation";
import { useUser } from "../../components/User";
import styled from "styled-components";
import { perPagePots } from "../../config";
import alertRedirect from "../../lib/alertRedirect";
import formatId from "../../lib/formatId";

export const CULTIVATION_PLOTS_PAGINATION_QUERY = gql`
  query CULTIVATION_PLOTS_PAGINATION_QUERY($cultivationArea: ID!) {
    _allCultivationPlotsMeta(
      where: { cultivationArea: { id: $cultivationArea } }
    ) {
      count
    }
  }
`;

const PlotsTitleStyles = styled.h2`
  margin: 50px auto 90px auto;
`;

export default function AllCultivationPlots() {
  const { t } = useTranslation();
  const user = useUser();
  const { query } = useRouter();
  const queryName = "_allCultivationPlotsMeta";
  const page = parseInt(query.page) || 1;
  const cultivationAreaId = formatId(query[t.cultivationAreaId]);
  const queryParams = `${t.cultivationAreaId}=${cultivationAreaId}`;
  if (
    alertRedirect(
      cultivationAreaId,
      t.firstSelectACultivationArea,
      `/${t.cultivationAreasLink}`
    )
  )
    return null;
  const variables = { cultivationArea: cultivationAreaId };
  return (
    <div>
      <SingleCultivationArea id={cultivationAreaId} user={user} />
      <PlotsTitleStyles> - {t.cultivationPlots} - </PlotsTitleStyles>
      <ClientOnly>
        <CultivationPlots page={page} cultivationArea={cultivationAreaId} />
      </ClientOnly>
      <Pagination
        page={page}
        perPage={perPagePots}
        path={t.cultivationPlotsLink}
        items={t.cultivationPlots}
        PAGINATION_QUERY={CULTIVATION_PLOTS_PAGINATION_QUERY}
        queryName={queryName}
        variables={variables}
        queryParams={queryParams}
      />
    </div>
  );
}
