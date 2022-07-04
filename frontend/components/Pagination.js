import { useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "../lib/getTranslation";
import ErrorMessage from "./ErrorMessage";
import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";
import Loader from "./Loader";

export default function Pagination({
  page,
  items,
  path,
  PAGINATION_QUERY,
  queryName,
  variables,
}) {
  const { t } = useTranslation();
  const variablesObj = variables
    ? { variables, fetchPolicy: "network-only" }
    : {};
  const { data, loading, error } = useQuery(PAGINATION_QUERY, variablesObj);
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  const { count } = data[queryName];
  if (count === 0) return null;
  const pageCount = Math.ceil(count / perPage);
  const deviceWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
  const showLabel = deviceWidth > 1300;
  return (
    <PaginationStyles>
      <Head>
        <title>
          Hortus - {items} - {t.page} {page} {t.of.toLowerCase()} {pageCount}
        </title>
      </Head>
      <Link href={`/${path}/${t.pageLink}/${page - 1}`}>
        <a aria-disabled={page <= 1}>{`↢ ${showLabel ? t.prev : ""}`}</a>
      </Link>
      <p>
        {`${showLabel ? t.page : ""} ${page} ${
          showLabel ? t.of.toLowerCase() : "|"
        } ${pageCount}`}
      </p>
      <p>
        {`${count} ${
          showLabel ? items.toLowerCase() + " " + t.total.toLowerCase() : ""
        }`}
      </p>
      <Link href={`/${path}/${t.pageLink}/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>
          {`${showLabel ? t.next : ""} ↣`}
        </a>
      </Link>
    </PaginationStyles>
  );
}
