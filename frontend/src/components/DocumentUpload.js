import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { documentService } from '../services/api';

const DocumentUpload = ({ onUploadSuccess }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus({
        type: 'error',
        message: 'Please upload PDF, JPEG, or PNG files only.'
      });
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus({
        type: 'error',
        message: 'File size must be less than 10MB.'
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const response = await documentService.uploadDocument(file);
      setUploadStatus({
        type: 'success',
        message: `Document "${file.name}" uploaded successfully!`
      });
      if (onUploadSuccess) {
        onUploadSuccess(response);
      }
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: error.response?.data?.detail || 'Upload failed. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-hex-text mb-2">Upload Document</h2>
        <p className="text-hex-text-secondary">
          Upload your PDF or image files to extract and structure content using AI
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-hex-primary bg-hex-primary/5'
            : 'border-hex-border hover:border-hex-primary/50 bg-hex-card'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="py-8">
            <div className="animate-spin w-12 h-12 border-4 border-hex-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-hex-text-secondary">Uploading...</p>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-hex-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-hex-text mb-2">
              Drop your files here, or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-hex-primary hover:text-hex-primary/80 underline"
              >
                browse
              </button>
            </h3>
            <p className="text-hex-text-secondary mb-4">
              Support for PDF, JPEG, PNG files up to 10MB
            </p>
            
            {/* Supported formats */}
            <div className="flex justify-center space-x-4 text-sm text-hex-text-secondary">
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>PDF</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>JPG</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>PNG</span>
              </div>
            </div>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
        />
      </div>

      {/* Status Messages */}
      {uploadStatus && (
        <div className={`mt-4 p-4 rounded-lg flex items-start space-x-3 ${
          uploadStatus.type === 'success'
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          {uploadStatus.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          )}
          <p className={uploadStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {uploadStatus.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;