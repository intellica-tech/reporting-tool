import { useState } from 'react';

interface FormValues {
  [key: string]: any;
}

interface FormErrors {
  [key: string]: string;
}

interface ValidationRules {
  [key: string]: (value: string | boolean) => string | undefined;
}

const useFormValidationForSQLAlchemyURI = (
  initialValues: FormValues,
  validationRules: ValidationRules,
) => {
  const [sqlAlchemyValues, setValues] = useState<FormValues>(initialValues);
  const [sqlAlchemyErrors, setErrors] = useState<FormErrors>({});

  const sqlAlchemyHandleChange = (name: string, value: any) => {
    setValues({
      ...sqlAlchemyValues,
      [name]: value,
    });
  };

  const sqlAlchemyValidateForm = () => {
    const formErrors: FormErrors = {};

    Object.keys(validationRules).forEach(fieldName => {
      const value = sqlAlchemyValues[fieldName];
      const validate = validationRules[fieldName];
      const error = validate(value);
      if (error) {
        formErrors[fieldName] = error;
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  return {
    sqlAlchemyValues,
    sqlAlchemyErrors,
    sqlAlchemyHandleChange,
    sqlAlchemyValidateForm,
  };
};

export default useFormValidationForSQLAlchemyURI;
