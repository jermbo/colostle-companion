---
name: Dependency Management Preference
description: User wants vanilla JS with minimal dependencies; never auto-install, always ask first
type: feedback
---

Never auto-install packages or libraries. Always ask for explicit permission before adding any dependency.

**Why:** User wants to keep the dependency tree as light as possible. Preference is for vanilla JS. Library additions are a deliberate trade-off to evaluate, not a default.

**How to apply:** If a task could benefit from a library (e.g., date handling, mapping, animations), surface the option and explain the trade-off — but do not install or add it to any config file without explicit approval. When recommending a library, name it specifically (e.g., "Leaflet for mapping") and explain what vanilla alternative would look like.
