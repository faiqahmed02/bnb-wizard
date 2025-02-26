import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface FormStepProps {
  schema: z.ZodType<any>;
  fields: { name: string; label: string; type: string }[];
  nextStep: string;
  prevStep?: string;
  title: string;
}

const FormStep: React.FC<FormStepProps> = ({ schema, fields, nextStep, prevStep, title }) => {
  const { formData, setFormData } = useFormContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    navigate(nextStep);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>

        {fields.map(({ name, label, type }) => (
          <div key={name} className="mb-4">
            <label className="block text-gray-700">{label}</label>
            <input
              {...register(name, type === "number" ? { valueAsNumber: true } : {})}
              type={type}
              placeholder={label}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
            )}
          </div>
        ))}

        <div className="flex space-x-2">
          {prevStep && (
            <button
              type="button"
              onClick={() => navigate(prevStep)}
              className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep;
