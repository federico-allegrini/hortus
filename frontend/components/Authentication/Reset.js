import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Form from "../styles/Form";
import useForm from "../../lib/useForm";
import ErrorMessage from "../ErrorMessage";
import { useTranslation } from "../../lib/getTranslation";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { t } = useTranslation();
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    token,
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  async function handleSubmit(e) {
    e.preventDefault();
    await reset().catch(console.error);
    resetForm();
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>{t.resetYourPassword}</h2>
      <ErrorMessage error={error || successfulError} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>
            {t.successReset}!<br></br>
            {t.youCanNowSignIn}.
          </p>
        )}
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
        <button type="submit">{t.reset}</button>
      </fieldset>
    </Form>
  );
}
