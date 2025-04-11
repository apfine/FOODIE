import "./FOODIE.css";
import { useState, useRef } from "react";

export default function FOODIE() {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validImages = files.filter(file => file.type.startsWith("image/"));
    const imageUrls = validImages.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...imageUrls]);
  };

  return (
    <div className="foodie-container">
      <img src="/FOODIE.svg" alt="Foodie Logo" className="foodie-logo" />
      
      <div
        className={`upload-section ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickUpload}
      >
        <p>Click to Choose or Drag & Drop Image Here</p>
        <input
          type="file"
          multiple
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          className="file-input"
        />
      </div>

      {/* Show previews below */}
      <div className="preview-grid">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`preview-${index}`} className="preview-image" />
        ))}
      </div>

      <button className="test-button">Test</button>
    </div>
  );
}
