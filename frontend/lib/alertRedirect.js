import Router from "next/router";
export default function AlertRedirect(
  fieldToCheck,
  alertMessage,
  redirectPath
) {
  if (!fieldToCheck) {
    alert(alertMessage);
    Router.push({ pathname: redirectPath });
    return true;
  }
  return false;
}
