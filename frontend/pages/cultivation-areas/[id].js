import SingleCultivationArea from "../../components/CultivationAreas/SingleCultivationArea";
import { useUser } from "../../components/User";

export default function SingleCultivationAreaPage({ query }) {
  const user = useUser();
  const cultivationAreaId =
    query.id.length <= 24 ? query.id.padEnd(24, "0") : "".padEnd(24, "0");
  return <SingleCultivationArea id={cultivationAreaId} user={user} />;
}
