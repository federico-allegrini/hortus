import { gql, useMutation, useQuery } from "@apollo/client";
import useForm from "../../lib/useForm";
import { useTranslation } from "../../lib/getTranslation";
import Form from "../styles/Form";
import { ALL_CULTIVATION_PLOTS_QUERY } from "./CultivationPlots";
import Router from "next/router";
import ErrorMessage from "../ErrorMessage";
import { plotsType } from "../../config";
import { SINGLE_CULTIVATION_AREA } from "../CultivationAreas/SingleCultivationArea";
import Loader from "../Loader";

const CREATE_CULTIVATION_PLOT_MUTATION = gql`
  mutation CREATE_CULTIVATION_PLOT_MUTATION(
    $name: String!
    $description: String!
    $width: Int!
    $height: Int!
    $type: String!
    $cultivationAreaId: ID!
  ) {
    createCultivationPlot(
      data: {
        name: $name
        description: $description
        width: $width
        height: $height
        type: $type
        cultivationArea: { connect: { id: $cultivationAreaId } }
      }
    ) {
      id
      name
    }
  }
`;

export default function CreateCultivationPlot({ cultivationAreaId, user }) {
  const { t } = useTranslation();
  // Query for cultivation area data
  const {
    data,
    loading: loadingCultivationArea,
    error: errorCultivationArea,
  } = useQuery(SINGLE_CULTIVATION_AREA, {
    variables: {
      id: cultivationAreaId,
      user: user.id,
    },
  });
  // Hook for form data
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: t.cultivationPlot,
    description: "...",
    width: 20,
    height: 20,
    type: "GROUND",
    // TODO: add "possibility of planting" here and in the backend (auto boolean yes if type is walkway)
    // TODO: add "type of implant" here and in the backend (direct sowing, transplant)
  });
  // Mutation for creation of cutlivation plot
  const [createCultivationPlot, { loading, error }] = useMutation(
    CREATE_CULTIVATION_PLOT_MUTATION
  );
  if (loadingCultivationArea) return <Loader />;
  if (errorCultivationArea) return <ErrorMessage error={error} />;
  const [CultivationArea] = data.allCultivationAreas;
  // TODO:
  // Ask if auto plots creation in equal sizes
  //
  // If yes
  // Ask many lines and plots per line
  // Show only form with name and type
  // Set vaiable multiple auto creation to true
  // Calculate number of plots based on width and height
  // Calculate width and height for every plot
  // Insert in array
  //
  // If no
  // Start while loops, while all area is full
  // Show only form with all info but limited width and height (based on remaining area space)
  // For each creation reduce the counter of area (width and height) with choosed plot creation
  // When space is <=0.1M stop creation of plots and redirect

  return (
    <div>
      <h1>{t.createNewCultivationPlot}</h1>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const cultivationPlotPayload = {
            variables: {
              ...inputs,
              cultivationAreaId,
            },
            refetchQueries: [
              {
                query: ALL_CULTIVATION_PLOTS_QUERY,
                variables: { cultivationArea: cultivationAreaId },
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
