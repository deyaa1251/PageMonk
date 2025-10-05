import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  ChartBarIcon,
  CpuChipIcon,
  ArrowTrendingUpIcon,
  DocumentDuplicateIcon,
  BeakerIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import api from '../services/api';

const Home = ({ darkMode }) => {
  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalSchemas: 0,
    processedToday: 0,
    successRate: 0
  });

  const [recentDocuments, setRecentDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [documentsRes, schemasRes] = await Promise.all([
          api.get('/documents'),
          api.get('/schemas')
        ]);
        
        setStats({
          totalDocuments: documentsRes.data.length,
          totalSchemas: schemasRes.data.length,
          processedToday: documentsRes.data.filter(doc => 
            new Date(doc.upload_date).toDateString() === new Date().toDateString()
          ).length,
          successRate: 98.5
        });
        
        setRecentDocuments(documentsRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    {
      name: 'Upload Document',
      description: 'Process a new document with AI',
      href: '/parse',
      icon: DocumentTextIcon,
      gradient: 'from-primary-800 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100 dark:from-primary-950/50 dark:to-primary-900/50'
    },
    {
      name: 'Extract Data',
      description: 'Use custom schemas for extraction',
      href: '/extract',
      icon: BeakerIcon,
      gradient: 'from-primary-700 to-primary-500',
      bgGradient: 'from-primary-50 to-primary-100 dark:from-primary-950/50 dark:to-primary-900/50'
    },
    {
      name: 'Manage Schemas',
      description: 'Create and edit extraction templates',
      href: '/schemas',
      icon: CpuChipIcon,
      gradient: 'from-primary-600 to-primary-400',
      bgGradient: 'from-primary-50 to-primary-100 dark:from-primary-950/50 dark:to-primary-900/50'
    }
  ];

  const statsCards = [
    {
      name: 'Total Documents',
      value: stats.totalDocuments,
      icon: DocumentDuplicateIcon,
      change: '+12%',
      changeType: 'positive',
      gradient: 'from-primary-900 to-primary-700'
    },
    {
      name: 'Active Schemas',
      value: stats.totalSchemas,
      icon: CpuChipIcon,
      change: '+5%',
      changeType: 'positive',
      gradient: 'from-primary-800 to-primary-600'
    },
    {
      name: 'Processed Today',
      value: stats.processedToday,
      icon: ArrowTrendingUpIcon,
      change: '+8%',
      changeType: 'positive',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Success Rate',
      value: `${stats.successRate}%`,
      icon: ChartBarIcon,
      change: '+0.3%',
      changeType: 'positive',
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-black rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-bark-600 tracking-tight mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Transform documents into intelligent data with AI-powered processing and custom extraction schemas.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-10 dark:opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div key={card.name} className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">{card.name}</p>
                <p className="text-3xl font-bold text-bark-600">{loading ? '...' : card.value}</p>
                <div className="flex items-center mt-2">
                  <span className="text-emerald-400 text-sm font-medium">{card.change}</span>
                  <span className="text-gray-400 text-sm ml-1">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-bark-600 flex items-center justify-center shadow-lg">
                <card.icon className="w-6 h-6 text-black" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={action.name}
            to={action.href}
            className="group bg-gray-900 rounded-xl shadow-sm border border-gray-800 p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="w-full h-32 rounded-xl bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
              <action.icon className="w-12 h-12 text-bark-600" />
            </div>
            <h3 className="text-lg font-semibold text-bark-600 mb-2">{action.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{action.description}</p>
            <div className="flex items-center text-bark-600 text-sm font-medium hover:text-bark-500 transition-colors">
              Get started
              <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 rounded-2xl shadow-sm border border-gray-800">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-bark-600">Recent Documents</h2>
            <Link to="/documents" className="text-bark-600 hover:text-bark-500 text-sm font-medium">
              View all
            </Link>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : recentDocuments.length > 0 ? (
            <div className="space-y-4">
              {recentDocuments.map((doc, index) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <DocumentTextIcon className="w-5 h-5 text-bark-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate max-w-sm">
                        {doc.filename}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(doc.upload_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      doc.processing_status === 'completed' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {doc.processing_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <DocumentTextIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-4">No documents yet</p>
              <Link 
                to="/parse" 
                className="inline-flex items-center px-4 py-2 bg-bark-600 text-bark-600 text-sm font-medium rounded-lg hover:bg-bark-700 transition-colors"
              >
                <SparklesIcon className="w-4 h-4 mr-2" />
                Upload your first document
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;