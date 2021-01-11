import { useState, useRef } from "react";
import { isEmpty, formatDate } from "../utils/utils";

export interface StepOne {
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
}

export interface StepOneErrors {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  birthday: string | null | undefined;
  gender: string | null | undefined;
}

export interface StepTwo {
  primaryImageUrl: string;
  secondaryImageUrls: string[];
  description: string;
}

export interface StepTwoErrors {
  primaryImageUrl: string | null;
  description: string | null;
}

const stepOneInitialValues: StepOne = {
  firstName: "",
  lastName: "",
  birthday: new Date(),
  gender: "m",
};

const stepTwoInitialValues: StepTwo = {
  primaryImageUrl: "",
  secondaryImageUrls: ["", "", ""],
  description: "",
};

const stepOneInitialErrors: StepOneErrors = {
  firstName: null,
  lastName: null,
  birthday: null,
  gender: null,
};

const stepTwoInitialErrors: StepTwoErrors = {
  description: null,
  primaryImageUrl: null,
};

export default function useRegisterForm() {
  const [step, setStep] = useState(0);
  const [stepOneValues, setStepOneValues] = useState(stepOneInitialValues);
  const [stepTwoValues, setStepTwoValues] = useState(stepTwoInitialValues);

  const [stepOneErrors, setStepOneErrors] = useState(stepOneInitialErrors);
  const [stepTwoErrors, setStepTwoErrors] = useState(stepTwoInitialErrors);

  function onChangeStepOne(key: keyof StepOne, newValue: any) {
    setStepOneValues({ ...stepOneValues, [key]: newValue });
  }

  function onChangeStepTwo(key: keyof StepTwo, newValue: any) {
    console.log(key, newValue);
    setStepTwoValues({ ...stepTwoValues, [key]: newValue });
  }

  function onChangeSecondaryImages(index: number, newValue: string) {
    let secondaryImageUrls = stepTwoValues.secondaryImageUrls;
    secondaryImageUrls[index] = newValue;

    setStepTwoValues({
      ...stepTwoValues,
      secondaryImageUrls: secondaryImageUrls,
    });
  }

  const onNextStep = () => {
    switch (step) {
      case 0: {
        const errors = validateStepOne(stepOneValues);
        if (Object.keys(errors).length) {
          setStepOneErrors(errors);
        } else {
          setStepOneErrors(stepOneInitialErrors);
          setStep(1);
        }
        break;
      }
      case 1: {
        const errors = validateStepTwo(stepTwoValues);
        if (Object.keys(errors).length) {
          setStepTwoErrors(errors);
        } else {
          setStepTwoErrors(stepTwoInitialErrors);
          setStep(2);
        }
        break;
      }
    }
  };

  const onPreviousStep = () => {
    setStep(step - 1);
  };

  const stepOneHandler = {
    values: stepOneValues,
    errors: stepOneErrors,
    onChange: onChangeStepOne,
  };

  const stepTwoHandler = {
    values: stepTwoValues,
    errors: stepTwoErrors,
    onChange: onChangeStepTwo,
    onChangeSecondaryImages,
  };

  return {
    step,
    stepOneHandler,
    stepTwoHandler,
    onNextStep,
    onPreviousStep,
  };
}

const validateStepOne = (data: StepOne) => {
  let errors: any = {};
  if (isEmpty(data.firstName)) {
    errors.firstName = "No puede estar vacío";
  }

  if (isEmpty(data.lastName)) {
    errors.lastName = "No puede estar vacío";
  }
  if (!/\d{4}-\d{2}-\d{2}/.test(formatDate(data.birthday))) {
    errors.birthday = "Fecha inválida (YYYY-MM-DD)";
  }
  if (!["m", "f"].includes(data.gender)) {
    errors.gender = "Género no válido";
  }
  return errors;
};

const validateStepTwo = (data: StepTwo) => {
  let errors: any = {};

  if (isEmpty(data.description)) {
    errors.description = "No puede estar vacío";
  }

  if (isEmpty(data.primaryImageUrl)) {
    errors.primaryImageUrl = "Al menos debes subir la imagen principal";
  }

  return errors;
};
