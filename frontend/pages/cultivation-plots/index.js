import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import ClientOnly from "../../components/ClientOnly";
import CultivationPlots from "../../components/CultivationPlots/CultivationPlots";
import Pagination from "../../components/Pagination";
import { useTranslation } from "../../lib/getTranslation";

export const CULTIVATION_PLOTS_PAGINATION_QUERY = gql`
  query CULTIVATION_PLOTS_PAGINATION_QUERY($cultivationArea: ID!) {
    _allCultivationPlotsMeta(
      where: { cultivationArea: { id: $cultivationArea } }
    ) {
      count
    }
  }
`;

export default function AllCultivationPlots() {
  const { t } = useTranslation();
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
      <h1>{t.cultivationPlots}</h1>
      <Pagination
        page={page}
        path={t.cultivationPlotsLink}
        items={t.cultivationPlots}
        PAGINATION_QUERY={CULTIVATION_PLOTS_PAGINATION_QUERY}
        queryName={queryName}
        variables={variables}
        queryParams={queryParams}
      />
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
