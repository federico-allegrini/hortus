import ClientOnly from "../../components/ClientOnly";
import CreateCultivationPlot from "../../components/CultivationPlots/CreateCultivationPlot";
import { useRouter } from "next/router";
import { useTranslation } from "../../lib/getTranslation";
import alertRedirect from "../../lib/alertRedirect";
import { useUser } from "../../components/User";

export default function CreateCultivationPlotPage() {
  const { t } = useTranslation();
  const user = useUser();
  const { query } = useRouter();
  const cultivationAreaId = query[t.cultivationAreaId];
  if (
    alertRedirect(
      cultivationAreaId,
      t.firstSelectACultivationArea,
      `/${t.cultivationAreasLink}`
    )
  )
    return null;
  return (
    <ClientOnly>
      <CreateCultivationPlot
        cultivationAreaId={cultivationAreaId}
        user={user}
      />
    </ClientOnly>
  );
}
