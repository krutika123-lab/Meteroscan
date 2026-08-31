export default function ProcessingStatus({
  currentStep,
}) {
  const steps = [
    "Images uploaded",
    "Image preprocessing",
    "Extracting declarations",
    "Checking compliance",
    "Generating results",
  ];

  return (
    <div className="processing-card">
      <div className="processing-spinner"></div>

      <h2>Analyzing Product</h2>

      <p>
        Please wait while the inspection is processed.
      </p>

      <div className="processing-steps">
        {steps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;

          return (
            <div
              className="processing-step"
              key={step}
            >
              <span
                className={
                  completed
                    ? "process-icon completed"
                    : active
                    ? "process-icon active"
                    : "process-icon"
                }
              >
                {completed ? "✓" : index + 1}
              </span>

              <span>{step}</span>

              {active && (
                <span className="loading-dots">
                  ...
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}