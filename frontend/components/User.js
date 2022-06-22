import { gql, useQuery } from "@apollo/client";

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cultivationArea {
          id
          name
          description
          active
          width
          height
          photos {
            id
            image {
              publicUrlTransformed
            }
            altText
          }
        }
        _cultivationAreaMeta {
          count
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
