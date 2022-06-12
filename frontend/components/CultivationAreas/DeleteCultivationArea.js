import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "../../lib/getTranslation";

const DELETE_CULTIVATION_AREA_MUTATION = gql`
  mutation DELETE_CULTIVATION_AREA_MUTATION($id: ID!) {
    deleteCultivationArea(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCultivationArea));
}

export default function DeleteCultivationArea({ id, children }) {
  const { t } = useTranslation();
  const [deleteCultivationArea, { loading }] = useMutation(
    DELETE_CULTIVATION_AREA_MUTATION,
    {
      variables: { id },
      update,
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm(t.deleteCultivationArea)) {
          deleteCultivationArea().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
