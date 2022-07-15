import ClientOnly from "../../components/ClientOnly";
import CreateCultivationPlot from "../../components/CultivationPlots/CreateCultivationPlot";
import { useRouter } from "next/router";
import { useTranslation } from "../../lib/getTranslation";
import alertRedirect from "../../lib/alertRedirect";

export default function CreateCultivationPlotPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  // TODO: set cultivation-area-id into translation variables
  const urlQueryName = "cultivation-area-id";
  const cultivationAreaId = query[urlQueryName];
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
      <CreateCultivationPlot cultivationArea={cultivationAreaId} />
    </ClientOnly>
  );
}
