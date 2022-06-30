import ClientOnly from "../../components/ClientOnly";
import CreateCultivationArea from "../../components/CultivationAreas/CreateCultivationArea";
import { useUser } from "../../components/User";

export default function CreateCultivationAreaPage() {
  const user = useUser();
  return (
    <ClientOnly>
      <CreateCultivationArea user={user} />
    </ClientOnly>
  );
}
