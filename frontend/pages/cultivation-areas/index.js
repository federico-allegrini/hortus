import ClientOnly from "../../components/ClientOnly";
import CultivationAreas from "../../components/CultivationAreas/CultivationAreas";

export default function AllCultivationAreas({ t }) {
  return (
    <div>
      <h1>{t.cultivationAreas}</h1>
      <ClientOnly>
        <CultivationAreas t={t} />
      </ClientOnly>
    </div>
  );
}
