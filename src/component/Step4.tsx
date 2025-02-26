import FormStep from "./FormSteps";
import { financialSchema } from "../schemas/validation";

const Step4 = () => {
  return (
    <FormStep
      schema={financialSchema}
      title="Financial Details"
      fields={[
        { name: "monthlySalary", label: "Monthly Salary", type: "number" },
        
        // Checkbox for Additional Income
        { name: "showAdditionalIncome", label: "Do you have additional income?", type: "checkbox" },
        
        // Additional Income, only visible if the checkbox is checked
        { 
          name: "additionalIncome", 
          label: "Additional Income", 
          type: "number", 
          condition: (data) => data.showAdditionalIncome 
        },
        
        // Checkbox for Mortgage
        { name: "showMortgage", label: "Do you have a mortgage?", type: "checkbox" },
        
        // Mortgage, only visible if the checkbox is checked
        { 
          name: "mortgage", 
          label: "Mortgage", 
          type: "number", 
          condition: (data) => data.showMortgage 
        },
        
        // Checkbox for Other Credits
        { name: "showOtherCredits", label: "Do you have other credits?", type: "checkbox" },
        
        // Other Credits, only visible if the checkbox is checked
        { 
          name: "otherCredits", 
          label: "Other Credits", 
          type: "number", 
          condition: (data) => data.showOtherCredits 
        },
      ]}
      nextStep="/final"
      prevStep="/step3"
    />
  );
};

export default Step4;
