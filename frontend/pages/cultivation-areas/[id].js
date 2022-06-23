import SignInMessage from "../../components/Authentication/SignInMessage";
import SingleCultivationArea from "../../components/CultivationAreas/SingleCultivationArea";
import { useUser } from "../../components/User";

export default function SingleCultivationAreaPage({ query }) {
  const user = useUser();
  if (!user) return <SignInMessage />;
  return <SingleCultivationArea id={query.id} user={user} />;
}
