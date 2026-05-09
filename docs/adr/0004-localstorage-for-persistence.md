# localStorage for Client-Side Persistence

All campaign data is stored in `localStorage` as serialized JSON. No server, no IndexedDB, no third-party storage library.

`localStorage` is synchronous, requires zero setup, and has no dependencies — consistent with ADR-0003. For v0.1.0, the data set (campaigns, journal entries, flip records) is text-only and will not approach the 5–10MB browser limit in normal use. The entire store is keyed by a single namespace (e.g., `colostle_v1`) and serialized/deserialized on read/write.

## Considered Options

- **IndexedDB** — supports larger data, async, indexed queries. Rejected for v0.1.0 because it requires manual Promise wrapping or a library (`idb`), and the query patterns needed (filter by campaign, iterate sessions) are simple enough to handle in memory after a single JSON parse. Revisit if storage grows large or if full-text search demands indexing.
- **sessionStorage** — data lost on tab close. Not viable for a persistent journal app.
- **Remote storage / sync** — ruled out by ADR-0002 (offline-first, no cloud).

## Consequences

- All reads go through a single `store.load()` call on app init; all writes go through `store.save()`.
- The store holds the entire app state as one JSON blob keyed to the campaign. If the schema changes, a migration function must run on load (check the `v` field on Campaign — see DATA-MODEL.md).
- If a user's data ever exceeds localStorage limits, the migration path is IndexedDB. Design the storage module with a clean interface so the backing store can be swapped without touching feature code.
