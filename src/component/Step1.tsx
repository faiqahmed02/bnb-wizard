import FormStep from "./FormSteps";
import { personalSchema } from "../schemas/validation";

const Step1 = () => {
  return (
    <FormStep
      schema={personalSchema}
      title="Personal Information"
      fields={[
        { name: "firstName", label: "First Name", type: "text" },
        { name: "lastName", label: "Last Name", type: "text" },
        { name: "dob", label: "Date of Birth", type: "date" },
      ]}
      nextStep="/step2"
    />
  );
};

export default Step1;
