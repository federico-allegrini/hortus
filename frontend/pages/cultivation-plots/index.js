import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import ClientOnly from "../../components/ClientOnly";
import SingleCultivationArea from "../../components/CultivationAreas/SingleCultivationArea";
import CultivationPlots from "../../components/CultivationPlots/CultivationPlots";
import Pagination from "../../components/Pagination";
import { useTranslation } from "../../lib/getTranslation";
import { useUser } from "../../components/User";
import styled from "styled-components";

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
  const { query, push } = useRouter();
  const queryName = "_allCultivationPlotsMeta";
  const page = parseInt(query.page) || 1;
  const urlQueryName = "cultivation-area-id";
  const cultivationAreaId = query[urlQueryName];
  const queryParams = `${urlQueryName}=${cultivationAreaId}`;
  if (!cultivationAreaId) {
    alert(t.firstSelectACultivationArea);
    push({ pathname: `/${t.cultivationAreasLink}` });
    return null;
  }
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
