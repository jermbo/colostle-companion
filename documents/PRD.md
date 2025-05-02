# Colostle Companion App - Project Requirements Document

## Development Phases

### Phase 1: Foundation Setup

- [x] Project initialization with Vite + React + TypeScript
- [x] Basic project structure setup
- [x] Type definitions for core entities
- [x] Global state management with Context API
- [ ] UI Component Library Setup
  - [ ] ShadCN Integration
    - [ ] Install and configure
    - [ ] Theme customization
    - [ ] Component customization
  - [ ] Core Components
    - [ ] Button variants
    - [ ] Input fields
    - [ ] Select dropdowns
    - [ ] Dialog/Modal
    - [ ] Toast notifications
    - [ ] Card components
    - [ ] Navigation components
- [ ] Basic layout component
  - [ ] Root Layout
    - [ ] Header component
      - [ ] App title (using ShadCN Typography)
      - [ ] Navigation menu (using ShadCN Navigation)
      - [ ] Character switcher (using ShadCN Select)
    - [ ] Main content area
      - [ ] Responsive container (using ShadCN Container)
      - [ ] Content wrapper
    - [ ] Footer component
      - [ ] App version
      - [ ] Basic links
  - [ ] Navigation System
    - [ ] Main navigation menu (using ShadCN Navigation)
      - [ ] Home link
      - [ ] Characters link
      - [ ] Journal link
      - [ ] Settings link
    - [ ] Mobile navigation (using ShadCN Sheet)
      - [ ] Hamburger menu
      - [ ] Mobile menu overlay
  - [ ] Page Layouts
    - [ ] Default page layout
      - [ ] Page header (using ShadCN Typography)
      - [ ] Content section
      - [ ] Action buttons area (using ShadCN Button)
    - [ ] Full-width layout
      - [ ] Intrinsic design principles
        - [ ] Container queries for component-level responsiveness
        - [ ] Grid auto-flow for content organization
        - [ ] Flexbox for flexible layouts
      - [ ] Content flow
        - [ ] Natural content progression
        - [ ] Automatic wrapping based on container size
        - [ ] Minimum content width considerations
      - [ ] Component-level responsiveness
        - [ ] Components adapt to their container size
        - [ ] No fixed breakpoints
        - [ ] Fluid typography and spacing
    - [ ] Content Containers
      - [ ] Main content wrapper
        - [ ] Intrinsic sizing
        - [ ] Content-based width constraints
        - [ ] Automatic flow adjustments
      - [ ] Card containers
        - [ ] Grid with auto-fit/auto-fill
        - [ ] Minimum card size constraints
        - [ ] Natural spacing based on container size
  - [ ] Common UI Elements
    - [ ] Loading states (using ShadCN Skeleton)
      - [ ] Page loader
      - [ ] Content loader
      - [ ] Button loader
    - [ ] Error states (using ShadCN Alert)
      - [ ] Error messages
      - [ ] Empty states
      - [ ] Not found states
    - [ ] Success states (using ShadCN Toast)
      - [ ] Success messages
      - [ ] Confirmation dialogs
- [ ] Theme configuration with Tailwind CSS
  - [ ] Custom color palette
  - [ ] Typography scale
  - [ ] Spacing system
  - [ ] Component theming
- [ ] Routing setup

### Phase 2: Core Features - Character Management

- [ ] Character creation form
  - Name input
  - Class selection
  - Companion creation (if applicable)
- [ ] Character list view
- [ ] Character detail view
- [ ] Character editing
- [ ] Character deletion
- [ ] Local storage integration for characters

### Phase 3: Core Features - Card System

#### Card Deck Management

- [ ] Card deck initialization
  - Standard 52-card deck
  - Proper shuffling algorithm
  - Initial state persistence
- [ ] Card drawing mechanism
  - Draw from top of deck
  - Visual card reveal
  - Card interpretation display
- [ ] Discard pile management
  - Add drawn cards to discard
  - View discard pile
  - Clear discard pile on reshuffle
- [ ] Deck reshuffling logic
  - Trigger when deck is empty
  - Combine discard pile with remaining cards
  - Shuffle and create new draw pile

#### Card Drawing Rules

- [ ] Character Class Limits
  - Knight: 2 cards per turn
  - Rogue: 3 cards per turn
  - Wizard: 1 card per turn
  - Ranger: 2 cards per turn
- [ ] Special Drawing Rules
  - First card must be drawn face up
  - Additional cards may be drawn face down
  - Cards can be kept or discarded based on suit
  - Maximum hand size limits per class

#### Card Replacement Rules

- [ ] Mandatory Replacements
  - Enemy Rooks (Spades) must be replaced
  - Certain high-value cards may require replacement
  - Replacements drawn from remaining deck
- [ ] Optional Replacements
  - Player may choose to replace certain cards
  - Limited number of replacements per turn
  - Replacement cards must be kept

#### Special Card Combinations

- [ ] Pair Combinations
  - Same value, different suits
  - Special encounter triggers
  - Bonus item discoveries
- [ ] Sequence Combinations
  - Three or more cards in sequence
  - Special location discoveries
  - Unique event triggers
- [ ] Suit Combinations
  - Multiple cards of same suit
  - Enhanced encounters
  - Special rewards

#### Card Effects and Triggers

- [ ] Immediate Effects
  - Combat initiation
  - Item discovery
  - Location entry
- [ ] Delayed Effects
  - Future encounters
  - Persistent bonuses
  - Ongoing challenges
- [ ] Conditional Effects
  - Based on character class
  - Based on companion type
  - Based on previous cards

#### Card Interpretation System

- [ ] Basic card interpretation
  - Suit-based interpretation
    - Hearts: Treasure/Items
    - Diamonds: Cities/Buildings
    - Clubs: Enemies
    - Spades: Enemy Rooks
  - Value-based interpretation
    - Ace: Special events
    - 2-10: Standard encounters
    - Face cards: Unique encounters
- [ ] Card history tracking
  - Recent draws display
  - Card event logging
  - Session-based history

#### Card Types and Effects

- [ ] Treasure Cards (Hearts)
  - Item discovery
  - Resource gathering
  - Special equipment
- [ ] Location Cards (Diamonds)
  - City encounters
  - Building exploration
  - Environmental features
- [ ] Enemy Cards (Clubs)
  - Standard enemies
  - Combat triggers
  - Enemy stats
- [ ] Rook Cards (Spades)
  - Major enemy encounters
  - Special challenges
  - Boss-like encounters

#### Storage and State

- [ ] Local storage integration
  - Save deck state
  - Save discard pile
  - Save card history
- [ ] Session management
  - Track current deck state
  - Track discard pile
  - Track drawn cards
- [ ] State persistence
  - Auto-save on card draws
  - Manual save option
  - Load previous state

### Phase 4: Core Features - Journaling

- [ ] Journal entry creation
- [ ] Journal entry list view
- [ ] Journal entry detail view
- [ ] Card event linking
- [ ] Basic text formatting
- [ ] Local storage integration for journal entries

### Phase 5: Session Management

- [ ] Session creation
- [ ] Session loading
- [ ] Session saving
- [ ] Session history
- [ ] Auto-save functionality
- [ ] Manual save option

### Phase 6: UI/UX Polish

- [ ] Responsive design implementation
- [ ] Loading states
- [ ] Error handling
- [ ] Success notifications
- [ ] Theme customization
- [ ] Accessibility improvements

### Phase 7: Testing & Documentation

- [ ] Unit tests
- [ ] Integration tests
- [ ] User documentation
- [ ] Code documentation
- [ ] Performance optimization

## Success Criteria

### MVP Requirements

- [ ] Character creation and management
- [ ] Basic card drawing system
- [ ] Simple journaling interface
- [ ] Local session storage
- [ ] Clean, usable interface

### Quality Standards

- [ ] TypeScript type safety
- [ ] Clean, maintainable code
- [ ] Responsive design
- [ ] Error-free core functionality
- [ ] Proper error handling
- [ ] Loading states
- [ ] Success notifications
