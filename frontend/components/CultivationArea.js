import Link from "next/link";
import Image from "next/image";
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import SizeTag from "./styles/SizeTag";
import { blurDataURL_CultivationArea } from "../config";

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
        <Link href={`/cultivation-area/${cultivationArea.id}`}>
          {cultivationArea.name}
        </Link>
      </Title>
      <SizeTag>
        {cultivationArea.width}x{cultivationArea.height}m²
      </SizeTag>
      <p>{cultivationArea.description}</p>
    </ItemStyles>
  );
}
