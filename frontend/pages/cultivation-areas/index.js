import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import ClientOnly from "../../components/ClientOnly";
import CultivationAreas from "../../components/CultivationAreas/CultivationAreas";
import Pagination from "../../components/Pagination";
import { useTranslation } from "../../lib/getTranslation";

export const CULTIVATION_AREAS_PAGINATION_QUERY = gql`
  query CULTIVATION_AREAS_PAGINATION_QUERY {
    _allCultivationAreasMeta {
      count
    }
  }
`;

export default function AllCultivationAreas() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const page = parseInt(query.page) || 1;
  return (
    <div>
      <Pagination
        page={page}
        path={t.cultivationAreasLink}
        items={t.cultivationAreas}
        PAGINATION_QUERY={CULTIVATION_AREAS_PAGINATION_QUERY}
      />
      <h1>{t.cultivationAreas}</h1>
      <ClientOnly>
        <CultivationAreas page={page} />
      </ClientOnly>
      <Pagination
        page={page}
        path={t.cultivationAreasLink}
        items={t.cultivationAreas}
        PAGINATION_QUERY={CULTIVATION_AREAS_PAGINATION_QUERY}
      />
    </div>
  );
}
