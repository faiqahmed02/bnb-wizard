import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { createEntity, updateEntity } from '../utils/api'
import React from "react";

interface Field {
  name: string;
  label: string;
  type: string;
  condition?: (data: any) => boolean;
}

interface FormStepProps {
  schema: z.ZodType<any, any, any>;
  title: string;
  fields: Field[];
  nextStep: string;
  prevStep?: string;
}

const FormStep: React.FC<FormStepProps> = ({
  schema,
  title,
  fields,
  nextStep,
  prevStep,
}) => {
  const { formData, setFormData, uuid, setUuid } = useFormContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: zodResolver(schema),
  });

  const formDataWatch = watch();

  const onSubmit = async (data: any) => {
    try {
      if (!uuid) {
        // First step: create a new entity
        const response = await createEntity(data);
        setUuid(response.uuid);
      } else {
        // Subsequent steps: update the existing entity
        await updateEntity(uuid, data);
      }

      setFormData((prev) => ({ ...prev, ...data }));
      navigate(nextStep);
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>

        {fields.map(({ name, label, type, condition }) => {
          if (condition && !condition(formDataWatch)) return null;

          return (
            <div className="mb-4" key={name}>
              <label className="block text-gray-700">{label}</label>
              <input
                {...register(name, { valueAsNumber: type === "number" })}
                type={type}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[name]?.message as string}
                </p>
              )}
            </div>
          );
        })}

        <div className="flex justify-between">
          {prevStep && (
            <button
              type="button"
              onClick={() => navigate(prevStep)}
              className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep;
