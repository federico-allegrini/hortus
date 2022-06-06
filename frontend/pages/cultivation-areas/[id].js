import SingleCultivationArea from "../../components/CultivationAreas/SingleCultivationArea";

export default function SingleCultivationAreaPage({ query, t }) {
  return <SingleCultivationArea id={query.id} t={t} />;
}
