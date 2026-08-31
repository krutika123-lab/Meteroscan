import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DeclarationTable from "../components/DeclarationTable";
import { getOCRResults } from "../api/inspectionApi";

export default function OCRResults() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const result =
          await getOCRResults(id);

        setData(result);
      } catch (error) {
        alert("Unable to load OCR results.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <main className="center-message">
        Loading OCR results...
      </main>
    );
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
            STEP 3 OF 5
          </span>

          <h1>Extracted Declarations</h1>

          <p>
            Review declarations extracted from
            the product images.
          </p>
        </div>

        <div className="info-banner">
          <span>ℹ</span>

          OCR results are automatically extracted
          from the uploaded product images.
          Low-confidence values should be manually
          reviewed.
        </div>

        <DeclarationTable
          declarations={data.declarations}
        />

        <div className="bottom-actions">
          <button
            className="secondary-btn large"
            onClick={() =>
              navigate(
                `/inspection/${id}/scan`
              )
            }
          >
            ← Review Images
          </button>

          <button
            className="primary-btn"
            onClick={() =>
              navigate(
                `/inspection/${id}/results`
              )
            }
          >
            Check Compliance →
          </button>
        </div>
      </div>
    </main>
  );
}