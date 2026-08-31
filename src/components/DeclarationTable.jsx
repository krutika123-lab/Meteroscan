function confidenceClass(confidence) {
  if (confidence >= 0.9) return "confidence-good";
  if (confidence >= 0.75) return "confidence-medium";

  return "confidence-low";
}

export default function DeclarationTable({
  declarations,
}) {
  return (
    <div className="table-wrapper">
      <table className="declaration-table">
        <thead>
          <tr>
            <th>Declaration</th>
            <th>Extracted Value</th>
            <th>OCR Confidence</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {declarations.map((item) => (
            <tr key={item.name}>
              <td>
                <strong>{item.name}</strong>
              </td>

              <td>
                {item.value || (
                  <span className="missing-text">
                    Not detected
                  </span>
                )}
              </td>

              <td>
                {item.confidence > 0 ? (
                  <span
                    className={confidenceClass(
                      item.confidence
                    )}
                  >
                    {Math.round(
                      item.confidence * 100
                    )}
                    %
                  </span>
                ) : (
                  "—"
                )}
              </td>

              <td>
                {item.status === "detected" ? (
                  <span className="status-pill success">
                    ✓ Detected
                  </span>
                ) : (
                  <span className="status-pill danger">
                    ⚠ Missing
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}