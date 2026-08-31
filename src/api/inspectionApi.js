const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function createInspection(product) {
  await wait(700);

  return {
    success: true,
    inspectionId:
      "INS-" + Math.floor(100000 + Math.random() * 900000),
    product,
  };
}

export async function uploadInspectionImages(
  inspectionId,
  images
) {
  await wait(1000);

  return {
    success: true,
    inspectionId,
    uploaded: images.length,
  };
}

export async function processInspection(inspectionId) {
  await wait(3000);

  return {
    success: true,
    status: "COMPLETED",
    inspectionId,
  };
}

export async function getOCRResults(inspectionId) {
  await wait(800);

  return {
    inspectionId,

    declarations: [
      {
        name: "Manufacturer Name",
        value: "ABC Consumer Products Pvt. Ltd.",
        confidence: 0.97,
        status: "detected",
      },
      {
        name: "Product Name",
        value: "Premium Washing Powder",
        confidence: 0.95,
        status: "detected",
      },
      {
        name: "Net Quantity",
        value: "500 g",
        confidence: 0.96,
        status: "detected",
      },
      {
        name: "Maximum Retail Price",
        value: "₹120",
        confidence: 0.91,
        status: "detected",
      },
      {
        name: "Date of Manufacture",
        value: "06/2026",
        confidence: 0.89,
        status: "detected",
      },
      {
        name: "Customer Care Details",
        value: "",
        confidence: 0,
        status: "missing",
      },
    ],
  };
}

export async function getComplianceResults(inspectionId) {
  await wait(800);

  return {
    inspectionId,

    status: "POTENTIAL_VIOLATION",

    score: 72,

    totalRequirements: 10,

    passedRequirements: 7,

    violations: [
      {
        id: "V001",
        type: "Missing Declaration",
        field: "Customer Care Details",
        message:
          "Customer care details were not detected on the package.",
        severity: "high",
        imageId: "front",
        boundingBox: {
          x: 58,
          y: 67,
          width: 25,
          height: 12,
        },
      },

      {
        id: "V002",
        type: "Low OCR Confidence",
        field: "Date of Manufacture",
        message:
          "The manufacturing date has low OCR confidence and requires manual review.",
        severity: "medium",
        imageId: "back",
        boundingBox: {
          x: 30,
          y: 48,
          width: 30,
          height: 10,
        },
      },
    ],

    missingDeclarations: [
      "Customer Care Details",
    ],
  };
}