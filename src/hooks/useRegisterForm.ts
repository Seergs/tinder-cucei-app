import { useState } from "react";
import { isEmpty, formatDate } from "../utils/utils";

interface StepOne {
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
}

interface StepOneErrors {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  birthday: string | null | undefined;
  gender: string | null | undefined;
}

const stepOneInitialValues: StepOne = {
  firstName: "",
  lastName: "",
  birthday: new Date(),
  gender: "m",
};

const stepOneInitialErrors: StepOneErrors = {
  firstName: null,
  lastName: null,
  birthday: null,
  gender: null,
};

export default function useRegisterForm() {
  const [step, setStep] = useState(1);

  const [stepOneValues, setStepOneValues] = useState(stepOneInitialValues);
  const [stepTwoValues, setStepTwoValues] = useState({});

  const [stepOneErrors, setStepOneErrors] = useState(stepOneInitialErrors);

  function onChangeStepOne(key: string, newValue: any) {
    setStepOneValues({ ...stepOneValues, [key]: newValue });
  }

  function onSubmit() {
    console.log(stepOneValues);
  }

  const onNextStep = async () => {
    switch (step) {
      case 0: {
        const errors = await validateStepOne();
        if (Object.keys(errors).length) {
          setStepOneErrors(errors);
        } else {
          setStepOneErrors(stepOneInitialErrors);
          setStep(1);
        }
      }
    }
  };

  const onPreviousStep = () => {
    setStep(step - 1);
  };

  const validateStepOne = async () => {
    let errors: any = {};
    if (isEmpty(stepOneValues.firstName)) {
      errors.firstName = "No puede estar vacío";
    }

    if (isEmpty(stepOneValues.lastName)) {
      errors.lastName = "No puede estar vacío";
    }
    if (!/\d{4}-\d{2}-\d{2}/.test(formatDate(stepOneValues.birthday))) {
      errors.birthday = "Fecha inválida (YYYY-MM-DD)";
    }
    if (!["m", "f"].includes(stepOneValues.gender)) {
      errors.gender = "Género no válido";
    }
    return errors;
  };

  return {
    step,
    stepOneValues,
    stepTwoValues,
    stepOneErrors,
    onChangeStepOne,
    onSubmit,
    onNextStep,
    onPreviousStep,
    validateStepOne,
  };
}
