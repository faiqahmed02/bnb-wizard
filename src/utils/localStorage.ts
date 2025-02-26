import { FormData } from "../types";

export const saveToLocalStorage = (data: FormData) => {
  localStorage.setItem("formData", JSON.stringify(data));
};

export const loadFromLocalStorage = (): FormData => {
  return JSON.parse(localStorage.getItem("formData") || "{}") || {};
};
