# Technical Documentation

## Tech Stack

### Core Technologies

- **React 19** - Modern UI library for building user interfaces
- **TypeScript** - Static type checking and enhanced developer experience
- **Vite** - Next-generation frontend tooling for fast development
- **IndexedDB** - Client-side storage for offline data persistence

### Development Tools

- **ESLint** - Code linting and style enforcement
- **TypeScript ESLint** - TypeScript-specific linting rules
- **SWC** - Fast JavaScript/TypeScript compiler

## Project Structure

```
colostle-companion/
├── src/                  # Source code
│   ├── assets/           # Static assets (images, fonts, etc.)
│   ├── components/       # Reusable React components
│   ├── context/          # React Context providers
│   ├── data/             # Static data and constants
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API and service integrations
│   ├── styles/           # Global styles and CSS variables
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Root component
│   └── main.tsx          # Application entry point
├── public/               # Public static files
└── docs/                 # Documentation
```

## Session Management

### Offline-First Architecture

- **IndexedDB Storage**
  - Character data persistence
  - Journey logs and story phases
  - Game state and progress
  - Multiple character support

### Data Privacy

- All data stored locally on the user's device
- No server communication required
- Complete privacy for user's game sessions
- Data remains accessible offline

### Session Features

- Multiple character management
- Automatic state persistence
- Session recovery on page reload
- Cross-tab synchronization
- Data export/import capabilities

### Getting Started

1. Clone the repository

```bash
git clone [repository-url]
cd colostle-companion
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Styling Guidelines

- Uses Tailwind CSS for styling
- ShadCN/UI components for consistent UI
- Modern CSS features with Tailwind's built-in utilities
- Container queries for responsive design
- CSS nesting limited to 3 layers deep
- No custom CSS - leveraging Tailwind's utility classes

## TypeScript Guidelines

- Strict type checking enabled
- Interfaces preferred over types
- Explicit return types for functions
- Functional components with Props interfaces
- Absolute imports using @/ prefix

## State Management

- React Context for global state
- Custom hooks for reusable logic
- Proper cleanup in useEffect hooks
- IndexedDB for persistent storage
- Local state synchronization

## Performance Considerations

- Code splitting implemented
- Lazy loading for non-critical components
- Optimized bundle size
- Proper caching strategies
- Efficient IndexedDB operations
- Background data synchronization

## Documentation Standards

- Component documentation in respective files
- Type definitions for all major interfaces
- Clear naming conventions
- Inline comments for complex logic
