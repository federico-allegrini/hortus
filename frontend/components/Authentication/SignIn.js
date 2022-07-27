import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Form from "../styles/Form";
import useForm from "../../lib/useForm";
import { CURRENT_USER_QUERY } from "../User";
import ErrorMessage from "../ErrorMessage";
import { useTranslation } from "../../lib/getTranslation";
import { useRouter } from "next/router";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { t } = useTranslation();
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit(e) {
    e.preventDefault();
    await signin();
    resetForm();
    router.push({ pathname: "/" });
  }
  const error =
    data?.authenticateUserWithPassword.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>{t.signIntoYourAccount}</h2>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          {t.email}
          <input
            type="email"
            name="email"
            placeholder={t.yourEmailAddress}
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          {t.password}
          <input
            type="password"
            name="password"
            placeholder={t.yourPassword}
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">{t.signIn}</button>
      </fieldset>
    </Form>
  );
}
