import { useRef } from "react";

export default function ImageUploader({
  side,
  image,
  onUpload,
  onDelete,
}) {
  const inputRef = useRef(null);

 function handleFile(event) {
  const file =
    event.target.files?.[0];

  if (!file) return;

  onUpload(side, file);

  event.target.value = "";
}

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="image-card">

      {/* Header */}
      <div className="image-card-header">
        <h3>{side.toUpperCase()} SIDE</h3>

        {image && (
          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(side)}
            title="Delete image"
          >
            ×
          </button>
        )}
      </div>

      {/* Image already uploaded */}
      {image ? (
        <div className="preview-container">

          <img
            src={image.preview}
            alt={`${side} side of product`}
          />

          <div className="uploaded-label">
            ✓ Uploaded
          </div>

          <button
            type="button"
            className="secondary-btn"
            onClick={handleUploadClick}
          >
            Retake / Replace
          </button>
        </div>
      ) : (

        /* No image */
        <div
          className="upload-placeholder"
          onClick={handleUploadClick}
        >
          <div className="upload-icon">
            +
          </div>

          <p>
            Upload {side} image
          </p>

          <small>
            JPG, PNG or WEBP • Max 10 MB
          </small>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        hidden
        onChange={handleFile}
      />
    </div>
  );
}