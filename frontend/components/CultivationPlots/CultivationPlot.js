import Link from "next/link";
import ItemStyles from "../styles/ItemStyles";
import Title from "../styles/Title";
import SizeTag from "../styles/SizeTag";
import { useTranslation } from "../../lib/getTranslation";
import formatSize from "../../lib/formatSize";

// TODO: Create dynamic delete button
// import DeleteButton from "./DeleteButton";

export default function CultivationPLot({ cultivationPlot }) {
  const { t } = useTranslation();
  return (
    <ItemStyles>
      <Title>
        <Link href={`/${t.cultivationPlotsLink}/${cultivationPlot.id}`}>
          {cultivationPlot.name}
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
        {/* <DeleteButton
          id={cultivationPlot.id}
        >
          {t.delete}
        </DeleteButton> */}
      </div>
    </ItemStyles>
  );
}
