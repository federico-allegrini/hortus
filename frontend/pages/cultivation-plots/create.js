import SignInMessage from "../../components/Authentication/SignInMessage";
import ClientOnly from "../../components/ClientOnly";
import CreateCultivationPlot from "../../components/CultivationPlots/CreateCultivationPlot";
import { useUser } from "../../components/User";

export default function CreateCultivationPlotPage() {
  const user = useUser();
  if (!user) return <SignInMessage />;
  return (
    <ClientOnly>
      <CreateCultivationPlot user={user} />
    </ClientOnly>
  );
}
