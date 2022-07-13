import { gql, useMutation } from "@apollo/client";
import useForm from "../../lib/useForm";
import { useTranslation } from "../../lib/getTranslation";
import Form from "../styles/Form";
import { ALL_CULTIVATION_PLOTS_QUERY } from "./CultivationPlots";
import Router from "next/router";
import ErrorMessage from "../ErrorMessage";
import { plotsType } from "../../config";

const CREATE_CULTIVATION_PLOT_MUTATION = gql`
  mutation CREATE_CULTIVATION_PLOT_MUTATION(
    $name: String!
    $description: String!
    $width: Int!
    $height: Int!
    $type: String!
    $cultivationArea: ID!
  ) {
    createCultivationPlot(
      data: {
        name: $name
        description: $description
        width: $width
        height: $height
        type: $type
        cultivationArea: { connect: { id: $cultivationArea } }
      }
    ) {
      id
      name
    }
  }
`;

export default function CreateCultivationPlot({ cultivationArea }) {
  const { t } = useTranslation();
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: t.cultivationPlot,
    description: "...",
    width: 20,
    height: 20,
    type: "GROUND",
  });

  const [createCultivationPlot, { loading, error }] = useMutation(
    CREATE_CULTIVATION_PLOT_MUTATION
  );
  return (
    <div>
      <h1>{t.createNewCultivationPlot}</h1>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const cultivationPlotPayload = {
            variables: {
              ...inputs,
              cultivationArea,
            },
            refetchQueries: [
              {
                query: ALL_CULTIVATION_PLOTS_QUERY,
                variables: { cultivationArea },
              },
            ],
          };
          const res = await createCultivationPlot(cultivationPlotPayload);
          const id = res.data.createCultivationPlot.id;
          clearForm();
          // Go to cultivation plot's page
          Router.push({
            pathname: `/${t.cultivationPlotsLink}/${id}`,
          });
        }}
      >
        <ErrorMessage error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
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
            <select onChange={handleChange} name="type" id="type">
              {plotsType.map((plotType) => (
                <option value={plotType.value} key={`label-${plotType.label}`}>
                  {t[plotType.label]}
                </option>
              ))}
            </select>
          </label>
          <button type="subitm">{t.createPlot}</button>
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
