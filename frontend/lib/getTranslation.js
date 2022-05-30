import { useRouter } from "next/router";
import it from "../i18n/it";
import en from "../i18n/en";

export default function GetTranslation() {
  const { locale } = useRouter();
  switch (locale) {
    case "it":
      return it;
    case "en":
      return en;
  }
}
