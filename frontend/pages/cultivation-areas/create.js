import ClientOnly from "../../components/ClientOnly";
import CreateCultivationArea from "../../components/CultivationAreas/CreateCultivationArea";
import { useTranslation } from "../../lib/getTranslation";

export default function CreateCultivationAreaPage() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t.createNewCultivationArea}</h1>
      <ClientOnly>
        <CreateCultivationArea />
      </ClientOnly>
    </div>
  );
}
