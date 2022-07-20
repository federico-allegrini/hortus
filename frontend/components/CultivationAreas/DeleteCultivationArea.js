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

const DELETE_CULTIVATION_AREA_IMAGES_MUTATION = gql`
  mutation DELETE_CULTIVATION_AREA_IMAGES_MUTATION($ids: [ID!]) {
    deleteCultivationAreaImages(ids: $ids) {
      id
    }
  }
`;

const DELETE_CULTIVATION_PLOTS_MUTATION = gql`
  mutation DELETE_CULTIVATION_PLOTS_MUTATION($ids: [ID!]) {
    deleteCultivationPlots(ids: $ids) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCultivationArea));
}

export default function DeleteCultivationArea({
  id,
  photos,
  cultivationPlot,
  children,
}) {
  const { t } = useTranslation();
  const photoIds = photos.map((photo) => photo.id);
  const cultivationPlotIds = cultivationPlot.map((plot) => plot.id);
  const [deleteCultivationArea, { loading }] = useMutation(
    DELETE_CULTIVATION_AREA_MUTATION,
    {
      variables: { id },
      update,
    }
  );
  const [deleteCultivationAreaImages] = useMutation(
    DELETE_CULTIVATION_AREA_IMAGES_MUTATION
  );
  const [deleteCultivationPlots] = useMutation(
    DELETE_CULTIVATION_PLOTS_MUTATION
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        if (confirm(t.deleteCultivationArea)) {
          try {
            deleteCultivationArea();
            deleteCultivationAreaImages({
              variables: { ids: photoIds },
            });
            deleteCultivationPlots({
              variables: { ids: cultivationPlotIds },
            });
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
