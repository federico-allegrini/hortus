import ClientOnly from "../../components/ClientOnly";
import CreateCultivationPlot from "../../components/CultivationPlots/CreateCultivationPlot";
import { useRouter } from "next/router";
import { useTranslation } from "../../lib/getTranslation";

export default function CreateCultivationPlotPage() {
  const { t } = useTranslation();
  const { query, push } = useRouter();
  const urlQueryName = "cultivation-area-id";
  const cultivationAreaId = query[urlQueryName];
  if (!cultivationAreaId) {
    alert(t.firstSelectACultivationArea);
    push({ pathname: `/${t.cultivationAreasLink}` });
    return null;
  }
  return (
    <ClientOnly>
      <CreateCultivationPlot cultivationArea={cultivationAreaId} />
    </ClientOnly>
  );
}
