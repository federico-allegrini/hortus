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
          width
          height
          active
          photos {
            image {
              publicUrlTransformed
            }
            altText
          }
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
