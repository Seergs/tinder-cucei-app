import { useState } from "react";

interface useFormProps {
  initialValues: {
    [key: string]: any;
  };
}
export default function useForm({ initialValues = {} }: useFormProps) {
  const [values, setValues] = useState(initialValues);

  function onChange(key: string, newValue: any) {
    setValues({ ...values, [key]: newValue });
  }

  function onSubmit() {
    console.log(values);
  }

  return {
    values,
    onChange,
    onSubmit,
  };
}
