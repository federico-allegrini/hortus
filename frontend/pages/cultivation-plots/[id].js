import SingleCultivationPlot from "../../components/CultivationPlots/SingleCultivationPlot";
import { useUser } from "../../components/User";

export default function SingleCultivationPlotPage({ query }) {
  const user = useUser();
  return <SingleCultivationPlot id={query.id} user={user} />;
}
