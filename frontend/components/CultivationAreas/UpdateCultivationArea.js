import { gql } from "@apollo/client/core";
import { useMutation, useQuery } from "@apollo/client/react";
import { SINGLE_CULTIVATION_AREA } from "./SingleCultivationArea";
import Form from "../styles/Form";
import ErrorMessage from "../ErrorMessage";
import useForm from "../../lib/useForm";
import { useTranslation } from "../../lib/getTranslation";
import Loader from "../Loader";
import { useRouter } from "next/router";
import AlertRedirect from "../../lib/alertRedirect";

const UPDATE_CULTIVATION_AREA_MUTATION = gql`
  mutation UPDATE_CULTIVATION_AREA_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $active: Boolean
    $width: Int
    $height: Int
  ) {
    updateCultivationArea(
      id: $id
      data: {
        name: $name
        description: $description
        active: $active
        width: $width
        height: $height
      }
    ) {
      id
      name
      description
      active
      width
      height
    }
  }
`;

export default function UpdateCultivationArea({ id, user }) {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, error, loading } = useQuery(SINGLE_CULTIVATION_AREA, {
    variables: {
      id,
      user: user.id,
    },
  });

  const [
    updateCultivationArea,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_CULTIVATION_AREA_MUTATION);

  const [CultivationArea] = data?.allCultivationAreas || [
    {
      name: "",
      description: "",
      active: "",
      width: "",
      height: "",
    },
  ];

  const { inputs, handleChange, resetForm, clearForm } =
    useForm(CultivationArea);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  if (CultivationArea?.name !== "") {
    if (
      AlertRedirect(
        CultivationArea && CultivationArea.user.id === user.id,
        t.noCultivationAreasFound,
        `/${t.cultivationAreasLink}`
      )
    )
      return null;
  }

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await updateCultivationArea({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            active: inputs.active,
            width: inputs.width,
            height: inputs.height,
          },
        }).catch((error) => {
          alert(`${t.error}: ${error}`);
        });
        alert(t.updateCompleted);
        router.push({ pathname: `/${t.cultivationAreasLink}/${id}` });
      }}
    >
      <h1>
        {t.updateCultivationArea} <span>{inputs.name}</span>
      </h1>
      <ErrorMessage error={error} />
      <ErrorMessage error={updateError} />
      <fieldset
        disabled={loading || updateLoading}
        aria-busy={loading || updateLoading}
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
        <label htmlFor="active">
          {t.activeF}
          <input
            type="checkbox"
            name="active"
            id="active"
            onChange={handleChange}
            checked={inputs.active}
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
        <button type="subitm">{t.update}</button>
        <button type="button" onClick={resetForm}>
          {t.resetForm}
        </button>
        <button type="button" onClick={clearForm}>
          {t.clearForm}
        </button>
      </fieldset>
    </Form>
  );
}
