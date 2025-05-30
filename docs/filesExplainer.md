
# Project File Structure Documentation

## Overview
This document provides a comprehensive breakdown of the project's file structure, organized by functional areas with importance indicators based on dependencies and usage patterns.

## Importance Legend
- 🟢 **Critical** (5+ imports/dependencies) - Core functionality files
- 🟡 **Moderate** (2-4 imports/dependencies) - Supporting functionality
- 🔴 **Supporting** (0-1 imports/dependencies) - Configuration and utilities

---

## 📁 Root Configuration
```
├── README.md                           🔴 Project overview and setup instructions
├── package.json                        🟢 Dependencies and scripts configuration
├── package-lock.json                   🔴 Dependency lock file
├── tsconfig.json                       🔴 TypeScript configuration
├── tsconfig.app.json                   🔴 App-specific TypeScript config
├── tsconfig.node.json                  🔴 Node.js TypeScript config
├── vite.config.ts                      🔴 Vite build tool configuration
├── tailwind.config.ts                  🔴 Tailwind CSS configuration
├── postcss.config.js                   🔴 PostCSS configuration
├── components.json                     🔴 shadcn/ui components configuration
├── eslint.config.js                    🔴 ESLint configuration
└── .gitignore                          🔴 Git ignore patterns
```

## 📁 Public Assets
```
public/
├── favicon.ico                         🔴 Browser tab icon
├── placeholder.svg                     🔴 Default placeholder image
└── robots.txt                          🔴 Search engine crawling instructions
```

## 📁 Source Code (`src/`)

### 🎯 Application Core
```
src/
├── main.tsx                            🟢 Application entry point and React DOM rendering
├── App.tsx                             🟢 Root application component with routing
├── App.css                             🔴 Global application styles
├── index.css                           🔴 Global CSS imports and base styles
└── vite-env.d.ts                       🔴 Vite environment type definitions
```

### 📄 Pages
```
src/pages/
├── Index.tsx                           🟢 Main documentation generator interface
└── NotFound.tsx                        🔴 404 error page component
```

### 🧩 Components

#### Core Documentation Components
```
src/components/
├── ProjectOverview.tsx                 🟡 Project summary and goals form
├── UserPersonas.tsx                    🟡 User persona creation and management
├── FeatureSpecs.tsx                    🟡 Feature specification forms
├── DesignAssets.tsx                    🟡 Design guidelines and assets
├── APIDocumentation.tsx                🟡 API endpoint documentation
├── DatabaseSchema.tsx                  🟡 Database structure documentation
├── EnvironmentSetup.tsx                🟡 Development environment setup
├── TestingGuidelines.tsx               🟡 Testing strategy documentation
├── DeploymentInstructions.tsx          🟡 Deployment process documentation
├── VersionControl.tsx                  🟡 Git workflow and practices
├── SecurityPractices.tsx               🟡 Security guidelines and practices
├── ComplianceRequirements.tsx          🟡 Legal and regulatory compliance
└── DocumentationPreview.tsx            🟡 Live preview and export functionality
```

#### UI Components Library (`src/components/ui/`)
```
src/components/ui/
├── accordion.tsx                       🔴 Collapsible content sections
├── alert-dialog.tsx                    🔴 Modal confirmation dialogs
├── alert.tsx                           🔴 Notification messages
├── aspect-ratio.tsx                    🔴 Responsive aspect ratio container
├── avatar.tsx                          🔴 User profile images
├── badge.tsx                           🔴 Status and category labels
├── breadcrumb.tsx                      🔴 Navigation path indicator
├── button.tsx                          🟢 Primary action buttons (heavily used)
├── calendar.tsx                        🔴 Date picker interface
├── card.tsx                            🟢 Content container component (heavily used)
├── carousel.tsx                        🔴 Image/content slider
├── chart.tsx                           🔴 Data visualization components
├── checkbox.tsx                        🔴 Boolean input controls
├── collapsible.tsx                     🔴 Expandable content sections
├── command.tsx                         🔴 Command palette interface
├── context-menu.tsx                    🔴 Right-click menu component
├── dialog.tsx                          🟡 Modal dialog windows
├── drawer.tsx                          🔴 Slide-out panel component
├── dropdown-menu.tsx                   🔴 Contextual menu options
├── form.tsx                            🔴 Form validation wrapper
├── hover-card.tsx                      🔴 Tooltip-like hover content
├── input-otp.tsx                       🔴 One-time password input
├── input.tsx                           🟢 Text input fields (heavily used)
├── label.tsx                           🟡 Form field labels
├── menubar.tsx                         🔴 Horizontal menu navigation
├── navigation-menu.tsx                 🔴 Site navigation component
├── pagination.tsx                      🔴 Page navigation controls
├── popover.tsx                         🔴 Floating content containers
├── progress.tsx                        🔴 Progress bar indicators
├── radio-group.tsx                     🔴 Single-choice option groups
├── resizable.tsx                       🔴 Adjustable panel layouts
├── scroll-area.tsx                     🟡 Custom scrollbar container
├── select.tsx                          🟡 Dropdown selection inputs
├── separator.tsx                       🔴 Visual content dividers
├── sheet.tsx                           🔴 Slide-out panel variant
├── sidebar.tsx                         🔴 Navigation sidebar component
├── skeleton.tsx                        🔴 Loading state placeholders
├── slider.tsx                          🔴 Range input controls
├── sonner.tsx                          🔴 Toast notification system
├── switch.tsx                          🔴 Toggle switch controls
├── table.tsx                           🔴 Data table components
├── tabs.tsx                            🟢 Tab navigation interface (heavily used)
├── textarea.tsx                        🟡 Multi-line text inputs
├── toast.tsx                           🔴 Notification message component
├── toaster.tsx                         🔴 Toast container system
├── toggle-group.tsx                    🔴 Multiple toggle controls
├── toggle.tsx                          🔴 Binary toggle controls
├── tooltip.tsx                         🔴 Hover information displays
├── use-toast.ts                        🔴 Toast hook functionality
```

### 🔧 Utilities and Libraries
```
src/lib/
└── utils.ts                            🟡 Common utility functions and helpers
```

### 🎣 React Hooks
```
src/hooks/
├── use-mobile.tsx                      🔴 Mobile device detection hook
└── use-toast.ts                        🔴 Toast notification management hook
```

## File Dependencies Summary

### Most Critical Files (🟢)
1. **main.tsx** - Application bootstrap
2. **App.tsx** - Root component with routing
3. **Index.tsx** - Main application interface
4. **button.tsx** - Universal UI component
5. **card.tsx** - Primary layout component
6. **input.tsx** - Form interaction component
7. **tabs.tsx** - Navigation interface component

### Moderate Importance (🟡)
- Documentation form components (12 files)
- Core UI components (select, textarea, label, dialog, scroll-area)
- Utility functions and custom hooks

### Supporting Files (🔴)
- Configuration files (build, styling, linting)
- Static assets and type definitions
- Specialized UI components with limited usage
- Documentation and project metadata

## Functional Areas

### 📋 Documentation Generation
Primary business logic for creating comprehensive project documentation across 12 different categories.

### 🎨 User Interface
Complete design system built on shadcn/ui with Tailwind CSS for consistent, accessible components.

### ⚙️ Configuration & Build
Modern development setup with Vite, TypeScript, ESLint, and Tailwind CSS.

### 🔧 Development Tools
React hooks, utilities, and development-focused components for enhanced developer experience.
