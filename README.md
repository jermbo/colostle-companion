# SoloRPG Companion App

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

## Goals for the App

The tide is shifting in the world of development, with AI advancements making a significant impact. As a developer, I'm curious about what this means for my craft and career. This project is an exploration into "Vibe Coding" - its significance, practicality, and potential to change software development as we know it.

I want to gain insight into how coding assistants work, how they can be integrated into our workflow, and whether they'll make me more capable or redundant. By diving deeper into this technology, I'm aiming to stay ahead of the curve and unlock its full potential - which will ultimately benefit my own projects, including a fan-made tool that enables me to play Colostle on-the-go!

## Features

### MVP Features

- **Character Creation**

  - Create characters from the book
  - Track exploration and combat totals
  - State management using React Context API
  - Modern UI with Tailwind CSS

- **Session Storage**

  - Local storage using IndexedDB
  - Reviewable game sessions
  - Optimized data models for component integration

- **Card Drawing**
  - Interactive card drawing system
  - Real-time data display for encounters
  - Fast development cycle with Vite
  - Efficient state management using React Hooks

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

- **Frontend**

  - React
  - TypeScript
  - Tailwind CSS
  - Vite

- **State Management**

  - React Context API
  - React Hooks

- **Storage**
  - IndexedDB

## Out of Scope (MVP)

The following features are not included in the MVP but may be considered for future development:

- Combat handling
- Inventory management
- AI-driven recommendations

## Future Development

### Planned Features

- Combat and inventory management systems
- AI-driven party building recommendations
- Enhanced exploration/combat optimization tools

### UI/UX Improvements

- Interactive elements
- Animations and transitions
- Modern UI components

### Data Model Expansion

- Support for additional game mechanics
- Enhanced storage and retrieval systems
- Sidekick integration

## Contributing

We welcome contributions! If you're interested in contributing to this project:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please follow our commit message conventions:

- `fix:` for bug fixes
- `feat:` for new features
- `perf:` for performance improvements
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding missing tests
- `chore:` for maintenance tasks

## License

This project is an experimental exploration of "Vibe Coding" and actual development, aiming to enhance personal gaming experiences. As a fan-made tool, it is not officially affiliated with [Colostle](https://www.colostle.com/), the game created by Nich Angell. If Colostle's creator were to stumble upon this project, I'd be thrilled to collaborate and bring it to life!
