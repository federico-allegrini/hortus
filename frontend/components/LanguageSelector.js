import { useRouter } from "next/router";

function changeLanguage(e, router) {
  const locale = e.target.value;
  router.push(router.pathname, router.pathname, { locale });
}

export default function LanguageSelector() {
  const router = useRouter();
  const { locale, locales } = router;
  const options = locales.map((locale) => (
    <option value={locale} key={locale}>
      {locale.toUpperCase()}
    </option>
  ));
  return (
    <select onChange={(e) => changeLanguage(e, router)} defaultValue={locale}>
      {options}
    </select>
  );
}
