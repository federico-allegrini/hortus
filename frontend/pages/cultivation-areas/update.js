import ClientOnly from "../../components/ClientOnly";
import UpdateCultivationArea from "../../components/CultivationAreas/UpdateCultivationArea";

export default function UpdateCultivationAreaPage({ query }) {
  return (
    <ClientOnly>
      <UpdateCultivationArea id={query.id} />
    </ClientOnly>
  );
}
