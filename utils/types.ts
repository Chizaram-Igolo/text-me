import { object, string, ref } from "yup";

export type RegisterValues = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type RegisterValuesPrepared = {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  password: string;
};

export type LoginValuesPrepared = {
  email: string;
  password: string;
  entry_point: string;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  description: string;
  publishedDate: string;
};

export type RegisterErrors = { [K in keyof RegisterValues]?: string };

export type SetSubmitting = (isSubmitting: boolean) => void;

export const regValidationSchema = object({
  firstname: string().required().min(3).max(24).label("First name"),
  lastname: string().required().min(3).max(24).label("Last name"),
  username: string().required().min(3).max(24).label("Username"),
  email: string().email().required().label("Email"),
  password: string().required().min(8).max(24).label("Password"),
  confirmPassword: string()
    .required()
    .oneOf([ref("password")], "Passwords must match")
    .label("Confirm Password"),
});

export const loginValidationSchema = object({
  email: string().email().required().label("Email"),
  password: string().required().min(8).max(24).label("Password"),
});
