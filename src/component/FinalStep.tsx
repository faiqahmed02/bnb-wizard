import { useFormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";
import { createEntity } from "../utils/api";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";

// Define schema for final confirmation
const finalStepSchema = z.object({
  confirm: z.boolean().refine(val => val === true, {
    message: "You must confirm to proceed."
  })
});

const FinalStep: React.FC = () => {
  const { formData, resetFormData } = useFormContext();
  const navigate = useNavigate();

  // Initialize react-hook-form with schema validation
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(finalStepSchema),
  });

  // Calculate Age from the Date of Birth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    return new Date().getFullYear() - birthDate.getFullYear();
  };

  // Validate entire form data using personalSchema
  const validatedData = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dob: z.string().min(1, "Date of birth is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    loanAmount: z.number().min(1, "Loan amount is required"),
    upfrontPayment: z.number(),
    terms: z.number().min(1, "Loan term is required"),
    monthlySalary: z.number().min(0),
    additionalIncome: z.number(),
    mortgage: z.number(),
    otherCredits: z.number(),
  }).safeParse(formData);

  // Submit final form data to API
  const handleFinalize = async () => {
    try {
      await createEntity(formData);  // Send complete formData
      toast.success("Form submitted successfully");

      setTimeout(() => {
        resetFormData();
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  // Reset form and navigate back
  const handleRestart = () => {
    resetFormData();
    toast.success("Form reset successfully.");
    navigate("/");
  };

  // Watch checkbox value
  const confirmChecked = watch("confirm");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Review and Finalize
        </h2>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700">Personal Details</h3>
            <p><strong>First Name:</strong> {formData.firstName}</p>
            <p><strong>Last Name:</strong> {formData.lastName}</p>
            <p><strong>Date of Birth:</strong> {formData.dob}</p>
            <p><strong>Age:</strong> {formData.dob && calculateAge(formData.dob)}</p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700">Contact Details</h3>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700">Loan Details</h3>
            <p><strong>Loan Amount:</strong> {formData.loanAmount}</p>
            <p><strong>Upfront Payment:</strong> {formData.upfrontPayment}</p>
            <p><strong>Terms (Months):</strong> {formData.terms}</p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700">Financial Details</h3>
            <p><strong>Monthly Salary:</strong> {formData.monthlySalary}</p>
            <p><strong>Additional Income:</strong> {formData.additionalIncome}</p>
            <p><strong>Mortgage:</strong> {formData.mortgage}</p>
            <p><strong>Other Credits:</strong> {formData.otherCredits}</p>
          </div>
        </div>

        {validatedData.success ? (
          <form onSubmit={handleSubmit(handleFinalize)} className="mt-6 space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("confirm")}
                className="h-4 w-4"
              />
              <label className="text-sm text-gray-700">I confirm that the information is correct.</label>
            </div>
            {errors.confirm && (
              <p className="text-red-500 text-sm mt-1">{errors.confirm.message}</p>
            )}

            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${!confirmChecked ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!confirmChecked}
            >
              Finalize
            </button>
          </form>
        ) : (
          <div className="text-red-500 mt-4">
            <h3 className="font-semibold">Validation Errors:</h3>
            <ul className="list-disc list-inside">
              {validatedData.error?.errors.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Back
          </button>
          <button
            onClick={handleRestart}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
