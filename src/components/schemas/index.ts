import * as yup from "yup";

export const modalSchema = yup.object().shape({
  input: yup.string().required("Το πεδίο είναι υποχρεωτικό"),
})
