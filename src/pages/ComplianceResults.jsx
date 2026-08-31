import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ComplianceBadge from "../components/ComplianceBadge";
import ViolationCard from "../components/ViolationCard";
import ViolationViewer from "../components/ViolationViewer";

import {
  getComplianceResults,
} from "../api/inspectionApi";

export default function ComplianceResults() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [selectedViolation, setSelectedViolation] =
    useState(null);

  const [images, setImages] = useState({});

  useEffect(() => {
    async function load() {
      const result =
        await getComplianceResults(id);

      setData(result);

      /*
       * In the real application these image URLs
       * will come from the backend/S3.
       *
       * For this demo we retrieve the uploaded
       * images from session/local state if available.
       */

      const stored =
        sessionStorage.getItem(
          `inspection-images-${id}`
        );

      if (stored) {
        setImages(JSON.parse(stored));
      }
    }

    load();
  }, [id]);

  if (!data) {
    return (
      <main className="center-message">
        Loading compliance results...
      </main>
    );
  }

  /*
   * Demo fallback images.
   * Real backend should return image URLs.
   */
  const viewerImages =
    Object.keys(images).length > 0
      ? images
      : {
          front: {
            preview:
              "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=80",
          },
          back: {
            preview:
              "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=900&q=80",
          },
        };

  function handleView(violation) {
    setSelectedViolation(violation);
  }

  return (
    <main className="app">
      <div className="topbar">
        <div className="brand">
          ◈ METROSCAN
        </div>

        <span>
          Inspection ID: {id}
        </span>
      </div>

      <div className="page-container">
        <div className="page-heading">
          <span className="eyebrow">
            STEP 4 OF 5
          </span>

          <h1>Compliance Results</h1>

          <p>
            Review the automated Legal Metrology
            compliance analysis.
          </p>
        </div>

        <ComplianceBadge
          status={data.status}
          score={data.score}
        />

        <div className="result-summary">
          <div className="summary-card">
            <span>Total Requirements</span>
            <strong>
              {data.totalRequirements}
            </strong>
          </div>

          <div className="summary-card">
            <span>Requirements Met</span>
            <strong>
              {data.passedRequirements}
            </strong>
          </div>

          <div className="summary-card">
            <span>Potential Violations</span>
            <strong>
              {data.violations.length}
            </strong>
          </div>

          <div className="summary-card">
            <span>Missing Declarations</span>
            <strong>
              {data.missingDeclarations.length}
            </strong>
          </div>
        </div>

        <section className="result-section">
          <div className="section-title">
            <div>
              <span className="eyebrow">
                DETECTED ISSUES
              </span>

              <h2>
                Potential Violations
              </h2>
            </div>
          </div>

          <div className="violations-grid">
            <div className="violations-list">
              {data.violations.map(
                (violation) => (
                  <ViolationCard
                    key={violation.id}
                    violation={violation}
                    onView={handleView}
                  />
                )
              )}
            </div>

            <ViolationViewer
              images={viewerImages}
              violations={data.violations}
              selectedViolation={
                selectedViolation
              }
            />
          </div>
        </section>

        <div className="bottom-actions">
          <button
            className="secondary-btn large"
            onClick={() =>
              navigate(
                `/inspection/${id}/declarations`
              )
            }
          >
            ← Review Declarations
          </button>

          <button className="primary-btn">
            Generate Inspection Report →
          </button>
        </div>
      </div>
    </main>
  );
}