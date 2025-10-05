import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Bars3Icon, 
  MagnifyingGlassIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Header = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [{ name: 'PageMonk', href: '/' }];
    
    switch (path) {
      case '/':
        breadcrumbs.push({ name: 'Dashboard', href: '/' });
        break;
      case '/documents':
        breadcrumbs.push({ name: 'Documents', href: '/documents' });
        break;
      case '/parse':
        breadcrumbs.push({ name: 'Parse Document', href: '/parse' });
        break;
      case '/extract':
        breadcrumbs.push({ name: 'Extract Data', href: '/extract' });
        break;
      case '/schemas':
        breadcrumbs.push({ name: 'Schemas', href: '/schemas' });
        break;
      default:
        breadcrumbs.push({ name: 'Unknown', href: path });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-bark-600 hover:bg-gray-800 transition-colors"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
            
            {/* Breadcrumbs */}
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                {breadcrumbs.map((breadcrumb, index) => (
                  <li key={breadcrumb.href} className="flex items-center">
                    {index > 0 && (
                      <ChevronRightIcon className="w-4 h-4 text-slate-400 mr-2" />
                    )}
                    <span className={`
                      text-sm font-medium
                      ${index === breadcrumbs.length - 1 
                        ? 'text-bark-600' 
                        : 'text-gray-400 hover:text-bark-600'
                      }
                    `}>
                      {breadcrumb.name}
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search documents..."
                className="
                  w-64 pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 
                  rounded-xl bg-slate-50 dark:bg-slate-800 
                  text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  transition-all duration-200
                "
              />
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="
                p-2 rounded-xl bg-slate-100 dark:bg-slate-800 
                text-slate-600 dark:text-slate-400 
                hover:bg-slate-200 dark:hover:bg-slate-700 
                hover:text-slate-900 dark:hover:text-slate-200
                transition-all duration-200 hover:scale-105
              "
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <button className="
              relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 
              text-slate-600 dark:text-slate-400 
              hover:bg-slate-200 dark:hover:bg-slate-700 
              hover:text-slate-900 dark:hover:text-slate-200
              transition-all duration-200 hover:scale-105
            ">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-bark-600 text-sm font-semibold">U</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Demo User</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;