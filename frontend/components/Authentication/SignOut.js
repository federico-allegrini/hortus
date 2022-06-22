import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useTranslation } from "../../lib/getTranslation";
import { CURRENT_USER_QUERY } from "../User";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

async function signOutAndClearCache(signout, client) {
  await signout();
  client.resetStore();
}

export default function SignOut() {
  const { t } = useTranslation();
  const [signout, { client }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button type="button" onClick={() => signOutAndClearCache(signout, client)}>
      {t.signOut}
    </button>
  );
}
