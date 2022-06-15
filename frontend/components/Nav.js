import Link from "next/link";
import { useTranslation } from "../lib/getTranslation";
import LanguageSelector from "./LanguageSelector";
import SignOut from "./Authentication/SignOut";
import NavStyles from "./styles/NavStyles";

export default function Nav({ user }) {
  const { t } = useTranslation();
  return (
    <NavStyles>
      {user && (
        <>
          <Link href={`/${t.cultivationAreasLink}`}>{t.cultivationAreas}</Link>
          <SignOut />
          <SignOut />
          <SignOut />
        </>
      )}
      {!user && <Link href={`/${t.signInLink}`}>{t.signIn}</Link>}
      <LanguageSelector />
    </NavStyles>
  );
}
