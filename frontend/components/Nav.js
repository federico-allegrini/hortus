import Link from "next/link";
import { useTranslation } from "../lib/getTranslation";
import LanguageSelector from "./LanguageSelector";
import NavStyles from "./styles/NavStyles";

export default function Nav() {
  const { t } = useTranslation();
  return (
    <NavStyles>
      <Link href={`/${t.cultivationAreasLink}`}>{t.cultivationAreas}</Link>
      <LanguageSelector />
    </NavStyles>
  );
}
