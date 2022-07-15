import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "../../lib/getTranslation";

// TODO: Delete all related plots

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

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCultivationArea));
}

export default function DeleteCultivationArea({ id, photos, children }) {
  const { t } = useTranslation();
  const photoIds = photos.map((photo) => photo.id);
  const [deleteCultivationArea, { loading }] = useMutation(
    DELETE_CULTIVATION_AREA_MUTATION,
    {
      variables: { id },
      update,
    }
  );
  const [deleteCultivationAreaImages, { loadingImages }] = useMutation(
    DELETE_CULTIVATION_AREA_IMAGES_MUTATION
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
