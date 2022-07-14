import SingleCultivationPlot from "../../components/CultivationPlots/SingleCultivationPlot";
import alertRedirect from "../../lib/alertRedirect";
import { useTranslation } from "../../lib/getTranslation";

export default function SingleCultivationPlotPage({ query }) {
  const { t } = useTranslation();
  const cultivationAreaId = query["cultivation-area-id"];
  if (
    alertRedirect(
      cultivationAreaId,
      t.noCultivationPlotsFound,
      `/${t.cultivationAreasLink}`
    )
  )
    return null;
  return (
    <SingleCultivationPlot
      id={query.id}
      cultivationAreaId={cultivationAreaId}
    />
  );
}
