import SingleCultivationArea from "../../components/CultivationAreas/SingleCultivationArea";
import { useUser } from "../../components/User";
import formatId from "../../lib/formatId";

export default function SingleCultivationAreaPage({ query }) {
  const user = useUser();
  const cultivationAreaId = formatId(query.id);
  return <SingleCultivationArea id={cultivationAreaId} user={user} />;
}
