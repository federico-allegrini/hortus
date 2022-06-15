import SignIn from "../components/Authentication/SignIn";
import { useTranslation } from "../lib/getTranslation";

export default function SignInPage() {
  const { t } = useTranslation();
  return <SignIn />;
}
