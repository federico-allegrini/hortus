import ClientOnly from "../components/ClientOnly";
import CultivationAreas from "../components/CultivationAreas";

export default function HomePage({ t }) {
  return (
    <div>
      <h1>{t.indexPage}</h1>
      <ClientOnly>
        <CultivationAreas />
      </ClientOnly>
    </div>
  );
}
