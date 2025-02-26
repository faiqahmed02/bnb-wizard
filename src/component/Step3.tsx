import FormStep from "./FormSteps";
import { loanSchema } from "../schemas/validation";

const Step3 = () => {
  return (
    <FormStep
      schema={loanSchema}
      title="Loan Details"
      fields={[
        { name: "loanAmount", label: "Loan Amount", type: "number" },
        { name: "upfrontPayment", label: "Upfront Payment", type: "number" },
        { name: "terms", label: "Terms (in months)", type: "number" },
      ]}
      nextStep="/step4"
      prevStep="/step2"
    />
  );
};

export default Step3;
