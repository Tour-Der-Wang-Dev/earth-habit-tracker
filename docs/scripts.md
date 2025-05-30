
# Scripts Documentation

## Overview
This document provides comprehensive details about all available npm scripts in the project, their purposes, usage examples, and common scenarios.

## Script Inventory

### Development Scripts

#### `npm run dev`
**Purpose**: Starts the Vite development server with hot module replacement (HMR) for rapid development.

**Function**: 
- Launches development server on `http://localhost:5173`
- Enables hot reload for instant code changes
- Provides source maps for debugging
- Optimizes for development experience

**Required Environment**: 
- Node.js v18+
- Project dependencies installed
- Available port 5173 (or auto-assigns alternative)

**Example Usage**:
```bash
npm run dev
```

**Sample Output**:
```
  VITE v4.4.5  ready in 542 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**Common Use Cases**:
- Daily development workflow
- Component development and testing
- Real-time UI/UX iteration
- Debugging and troubleshooting

**Gotchas**:
- Port 5173 must be available
- Changes to configuration files may require restart
- Some environment variables need server restart to take effect

---

#### `npm run build`
**Purpose**: Creates an optimized production build of the application.

**Function**:
- Compiles TypeScript to JavaScript
- Bundles and minifies all assets
- Optimizes for production performance
- Generates source maps for debugging
- Tree-shakes unused code

**Required Environment**:
- Node.js v18+
- All dependencies installed
- Sufficient disk space for build output

**Example Usage**:
```bash
npm run build
```

**Sample Output**:
```
vite v4.4.5 building for production...
✓ 34 modules transformed.
dist/index.html                  0.46 kB │ gzip:  0.30 kB
dist/assets/index-4ea5c123.css   8.15 kB │ gzip:  2.34 kB
dist/assets/index-d2c4a193.js  142.48 kB │ gzip: 45.23 kB
✓ built in 1.23s
```

**Common Use Cases**:
- Preparing for deployment
- Performance testing with production builds
- Bundle size analysis
- CI/CD pipeline integration

**Gotchas**:
- Build errors will halt the process
- Output directory `dist/` is overwritten
- Environment variables must be properly configured
- TypeScript errors prevent successful builds

---

#### `npm run preview`
**Purpose**: Serves the production build locally for testing before deployment.

**Function**:
- Serves the built application from `dist/` folder
- Simulates production environment locally
- Allows testing of optimized build
- Useful for pre-deployment validation

**Required Environment**:
- Successful build must exist in `dist/` folder
- Available port for serving (default: 4173)

**Example Usage**:
```bash
npm run build && npm run preview
```

**Sample Output**:
```
  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**Common Use Cases**:
- Pre-deployment testing
- Performance validation
- Production build verification
- Debugging production-specific issues

**Gotchas**:
- Requires prior build step
- Serves static files only (no development features)
- Different port than development server
- No hot reload or development tools

---

### Code Quality Scripts

#### `npm run lint` (If configured)
**Purpose**: Runs ESLint to check code quality and enforce coding standards.

**Function**:
- Analyzes code for potential errors
- Enforces consistent coding style
- Identifies accessibility issues
- Suggests best practices

**Required Environment**:
- ESLint configuration files present
- Project dependencies installed

**Example Usage**:
```bash
npm run lint
```

**Sample Output**:
```
✓ No ESLint warnings or errors
```

**Common Use Cases**:
- Pre-commit code quality checks
- CI/CD pipeline integration
- Code review preparation
- Maintaining code standards

**Related Scripts**: Often paired with `lint:fix` for automatic corrections

---

### Package Management Scripts

#### `npm install`
**Purpose**: Installs all project dependencies listed in package.json.

**Function**:
- Downloads and installs dependencies
- Creates or updates package-lock.json
- Sets up node_modules directory
- Resolves dependency conflicts

**Required Environment**:
- Node.js and npm installed
- Internet connection for package downloads
- Write permissions in project directory

**Example Usage**:
```bash
npm install
# or
npm i
```

**Sample Output**:
```
added 1423 packages, and audited 1424 packages in 45s
found 0 vulnerabilities
```

**Common Use Cases**:
- Initial project setup
- After pulling changes with new dependencies
- Dependency updates and maintenance
- Clean environment setup

**Gotchas**:
- Can take significant time with large dependency trees
- May require node-gyp for native dependencies
- Network issues can cause failures
- Version conflicts may need resolution

---

### Utility Scripts

#### `npm run type-check` (TypeScript projects)
**Purpose**: Runs TypeScript compiler to check for type errors without generating output.

**Function**:
- Validates TypeScript type definitions
- Checks for compilation errors
- Ensures type safety across codebase
- Faster than full build for type checking

**Required Environment**:
- TypeScript configuration (tsconfig.json)
- TypeScript installed as dependency

**Example Usage**:
```bash
npm run type-check
```

**Common Use Cases**:
- Pre-commit validation
- IDE-independent type checking
- CI/CD pipeline integration
- Debugging type issues

---

## Script Dependencies and Relationships

### Development Workflow
```
npm install → npm run dev → (development) → npm run build → npm run preview
```

### CI/CD Pipeline
```
npm install → npm run type-check → npm run lint → npm run build
```

### Quality Assurance
```
npm run lint → npm run type-check → npm run build → npm run preview
```

## Environment-Specific Considerations

### Development Environment
- Use `npm run dev` for day-to-day development
- Install development dependencies with `npm install`
- Monitor console for warnings and errors

### Staging Environment
- Use `npm run build` followed by serving static files
- Validate with `npm run preview` before deployment
- Run quality checks with linting and type checking

### Production Environment
- Only run `npm run build` 
- Serve optimized static files from `dist/` directory
- Avoid development dependencies in production

## Troubleshooting Common Issues

### Port Already in Use
```bash
# Kill process using port
lsof -ti:5173 | xargs kill -9
# Or use different port
npm run dev -- --port 3000
```

### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

## Best Practices

1. **Always run `npm install`** after pulling changes
2. **Test with `npm run preview`** before deploying
3. **Run quality checks** before committing code
4. **Use specific versions** in package-lock.json for consistency
5. **Monitor build output** for warnings and optimization opportunities

## Script Customization

Scripts can be customized in `package.json`:

```json
{
  "scripts": {
    "dev": "vite --port 3000",
    "build:staging": "vite build --mode staging",
    "preview:prod": "vite preview --port 8080"
  }
}
```

This allows environment-specific configurations and custom workflows tailored to project needs.
