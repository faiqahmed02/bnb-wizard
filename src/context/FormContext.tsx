import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { FormData } from "../types";
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/localStorage";

// Define the context type
interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  uuid: string | null;
  setUuid: React.Dispatch<React.SetStateAction<string | null>>;
  resetFormData: () => void;
}

// Create the context
const FormContext = createContext<FormContextType | null>(null);

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormProvider");
  }
  return context;
};

// FormProvider component
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storedData = loadFromLocalStorage();
  const [formData, setFormData] = useState<FormData>(storedData || {});
  const [uuid, setUuid] = useState<string | null>(storedData?.uuid || null);

  useEffect(() => {
    saveToLocalStorage({ ...formData, uuid: uuid ? uuid : "" });
  }, [formData, uuid]);

  const resetFormData = () => {
    setFormData({});
    setUuid(null);
    saveToLocalStorage({});
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, uuid, setUuid, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};
