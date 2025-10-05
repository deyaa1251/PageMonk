# PageMonk Design System Documentation

## Overview

PageMonk has been completely redesigned following modern 2025 design principles, inspired by TailAdmin and Hex.tech's sophisticated aesthetic. This documentation provides a comprehensive guide to the design system, component architecture, and implementation details.

## Design Philosophy

### Core Principles
1. **Sophistication through Simplicity** - Clean, uncluttered interfaces that prioritize content
2. **Data-Driven Aesthetics** - Design language that enhances data comprehension and workflow efficiency  
3. **Contextual Intelligence** - Adaptive UI elements that respond to user actions and system state
4. **Accessibility First** - Inclusive design with proper contrast ratios, keyboard navigation, and screen reader support

### Visual Hierarchy
- **8px Grid System** - All spacing, sizing, and alignment follows an 8px base unit
- **Generous White Space** - Strategic use of negative space to improve readability and focus
- **Progressive Disclosure** - Information architecture that reveals complexity gradually
- **Contextual Breadcrumbs** - Clear navigation paths with intelligent breadcrumb generation

## Color System

### Primary Palette
```css
primary: {
  50: '#eef2ff',   /* Ultra light backgrounds */
  100: '#e0e7ff',  /* Light backgrounds */
  500: '#6366f1',  /* Primary brand color */
  600: '#4f46e5',  /* Interactive elements */
  700: '#4338ca',  /* Active states */
  900: '#312e81',  /* Text on light backgrounds */
}
```

### Secondary Palette
```css
secondary: {
  50: '#faf5ff',   /* Ultra light purple backgrounds */
  500: '#a855f7',  /* Secondary brand color */
  600: '#9333ea',  /* Secondary interactive elements */
  900: '#581c87',  /* Deep purple accents */
}
```

### Semantic Colors
- **Success**: Emerald scale (#10b981 primary)
- **Warning**: Amber scale (#f59e0b primary)  
- **Error**: Red scale (#ef4444 primary)
- **Info**: Blue scale (#3b82f6 primary)

### Dark Mode Foundation
```css
slate: {
  50: '#f8fafc',   /* Light mode backgrounds */
  800: '#1e293b',  /* Dark mode surfaces */
  900: '#0f172a',  /* Dark mode backgrounds */
  950: '#020617',  /* Ultra dark backgrounds */
}
```

## Typography System

### Font Stack
- **Primary**: Inter (200-900 weights)
- **Monospace**: JetBrains Mono (300-700 weights)
- **Fallback**: System fonts with proper fallbacks

### Type Scale
```css
/* Headings */
H1: text-4xl (36px) font-bold tracking-tight
H2: text-3xl (30px) font-semibold  
H3: text-2xl (24px) font-semibold
H4: text-xl (20px) font-medium

/* Body Text */
Body Large: text-lg (18px) font-normal leading-relaxed
Body: text-base (16px) font-normal 
Body Small: text-sm (14px) font-normal

/* UI Text */
Caption: text-xs (12px) font-medium
Micro: text-2xs (10px) font-medium
```

### Typography Features
- **Font Feature Settings**: 'rlig' 1, 'calt' 1 for enhanced legibility
- **Anti-aliasing**: -webkit-font-smoothing: antialiased
- **Line Height**: Optimized for reading (1.6 for body text, tighter for headings)

## Component Architecture

### Layout Components

#### Sidebar Navigation
```jsx
<Sidebar 
  sidebarOpen={sidebarOpen} 
  setSidebarOpen={setSidebarOpen}
  darkMode={darkMode}
/>
```

**Features:**
- Responsive design with mobile overlay
- Gradient logo with company branding
- Active state indicators with glow effects
- Smooth hover animations with scale transforms
- User profile section with status indicators

**Visual Elements:**
- 72px width (w-72) for optimal information density
- Gradient backgrounds: `from-indigo-500 via-purple-500 to-pink-500`
- Active state: `bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg`
- Hover effects: `hover:bg-slate-100 dark:hover:bg-slate-800`

#### Header Component
```jsx
<Header 
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>
```

**Features:**
- Contextual breadcrumb navigation
- Global search with live filtering
- Theme toggle with smooth transitions
- Notification center with badge indicators
- User profile dropdown with role-based access

### Card Components

#### Base Card System
```css
.card {
  @apply bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800;
}

.card-hover {
  @apply hover:shadow-lg hover:scale-[1.02] transition-all duration-200;
}
```

#### Stats Cards
- **Purpose**: Dashboard metrics and KPI visualization
- **Gradient Icons**: Each metric has a unique gradient icon
- **Micro-interactions**: Hover effects with subtle scale and shadow changes
- **Typography**: Large numbers (text-3xl) with contextual change indicators

#### Action Cards  
- **Quick Actions**: Primary workflow entry points
- **Gradient Backgrounds**: Subtle gradient overlays for visual interest
- **Icon System**: 24px Heroicons with gradient fills
- **Interactive States**: Scale transforms and color transitions

### Form Components

#### Input System
```css
.input {
  @apply w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg 
         bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 
         placeholder-slate-500 dark:placeholder-slate-400 
         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
         transition-all duration-200;
}
```

#### Button System
```css
/* Primary Button */
.btn-primary {
  @apply inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 
         text-white font-medium rounded-lg transition-all duration-200 
         hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 
         focus:ring-indigo-500 focus:ring-offset-2;
}

/* Secondary Button */
.btn-secondary {
  @apply inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-800 
         hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 
         font-medium rounded-lg transition-all duration-200;
}
```

### Status & Feedback Components

#### Status Badges
```css
.status-badge {
  @apply inline-flex items-center px-2 py-1 text-xs font-medium rounded-full;
}

.status-success {
  @apply bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400;
}

.status-warning {
  @apply bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400;
}

.status-error {
  @apply bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400;
}
```

#### Loading States
- **Skeleton Loaders**: Shimmer animation with proper dark mode support
- **Progress Indicators**: Indigo gradient progress bars
- **Spinner Components**: Consistent rotation animations

## Page-Specific Implementations

### Dashboard (Home Page)

#### Key Features
- **Welcome Section**: Personalized greeting with time-based messaging
- **Stats Grid**: 4-column responsive layout with gradient icons
- **Quick Actions**: 3-card layout with hover animations and gradient backgrounds
- **Recent Activity**: Timeline-style document list with status indicators

#### Code Structure
```jsx
// Stats Cards with Dynamic Data
const statsCards = [
  {
    name: 'Total Documents',
    value: stats.totalDocuments,
    icon: DocumentDuplicateIcon,
    change: '+12%',
    gradient: 'from-indigo-500 to-purple-600'
  },
  // ... more stats
];

// Quick Actions with Navigation
const quickActions = [
  {
    name: 'Upload Document',
    href: '/parse',
    icon: DocumentTextIcon,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50'
  },
  // ... more actions
];
```

### Document Processing (Parse Page)

#### Design Elements
- **Drag & Drop Zone**: Large, centered upload area with visual feedback
- **File Processing Queue**: Real-time status updates with progress bars
- **Results Preview**: Collapsible content preview with syntax highlighting
- **Help Section**: Gradient background with feature highlights

#### Key Interactions
- **File Upload**: React-dropzone integration with progress tracking
- **Status Polling**: Real-time updates using async polling
- **Preview System**: Truncated content with expand/collapse functionality

### Data Extraction (Extract Page)

#### Layout Structure
- **Two-Column Selection**: Document picker and schema selector
- **Extraction Controls**: Centered action area with preview
- **Results Display**: JSON formatted output with download options

#### Interactive Elements
- **Selection Cards**: Border color changes and check icons for selected items
- **Schema Preview**: Collapsible code display with syntax highlighting
- **Results Processing**: Loading states with detailed feedback

### Document Management (Documents Page)

#### Table Design
- **Responsive Table**: Mobile-first design with card fallbacks
- **Advanced Filtering**: Search, status filter, and sorting options
- **Action Buttons**: Icon-only actions with hover tooltips
- **Status Indicators**: Color-coded badges with animations

### Schema Management (Schemas Page)

#### Card Grid Layout
- **3-Column Grid**: Responsive layout with consistent card heights
- **Create Modal**: Sophisticated form with dynamic field management
- **Field Builder**: Add/remove form fields with type selection
- **Visual Indicators**: Field counts and creation dates

## Animation & Micro-interactions

### Transition System
```css
/* Standard Transitions */
transition-all duration-200  /* Standard UI interactions */
transition-all duration-300  /* Modal and overlay transitions */
transition-colors duration-200  /* Color-only changes */
transition-transform duration-200  /* Scale and position changes */
```

### Hover Effects
- **Cards**: `hover:scale-[1.02] hover:shadow-lg`
- **Buttons**: `hover:scale-105 hover:shadow-xl`
- **Icons**: `hover:text-indigo-600 dark:hover:text-indigo-400`

### Loading Animations
```css
/* Shimmer Effect */
.loading-shimmer {
  @apply animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 
         dark:from-slate-700 dark:via-slate-600 dark:to-slate-700;
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

/* Custom Keyframes */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

## Dark Mode Implementation

### Strategy
- **Class-based**: Using Tailwind's `dark:` prefix
- **System Preference**: Respects user's OS preference
- **Manual Toggle**: Header toggle with smooth transitions
- **Persistent**: State saved in localStorage

### Color Adaptations
```css
/* Background Hierarchy */
bg-slate-50 dark:bg-slate-950     /* Page backgrounds */
bg-white dark:bg-slate-900        /* Card backgrounds */
bg-slate-100 dark:bg-slate-800    /* Input backgrounds */

/* Text Hierarchy */
text-slate-900 dark:text-slate-50   /* Primary text */
text-slate-600 dark:text-slate-400  /* Secondary text */
text-slate-500 dark:text-slate-500  /* Tertiary text */

/* Border System */
border-slate-200 dark:border-slate-800  /* Card borders */
border-slate-300 dark:border-slate-700  /* Input borders */
```

## Accessibility Features

### Keyboard Navigation
- **Focus Rings**: Visible focus indicators on all interactive elements
- **Tab Order**: Logical tab sequence through interface
- **Keyboard Shortcuts**: Common shortcuts for power users

### Screen Reader Support
- **ARIA Labels**: Comprehensive labeling for complex interactions
- **Semantic HTML**: Proper heading hierarchy and landmark roles
- **Live Regions**: Dynamic content announcements

### Color Contrast
- **WCAG AAA**: All text meets minimum contrast requirements
- **Color Independence**: Information not conveyed by color alone
- **High Contrast**: Support for high contrast mode

## Performance Optimizations

### Bundle Size
- **Tree Shaking**: Only importing used Heroicons
- **Lazy Loading**: Code splitting for route components
- **CSS Purging**: Tailwind purges unused styles

### Runtime Performance
- **Virtual Scrolling**: For large document lists
- **Debounced Search**: Reduced API calls
- **Memoized Components**: React.memo for expensive renders

### Loading Experience
- **Skeleton Screens**: Immediate visual feedback
- **Progressive Enhancement**: Core functionality loads first
- **Error Boundaries**: Graceful error handling

## Browser Support

### Target Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Progressive Enhancement
- **CSS Grid**: Flexbox fallbacks where needed
- **Custom Properties**: Fallback values provided
- **Modern Features**: Feature detection for advanced capabilities

## Development Guidelines

### Component Structure
```jsx
// Standard component structure
const ComponentName = ({ darkMode, ...props }) => {
  // State management
  const [state, setState] = useState(initialState);
  
  // Event handlers
  const handleAction = useCallback(() => {
    // Implementation
  }, [dependencies]);
  
  // Render
  return (
    <div className="space-y-8">
      {/* Component content */}
    </div>
  );
};
```

### CSS Class Organization
```jsx
// Organize classes logically
className={`
  // Layout
  flex items-center justify-between
  // Spacing
  px-6 py-4 space-x-4
  // Appearance
  bg-white dark:bg-slate-900 rounded-xl shadow-sm
  // Borders
  border border-slate-200 dark:border-slate-800
  // States
  hover:shadow-lg hover:scale-[1.02]
  // Transitions
  transition-all duration-200
`}
```

### File Organization
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.js
│   │   ├── Header.js
│   │   └── index.js
│   ├── ui/
│   │   ├── Button.js
│   │   ├── Card.js
│   │   └── Input.js
│   └── features/
├── pages/
├── hooks/
├── services/
└── utils/
```

## Conclusion

This design system represents a modern, sophisticated approach to document intelligence interfaces. By following these guidelines, the PageMonk application provides a professional, accessible, and delightful user experience that scales effectively across different devices and use cases.

The system emphasizes:
- **Consistency** through standardized components and patterns
- **Flexibility** through composable design tokens and utilities  
- **Performance** through optimized implementations and loading strategies
- **Accessibility** through inclusive design practices
- **Maintainability** through clear documentation and organized code structure

This foundation supports the application's core mission of making document processing intelligent, efficient, and accessible to all users.