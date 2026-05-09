# Offline-First: No Cloud, No Accounts, All Data Local

The app is **offline-only**. All campaign data, journal entries, world-building notes, and deck state are stored locally on the user's device. No cloud sync, no accounts, no login required. Users own their data entirely.

## Rationale

- **Simplicity** — no authentication, no servers, no privacy policy. The app is just a tool that runs on your phone.
- **User ownership** — your campaigns are *your* files, not held by us. You can read them, copy them, delete them, move them.
- **Accessibility** — no network required; play anywhere without data concerns.
- **Trust** — no data collection, no analytics, no telemetry. What happens in the app stays on your device.

## How data movement works

**Import/Export** is the only way data moves:

- **Export campaign** — user can export a campaign as a `.colostlecompanion` file (or `.zip`), containing all campaign data (deck state, journal entries, world details, settings)
- **Import campaign** — user can import a previously exported campaign from file
- **Import deck/tables** — users can import custom oracle tables (for extensibility)
- **Share with others** — users can manually share exported campaigns with friends or collaborators

No automatic sync, no cloud backup (that's the user's responsibility).

## Implications

- **Device loss = data loss** — if you lose your phone, your campaigns are gone (unless you exported them)
- **Backup is on the user** — users should export campaigns periodically if they want a backup
- **Multi-device** — to play the same campaign on different devices, export and import it manually
- **Collaboration** — to play together, manually share exported files
- **No real-time sync** — each device has its own copy; changes don't sync automatically

## Alternatives considered

1. **Cloud sync** — Rejected: requires accounts, privacy policies, ongoing server costs, and data liability. Overkill for a solo RPG companion.
2. **Optional cloud (with local fallback)** — Rejected: adds complexity (two code paths), authentication, and creates expectation of sync that we don't want to maintain.
3. **P2P sync** — Rejected: requires network discovery and real-time protocols; too complex for the initial use case.

## Data format

- Campaigns stored as **structured data** (JSON or similar), human-readable so users can edit if needed
- Export format should be **future-proof** and **version-controlled** (include schema version in export)
- Users can theoretically edit exported files manually, but that's unsupported (use at own risk)
