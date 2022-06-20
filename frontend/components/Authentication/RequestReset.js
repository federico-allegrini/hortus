import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Form from "../styles/Form";
import useForm from "../../lib/useForm";
import ErrorMessage from "../ErrorMessage";
import { useTranslation } from "../../lib/getTranslation";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { t } = useTranslation();
  const { inputs, handleChange, resetForm } = useForm({ email: "" });
  const [requestReset, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  async function handleSubmit(e) {
    e.preventDefault();
    await requestReset().catch(console.error);
    resetForm();
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>{t.resetPassword}</h2>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>
            {t.successReset}!<br></br>
            {t.checkYourEmailForAResetLink}.
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
        <button type="submit">{t.requestReset}</button>
      </fieldset>
    </Form>
  );
}
