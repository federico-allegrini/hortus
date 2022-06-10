import ClientOnly from "../../components/ClientOnly";
import UpdateCultivationArea from "../../components/CultivationAreas/UpdateCultivationArea";

export default function UpdateCultivationAreaPage({ query, t }) {
  return (
    <ClientOnly>
      <UpdateCultivationArea id={query.id} t={t} />
    </ClientOnly>
  );
}
