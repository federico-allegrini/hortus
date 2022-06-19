import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Form from "../styles/Form";
import useForm from "../../lib/useForm";
import ErrorMessage from "../ErrorMessage";
import { useTranslation } from "../../lib/getTranslation";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

export default function SignUp() {
  const { t } = useTranslation();
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    name: "",
    password: "",
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });
  async function handleSubmit(e) {
    e.preventDefault();
    await signup().catch(console.error);
    resetForm();
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>{t.signUpForAnAccount}</h2>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (
          <p>
            {t.signedUpWith} <span>{data.createUser.email}</span>
            <br></br>
            {t.pleaseGoHaeadAndSignIn}.
          </p>
        )}
        <label htmlFor="name">
          {t.name}
          <input
            type="name"
            name="name"
            placeholder={t.yourName}
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">{t.signUp}</button>
      </fieldset>
    </Form>
  );
}
