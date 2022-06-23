import ClientOnly from "../../components/ClientOnly";
import CreateCultivationArea from "../../components/CultivationAreas/CreateCultivationArea";

export default function CreateCultivationAreaPage() {
  return (
    <ClientOnly>
      <CreateCultivationArea />
    </ClientOnly>
  );
}
