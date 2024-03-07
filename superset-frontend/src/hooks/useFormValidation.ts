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

const useFormValidation = (
  initialValues: FormValues,
  validationRules: ValidationRules,
) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (name: string, value: any) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validateForm = () => {
    const formErrors: FormErrors = {};

    Object.keys(validationRules).forEach(fieldName => {
      const value = values[fieldName];
      const validate = validationRules[fieldName];
      const error = validate(value);
      if (error) {
        formErrors[fieldName] = error;
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  return { values, errors, handleChange, validateForm };
};

export default useFormValidation;
