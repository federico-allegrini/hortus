import ClientOnly from "../../components/ClientOnly";
import UserProfile from "../../components/Authentication/UserProfile";

export default function UserPage() {
  return (
    <ClientOnly>
      <UserProfile />
    </ClientOnly>
  );
}
