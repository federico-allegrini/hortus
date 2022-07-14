import { useRouter } from "next/router";

export default function AlertRedirect(
  fieldToCheck,
  alertMessage,
  redirectPath
) {
  const { push } = useRouter();
  if (!fieldToCheck) {
    alert(alertMessage);
    push({ pathname: redirectPath });
    return true;
  }
  return false;
}
