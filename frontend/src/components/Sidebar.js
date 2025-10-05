import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  CogIcon, 
  SquaresPlusIcon,
  DocumentDuplicateIcon,
  BeakerIcon,
  ChartBarIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import PageMonkLogo from './PageMonkLogo';

const Sidebar = ({ sidebarOpen, setSidebarOpen, darkMode }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon },
    { name: 'Parse Document', href: '/parse', icon: DocumentTextIcon },
    { name: 'Extract Data', href: '/extract', icon: BeakerIcon },
    { name: 'Schemas', href: '/schemas', icon: SquaresPlusIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-72 transform bg-black dark:bg-black 
        border-r border-gray-800 dark:border-gray-800 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:static lg:inset-0
      `}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-bark-600 shadow-lg">
              <PageMonkLogo className="w-6 h-6" dark={false} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-bark-600 tracking-tight">PageMonk</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Document Intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-bark-600 text-black shadow-lg transform scale-[1.02]' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-bark-600'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={`
                  mr-3 h-5 w-5 transition-colors flex-shrink-0
                  ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-bark-600'}
                `} />
                <span className="truncate">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-bark-600 rounded-full animate-pulse" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-bark-600 flex items-center justify-center">
                <span className="text-black text-sm font-semibold">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  Demo User
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  demo@pagemonk.ai
                </p>
              </div>
              <button className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                <CogIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;