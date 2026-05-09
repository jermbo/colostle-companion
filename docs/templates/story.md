---
id: US-001
slug: short-slug
status: draft
milestone: v0.1.0
feature: F-001
epic: E-001
# enhances: []
# relates: []
# supersedes: []
# enhanced_by: []
---

# User story: {Title}

<!-- One line: persona + intent ("As … I want … so that …") if helpful; plain prose is OK if clearer. -->

**Decisions:** [US-001-decisions.md](./US-001-decisions.md) _(create when Q&A warrants a standalone log.)_

---

## Requirements

Use **numeric parents** with **lettered** children so you can say **“requirement 4.b”** unambiguously.

1. Requirement text…
   a. Sub-item **a.**  
   b. Sub-item **b.**  
2. …
   a. …

---

## Acceptance criteria

Addressable leaves allow phrases like **“AC 2.e”**. Each leaf is **one** fully written **Given / When / Then** chain with **`And`** as needed — **verification script for QA**; nothing implied.

### AC 1

#### AC 1.a

```gherkin
Given …
When …
Then …
And …
```

#### AC 1.b

```gherkin
Given …
When …
Then …
```

### AC 2

#### AC 2.a

```gherkin
Given …
When …
Then …
```

---

## Tasks

- [ ] [T-…](./T-…-slug.md)
