import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import ClientOnly from "../../components/ClientOnly";
import CultivationPlots from "../../components/CultivationPlots/CultivationPlots";
import Pagination from "../../components/Pagination";
import { useUser } from "../../components/User";
import { useTranslation } from "../../lib/getTranslation";

export const CULTIVATION_PLOTS_PAGINATION_QUERY = gql`
  query CULTIVATION_PLOTS_PAGINATION_QUERY($user: ID!) {
    _allCultivationPlotsMeta(where: { user: { id: $user } }) {
      count
    }
  }
`;

export default function AllCultivationPlots() {
  const { t } = useTranslation();
  const user = useUser();
  const { query } = useRouter();
  const queryName = "_allCultivationPlotsMeta";
  const page = parseInt(query.page) || 1;
  return (
    <div>
      <h1>{t.cultivationPlots}</h1>
      <Pagination
        page={page}
        path={t.cultivationPlotsLink}
        items={t.cultivationPlots}
        PAGINATION_QUERY={CULTIVATION_PLOTS_PAGINATION_QUERY}
        queryName={queryName}
        user={user}
      />
      <ClientOnly>
        <CultivationPlots page={page} user={user} />
      </ClientOnly>
      <Pagination
        page={page}
        path={t.cultivationPlotsLink}
        items={t.cultivationPlots}
        PAGINATION_QUERY={CULTIVATION_PLOTS_PAGINATION_QUERY}
        queryName={queryName}
        user={user}
      />
    </div>
  );
}
