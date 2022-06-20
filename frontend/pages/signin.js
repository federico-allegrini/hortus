import styled from "styled-components";
import RequestReset from "../components/Authentication/RequestReset";
import SignIn from "../components/Authentication/SignIn";
import SignUp from "../components/Authentication/SignUp";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 2rem;
`;

export default function SignInPage() {
  return (
    <Grid>
      <SignIn />
      <SignUp />
      <RequestReset />
    </Grid>
  );
}
