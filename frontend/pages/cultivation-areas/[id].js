import SingleCultivationArea from "../../components/CultivationAreas/SingleCultivationArea";

export default function SingleCultivationAreaPage({ query }) {
  return <SingleCultivationArea id={query.id} />;
}
