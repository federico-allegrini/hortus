import Link from "next/link";
import Image from "next/image";
import ItemStyles from "../styles/ItemStyles";
import Title from "../styles/Title";
import SizeTag from "../styles/SizeTag";
import { blurDataURL_CultivationArea } from "../../config";
import { useTranslation } from "../../lib/getTranslation";
import formatSize from "../../lib/formatSize";
import DeleteCultivationArea from "./DeleteCultivationArea";
import { SmallButtonWhite } from "../styles/Button";
import truncateText from "../../lib/truncateText";

export default function CultivationArea({ cultivationArea }) {
  const { t } = useTranslation();
  return (
    <ItemStyles>
      <div className="image-div">
        <Image
          src={cultivationArea?.photos[0]?.image?.publicUrlTransformed}
          alt={cultivationArea?.photos[0]?.altText}
          layout="fill"
          objectFit="cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL={blurDataURL_CultivationArea}
        />
      </div>
      <Title>
        <Link href={`/${t.cultivationAreasLink}/${cultivationArea.id}`}>
          {truncateText(cultivationArea.name)}
        </Link>
      </Title>
      <SizeTag>
        {formatSize(cultivationArea.width, "m")}x
        {formatSize(cultivationArea.height, "m", true, true)}
      </SizeTag>
      <p>{cultivationArea.description}</p>
      <SmallButtonWhite>
        <Link
          href={{
            pathname: `/${t.cultivationPlotsLink}`,
            query: {
              "cultivation-area-id": cultivationArea.id,
            },
          }}
        >
          {t.cultivationPlots}
        </Link>
      </SmallButtonWhite>
      <div className="buttonList">
        <Link
          href={{
            pathname: `${t.cultivationAreasLink}/update`,
            query: {
              id: cultivationArea.id,
            },
          }}
        >
          {t.edit}
        </Link>
        <DeleteCultivationArea
          id={cultivationArea.id}
          photos={cultivationArea.photos}
        >
          {t.delete}
        </DeleteCultivationArea>
      </div>
    </ItemStyles>
  );
}
