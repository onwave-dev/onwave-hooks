import { validate } from "email-validator";

export const useEmailValidator = () => {
  return { validate };
};
