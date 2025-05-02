# Development Guidelines

## Code Style

### TypeScript

- Strict mode enabled
- Explicit return types for all functions
- Interfaces over types where possible
- No enums, use const objects with 'as const'
- Type-only imports when 'verbatimModuleSyntax' is enabled

### React Components

- Functional components only
- Default export name
- One export per-file
- Props interface for parameters
- Default values for optional props
- Proper cleanup in useEffect hooks
- React Context for global state when needed

### Styling

- Tailwind CSS for all styles
- ShadCN for components
  - Look for existing components before creating new ones
- Container queries over media queries
- Native CSS nesting (max 3 levels deep)
- No SASS style nesting
- No CSS modules
- Custom properties for theme values
- Descriptive variable names for custom properties

## Naming Conventions

### Files and Directories

- Lowercase with dashes for directories (e.g., components/form-wizard)
- PascalCase for component files (e.g., CharacterCard.tsx)
- kebab-case for utility files (e.g., date-utils.ts)

### Code Elements

- PascalCase for components
- camelCase for variables and functions
- UPPER_SNAKE_CASE for constants
- is/has prefix for boolean variables (e.g., isLoading, hasError)

## Git Workflow

### Branch Naming

- feature/ for new features
- fix/ for bug fixes
- chore/ for maintenance tasks
- docs/ for documentation
- test/ for testing

### Commit Messages

- fix: for bug fixes
- feat: for new features
- perf: for performance improvements
- docs: for documentation changes
- style: for formatting changes
- refactor: for code refactoring
- test: for adding missing tests
- chore: for maintenance tasks

### Pull Requests

- Clear description of changes
- Reference to related issues
- List of changes made
- Screenshots for UI changes
- Testing instructions if applicable

## Documentation

### Code Documentation

- JSDoc comments for complex functions
- Interface documentation
- Component prop documentation
- Complex logic explanation

### Project Documentation

- README with setup instructions
- API documentation
- Data flow documentation
- Architecture overview

## Performance Guidelines

### Code Optimization

- Minimize bundle size
- Implement code splitting
- Use proper lazy loading
- Optimize content script injection
- Implement proper caching strategies

### React Optimization

- Memoize expensive computations
- Use proper dependency arrays
- Implement proper cleanup
- Avoid unnecessary re-renders
- Use proper state management

## Testing Guidelines

### Testing Strategy

- Unit tests for utilities
- Component tests for UI
- Integration tests for flows
- Performance testing
- Accessibility testing

### Testing Tools

- Jest for unit testing
- React Testing Library for components
- Cypress for E2E testing
- Lighthouse for performance
- Axe for accessibility
