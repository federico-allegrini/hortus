import ClientOnly from "../../components/ClientOnly";
import CultivationAreas from "../../components/CultivationAreas/CultivationAreas";

export default function HomePage({ t }) {
  return (
    <div>
      <h1>{t.cultivationAreas}</h1>
      <ClientOnly>
        <CultivationAreas />
      </ClientOnly>
    </div>
  );
}
