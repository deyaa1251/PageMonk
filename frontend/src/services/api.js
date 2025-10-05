import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const documentService = {
  // Upload a document
  uploadDocument: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Parse document to markdown
  parseDocument: async (documentId) => {
    const response = await api.post(`/parse/${documentId}`);
    return response.data;
  },

  // Extract with schema
  extractWithSchema: async (documentId, schemaId) => {
    const response = await api.post(`/extract/${documentId}?schema_id=${schemaId}`);
    return response.data;
  },

  // Get all documents
  getDocuments: async () => {
    const response = await api.get('/documents');
    return response.data;
  },

  // Get specific document
  getDocument: async (documentId) => {
    const response = await api.get(`/documents/${documentId}`);
    return response.data;
  },

  // Structure content
  structureContent: async (content, instructions) => {
    const response = await api.post('/structure', {
      content,
      instructions,
    });
    return response.data;
  },
};

export const schemaService = {
  // Create schema
  createSchema: async (schema) => {
    const response = await api.post('/schemas', schema);
    return response.data;
  },

  // Get all schemas
  getSchemas: async () => {
    const response = await api.get('/schemas');
    return response.data;
  },

  // Get specific schema
  getSchema: async (schemaId) => {
    const response = await api.get(`/schemas/${schemaId}`);
    return response.data;
  },

  // Delete schema
  deleteSchema: async (schemaId) => {
    const response = await api.delete(`/schemas/${schemaId}`);
    return response.data;
  },
};

export default api;