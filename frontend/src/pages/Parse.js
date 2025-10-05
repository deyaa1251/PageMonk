import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  CloudArrowUpIcon, 
  DocumentTextIcon, 
  SparklesIcon,
  PhotoIcon,
  DocumentIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  EyeIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import api from '../services/api';

const Parse = ({ darkMode }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [processingResults, setProcessingResults] = useState({});

  const onDrop = useCallback(async (acceptedFiles) => {
    setIsUploading(true);
    
    for (const file of acceptedFiles) {
      const fileData = {
        id: Date.now() + Math.random(),
        file,
        status: 'uploading',
        progress: 0
      };
      
      setUploadedFiles(prev => [...prev, fileData]);
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        // First upload the file
        const uploadResponse = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadedFiles(prev => 
              prev.map(f => f.id === fileData.id ? { ...f, progress } : f)
            );
          }
        });
        
        const documentId = uploadResponse.data.id;
        
        // Update file status to processing
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileData.id ? { 
            ...f, 
            status: 'processing',
            documentId: documentId 
          } : f)
        );
        
        // Then start the parsing process
        await api.post(`/parse/${documentId}`);
        
        // Start polling for processing completion
        pollProcessingStatus(documentId, fileData.id);
        
      } catch (error) {
        console.error('Upload error:', error);
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileData.id ? { ...f, status: 'error' } : f)
        );
      }
    }
    
    setIsUploading(false);
  }, []);

  const pollProcessingStatus = async (documentId, fileId) => {
    try {
      const response = await api.get(`/documents/${documentId}`);
      const document = response.data;
      
      if (document.processing_status === 'completed') {
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { 
            ...f, 
            status: 'completed',
            document: document
          } : f)
        );
        
        setProcessingResults(prev => ({
          ...prev,
          [fileId]: {
            markdown: document.markdown_content,
            structured: document.structured_content
          }
        }));
        
      } else if (document.processing_status === 'failed') {
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, status: 'error' } : f)
        );
      } else {
        // Continue polling
        setTimeout(() => pollProcessingStatus(documentId, fileId), 2000);
      }
    } catch (error) {
      console.error('Polling error:', error);
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { ...f, status: 'error' } : f)
      );
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff'],
      'text/*': ['.txt', '.md'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return PhotoIcon;
    if (file.type === 'application/pdf') return DocumentIcon;
    return DocumentTextIcon;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-emerald-500" />;
      case 'error':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'processing':
        return <ArrowPathIcon className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'uploading':
        return <ArrowPathIcon className="w-5 h-5 text-indigo-500 animate-spin" />;
      default:
        return <DocumentTextIcon className="w-5 h-5 text-slate-400" />;
    }
  };

  const downloadMarkdown = (content, filename) => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg mr-4">
            <SparklesIcon className="w-6 h-6 text-bark-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
              Document Processing
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Upload documents to extract text and convert to structured markdown
            </p>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div
          {...getRootProps()}
          className={`
            relative p-12 text-center cursor-pointer transition-all duration-300
            ${isDragActive 
              ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700' 
              : 'hover:bg-slate-50 dark:hover:bg-slate-800'
            }
          `}
        >
          <input {...getInputProps()} />
          
          <div className="mx-auto max-w-md">
            <div className={`
              w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-all duration-300
              ${isDragActive 
                ? 'bg-indigo-500 scale-110' 
                : 'bg-gradient-to-br from-indigo-500 to-purple-600'
              }
            `}>
              <CloudArrowUpIcon className="w-8 h-8 text-bark-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
              {isDragActive ? 'Drop files here' : 'Upload Documents'}
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Drag and drop your files here, or{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">browse</span> to choose files
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">PDF</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">Images</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">Word</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">Text</span>
            </div>
          </div>
        </div>
      </div>

      {/* File Processing List */}
      {uploadedFiles.length > 0 && (
        <div className="bg-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Processing Queue
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {uploadedFiles.filter(f => f.status === 'completed').length} of {uploadedFiles.length} files processed
            </p>
          </div>
          
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {uploadedFiles.map((fileData) => {
              const FileIcon = getFileIcon(fileData.file);
              const results = processingResults[fileData.id];
              
              return (
                <div key={fileData.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <FileIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">
                          {fileData.file.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(fileData.status)}
                        <span className={`text-sm font-medium capitalize ${
                          fileData.status === 'completed' ? 'text-emerald-600 dark:text-emerald-400' :
                          fileData.status === 'error' ? 'text-red-600 dark:text-red-400' :
                          'text-slate-600 dark:text-slate-400'
                        }`}>
                          {fileData.status}
                        </span>
                      </div>
                    </div>
                    
                    {fileData.status === 'completed' && results && (
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => downloadMarkdown(results.markdown, fileData.file.name)}
                          className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          title="Download Markdown"
                        >
                          <ArrowDownTrayIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {fileData.status === 'uploading' && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-1">
                        <span>Uploading...</span>
                        <span>{fileData.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${fileData.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {fileData.status === 'completed' && results && (
                    <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-slate-50">
                          Extracted Content Preview
                        </h4>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          Ready
                        </span>
                      </div>
                      
                      <div className="bg-black rounded-lg p-4 border border-slate-200 dark:border-slate-700 max-h-64 overflow-y-auto">
                        <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono">
                          {results.markdown?.substring(0, 500)}
                          {results.markdown?.length > 500 && '...'}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  {fileData.status === 'error' && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/50 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="text-sm text-red-700 dark:text-red-400">
                        Failed to process this document. Please try again.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <SparklesIcon className="w-5 h-5 text-bark-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
              AI-Powered Document Processing
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Our advanced AI system extracts text from any document format and converts it into clean, 
              structured markdown. Perfect for digitizing papers, extracting data from forms, or 
              converting images to searchable text.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-slate-600 dark:text-slate-400">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                OCR for images and scanned documents
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-400">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                PDF text extraction with formatting
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-400">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                AI-enhanced content structuring
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-400">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                Markdown export for easy integration
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parse;