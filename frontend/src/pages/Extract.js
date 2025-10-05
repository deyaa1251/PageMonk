import React, { useState, useEffect } from 'react';
import { 
  BeakerIcon, 
  DocumentTextIcon,
  CpuChipIcon,
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  CodeBracketIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import api from '../services/api';

const Extract = ({ darkMode }) => {
  const [documents, setDocuments] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionResults, setExtractionResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchDocuments(), fetchSchemas()]).finally(() => setLoading(false));
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await api.get('/documents');
      setDocuments(response.data.filter(doc => doc.processing_status === 'completed'));
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const fetchSchemas = async () => {
    try {
      const response = await api.get('/schemas');
      setSchemas(response.data);
    } catch (error) {
      console.error('Error fetching schemas:', error);
    }
  };

  const handleExtraction = async () => {
    if (!selectedDocument || !selectedSchema) return;
    
    setIsExtracting(true);
    setExtractionResults(null);
    
    try {
      const response = await api.post(`/extract/${selectedDocument.id}?schema_id=${selectedSchema.id}`);
      setExtractionResults(response.data);
    } catch (error) {
      console.error('Error during extraction:', error);
      setExtractionResults({ error: 'Extraction failed. Please try again.' });
    } finally {
      setIsExtracting(false);
    }
  };

  const downloadResults = (results, filename) => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_extracted.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFieldCount = (definition) => {
    if (typeof definition === 'object' && definition !== null) {
      return Object.keys(definition).length;
    }
    return 0;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bark-500 to-bark-600 flex items-center justify-center shadow-lg mr-4">
            <BeakerIcon className="w-6 h-6 text-bark-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-bark-600 tracking-tight">
              Data Extraction
            </h1>
            <p className="text-bark-600 mt-1">
              Extract structured data from documents using custom schemas
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Document Selection */}
        <div className="bg-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center">
              <DocumentTextIcon className="w-5 h-5 text-bark-600 mr-2" />
              <h2 className="text-lg font-semibold text-bark-600">
                Select Document
              </h2>
            </div>
            <p className="text-sm text-bark-600 mt-1">
              Choose a processed document for extraction
            </p>
          </div>
          
          <div className="p-6 max-h-96 overflow-y-auto">
            {documents.length > 0 ? (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocument(doc)}
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${selectedDocument?.id === doc.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-bark-500 to-bark-600 flex items-center justify-center">
                        <DocumentTextIcon className="w-5 h-5 text-bark-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-bark-600 truncate">
                          {doc.filename}
                        </p>
                        <p className="text-xs text-bark-600">
                          {formatFileSize(doc.file_size)} • {new Date(doc.upload_date).toLocaleDateString()}
                        </p>
                      </div>
                      {selectedDocument?.id === doc.id && (
                        <CheckCircleIcon className="w-5 h-5 text-indigo-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <DocumentTextIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-bark-600 mb-2">No processed documents found</p>
                <p className="text-sm text-bark-600">
                  Upload and process documents first in the Parse section
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Schema Selection */}
        <div className="bg-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center">
              <CpuChipIcon className="w-5 h-5 text-bark-600 mr-2" />
              <h2 className="text-lg font-semibold text-bark-600">
                Select Schema
              </h2>
            </div>
            <p className="text-sm text-bark-600 mt-1">
              Choose an extraction schema template
            </p>
          </div>
          
          <div className="p-6 max-h-96 overflow-y-auto">
            {schemas.length > 0 ? (
              <div className="space-y-3">
                {schemas.map((schema) => (
                  <div
                    key={schema.id}
                    onClick={() => setSelectedSchema(schema)}
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${selectedSchema?.id === schema.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/50'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-bark-500 to-bark-600 flex items-center justify-center">
                        <CpuChipIcon className="w-5 h-5 text-bark-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-bark-600 truncate">
                          {schema.name}
                        </p>
                        <p className="text-xs text-bark-600">
                          {getFieldCount(schema.schema_definition)} fields • {new Date(schema.created_date).toLocaleDateString()}
                        </p>
                      </div>
                      {selectedSchema?.id === schema.id && (
                        <CheckCircleIcon className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CpuChipIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-bark-600 mb-2">No schemas found</p>
                <p className="text-sm text-bark-600">
                  Create extraction schemas first in the Schemas section
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Extraction Controls */}
      {selectedDocument && selectedSchema && (
        <div className="bg-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-bark-600">
                Ready for Extraction
              </h3>
              <p className="text-sm text-bark-600">
                Document: <span className="font-medium">{selectedDocument.filename}</span> • 
                Schema: <span className="font-medium">{selectedSchema.name}</span>
              </p>
            </div>
            <button
              onClick={handleExtraction}
              disabled={isExtracting}
              className={`
                inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200
                ${isExtracting
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-bark-500 to-bark-600 hover:from-bark-600 hover:to-bark-700 text-bark-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                }
              `}
            >
              {isExtracting ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                  Extracting...
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Start Extraction
                </>
              )}
            </button>
          </div>

          {/* Schema Preview */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-bark-600">
                Schema Fields Preview
              </h4>
              <span className="text-xs text-bark-600">
                {getFieldCount(selectedSchema.schema_definition)} fields
              </span>
            </div>
            <div className="bg-black rounded-lg p-3 border border-slate-200 dark:border-slate-700">
              <pre className="text-xs text-bark-600 font-mono overflow-x-auto">
                {JSON.stringify(selectedSchema.schema_definition, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Extraction Results */}
      {extractionResults && (
        <div className="bg-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {extractionResults.error ? (
                  <XCircleIcon className="w-5 h-5 text-red-500 mr-2" />
                ) : (
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500 mr-2" />
                )}
                <h3 className="text-lg font-semibold text-bark-600">
                  Extraction Results
                </h3>
              </div>
              {!extractionResults.error && (
                <button
                  onClick={() => downloadResults(extractionResults, selectedDocument?.filename)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-bark-600 hover:text-bark-800 bg-bark-200 hover:bg-bark-300 rounded-lg transition-colors"
                >
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Download JSON
                </button>
              )}
            </div>
          </div>
          
          <div className="p-6">
            {extractionResults.error ? (
              <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <p className="text-red-700 dark:text-red-400 text-sm">
                  {extractionResults.error}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                  <p className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                    ✅ Extraction completed successfully
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-bark-600 mb-3">
                    Extracted Data
                  </h4>
                  <div className="bg-black rounded-lg p-4 border border-slate-200 dark:border-slate-700 max-h-96 overflow-y-auto">
                    <pre className="text-sm text-bark-600 font-mono whitespace-pre-wrap">
                      {typeof extractionResults.extracted_data === 'string' 
                        ? extractionResults.extracted_data 
                        : JSON.stringify(extractionResults.extracted_data, null, 2)
                      }
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-gradient-to-br from-bark-50 to-bark-100 rounded-2xl p-8 border border-bark-200">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-bark-500 flex items-center justify-center flex-shrink-0">
            <SparklesIcon className="w-5 h-5 text-bark-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-bark-600 mb-2">
              Schema-Based Data Extraction
            </h3>
            <p className="text-bark-600 mb-4">
              Use custom schemas to extract specific data points from your documents. 
              Perfect for processing invoices, forms, contracts, and structured documents.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-bark-600">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                Custom field definitions
              </div>
              <div className="flex items-center text-bark-600">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                AI-powered data recognition
              </div>
              <div className="flex items-center text-bark-600">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                JSON output format
              </div>
              <div className="flex items-center text-bark-600">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-2 flex-shrawk-0" />
                Batch processing support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extract;