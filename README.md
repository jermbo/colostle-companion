# Colostle Companion

A digital companion app for the solo tabletop role-playing game Colostle. This app helps players manage their character, draw cards, and track their journey through the vast castle world of Colostle.

## Goals for the App

The tide is shifting in the world of development, with AI advancements making a significant impact. As a developer, I'm curious about what this means for my craft and career. This project is an exploration into "Vibe Coding" - its significance, practicality, and potential to change software development as we know it.

I want to gain insight into how coding assistants work, how they can be integrated into our workflow, and whether they'll make me more capable or redundant. By diving deeper into this technology, I'm aiming to stay ahead of the curve and unlock its full potential - which will ultimately benefit my own projects, including a fan-made tool that enables me to play Colostle on-the-go!

## Features

- Character creation and management with class selection
- Companion creation for classes that require companions
- Draw and interpret cards for exploration, combat, and events
- Track story phases with detailed notes and descriptions
- View your journey log and navigate between different story phases
- Auto-save functionality to preserve your progress

## Game Overview

Colostle is a solo RPG where you explore a world inside a castle so vast that entire civilizations exist within its rooms, corridors, and forgotten chambers. Using a standard deck of playing cards, you draw to determine encounters, locations, and events that shape your character's journey.

This companion app digitizes the card-drawing process and provides instant interpretations based on the game's rules, allowing you to focus on the storytelling and adventure.

### Character Management

- Create and customize character profiles with name and class selection
- Create companions for classes that require them
- Assign equipment and inventory items
- Switch between multiple characters
- Remove or edit existing characters

### Gameplay Mechanics

- **Exploration Phase**

  - Card-based exploration system
  - Draw cards up to your class limit
  - Different card types (Treasure, City/Building, Enemy, Enemy Rook)
  - Replacement card drawing for specific card types

- **Card Drawing System**

  - Automatic card interpretation based on suit and value
  - Context-aware card effects
  - Card history tracking
  - Card discard pile management

- **Companion System**
  - Create companions for eligible character classes
  - Manage companion inventory
  - Track companion information
  - Link companions to characters

### Session Management

- Save and load game sessions
- Review session history
- Edit or delete existing sessions
- Auto-save functionality with configurable timer
- Manual save option

### Journaling System

- Create detailed journal entries about your adventures
- Link entries to specific cards and events
- Organize entries with tags and categories
- Search and filter journal entries
- View a timeline of your story

### Additional Features

- Data export and import functionality
- Offline-first architecture
- Data privacy (all data stored locally)
- Responsive design for all devices

## Tech Stack

### Core Technologies

- React 19
- TypeScript
- Vite
- IndexedDB
- Tailwind CSS
- ShadCN/UI

### Development Tools

- ESLint
- TypeScript ESLint
- SWC

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- npm or yarn

### Installation

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

## Project Structure

```
colostle-companion/
├── src/                 # Source code
│   ├── assets/          # Static assets
│   ├── components/      # Reusable React components
│   ├── context/         # React Context providers
│   ├── data/            # Static data and constants
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API and service integrations
│   ├── styles/          # Global styles and CSS variables
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Root component
│   └── main.tsx         # Application entry point
├── public/              # Public static files
└── docs/                # Documentation
    ├── MVP.md           # Minimum Viable Product plan
    ├── Schema.md        # Database schema documentation
    ├── User_Flow.md     # User flow diagrams
    └── App_Flow.md      # Application flow documentation
```

## Development Guidelines

### Code Style

- Functional and declarative programming patterns
- TypeScript for type safety
- BEM naming convention for CSS
- Modern CSS features with Custom Properties
- CSS nesting limited to 3 layers deep

### State Management

- React Context for global state
- Custom hooks for reusable logic
- IndexedDB for persistent storage
- Local state synchronization

### Performance

- Code splitting
- Lazy loading for non-critical components
- Optimized bundle size
- Efficient IndexedDB operations

## License

This project is an experimental exploration of "Vibe Coding" and actual development, aiming to enhance personal gaming experiences. As a fan-made tool, it is not officially affiliated with [Colostle](https://www.colostle.com/), the game created by Nich Angell. If Colostle's creator were to stumble upon this project, I'd be thrilled to collaborate and bring it to life!
