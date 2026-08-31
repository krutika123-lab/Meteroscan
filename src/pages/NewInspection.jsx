import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInspection } from "../api/inspectionApi";

export default function NewInspection() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productName: "",
    category: "",
    barcode: "",
    manufacturer: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.productName || !form.category) {
      alert(
        "Product name and category are required."
      );
      return;
    }

    setLoading(true);

    try {
      const result =
        await createInspection(form);

      navigate(
        `/inspection/${result.inspectionId}/scan`
      );
    } catch (error) {
      alert("Unable to create inspection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <div className="topbar">
        <div className="brand">
          <span className="brand-icon">◈</span>
          <span>METROSCAN</span>
        </div>

        <span className="role">
          Inspection Officer
        </span>
      </div>

      <div className="page-container narrow">
        <div className="page-heading">
          <span className="eyebrow">
            PRODUCT INSPECTION
          </span>

          <h1>Start New Inspection</h1>

          <p>
            Enter basic product information before
            scanning the package.
          </p>
        </div>

        <form
          className="form-card"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Product Name *</label>

            <input
              name="productName"
              value={form.productName}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label>Product Category *</label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">
                Select category
              </option>

              <option value="food">
                Food Product
              </option>

              <option value="cosmetics">
                Cosmetics
              </option>

              <option value="household">
                Household Product
              </option>

              <option value="electronic">
                Electronic Product
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Manufacturer</label>

            <input
              name="manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
              placeholder="Enter manufacturer"
            />
          </div>

          <div className="form-group">
            <label>Barcode / Product ID</label>

            <input
              name="barcode"
              value={form.barcode}
              onChange={handleChange}
              placeholder="Scan or enter barcode"
            />
          </div>

          <button
            className="primary-btn full"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Start Inspection →"}
          </button>
        </form>
      </div>
    </main>
  );
}