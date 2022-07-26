import ClientOnly from "../../components/ClientOnly";
import UpdateCultivationPlot from "../../components/CultivationPlots/UpdateCultivationPlot";
import { useTranslation } from "../../lib/getTranslation";
import alertRedirect from "../../lib/alertRedirect";
import { useUser } from "../../components/User";

export default function UpdateCultivationPlotPage({ query }) {
  const { t } = useTranslation();
  const user = useUser();
  const cultivationPlotId = query.id;
  if (
    alertRedirect(
      cultivationPlotId,
      t.noCultivationPlotsFound,
      `/${t.cultivationAreasLink}`
    )
  )
    return null;
  return (
    <ClientOnly>
      <UpdateCultivationPlot id={cultivationPlotId} user={user} />
    </ClientOnly>
  );
}
