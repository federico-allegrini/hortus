import SignInMessage from "../../components/Authentication/SignInMessage";
import ClientOnly from "../../components/ClientOnly";
import CreateCultivationArea from "../../components/CultivationAreas/CreateCultivationArea";
import { useUser } from "../../components/User";

export default function CreateCultivationAreaPage() {
  const user = useUser();
  if (!user) return <SignInMessage />;
  return (
    <ClientOnly>
      <CreateCultivationArea user={user} />
    </ClientOnly>
  );
}
