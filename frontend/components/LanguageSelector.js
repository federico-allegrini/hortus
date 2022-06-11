import { useRouter } from "next/router";

function changeLanguage(e, router) {
  const locale = e.target.value;
  const queryParams = Object.entries(router.query);
  if (queryParams.length > 0) {
    const query = queryParams.reduce(
      (acc, params) => ({ ...acc, [params[0]]: params[1] }),
      {}
    );
    router.push(
      { pathname: router.pathname, query },
      { pathname: router.pathname },
      {
        locale,
      }
    );
  } else {
    router.push(router.pathname, router.pathname, { locale });
  }
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
