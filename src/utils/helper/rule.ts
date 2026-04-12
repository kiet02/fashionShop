// utils/rules.ts
import * as yup from 'yup';
import { EN } from '../language/en';

export const getLoginSchema = (language: typeof EN) =>
  yup.object({
    email: yup
      .string()
      .required(language.login.validation.emailRequired)
      .email(language.login.validation.emailInvalid),
    password: yup
      .string()
      .required(language.login.validation.passwordRequired)
      .min(6, language.login.validation.passwordMin),
  });

export const registerSchema = (language: typeof EN) =>
  yup.object({
    email: yup
      .string()
      .required(language.register.validation.emailRequired)
      .email(language.register.validation.emailInvalid),
    password: yup
      .string()
      .required(language.register.validation.passwordRequired)
      .min(6, language.register.validation.passwordMin),
    confirmPassword: yup
      .string()
      .required(language.register.validation.passwordConfirmRequired)
      .oneOf(
        [yup.ref('password')],
        language.register.validation.passwordMismatch,
      ),
  });

export type LoginFormData = yup.InferType<ReturnType<typeof getLoginSchema>>;
export type RegisterFormData = yup.InferType<ReturnType<typeof registerSchema>>;
