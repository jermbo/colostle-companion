# Milestones

Each **semver subfolder** (e.g. `v0.1.0/`) holds **Stories**, **Tasks**, and **`*-decisions.md`** for that delivery slice. Keep the **inside** of a version folder **flat**—no deeper hierarchy unless bulk forces it.

Rules:

1. **`docs/features/`** is **not** version-scoped — only this folder binds work to a release wave.
2. After a milestone is **done**, contents are **frozen** by default ([`../STANDARDS.md`](../STANDARDS.md)).
3. Enhancements belong under a **later** semver path and **link back** (`Enhances:`, `Relates:`).

Add a new folder when you start planning the next train; see placeholder [`v0.1.0/`](./v0.1.0/).
