import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './FOODIE.svg';
import './FOODIE.css';

function FOODIE() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      setUploading(true);
  
      const response = await fetch('https://foodie-backend-cn0s.onrender.com/predict/', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      //  THIS LINE IS CHANGED!
      const data = await response.json(); // Expect JSON response
  
      // Now check what you receive
      console.log('Server response:', data);
  
      //  Adjust according to what the backend returns
      navigate('/results', { state: { resultData: data } });
  
    } catch (error: any) {
      console.error('Error uploading file:', error);
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <div className="foodie-container">
      <img src={logo} alt="Foodie Logo" className="foodie-logo" />

      <div
        className={`upload-section ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <p>Drag & Drop your image here or click to select</p>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
          style={{ display: 'none' }}
        />
      </div>

      {file && (
        <div className="preview-grid">
          <img src={URL.createObjectURL(file)} alt="Preview" className="preview-image" />
        </div>
      )}

      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default FOODIE;
