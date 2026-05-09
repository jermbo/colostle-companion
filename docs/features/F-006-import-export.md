# F-006: Import & Export

Enable users to backup, share, and transfer campaigns between devices. All data ownership remains with the user.

## What it does

- **Export campaign** — save a campaign as a portable file (`.colostlecompanion` or `.zip`)
  - Includes: deck state, journal entries, world details, counters, all metadata
  - User chooses filename and location
  - Portable across devices and machines
  
- **Import campaign** — load a previously exported campaign
  - User selects a file
  - Campaign is imported with full state restored
  - Can import to same device (restore) or different device (transfer)

- **Export oracle tables** — save custom tables for sharing or backup
  - User can export tables they've created
  - Tables can be imported into another campaign

- **Import oracle tables** — load custom oracle tables
  - User selects a table file
  - Tables are added to the current campaign's available oracles

## Use cases

- **Backup** — user exports campaign before upgrading phone
- **Share** — user exports campaign and sends file to a friend to play
- **Multi-device** — user plays campaign on phone, exports it, imports on tablet
- **Collaboration** — players manually pass campaign file back and forth

## Data format

- Campaign export is a **structured, human-readable file** (JSON)
- Includes schema version for future compatibility
- Should be **reorderable** — user can edit exported file manually if needed (unsupported, but possible)

## Contracts

**Export Campaign:**
- Input: campaign ID
- Output: file ready for download/save
- Side effect: file written to device storage

**Import Campaign:**
- Input: file path (user selects)
- Output: campaign restored with full state
- Side effect: new campaign added to campaign list (or overwrites existing, user chooses)

**Export Table:**
- Input: table ID
- Output: table file ready for download

**Import Table:**
- Input: table file
- Output: table added to campaign's available oracles

## Related

- **ADR:** [0002: Offline-First, No Cloud](../adr/0002-offline-first-no-cloud.md) — the philosophy behind import/export
- **Feature:** [F-001: Campaign Management](./F-001-campaign-management.md)
- **Feature:** [F-002: Card Flip & Oracle Lookup](./F-002-card-flip-oracle-lookup.md)

## Notes

- No built-in cloud sync; users manage backups manually
- No collaborative real-time sync; users share files manually
- Import/export is the primary data movement mechanism
