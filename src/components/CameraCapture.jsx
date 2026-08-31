import { useEffect, useRef, useState } from "react";

export default function CameraCapture({
  side,
  onCapture,
  onClose,
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  async function startCamera() {
    setLoading(true);
    setError("");

    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error(
          "Camera is not supported by this browser."
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
            },

            // Environment camera on mobile.
            // Laptop browsers may ignore this.
            facingMode: {
              ideal: "environment",
            },
          },

          audio: false,
        });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        await videoRef.current.play();
      }

      setLoading(false);
    } catch (err) {
      console.error("Camera error:", err);

      setLoading(false);

      if (err.name === "NotAllowedError") {
        setError(
          "Camera permission was denied. Please allow camera access."
        );
      } else if (err.name === "NotFoundError") {
        setError(
          "No camera was found on this device."
        );
      } else if (err.name === "NotReadableError") {
        setError(
          "The camera is being used by another application."
        );
      } else {
        setError(
          "Camera is currently unavailable."
        );
      }
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }
  }

  function handleClose() {
    stopCamera();

    if (onClose) {
      onClose();
    }
  }

  function handleCapture() {
    if (capturing) return;

    const video = videoRef.current;

    if (!video) {
      console.error("Video element not available.");
      return;
    }

    if (
      video.readyState < 2 ||
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      alert("Camera is not ready yet. Please wait.");
      return;
    }

    setCapturing(true);

    try {
      const canvas = document.createElement("canvas");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Unable to create canvas context."
        );
      }

      context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setCapturing(false);
            alert("Unable to capture image.");
            return;
          }

          const file = new File(
            [blob],
            `${side}-${Date.now()}.jpg`,
            {
              type: "image/jpeg",
            }
          );

          const previewUrl =
            URL.createObjectURL(blob);

          console.log("Image captured:", {
            side,
            file,
            previewUrl,
          });

          // IMPORTANT:
          // ProductScan receives this exact object.
          onCapture({
            side,
            file,
            preview: previewUrl,
          });

          stopCamera();

          setCapturing(false);

          if (onClose) {
            onClose();
          }
        },
        "image/jpeg",
        0.92
      );
    } catch (err) {
      console.error(
        "Capture failed:",
        err
      );

      setCapturing(false);

      alert(
        "Could not capture image. Please try again."
      );
    }
  }

  return (
    <div className="camera-modal-overlay">

      <div className="camera-modal">

        {/* HEADER */}

        <div className="camera-header">

          <div>
            <span className="eyebrow">
              PRODUCT SCAN
            </span>

            <h2>
              Capture {side} Side
            </h2>
          </div>

          <button
            type="button"
            className="camera-close"
            onClick={handleClose}
          >
            ×
          </button>

        </div>

        {/* CAMERA */}

        <div className="camera-view">

          {loading && (
            <div className="camera-message">

              <div className="camera-spinner"></div>

              <p>
                Starting camera...
              </p>

            </div>
          )}

          {!loading && !error && (
            <video
              ref={videoRef}
              className="camera-video"
              autoPlay
              playsInline
              muted
            />
          )}

          {error && (
            <div className="camera-message error">

              <div className="camera-error-icon">
                !
              </div>

              <h3>
                Camera Unavailable
              </h3>

              <p>
                {error}
              </p>

              <button
                type="button"
                className="primary-btn"
                onClick={startCamera}
              >
                Try Again
              </button>

            </div>
          )}

        </div>

        {/* CONTROLS */}

        {!loading && !error && (
          <div className="camera-controls">

            <button
              type="button"
              className="secondary-btn"
              onClick={handleClose}
              disabled={capturing}
            >
              Cancel
            </button>

            <button
              type="button"
              className="capture-btn"
              onClick={handleCapture}
              disabled={capturing}
              aria-label="Capture image"
            >

              <span className="capture-circle"></span>

              {capturing
                ? "Capturing..."
                : "Capture"}

            </button>

          </div>
        )}

      </div>

    </div>
  );
}