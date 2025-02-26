import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { FormProvider, useFormContext } from "./context/FormContext";
import Step1 from "./component/Step1";
import Step2 from "./component/Step2";
import Step3 from "./component/Step3";
import Step4 from "./component/Step4";
import FinalStep from "./component/FinalStep";

const Stepper: React.FC = () => {
  const { formData } = useFormContext();
  const navigate = useNavigate();

  // Define steps
  const steps = [
    { label: "Personal Details", path: "/" },
    { label: "Loan Details", path: "/step2" },
    { label: "Financial Details", path: "/step3" },
    { label: "Review & Submit", path: "/step4" },
    { label: "Final Step", path: "/final" },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isActive = window.location.pathname === step.path;
          return (
            <div
              key={index}
              onClick={() => navigate(step.path)}
              className={`cursor-pointer ${isActive ? "font-bold text-blue-600" : "text-gray-600"}`}
            >
              {step.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <FormProvider>
      <div className="p-6">
        <Stepper />
        <Routes>
          <Route path="/" element={<Step1 />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/step3" element={<Step3 />} />
          <Route path="/step4" element={<Step4 />} />
          <Route path="/final" element={<FinalStep />} />
        </Routes>
      </div>
    </FormProvider>
  </Router>
);

export default App;
