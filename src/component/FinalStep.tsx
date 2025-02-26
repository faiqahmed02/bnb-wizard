import { useFormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";
import { saveFormData } from "../utils/api";
import toast from "react-hot-toast";
import { z } from "zod";
import { personalSchema } from "../schemas/validation";

const FinalStep: React.FC = () => {
  const { formData, resetFormData } = useFormContext();
  const navigate = useNavigate();

  // Calculate Age from the Date of Birth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age;
  };

  // Zod validation for form data
  const validatedData = personalSchema.safeParse(formData);

  const handleFinalize = async () => {
    try {
      await saveFormData(formData);
      toast.success("Form submitted successfully");

      setTimeout(() => {
        resetFormData();
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  const handleRestart = () => {
    resetFormData();
    toast.success("Form reset successfully.");
    navigate("/");
  };

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
          <div className="mt-6 space-y-3">
            <button
              onClick={handleFinalize}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Finalize
            </button>
          </div>
        ) : (
          <div className="text-red-500 mt-4">
            <h3 className="font-semibold">Validation Errors:</h3>
            <ul className="list-disc list-inside">
              {validatedData.error.errors.map((error, index) => (
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
