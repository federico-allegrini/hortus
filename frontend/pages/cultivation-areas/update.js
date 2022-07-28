import ClientOnly from "../../components/ClientOnly";
import UpdateCultivationArea from "../../components/CultivationAreas/UpdateCultivationArea";
import { useUser } from "../../components/User";
import formatId from "../../lib/formatId";

export default function UpdateCultivationAreaPage({ query }) {
  const user = useUser();
  const cultivationAreaId = formatId(query.id);
  return (
    <ClientOnly>
      <UpdateCultivationArea id={cultivationAreaId} user={user} />
    </ClientOnly>
  );
}
