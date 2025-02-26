import { useNavigate } from "react-router-dom";

const Stepper: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-4">
        {[...Array(totalSteps)].map((_, idx) => (
          <div
            key={idx}
            className={`w-8 h-8 rounded-full ${
              currentStep > idx + 1 ? "bg-blue-500" : "bg-gray-300"
            } text-white flex items-center justify-center`}
          >
            {idx + 1}
          </div>
        ))}
      </div>
      <div className="h-1 bg-gray-300">
        <div
          className="h-1 bg-blue-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Stepper;
