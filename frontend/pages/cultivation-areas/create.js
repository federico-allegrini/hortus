import ClientOnly from "../../components/ClientOnly";
import CreateCultivationArea from "../../components/CultivationAreas/CreateCultivationArea";

export default function CreateCultivationAreaPage({ t }) {
  return (
    <div>
      <h1>{t.createNewCultivationArea}</h1>
      <ClientOnly>
        <CreateCultivationArea t={t} />
      </ClientOnly>
    </div>
  );
}
