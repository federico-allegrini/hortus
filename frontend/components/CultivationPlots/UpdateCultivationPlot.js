import { gql } from "@apollo/client/core";
import { useMutation, useQuery } from "@apollo/client/react";
import { SINGLE_CULTIVATION_PLOT } from "./SingleCultivationPlot";
import Form from "../styles/Form";
import ErrorMessage from "../ErrorMessage";
import useForm from "../../lib/useForm";
import { useTranslation } from "../../lib/getTranslation";
import Loader from "../Loader";
import AlertRedirect from "../../lib/alertRedirect";
import { plotsType, plotsTypeOfImplant } from "../../config";
import { useRouter } from "next/router";

const UPDATE_CULTIVATION_PLOT_MUTATION = gql`
  mutation UPDATE_CULTIVATION_PLOT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $width: Int
    $height: Int
    $type: String
    $typeOfImplant: String
  ) {
    updateCultivationPlot(
      id: $id
      data: {
        name: $name
        description: $description
        width: $width
        height: $height
        type: $type
        typeOfImplant: $typeOfImplant
      }
    ) {
      id
      name
      description
      width
      height
      type
      typeOfImplant
      cultivationArea {
        id
        name
        user {
          id
        }
      }
    }
  }
`;

export default function UpdateCultivationPlot({ id, user }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, loading, error } = useQuery(SINGLE_CULTIVATION_PLOT, {
    variables: { id },
  });
  const [
    updateCultivationPlot,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_CULTIVATION_PLOT_MUTATION);
  const CultivationPlot = data?.allCultivationPlots[0];
  const { inputs, handleChange, resetForm, clearForm } = useForm(
    CultivationPlot || {
      name: "",
      description: "",
      width: "",
      height: "",
      type: "",
      typeOfImplant: "",
      // TODO: add "possibility of planting" here
    }
  );
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  if (
    AlertRedirect(
      !!CultivationPlot && CultivationPlot.cultivationArea.user.id === user.id,
      t.noCultivationPlotsFound,
      `/${t.cultivationAreasLink}`
    )
  )
    return null;

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await updateCultivationPlot({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            width: inputs.width,
            height: inputs.height,
            type: inputs.type,
            typeOfImplant: inputs.typeOfImplant,
          },
        }).catch((error) => {
          alert(`${t.error}: ${error}`);
        });
        alert(t.updateCompleted);
        router.push({ pathname: `/${t.cultivationPlotsLink}/${id}` });
      }}
    >
      <h1>
        {t.updateCultivationPlot} <span>{inputs.name}</span>
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
        <label htmlFor="type">
          {t.type}
          <select
            onChange={handleChange}
            name="type"
            id="type"
            value={inputs.type}
          >
            {plotsType.map((plotType) => (
              <option value={plotType.value} key={`label-${plotType.label}`}>
                {t[plotType.label]}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="typeOfImplant">
          {t.typeOfImplant}
          <select
            onChange={handleChange}
            name="typeOfImplant"
            id="typeOfImplant"
            value={inputs.typeOfImplant}
          >
            {plotsTypeOfImplant.map((plotTypeOfImplant) => (
              <option
                value={plotTypeOfImplant.value}
                key={`label-${plotTypeOfImplant.label}`}
              >
                {t[plotTypeOfImplant.label]}
              </option>
            ))}
          </select>
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
