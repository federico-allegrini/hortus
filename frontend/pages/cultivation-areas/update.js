import ClientOnly from "../../components/ClientOnly";
import UpdateCultivationArea from "../../components/CultivationAreas/UpdateCultivationArea";
import { useUser } from "../../components/User";

export default function UpdateCultivationAreaPage({ query }) {
  const user = useUser();
  const cultivationAreaId = query.id.padEnd(24, "0");
  return (
    <ClientOnly>
      <UpdateCultivationArea id={cultivationAreaId} user={user} />
    </ClientOnly>
  );
}
