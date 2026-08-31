import { useEffect, useRef, useState } from "react";

export default function CameraCapture({
  side,
  onCapture,
  onClose,
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [error, setError] = useState("");

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  async function startCamera() {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
          },
          audio: false,
        });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError(
        "Camera access denied or unavailable."
      );
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });
  }

  function capture() {
    const video = videoRef.current;

    if (!video) return;

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const file = new File(
          [blob],
          `${side}-${Date.now()}.jpg`,
          {
            type: "image/jpeg",
          }
        );

        onCapture(side, file);

        stopCamera();
        onClose();
      },
      "image/jpeg",
      0.9
    );
  }

  return (
    <div className="camera-overlay">
      <div className="camera-modal">
        <div className="camera-header">
          <h2>Capture {side} Side</h2>

          <button onClick={onClose}>×</button>
        </div>

        {error ? (
          <div className="camera-error">
            {error}

            <p>
              Please allow camera permission or use
              image upload.
            </p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="camera-video"
            />

            <button
              className="capture-btn"
              onClick={capture}
            >
              ●
            </button>
          </>
        )}
      </div>
    </div>
  );
}