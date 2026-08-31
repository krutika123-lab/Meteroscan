import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ImageUploader from "../components/ImageUploader";
import CameraCapture from "../components/CameraCapture";

export default function ProductScan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const sides = [
    "front",
    "back",
    "left",
    "right",
    "top",
    "bottom",
  ];

  const [images, setImages] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
    top: null,
    bottom: null,
  });

  const [cameraOpen, setCameraOpen] =
    useState(false);

  const [activeSide, setActiveSide] =
    useState(null);

  function handleUpload(side, file) {
    if (!file) return;

    const preview =
      URL.createObjectURL(file);

    setImages((previous) => ({
      ...previous,

      [side]: {
        file,
        preview,
      },
    }));
  }

  function handleDelete(side) {
    setImages((previous) => {

      if (previous[side]?.preview) {
        URL.revokeObjectURL(
          previous[side].preview
        );
      }

      return {
        ...previous,
        [side]: null,
      };
    });
  }

  function openCamera(side) {
    setActiveSide(side);
    setCameraOpen(true);
  }

  // IMPORTANT
  // Receives the object from CameraCapture.jsx
  function handleCameraCapture(data) {
    console.log(
      "Camera capture received:",
      data
    );

    if (!data) return;

    const {
      side,
      file,
      preview,
    } = data;

    if (!side || !file || !preview) {
      console.error(
        "Invalid camera capture data:",
        data
      );

      return;
    }

    setImages((previous) => ({
      ...previous,

      [side]: {
        file,
        preview,
      },
    }));

    setCameraOpen(false);
    setActiveSide(null);
  }

  function getCapturedCount() {
    return Object.values(images).filter(
      Boolean
    ).length;
  }

  const capturedCount =
    getCapturedCount();

  const allSidesCaptured =
    capturedCount === 6;

  function handleProcess() {
    if (!allSidesCaptured) {
      alert(
        "Please capture all 6 sides before processing."
      );

      return;
    }

    console.log(
      "Images ready for processing:",
      images
    );

    navigate(
      `/inspection/${id}/processing`
    );
  }

  return (
    <main className="app">

      {/* HEADER */}

      <div className="topbar">

        <div className="brand">

          <span className="brand-icon">
            ◈
          </span>

          METROSCAN

        </div>

        <span>
          Inspection ID:{" "}
          <strong>{id}</strong>
        </span>

      </div>

      {/* CONTENT */}

      <div className="page-container">

        <div className="page-heading">

          <span className="eyebrow">
            STEP 2 OF 5
          </span>

          <h1>
            Scan Product
          </h1>

          <p>
            Capture all six sides of the
            product package.
          </p>

        </div>

        {/* PROGRESS */}

        <div className="scan-summary">

          <strong>
            {capturedCount}
          </strong>

          <span>
            / 6 sides captured
          </span>

        </div>

        <div className="scan-progress">

          <div
            className="scan-progress-bar"
            style={{
              width: `${
                (capturedCount / 6) * 100
              }%`,
            }}
          ></div>

        </div>

        {/* IMAGE GRID */}

        <div className="scan-grid">

          {sides.map((side) => (

            <div
              className="scan-side"
              key={side}
            >

              <ImageUploader
                side={side}
                image={images[side]}
                onUpload={handleUpload}
                onDelete={handleDelete}
              />

              {!images[side] && (
                <button
                  type="button"
                  className="camera-side-btn"
                  onClick={() =>
                    openCamera(side)
                  }
                >
                  📷 Capture with Camera
                </button>
              )}

            </div>

          ))}

        </div>

        {/* PROCESS BUTTON */}

        <div className="process-section">

          <button
            type="button"
            className="primary-btn process-btn"
            disabled={!allSidesCaptured}
            onClick={handleProcess}
          >
            {allSidesCaptured
              ? "Process Inspection →"
              : `Capture ${
                  6 - capturedCount
                } More Side${
                  6 - capturedCount === 1
                    ? ""
                    : "s"
                }`}
          </button>

        </div>

      </div>

      {/* CAMERA MODAL */}

      {cameraOpen && activeSide && (
        <CameraCapture
          side={activeSide}
          onCapture={
            handleCameraCapture
          }
          onClose={() => {
            setCameraOpen(false);
            setActiveSide(null);
          }}
        />
      )}

    </main>
  );
}