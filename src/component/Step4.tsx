import FormStep from "./FormSteps";
import { financialSchema } from "../schemas/validation";

const Step4 = () => {
  return (
    <FormStep
      schema={financialSchema}
      title="Financial Details"
      fields={[
        { name: "monthlySalary", label: "Monthly Salary", type: "number" },
        { name: "additionalIncome", label: "Additional Income", type: "number" },
        { name: "mortgage", label: "Mortgage", type: "number" },
        { name: "otherCredits", label: "Other Credits", type: "number" },
      ]}
      nextStep="/final"
      prevStep="/step3"
    />
  );
};

export default Step4;
