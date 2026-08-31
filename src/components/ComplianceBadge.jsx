export default function ViolationCard({
  violation,
  onView,
}) {
  return (
    <div
      className={`violation-card ${violation.severity}`}
    >
      <div className="violation-card-top">
        <span className="warning-icon">⚠</span>

        <div>
          <h3>{violation.type}</h3>

          <span className="severity">
            {violation.severity.toUpperCase()}
          </span>
        </div>
      </div>

      <p>
        <strong>Field:</strong>{" "}
        {violation.field}
      </p>

      <p>{violation.message}</p>

      <button
        className="secondary-btn"
        onClick={() => onView(violation)}
      >
        View on Image
      </button>
    </div>
  );
}