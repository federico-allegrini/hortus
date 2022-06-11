import ClientOnly from "../../components/ClientOnly";
import CultivationAreas from "../../components/CultivationAreas/CultivationAreas";
import { useTranslation } from "../../lib/getTranslation";

export default function AllCultivationAreas() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t.cultivationAreas}</h1>
      <ClientOnly>
        <CultivationAreas />
      </ClientOnly>
    </div>
  );
}
