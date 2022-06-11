import { createContext, useContext } from "react";
import { useRouter } from "next/router";
import it from "../i18n/it";
import en from "../i18n/en";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function TranslationProvider({ children }) {
  const { locale } = useRouter();
  let t;
  switch (locale) {
    case "it":
      t = it;
      break;
    case "en":
      t = en;
      break;
    default:
      t = it;
  }
  return <LocalStateProvider value={{ t }}>{children}</LocalStateProvider>;
}

function useTranslation() {
  const all = useContext(LocalStateContext);
  return all;
}

export { TranslationProvider, useTranslation };
