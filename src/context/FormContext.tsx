import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { FormData } from "../types";  // Import your FormData type
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/localStorage"; // Ensure these functions are correctly implemented

// Define the context type
interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  resetFormData: () => void;  // Function to reset form data
}

// Create a context with a default value of null
const FormContext = createContext<FormContextType | null>(null);

// Custom hook to access the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormProvider");
  }
  return context;
};

// FormProvider component to wrap your app and provide the form context
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load the initial form data from localStorage (with fallback to empty object if not available)
  const [formData, setFormData] = useState<FormData>(() => {
    const storedData = loadFromLocalStorage();
    return {
      firstName: storedData?.firstName || "",
      lastName: storedData?.lastName || "",
      dob: storedData?.dob || "",
      email: storedData?.email || "",
      phone: storedData?.phone || "",
      loanAmount: storedData?.loanAmount ?? 0,          // Default to 0 if missing
      upfrontPayment: storedData?.upfrontPayment ?? 0,  // Default to 0 if missing
      terms: storedData?.terms ?? 0,                    // Default to 0 if missing
      monthlySalary: storedData?.monthlySalary ?? 0,    // Default to 0 if missing
      additionalIncome: storedData?.additionalIncome ?? 0, // Default to 0 if missing
      mortgage: storedData?.mortgage ?? 0,              // Default to 0 if missing
      otherCredits: storedData?.otherCredits ?? 0,      // Default to 0 if missing
    };
  });

  // Use useEffect to save form data to localStorage whenever it changes
  useEffect(() => {
    if (formData) {
      saveToLocalStorage(formData);
    }
  }, [formData]);

  // Function to reset the form data to its initial state (with default values for numerical fields)
  const resetFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      phone: "",
      loanAmount: 0,            // Default to 0
      upfrontPayment: 0,        // Default to 0
      terms: 0,                 // Default to 0
      monthlySalary: 0,         // Default to 0
      additionalIncome: 0,      // Default to 0
      mortgage: 0,              // Default to 0
      otherCredits: 0,          // Default to 0
    });  // Reset to initial state with 0 for numerical fields
    saveToLocalStorage({});  // Optionally clear the localStorage as well
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};
