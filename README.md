# Colostle Companion

A digital companion app for the solo tabletop role-playing game Colostle. This app helps players manage their character, draw cards, and track their journey through the vast castle world of Colostle.

## Features

- Character creation and management
- Draw and interpret cards for exploration, combat, and events
- Track story phases with detailed notes and descriptions
- View your journey log and navigate between different story phases

## Game Overview

Colostle is a solo RPG where you explore a world inside a castle so vast that entire civilizations exist within its rooms, corridors, and forgotten chambers. Using a standard deck of playing cards, you draw to determine encounters, locations, and events that shape your character's journey.

This companion app digitizes the card-drawing process and provides instant interpretations based on the game's rules, allowing you to focus on the storytelling and adventure.

### Character Management

- Create and customize character profiles with attributes and skills
- Assign equipment and inventory items
- Switch between multiple characters
- Remove or edit existing characters

### Gameplay Mechanics

- **Exploration Phase**

  - Card-based exploration system
  - Random scenario generation
  - Interactive choice-making
  - Seamless transition to combat

- **Combat System**

  - Turn-based combat mechanics
  - Randomized enemy encounters
  - Variable difficulty levels
  - Action and attack resolution

- **Companion/NPC System**
  - Manage party members
  - Assign inventory items
  - Track companion stats and abilities
  - Dynamic party composition

### Session Management

- Save and load game sessions
- Review session history
- Edit or delete existing sessions
- Cross-tab synchronization

### Additional Features

- Deck shuffling and customization
- Game settings management
- Offline-first architecture
- Data privacy (all data stored locally)

## Tech Stack

### Core Technologies

- React 19
- TypeScript
- Vite
- IndexedDB

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
├── src/                  # Source code
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

This project is not affiliated with the official Colostle game. Colostle is created by Nich Angell.

This companion app is a fan-made tool intended to enhance the play experience.
