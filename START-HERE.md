# Start Here: Documentation Review Guide

**Read these in order to understand the project direction.**

## 1️⃣ Mission & Domain (5 min read)

Start with **[DOCUMENTATION-SNAPSHOT.md](./DOCUMENTATION-SNAPSHOT.md)** — a one-page overview of mission, domain language, epics, and what's next.

Then read **[CONTEXT.md](./CONTEXT.md)** — the domain glossary. This is the authoritative vocabulary for epics, features, and stories.

## 2️⃣ Why We're Building This (10 min read)

Read the **three epics** in [docs/epics/](./docs/epics/):
- **[E-001: Portable Solo Play](./docs/epics/E-001-portable-solo-play.md)** — the container
- **[E-003: Instant Oracle Lookup](./docs/epics/E-003-instant-oracle-lookup.md)** — the engine
- **[E-002: Narrative Capture System](./docs/epics/E-002-narrative-capture-system.md)** — the memory

These answer: *Why would someone use an app instead of physical books and cards?*

## 3️⃣ How It Looks & Works (15 min read)

**Design & UX direction:**
- **[UX-DESIGN-SUMMARY.md](./UX-DESIGN-SUMMARY.md)** — one-page overview of visual language, navigation, and flows
- **[DESIGN.md](./docs/DESIGN.md)** — complete design system (colors, typography, spacing, components)
- **[INFORMATION-ARCHITECTURE.md](./docs/INFORMATION-ARCHITECTURE.md)** — screen map and navigation structure

Then read the **three key features** (now with UX flows):
- **[F-002: Card Flip & Oracle Lookup](./docs/features/F-002-card-flip-oracle-lookup.md)** — the core mechanic (includes mockup + flow)
- **[F-001: Campaign Management](./docs/features/F-001-campaign-management.md)** — campaign list (includes flow)
- **[F-003: Narrative Journaling](./docs/features/F-003-narrative-journaling.md)** — capture narrative (includes flows)

## 4️⃣ Key Design Decisions (2 min read)

Read the **two ADRs** (architecture decisions):
- **[ADR-0001: Single Shuffled Deck Per Campaign](./docs/adr/0001-single-shuffled-deck-per-campaign.md)** — why one deck with reshuffling
- **[ADR-0002: Offline-First, No Cloud](./docs/adr/0002-offline-first-no-cloud.md)** — why local data only, with import/export

---

## 📋 Review Checklist

As you read, ask yourself:

**On mission & domain:**
- [ ] Does the mission make sense?
- [ ] Are the domain terms (campaign, flip, oracle, etc.) clear and well-named?
- [ ] Did we miss any important concepts?

**On epics:**
- [ ] Are the three epics scoped correctly?
- [ ] Should any be split, merged, or reframed?
- [ ] Do they feel like the right "why" statements?

**On design & UX:**
- [ ] Does the visual direction (warm, hand-drawn, literary) match your vision?
- [ ] Are the five tabs (Home, Play, Party, Story, Cards) the right navigation structure?
- [ ] Do the three user flows feel natural and complete?
- [ ] Any colors, fonts, or components that don't feel right?

**On features:**
- [ ] Do the features align with the epics?
- [ ] Are there missing capabilities?
- [ ] Do the UX flows make sense?
- [ ] Is quick journal + expand the right approach, or would you do it differently?

**On decisions:**
- [ ] Does the deck reshuffling model feel right?
- [ ] Does offline-first + import/export work for you, or do you want cloud sync?
- [ ] Are there other design decisions that should be documented as ADRs?

---

## 💬 Feedback Format

When you're ready to comment, use this structure:

```
**Section:** [e.g., "CONTEXT.md / Language / Flip definition"]
**Type:** [Clarification / Disagree / Missing / Well done]
**Comment:** [Your feedback]
**Suggested change:** [If applicable]
```

---

## 🎯 Next Steps After Review

Once you approve the high-level direction:

1. **Sketch v0.1.0 milestone** — which epics/features should ship first?
2. **Write detailed feature specs** — flesh out F-002 (Card Flip & Oracle) and F-001 (Campaign Management) with full UX flows
3. **Create user stories** — break features into stories with acceptance criteria
4. **Start building** — implement the core flip mechanic first

---

**Created:** 2026-05-09  
**Docs included:** Domain (1), Epics (3), Features (6), ADRs (2), Design system (1), IA (1), UX flows (3 features)  
**Total read time:** ~45 minutes (domain + epics + design + features)  
**Feedback time:** ~20 minutes (using the checklist above)
