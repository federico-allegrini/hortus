import { CURRENT_USER_QUERY } from "../components/User";

export default function paginationField(PAGINATION_QUERY) {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      const dataUser = cache.readQuery({ query: CURRENT_USER_QUERY });
      const id = dataUser?.authenticatedItem?.id;
      const data = cache.readQuery({
        query: PAGINATION_QUERY,
        variables: { user: id },
      });
      const count = data?._allCultivationAreasMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        return false;
      }
      if (items.length) {
        return items;
      }
      return false;
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
