# Vanilla JS with Minimal Dependencies

This app is built in vanilla JavaScript with no framework. Dependencies are a deliberate choice, not a default — each one must be explicitly approved before adding. The goal is a small, portable, auditable codebase with no build-step complexity unless a build step earns its place.

## Considered Options

- **React / Vue / Svelte** — ruled out. The app is a single-user, offline-first, mobile-style PWA with no server rendering and no complex component sharing between teams. A framework adds build tooling, a virtual DOM, and a learning curve that this scope does not justify.
- **NPM ecosystem as a default** — ruled out. Auto-installing is the path to hundreds of transitive dependencies for straightforward problems. Vanilla solves most of this scope cleanly.

## Consequences

- Before adding any library, stop and ask the user. State what the vanilla approach would look like and what the library gives you that vanilla can't match.
- Libraries that may be worth adding if the feature demands it: Leaflet (mapping), Fuse.js (fuzzy search), idb (IndexedDB wrapper). These are not approved — they are examples of what to propose, not install.
- No bundler is assumed. If one becomes necessary (module splitting, tree-shaking), that decision gets its own ADR.
