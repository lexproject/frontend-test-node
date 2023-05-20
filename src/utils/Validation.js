import { useCallback, useState } from "react";

const message = {
  email: ' Введённые данные должны соотвеьствовать реальному E-mail адресу',
  name: ' Используйте только латинские или кирилические буквы, пробел и дефис',
  repeat: ' Введённые должны отличаться от от уже существующих'
}

export function useValidation() {
  const [values, setValues] = useState({ password: '', name: '', story: ''});
  const [errors, setErrors] = useState({ password: '', name: '', story: '', prompt: message});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const defaultMessage = target.validationMessage;
    const form = target.className.includes('popup__input') ? target.parentElement.parentElement : target.parentElement;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: defaultMessage });
    setIsValid(form.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = { password: '', name: '', story: ''}, newErrors = { password: '', name: '', story: '', prompt: message}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm,setValues };
}