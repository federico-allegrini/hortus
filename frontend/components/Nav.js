import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import NavStyles from "./styles/NavStyles";

export default function Nav({ t }) {
  return (
    <NavStyles>
      <Link href={`/${t.informationLink}`}>{t.information}</Link>
      <LanguageSelector />
    </NavStyles>
  );
}
