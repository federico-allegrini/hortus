import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import ClientOnly from "../../components/ClientOnly";
import CultivationAreas from "../../components/CultivationAreas/CultivationAreas";
import Pagination from "../../components/Pagination";
import { useUser } from "../../components/User";
import { useTranslation } from "../../lib/getTranslation";
import { perPageArea } from "../../config";

export const CULTIVATION_AREAS_PAGINATION_QUERY = gql`
  query CULTIVATION_AREAS_PAGINATION_QUERY($user: ID!) {
    _allCultivationAreasMeta(where: { user: { id: $user } }) {
      count
    }
  }
`;

export default function AllCultivationAreas() {
  const { t } = useTranslation();
  const user = useUser();
  const variables = { user: user.id };
  const { query } = useRouter();
  const queryName = "_allCultivationAreasMeta";
  const page = parseInt(query.page) || 1;
  return (
    <div>
      <h1>{t.cultivationAreas}</h1>
      <Pagination
        page={page}
        perPage={perPageArea}
        path={t.cultivationAreasLink}
        items={t.cultivationAreas}
        PAGINATION_QUERY={CULTIVATION_AREAS_PAGINATION_QUERY}
        queryName={queryName}
        variables={variables}
      />
      <ClientOnly>
        <CultivationAreas page={page} user={user} />
      </ClientOnly>
      <Pagination
        page={page}
        perPage={perPageArea}
        path={t.cultivationAreasLink}
        items={t.cultivationAreas}
        PAGINATION_QUERY={CULTIVATION_AREAS_PAGINATION_QUERY}
        queryName={queryName}
        variables={variables}
      />
    </div>
  );
}
