import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Scan = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Create preview URL
    } else {
      setFile(null);
      setPreviewUrl(null); // Clear preview URL
      setError("Please select a valid MRI scan image (JPEG or PNG).");
    }
  };

  const handleUpload = async () => {
    const toastId = toast.loading("Scanning MRI scan Image Please Wait...");
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://localhost:9000/detection/segement/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setResult(response.data); // Set the result from the API response
        setFile(null);
        setError(null);
        toast.success("Analyzed successfully");
        toast.dismiss(toastId);
      } catch (error) {
        console.error("Error uploading file:", error);
        setError(
          "An error occurred while uploading the file. Please try again."
        );
        toast.error("An error has occurred. Please try again later.");
        toast.dismiss(toastId);
      }
    } else {
      setError("Please select an MRI scan image to upload.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        Submit Your MRI Scan for Brain Tumor Classification & Segmentation
      </h2>
      <div
        style={{
          border: "2px dashed #ccc",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          style={{
            display: "block",
            padding: "10px",
            cursor: "pointer",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          ) : (
            <span style={{ color: "#999" }}>Click to select a file</span>
          )}
        </label>
      </div>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#3368C6",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onClick={handleUpload}
      >
        Scan
      </button>

      {result && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3 style={{ color: "#333" }}>Segmentation Result</h3>
          <img
            src={`http://localhost:9000${result.segmentation_result_url}`}
            alt="Segmentation Result"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              marginBottom: "10px",
            }}
          />
          <p>
            <strong style={{ color: "#333" }}>Classification Result:</strong>{" "}
            {result.classification_result}
          </p>
        </div>
      )}
    </div>
  );
};

export default Scan;
