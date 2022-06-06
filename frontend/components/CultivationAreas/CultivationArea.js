import Link from "next/link";
import Image from "next/image";
import ItemStyles from "../styles/ItemStyles";
import Title from "../styles/Title";
import SizeTag from "../styles/SizeTag";
import { blurDataURL_CultivationArea } from "../../config";
import formatSize from "../../lib/formatSize";

export default function CultivationArea({ cultivationArea }) {
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
        <Link href={`/cultivation-areas/${cultivationArea.id}`}>
          {cultivationArea.name}
        </Link>
      </Title>
      <SizeTag>
        {formatSize(cultivationArea.width, "m")}x
        {formatSize(cultivationArea.height, "m", true, true)}
      </SizeTag>
      <p>{cultivationArea.description}</p>
    </ItemStyles>
  );
}
