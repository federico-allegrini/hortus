import ClientOnly from "../../components/ClientOnly";
import UpdateCultivationPlot from "../../components/CultivationPlots/UpdateCultivationPlot";

// TODO: create update component

export default function UpdateCultivationPlotPage({ query }) {
  return (
    <ClientOnly>
      <UpdateCultivationPlot id={query.id} />
    </ClientOnly>
  );
}
