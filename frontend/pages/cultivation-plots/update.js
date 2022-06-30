import ClientOnly from "../../components/ClientOnly";
import UpdateCultivationPlot from "../../components/CultivationPlots/UpdateCultivationPlot";

export default function UpdateCultivationPlotPage({ query }) {
  return (
    <ClientOnly>
      <UpdateCultivationPlot id={query.id} />
    </ClientOnly>
  );
}
