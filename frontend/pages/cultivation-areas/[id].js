import SingleCultivationArea from "../../components/CultivationAreas/SingleCultivationArea";
import { useUser } from "../../components/User";

export default function SingleCultivationAreaPage({ query }) {
  const user = useUser();
  return <SingleCultivationArea id={query.id} user={user} />;
}
