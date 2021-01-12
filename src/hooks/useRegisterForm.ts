import { useState } from "react";
import { isEmpty, formatDate, getAgeFromDateOfBirth } from "../utils/utils";
import { careers } from "../utils/careers";

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

export interface StepThree {
  career: string;
  studentCode: string;
  studentNip: string;
}

export interface StepThreeErrors {
  career: string | null;
  studentCode: string | null;
  studentNip: string | null;
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

const stepThreeInitialValues: StepThree = {
  career: "",
  studentCode: "",
  studentNip: "",
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

const stepThreeInitialErrors: StepThreeErrors = {
  career: null,
  studentCode: null,
  studentNip: null,
};

export default function useRegisterForm() {
  const [step, setStep] = useState(0);
  const [stepOneValues, setStepOneValues] = useState(stepOneInitialValues);
  const [stepTwoValues, setStepTwoValues] = useState(stepTwoInitialValues);
  const [stepThreeValues, setStepThreeValues] = useState(
    stepThreeInitialValues
  );

  const [stepOneErrors, setStepOneErrors] = useState(stepOneInitialErrors);
  const [stepTwoErrors, setStepTwoErrors] = useState(stepTwoInitialErrors);
  const [stepThreeErrors, setStepThreeErrors] = useState(
    stepThreeInitialErrors
  );

  function onChangeStepOne(key: keyof StepOne, newValue: any) {
    setStepOneValues({ ...stepOneValues, [key]: newValue });
  }

  function onChangeStepTwo(key: keyof StepTwo, newValue: any) {
    setStepTwoValues({ ...stepTwoValues, [key]: newValue });
  }

  function onChangeStepThree(key: keyof StepThree, newValue: string) {
    setStepThreeValues({ ...stepThreeValues, [key]: newValue });
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
      case 2: {
        const errors = validateStepThree(stepThreeValues);
        if (Object.keys(errors).length) {
          setStepThreeErrors(errors);
        } else {
          setStepThreeErrors(stepThreeInitialErrors);
          console.log("Finsihed");
        }
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
    onNextStep,
  };

  const stepTwoHandler = {
    values: stepTwoValues,
    errors: stepTwoErrors,
    onChange: onChangeStepTwo,
    onChangeSecondaryImages,
    onNextStep,
  };

  const stepThreeHandler = {
    values: stepThreeValues,
    errors: stepThreeErrors,
    onChange: onChangeStepThree,
    onNextStep,
  };

  return {
    step,
    stepOneHandler,
    stepTwoHandler,
    stepThreeHandler,
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
  } else if (getAgeFromDateOfBirth(data.birthday) < 15) {
    errors.birthday = "Debes tener al menos 15 años";
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
    errors.primaryImageUrl = "Debes agregar al menos una foto principal";
  }

  return errors;
};

const validateStepThree = (data: StepThree) => {
  let errors: any = {};

  if (!Object.keys(careers).includes(data.career)) {
    errors.career = "Carrera no encontrada";
  }

  if (data.studentCode.trim().length !== 9) {
    errors.studentCode = "Inválido, debe ser un código de estudiante de UDG";
  }

  if (isEmpty(data.studentNip)) {
    errors.studentNip = "No puede estar vacío";
  }

  return errors;
};
