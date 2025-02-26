import { FormData } from "../types";

const API_BASE = "http://localhost:3000/entities";

export const saveFormData = async (data: FormData) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
