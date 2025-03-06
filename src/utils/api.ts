// src/api/entityApi.ts
import { FormData } from "../types";

const API_BASE = "http://localhost:3000/entities";

export const createEntity = async (data: FormData) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json(); // Should return an entity with a unique ID
};

export const updateEntity = async (uuid: string, data: Partial<FormData>) => {
  const response = await fetch(`${API_BASE}/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
