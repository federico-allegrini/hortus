import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "../lib/getTranslation";
import ErrorMessage from "./ErrorMessage";
import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";

export default function Pagination({ page, items, path, PAGINATION_QUERY }) {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  if (loading) return <h3>{t.loading}...</h3>;
  if (error) return <ErrorMessage error={error} />;
  const { count } = data._allCultivationAreasMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          Hortus - {items} - {t.page} {page} {t.of.toLowerCase()} {pageCount}
        </title>
      </Head>
      <Link href={`/${path}/${t.pageLink}/${page - 1}`}>
        <a aria-disabled={page <= 1}>← {t.prev}</a>
      </Link>
      <p>
        {t.page} {page} {t.of.toLowerCase()} {pageCount}
      </p>
      <p>
        {count} {items.toLowerCase()} {t.total.toLowerCase()}
      </p>
      <Link href={`/${path}/${t.pageLink}/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>{t.next} →</a>
      </Link>
    </PaginationStyles>
  );
}
