import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ComplianceReport() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state || {};

  const productName =
    data.productName || "Sample Packaged Product";

  const inspectionId =
    data.inspectionId || "INS-001";

  const score =
    data.score ?? 82;

  const status =
    data.complianceStatus || "Potential Violation";

  const declarations = [
    {
      name: "Product / Commodity Name",
      value: "Present",
      status: "Compliant",
    },
    {
      name: "Manufacturer / Packer Details",
      value: "Present",
      status: "Compliant",
    },
    {
      name: "Net Quantity",
      value: "500 g",
      status: "Compliant",
    },
    {
      name: "Maximum Retail Price",
      value: "₹120",
      status: "Compliant",
    },
    {
      name: "Consumer Care Details",
      value: "Present",
      status: "Compliant",
    },
    {
      name: "Country of Origin",
      value: "Not clearly detected",
      status: "Potential Violation",
    },
  ];

  const violations = [
    {
      id: 1,
      title: "Country of Origin",
      severity: "Potential Violation",
      description:
        "Required declaration could not be confidently detected in the submitted product images.",
      rule:
        "Applicable packaged commodity declaration requirement",
    },
    {
      id: 2,
      title: "Declaration Confidence",
      severity: "Requires Review",
      description:
        "OCR confidence for one declaration is below the configured verification threshold.",
      rule:
        "Manual verification recommended",
    },
  ];

  function handleBack() {
    navigate("/compliance-results", {
      state: data,
    });
  }

  function handleNewInspection() {
    navigate("/new-inspection");
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="app report-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="topbar">

        <div className="brand">
          <span className="brand-icon">
            ◇
          </span>

          METROSCAN
        </div>

        <div>
          Inspection ID:{" "}
          <strong>{inspectionId}</strong>
        </div>

      </header>


      {/* =========================
          MAIN
      ========================= */}

      <main className="page-container">

        {/* Heading */}

        <div className="report-heading">

          <div>

            <span className="eyebrow">
              INSPECTION REPORT
            </span>

            <h1>
              Compliance Report
            </h1>

            <p>
              Detailed compliance analysis for the
              inspected packaged product.
            </p>

          </div>

          <button
            className="secondary-btn"
            onClick={handlePrint}
          >
            🖨 Print Report
          </button>

        </div>


        {/* =========================
            PRODUCT INFO
        ========================= */}

        <section className="report-product-card">

          <div>

            <span className="report-label">
              PRODUCT
            </span>

            <h2>
              {productName}
            </h2>

          </div>

          <div>

            <span className="report-label">
              INSPECTION ID
            </span>

            <strong>
              {inspectionId}
            </strong>

          </div>

          <div>

            <span className="report-label">
              INSPECTION STATUS
            </span>

            <span
              className={
                status === "Compliant"
                  ? "compliance-badge compliant"
                  : status === "Potential Violation"
                  ? "compliance-badge violation"
                  : "compliance-badge review"
              }
            >
              {status}
            </span>

          </div>

        </section>


        {/* =========================
            SCORE
        ========================= */}

        <section className="report-score-section">

          <div className="score-circle">

            <span>
              {score}
            </span>

            <small>
              /100
            </small>

          </div>

          <div className="score-information">

            <span className="eyebrow">
              COMPLIANCE SCORE
            </span>

            <h2>
              {score >= 90
                ? "High Compliance"
                : score >= 70
                ? "Potential Issues Detected"
                : "Low Compliance"}
            </h2>

            <p>
              The score represents the result of
              declaration detection and rule validation.
            </p>

          </div>

        </section>


        {/* =========================
            DECLARATIONS
        ========================= */}

        <section className="report-section">

          <div className="section-title">

            <div>
              <span className="eyebrow">
                OCR + RULE VALIDATION
              </span>

              <h2>
                Declaration Analysis
              </h2>
            </div>

          </div>


          <div className="declaration-table-wrapper">

            <table className="declaration-table">

              <thead>

                <tr>
                  <th>
                    Declaration
                  </th>

                  <th>
                    Detected Value
                  </th>

                  <th>
                    Result
                  </th>
                </tr>

              </thead>

              <tbody>

                {declarations.map(
                  (item, index) => (

                    <tr key={index}>

                      <td>
                        <strong>
                          {item.name}
                        </strong>
                      </td>

                      <td>
                        {item.value}
                      </td>

                      <td>

                        <span
                          className={
                            item.status ===
                            "Compliant"
                              ? "compliance-badge compliant"
                              : "compliance-badge violation"
                          }
                        >
                          {item.status}
                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </section>


        {/* =========================
            VIOLATIONS
        ========================= */}

        <section className="report-section">

          <div className="section-title">

            <div>

              <span className="eyebrow">
                RULE ENGINE
              </span>

              <h2>
                Potential Violations
              </h2>

            </div>

            <span className="violation-count">
              {violations.length} Issues
            </span>

          </div>


          <div className="report-violations">

            {violations.map(
              (violation) => (

                <div
                  className="report-violation-card"
                  key={violation.id}
                >

                  <div className="violation-number">
                    {violation.id}
                  </div>

                  <div className="violation-content">

                    <div className="violation-title-row">

                      <h3>
                        {violation.title}
                      </h3>

                      <span className="compliance-badge violation">
                        {violation.severity}
                      </span>

                    </div>

                    <p>
                      {violation.description}
                    </p>

                    <div className="rule-reference">

                      <strong>
                        Rule / Reference:
                      </strong>

                      <span>
                        {violation.rule}
                      </span>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </section>


        {/* =========================
            RECOMMENDATION
        ========================= */}

        <section className="recommendation-card">

          <div className="recommendation-icon">
            !
          </div>

          <div>

            <span className="eyebrow">
              RECOMMENDATION
            </span>

            <h2>
              Manual Review Recommended
            </h2>

            <p>
              One or more declarations require
              verification. The officer should review
              the highlighted product areas and confirm
              the final compliance decision.
            </p>

          </div>

        </section>


        {/* =========================
            ACTIONS
        ========================= */}

        <div className="report-actions">

  <button
    type="button"
    className="secondary-btn"
    onClick={() => navigate("/compliance-results")}
  >
    ← Back to Results
  </button>

  <button
    type="button"
    className="primary-btn"
    onClick={() => navigate("/new-inspection")}
  >
    Start New Inspection →
  </button>

</div>

      </main>

    </div>
  );
}