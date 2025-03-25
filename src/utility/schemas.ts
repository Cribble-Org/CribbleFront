import * as Yup from "yup";

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const ForgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(/\d/, 'Password must contain a number.')
    .matches(/[a-zA-Z]/, 'Password must contain a letter.'),
});

export const SignupSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/\d/, 'Password must contain at least one number.')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
    .required("Password is required"),
});

export const BotSchema = Yup.object().shape({
  botToken: Yup.string()
    .required("Token is required"),
});