import { gql, useMutation } from "@apollo/client";
import useForm from "../../lib/useForm";
import { useTranslation } from "../../lib/getTranslation";
import Form from "../styles/Form";
import { ALL_CULTIVATION_AREAS_QUERY } from "./CultivationAreas";
import Router from "next/router";
import ErrorMessage from "../ErrorMessage";

const CREATE_CULTIVATION_AREA_MUTATION = gql`
  mutation CREATE_CULTIVATION_AREA_MUTATION(
    $name: String!
    $description: String!
    $width: Int!
    $height: Int!
    $photos: Upload!
    $altText: String!
    $user: ID!
  ) {
    createCultivationArea(
      data: {
        name: $name
        description: $description
        width: $width
        height: $height
        photos: { create: { image: $photos, altText: $altText } }
        user: { connect: { id: $user } }
      }
    ) {
      id
      name
    }
  }
`;

const CREATE_CULTIVATION_AREA_IMAGE_MUTATION = gql`
  mutation CREATE_CULTIVATION_AREA_IMAGE_MUTATION(
    $photo: Upload!
    $altText: String!
    $cultivationAreaId: ID!
  ) {
    createCultivationAreaImage(
      data: {
        image: $photo
        altText: $altText
        cultivationArea: { connect: { id: $cultivationAreaId } }
      }
    ) {
      id
    }
  }
`;

export default function CreateCultivationArea({ user }) {
  const { t } = useTranslation();
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: "Area",
    description: "...",
    width: 10,
    height: 10,
    photos: "",
  });

  const [createCultivationArea, { loading, error }] = useMutation(
    CREATE_CULTIVATION_AREA_MUTATION
  );
  const [createCultivationAreaImage, { loadingImage, errorImage }] =
    useMutation(CREATE_CULTIVATION_AREA_IMAGE_MUTATION);
  return (
    <div>
      <h1>{t.createNewCultivationArea}</h1>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          // Create area and upload first photo
          const [photos] = inputs.photos;
          let altText = inputs.name.toLowerCase().trim().replaceAll(" ", "-");
          const cultivationAreaPayload = {
            variables: {
              ...inputs,
              photos,
              altText: `${altText}-1`,
              user: user.id,
            },
            refetchQueries: [{ query: ALL_CULTIVATION_AREAS_QUERY }],
          };
          const res = await createCultivationArea(cultivationAreaPayload);
          const id = res.data.createCultivationArea.id;
          // Upload other photos and connect to area
          const numerOfPhotos = inputs.photos.length;
          if (numerOfPhotos > 1) {
            // Start from 1 for skip the first photo: already uploaded
            for (let i = 1; i < numerOfPhotos; i++) {
              const cultivationAreaImagePayload = {
                variables: {
                  photo: inputs.photos[i],
                  altText: `${altText}-${i + 1}`,
                  cultivationAreaId: id,
                },
              };
              await createCultivationAreaImage(cultivationAreaImagePayload);
            }
          }
          clearForm();
          // Go to cultivation area's page
          Router.push({
            pathname: `/cultivation-areas/${id}`,
          });
        }}
      >
        <ErrorMessage error={error} />
        <ErrorMessage error={errorImage} />
        <fieldset
          disabled={loading || loadingImage}
          aria-busy={loading || loadingImage}
        >
          <label htmlFor="name">
            {t.name}
            <input
              type="text"
              name="name"
              id="name"
              placeholder={t.name}
              onChange={handleChange}
              value={inputs.name}
            />
          </label>
          <label htmlFor="description">
            {t.description}
            <textarea
              name="description"
              id="description"
              placeholder={t.description}
              onChange={handleChange}
              value={inputs.description}
            />
          </label>
          <label htmlFor="width">
            {t.width} <span>{"[cm]"}</span>
            <input
              type="number"
              name="width"
              id="width"
              placeholder={t.width}
              onChange={handleChange}
              value={inputs.width}
            />
          </label>
          <label htmlFor="height">
            {t.height} <span>{"[cm]"}</span>
            <input
              type="number"
              name="height"
              id="height"
              placeholder={t.height}
              onChange={handleChange}
              value={inputs.height}
            />
          </label>
          <label htmlFor="photos" className="photosButton">
            {t.uploadPhotos}
            <input
              required
              multiple
              type="file"
              name="photos"
              id="photos"
              onChange={handleChange}
            />
          </label>
          <button type="subitm">{t.createArea}</button>
          <button type="button" onClick={resetForm}>
            {t.resetForm}
          </button>
          <button type="button" onClick={clearForm}>
            {t.clearForm}
          </button>
        </fieldset>
      </Form>
    </div>
  );
}
