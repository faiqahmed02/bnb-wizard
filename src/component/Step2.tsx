import FormStep from "./FormSteps";
import { contactSchema } from "../schemas/validation";

const Step2 = () => {
  return (
    <FormStep
      schema={contactSchema}
      title="Contact Details"
      fields={[
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
      ]}
      nextStep="/step3"
      prevStep="/"
    />
  );
};

export default Step2;
