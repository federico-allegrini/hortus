import { useTranslation } from "../lib/getTranslation";

export default function Information() {
  const { t } = useTranslation();
  return <div>{t.information}</div>;
}
