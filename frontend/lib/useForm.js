import { useEffect, useState } from "react";

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    switch (type) {
      case "number":
        value = value ? parseInt(value) : "";
        break;
      case "file":
        value = e.target.files;
        break;
      case "checkbox":
        value = e.target.checked;
        break;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ""])
    );
    setInputs(blankState);
  }

  return { inputs, handleChange, resetForm, clearForm };
}
