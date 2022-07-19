import Link from "next/link";
import ItemStyles from "../styles/ItemStyles";
import Title from "../styles/Title";
import SizeTag from "../styles/SizeTag";
import { useTranslation } from "../../lib/getTranslation";
import formatSize from "../../lib/formatSize";
import truncateText from "../../lib/truncateText";
import DeleteCultivationPlot from "./DeleteCultivationPLot";

export default function CultivationPLot({
  cultivationPlot,
  cultivationAreaId,
}) {
  const { t } = useTranslation();
  return (
    <ItemStyles>
      <Title>
        <Link
          href={`/${t.cultivationPlotsLink}/${cultivationPlot.id}?${t.cultivationAreaId}=${cultivationAreaId}`}
        >
          {truncateText(cultivationPlot.name)}
        </Link>
      </Title>
      <SizeTag>
        {formatSize(cultivationPlot.width, "m")}x
        {formatSize(cultivationPlot.height, "m", true, true)}
      </SizeTag>
      <p>{cultivationPlot.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: `${t.cultivationPlotsLink}/update`,
            query: {
              id: cultivationPlot.id,
            },
          }}
        >
          {t.edit}
        </Link>
        <DeleteCultivationPlot id={cultivationPlot.id}>
          {t.delete}
        </DeleteCultivationPlot>
      </div>
    </ItemStyles>
  );
}
