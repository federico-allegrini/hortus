import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "../../lib/getTranslation";

const DELETE_CULTIVATION_PLOT_MUTATION = gql`
  mutation DELETE_CULTIVATION_PLOT_MUTATION($id: ID!) {
    deleteCultivationPlot(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCultivationPlot));
}

export default function DeleteCultivationPlot({ id, children }) {
  const { t } = useTranslation();
  const [deleteCultivationPlot, { loading }] = useMutation(
    DELETE_CULTIVATION_PLOT_MUTATION,
    {
      variables: { id },
      update,
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        if (confirm(t.deleteCultivationPlot)) {
          try {
            deleteCultivationPlot();
          } catch (err) {
            alert(err.message);
          }
        }
      }}
    >
      {children}
    </button>
  );
}
