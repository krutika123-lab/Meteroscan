import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProcessingStatus from "../components/ProcessingStatus";
import { processInspection } from "../api/inspectionApi";

export default function Processing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    // Animate processing steps
    const interval = setInterval(() => {
      if (!mounted) return;

      setStep((previousStep) => {
        if (previousStep >= 4) {
          return previousStep;
        }

        return previousStep + 1;
      });
    }, 900);

    // Start backend processing
    async function processProduct() {
      try {
        const result = await processInspection(id);

        if (!mounted) return;

        if (result?.success) {
          // Give the final processing step a moment
          // to display before navigating.
          setStep(4);

          setTimeout(() => {
            if (mounted) {
              navigate(
                `/inspection/${id}/declarations`
              );
            }
          }, 1200);
        } else {
          setError(
            "Inspection processing could not be completed."
          );
        }
      } catch (err) {
        console.error(
          "Inspection processing error:",
          err
        );

        if (mounted) {
          setError(
            "Unable to process the inspection. Please try again."
          );
        }
      }
    }

    processProduct();

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [id, navigate]);

  // Error screen
  if (error) {
    return (
      <main className="app">
        <div className="topbar">
          <div className="brand">
            <span className="brand-icon">◈</span>
            METROSCAN
          </div>

          <span>
            Inspection ID: {id}
          </span>
        </div>

        <div className="processing-card">
          <div className="error-icon">
            !
          </div>

          <h2>Processing Failed</h2>

          <p>{error}</p>

          <div className="processing-actions">
            <button
              className="secondary-btn"
              onClick={() =>
                navigate(
                  `/inspection/${id}/scan`
                )
              }
            >
              ← Back to Scan
            </button>

            <button
              className="primary-btn"
              onClick={() =>
                window.location.reload()
              }
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="app">
      <div className="topbar">
        <div className="brand">
          <span className="brand-icon">◈</span>
          METROSCAN
        </div>

        <span>
          Inspection ID: <strong>{id}</strong>
        </span>
      </div>

      <div className="page-container">
        <div className="processing-card">
          <div className="processing-spinner"></div>

          <span className="eyebrow">
            STEP 3 OF 5
          </span>

          <h2>Analyzing Product</h2>

          <p>
            Please wait while the product images
            are processed.
          </p>

          <ProcessingStatus
            currentStep={step}
          />

          <div className="processing-note">
            <span>ℹ</span>
            <p>
              Do not close or refresh this page
              while the inspection is being
              processed.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}