import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  SquaresPlusIcon,
  CodeBracketIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import api from '../services/api';

const Schemas = ({ darkMode }) => {
  const [schemas, setSchemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSchema, setNewSchema] = useState({
    name: '',
    description: '',
    schema_definition: {}
  });
  const [schemaFields, setSchemaFields] = useState([{ name: '', type: 'string' }]);

  useEffect(() => {
    fetchSchemas();
  }, []);

  const fetchSchemas = async () => {
    try {
      const response = await api.get('/schemas');
      setSchemas(response.data);
    } catch (error) {
      console.error('Error fetching schemas:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemas = schemas.filter(schema =>
    schema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schema.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSchema = async (e) => {
    e.preventDefault();
    
    const schemaDefinition = {};
    schemaFields.forEach(field => {
      if (field.name.trim()) {
        schemaDefinition[field.name.trim()] = field.type;
      }
    });

    try {
      const response = await api.post('/schemas', {
        ...newSchema,
        schema_definition: schemaDefinition
      });
      setSchemas([...schemas, response.data]);
      setShowCreateModal(false);
      setNewSchema({ name: '', description: '', schema_definition: {} });
      setSchemaFields([{ name: '', type: 'string' }]);
    } catch (error) {
      console.error('Error creating schema:', error);
    }
  };

  const handleDeleteSchema = async (id) => {
    if (window.confirm('Are you sure you want to delete this schema?')) {
      try {
        await api.delete(`/schemas/${id}`);
        setSchemas(schemas.filter(schema => schema.id !== id));
      } catch (error) {
        console.error('Error deleting schema:', error);
      }
    }
  };

  const addField = () => {
    setSchemaFields([...schemaFields, { name: '', type: 'string' }]);
  };

  const removeField = (index) => {
    setSchemaFields(schemaFields.filter((_, i) => i !== index));
  };

  const updateField = (index, key, value) => {
    const updated = [...schemaFields];
    updated[index][key] = value;
    setSchemaFields(updated);
  };

  const fieldTypes = [
    { value: 'string', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'boolean', label: 'True/False' },
    { value: 'array', label: 'List' },
    { value: 'object', label: 'Object' }
  ];

  const getFieldCount = (definition) => {
    if (typeof definition === 'object' && definition !== null) {
      return Object.keys(definition).length;
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Extraction Schemas</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Create and manage custom data extraction templates
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 bg-bark-600 text-bark-600 text-sm font-medium rounded-lg hover:bg-bark-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Create Schema
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-black rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search schemas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Schemas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="bg-black rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 animate-pulse">
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
              </div>
            </div>
          ))
        ) : filteredSchemas.length > 0 ? (
          filteredSchemas.map((schema) => (
            <div key={schema.id} className="bg-black rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <SquaresPlusIcon className="w-6 h-6 text-bark-600" />
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteSchema(schema.id)}
                    className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 truncate">
                {schema.name}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                {schema.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-500 dark:text-slate-400">
                  <CodeBracketIcon className="w-4 h-4 mr-1" />
                  {getFieldCount(schema.schema_definition)} fields
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {new Date(schema.created_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <div className="bg-black rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-12 text-center">
              <SquaresPlusIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {searchTerm ? 'No schemas match your search' : 'No schemas created yet'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-bark-600 text-bark-600 text-sm font-medium rounded-lg hover:bg-bark-700 transition-colors"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create your first schema
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Create Schema Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={() => setShowCreateModal(false)}></div>
            
            <div className="inline-block align-bottom bg-black rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6 border border-slate-200 dark:border-slate-800">
              <div className="sm:flex sm:items-start">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-3">
                        <SquaresPlusIcon className="w-5 h-5 text-bark-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                        Create Extraction Schema
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <form onSubmit={handleCreateSchema} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Schema Name
                      </label>
                      <input
                        type="text"
                        value={newSchema.name}
                        onChange={(e) => setNewSchema({...newSchema, name: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="e.g., Invoice Schema"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={newSchema.description}
                        onChange={(e) => setNewSchema({...newSchema, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Describe what this schema extracts..."
                        required
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Schema Fields
                        </label>
                        <button
                          type="button"
                          onClick={addField}
                          className="inline-flex items-center px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
                        >
                          <PlusIcon className="w-4 h-4 mr-1" />
                          Add Field
                        </button>
                      </div>
                      
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {schemaFields.map((field, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <input
                              type="text"
                              value={field.name}
                              onChange={(e) => updateField(index, 'name', e.target.value)}
                              placeholder="Field name"
                              className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-black text-bark-600 text-sm focus:outline-none focus:ring-2 focus:ring-bark-500 focus:border-transparent"
                            />
                            <select
                              value={field.type}
                              onChange={(e) => updateField(index, 'type', e.target.value)}
                              className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-black text-bark-600 text-sm focus:outline-none focus:ring-2 focus:ring-bark-500 focus:border-transparent"
                            >
                              {fieldTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                            {schemaFields.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeField(index)}
                                className="p-2 text-red-400 hover:text-red-600 transition-colors"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-bark-600 text-bark-600 rounded-lg hover:bg-bark-700 transition-colors"
                      >
                        Create Schema
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schemas;