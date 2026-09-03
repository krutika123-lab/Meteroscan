import { Routes, Route, Navigate } from "react-router-dom";

import NewInspection from "./pages/NewInspection.jsx";
import ProductScan from "./pages/ProductScan.jsx";
import Processing from "./pages/Processing.jsx";
import OCRResults from "./pages/OCRResults.jsx";
import ComplianceResults from "./pages/ComplianceResults.jsx";
import ComplianceCheck from "./pages/ComplianceCheck";
import ComplianceReport from "./pages/ComplianceReport";

function App() {
  return (
    <Routes>

      {/* Home */}
      <Route
        path="/"
        element={
          <Navigate
            to="/inspection/new"
            replace
          />
        }
      />

      {/* Step 1 - Create inspection */}
      <Route
        path="/inspection/new"
        element={<NewInspection />}
      />

      {/* Step 2 - Product image scanning */}
      <Route
        path="/inspection/:id/scan"
        element={<ProductScan />}
      />

      {/* Step 3 - OCR / AI processing */}
      <Route
        path="/inspection/:id/processing"
        element={<Processing />}
      />

      {/* Step 4 - Extracted declarations */}
      <Route
        path="/inspection/:id/declarations"
        element={<OCRResults />}
      />

      {/* Step 5 - Compliance results */}
      <Route
        path="/inspection/:id/results"
        element={<ComplianceResults />}
      />
      <Route
      path="/compliance-check"
      element={<ComplianceCheck />}
      />
      <Route
  path="/compliance-report"
  element={<ComplianceReport />}
/>

      {/* Unknown URL */}
      <Route
        path="*"
        element={
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#07111f",
              color: "white",
              fontFamily: "Arial, sans-serif",
              flexDirection: "column",
            }}
          >
            <h1>404</h1>

            <p>
              Page not found.
            </p>
          </div>
        }
      />

    </Routes>
  );
}

export default App;