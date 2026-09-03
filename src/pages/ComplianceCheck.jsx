import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ComplianceCheck() {
  const navigate = useNavigate();
  const location = useLocation();

  const [checking, setChecking] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Data received from OCR Results / previous page
  const inspectionData = location.state || {};

  const productName =
    inspectionData.productName || "Sample Packaged Product";

  const images = inspectionData.images || [];

  const inspectionId =
    inspectionData.inspectionId || "INS-001";

  // Run compliance check
  const runComplianceCheck = () => {
    setChecking(true);
    setCompleted(false);

    // Simulate backend / Legal Metrology rule engine
    setTimeout(() => {
      setChecking(false);
      setCompleted(true);
    }, 2000);
  };

  // Go to Compliance Results
  const handleViewResults = () => {
    navigate("/compliance-results", {
      state: {
        productName,
        images,
        inspectionId,
        complianceStatus: "Potential Violation",
        score: 82,
      },
    });
  };

  // Go directly to Compliance Report
  const handleViewReport = () => {
    navigate("/compliance-report", {
      state: {
        productName,
        images,
        inspectionId,
        complianceStatus: "Potential Violation",
        score: 82,
      },
    });
  };

  return (
    <div className="app">

      {/* ================= HEADER ================= */}
      <header className="topbar">

        <div className="brand">
          <span className="brand-icon">◇</span>
          METROSCAN
        </div>

        <div className="inspection-id">
          Inspection ID:{" "}
          <strong>{inspectionId}</strong>
        </div>

      </header>

      {/* ================= MAIN ================= */}
      <main className="page-container">

        {/* Page Heading */}
        <div className="page-heading">

          <span className="eyebrow">
            STEP 5 OF 5
          </span>

          <h1>
            Compliance Check
          </h1>

          <p>
            Analyze the extracted product declarations against
            applicable Legal Metrology requirements.
          </p>

        </div>

        {/* ================= PRODUCT CARD ================= */}
        <section className="form-card">

          <div className="compliance-check-header">

            <div>

              <h2>
                {productName}
              </h2>

              <p>
                Images captured:{" "}
                <strong>
                  {images.length}
                </strong>
              </p>

            </div>

            {/* Status */}
            {!checking && !completed && (
              <span className="compliance-badge review">
                Ready for Check
              </span>
            )}

            {checking && (
              <span className="compliance-badge review">
                Checking...
              </span>
            )}

            {completed && (
              <span className="compliance-badge compliant">
                Check Completed
              </span>
            )}

          </div>

          {/* ================= RULE CHECKS ================= */}
          <div className="rule-check-list">

            {/* Mandatory Declarations */}
            <div className="rule-check-item">

              <div className="rule-icon">
                ✓
              </div>

              <div>
                <strong>
                  Mandatory Declarations
                </strong>

                <p>
                  Check whether required declarations
                  are present on the package.
                </p>
              </div>

            </div>

            {/* Manufacturer Details */}
            <div className="rule-check-item">

              <div className="rule-icon">
                ✓
              </div>

              <div>
                <strong>
                  Manufacturer Details
                </strong>

                <p>
                  Verify manufacturer / packer / importer
                  information.
                </p>
              </div>

            </div>

            {/* Net Quantity */}
            <div className="rule-check-item">

              <div className="rule-icon">
                ✓
              </div>

              <div>
                <strong>
                  Net Quantity
                </strong>

                <p>
                  Verify the declared quantity and
                  applicable unit.
                </p>
              </div>

            </div>

            {/* MRP */}
            <div className="rule-check-item">

              <div className="rule-icon">
                ✓
              </div>

              <div>
                <strong>
                  MRP Declaration
                </strong>

                <p>
                  Check the maximum retail price declaration.
                </p>
              </div>

            </div>

            {/* Consumer Information */}
            <div className="rule-check-item">

              <div className="rule-icon">
                ✓
              </div>

              <div>
                <strong>
                  Consumer Information
                </strong>

                <p>
                  Verify required consumer-care/contact
                  information.
                </p>
              </div>

            </div>

          </div>

          {/* ================= CHECKING ================= */}
          {checking && (
            <div className="checking-box">

              <div className="processing-spinner"></div>

              <h3>
                Running Compliance Check
              </h3>

              <p>
                Comparing extracted declarations
                with applicable rules...
              </p>

            </div>
          )}

          {/* ================= COMPLETED ================= */}
          {completed && (
            <div className="check-completed">

              <div className="completed-icon">
                ✓
              </div>

              <div>

                <h3>
                  Compliance Check Completed
                </h3>

                <p>
                  The product has been analyzed successfully.
                  View the detailed compliance results or report.
                </p>

              </div>

            </div>
          )}

          {/* ================= BUTTONS ================= */}
          <div className="form-actions">

            {/* Before checking */}
            {!checking && !completed && (
              <button
                type="button"
                className="primary-btn"
                onClick={runComplianceCheck}
              >
                Run Compliance Check →
              </button>
            )}

            {/* While checking */}
            {checking && (
              <button
                type="button"
                className="primary-btn"
                disabled
              >
                Checking...
              </button>
            )}

            {/* After checking */}
            {completed && (
              <>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={handleViewResults}
                >
                  View Compliance Results
                </button>

                <button
                  type="button"
                  className="primary-btn"
                  onClick={handleViewReport}
                >
                  View Compliance Report →
                </button>
              </>
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default ComplianceCheck;