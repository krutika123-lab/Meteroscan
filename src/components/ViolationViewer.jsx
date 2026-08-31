import { useState } from "react";

export default function ViolationViewer({
  images,
  violations,
  selectedViolation,
}) {
  const [selectedSide, setSelectedSide] =
    useState("front");

  const image = images[selectedSide];

  const sideViolations = violations.filter(
    (v) => v.imageId === selectedSide
  );

  return (
    <div className="viewer-section">
      <div className="viewer-tabs">
        {Object.keys(images).map((side) => {
          if (!images[side]) return null;

          return (
            <button
              key={side}
              className={
                selectedSide === side
                  ? "viewer-tab active"
                  : "viewer-tab"
              }
              onClick={() =>
                setSelectedSide(side)
              }
            >
              {side}
            </button>
          );
        })}
      </div>

      <div className="product-image-viewer">
        {image ? (
          <>
            <img
              src={image.preview}
              alt={`${selectedSide} product`}
            />

            {sideViolations.map((violation) => {
              const box =
                violation.boundingBox;

              const selected =
                selectedViolation?.id ===
                violation.id;

              return (
                <div
                  key={violation.id}
                  className={`violation-marker ${
                    selected ? "selected" : ""
                  }`}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`,
                  }}
                  title={violation.message}
                >
                  <span>⚠</span>
                </div>
              );
            })}
          </>
        ) : (
          <div className="no-image">
            No image available.
          </div>
        )}
      </div>

      <div className="viewer-legend">
        <span className="legend-box"></span>
        Potential violation location
      </div>
    </div>
  );
}