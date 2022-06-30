import SignInMessage from "../../components/Authentication/SignInMessage";
import SingleCultivationPlot from "../../components/CultivationPlots/SingleCultivationPlot";
import { useUser } from "../../components/User";

export default function SingleCultivationPlotPage({ query }) {
  const user = useUser();
  if (!user) return <SignInMessage />;
  return <SingleCultivationPlot id={query.id} user={user} />;
}
