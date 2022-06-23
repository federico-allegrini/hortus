import { gql } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import SignInMessage from "../../components/Authentication/SignInMessage";
import ClientOnly from "../../components/ClientOnly";
import CultivationAreas from "../../components/CultivationAreas/CultivationAreas";
import Pagination from "../../components/Pagination";
import { useUser } from "../../components/User";
import { useTranslation } from "../../lib/getTranslation";

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
  const { query } = useRouter();
  const queryName = "_allCultivationAreasMeta";
  const page = parseInt(query.page) || 1;
  if (!user) return <SignInMessage />;
  return (
    <div>
      <h1>{t.cultivationAreas}</h1>
      <Pagination
        page={page}
        path={t.cultivationAreasLink}
        items={t.cultivationAreas}
        PAGINATION_QUERY={CULTIVATION_AREAS_PAGINATION_QUERY}
        queryName={queryName}
        user={user}
      />
      <ClientOnly>
        <CultivationAreas page={page} user={user} />
      </ClientOnly>
      <Pagination
        page={page}
        path={t.cultivationAreasLink}
        items={t.cultivationAreas}
        PAGINATION_QUERY={CULTIVATION_AREAS_PAGINATION_QUERY}
        queryName={queryName}
        user={user}
      />
    </div>
  );
}
