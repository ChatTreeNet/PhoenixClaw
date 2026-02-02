---
name: phoenixclaw
version: 0.0.3
description: |
  Passive journaling skill that scans daily conversations via cron to generate
  markdown journals using semantic understanding.

  Use when:
  - User requests journaling ("Show me my journal", "What did I do today?")
  - User asks for pattern analysis ("Analyze my patterns", "How am I doing?")
  - User requests summaries ("Generate weekly/monthly summary")
---

# PhoenixClaw: Zero-Tag Passive Journaling

PhoenixClaw automatically distills daily conversations into meaningful reflections using semantic intelligence.

Automatically identifies journal-worthy moments, patterns, and growth opportunities.

## 🛠️ Core Workflow
PhoenixClaw follows a structured pipeline to ensure consistency and depth:

1. **User Configuration:** Check for `~/.phoenixclaw/config.yaml`. If missing, initiate the onboarding flow defined in `references/user-config.md`.
2. **Context Retrieval:** Read the current day's memory using `memory_get`. If memory is missing or sparse, fallback to reading raw session logs to extract key events. Note: Session log paths are implementation-dependent; common examples (not guaranteed) include `~/.openclaw/sessions/*.jsonl` or `.agent/sessions/`. Use session logs only as a fallback, then update memory so future runs use memory. Incorporate historical context via `memory_search`. If `memory_search` fails due to missing embeddings provider, proceed with daily memory + session-log fallback and skip cross-day pattern search.
3. **Moment Identification:** Identify "journal-worthy" content: critical decisions, emotional shifts, milestones, or shared media. See `references/media-handling.md` for photo processing.
4. **Pattern Recognition:** Detect recurring themes, mood fluctuations, and energy levels. Map these to growth opportunities using `references/skill-recommendations.md`.
5. **Journal Generation:** Synthesize the day's events into a beautiful Markdown file using `assets/daily-template.md`. Follow the visual guidelines in `references/visual-design.md`.
6. **Timeline Integration:** If significant events occurred, append them to the master index in `timeline.md` using the format from `assets/timeline-template.md` and `references/obsidian-format.md`.
7. **Growth Mapping:** Update `growth-map.md` (based on `assets/growth-map-template.md`) if new behavioral patterns or skill interests are detected.
8. **Profile Evolution:** Update the long-term user profile (`profile.md`) to reflect the latest observations on values, goals, and personality traits. See `references/profile-evolution.md` and `assets/profile-template.md`.

## ⏰ Cron & Passive Operation
PhoenixClaw is designed to run without user intervention. It utilizes OpenClaw's built-in cron system to trigger its analysis daily at 10:00 PM local time (0 22 * * *).
- Setup details can be found in `references/cron-setup.md`.
- **Mode:** Primarily Passive. The AI proactively summarizes the day's activities without being asked.

## 💬 Explicit Triggers
While passive by design, users can interact with PhoenixClaw directly using these phrases:
- *"Show me my journal for today/yesterday."*
- *"What did I accomplish today?"*
- *"Analyze my mood patterns over the last week."*
- *"Generate my weekly/monthly summary."*
- *"How am I doing on my personal goals?"*

## 📚 Documentation Reference
### References (`references/`)
- `user-config.md`: Initial onboarding and persistence settings.
- `cron-setup.md`: Technical configuration for nightly automation.
- `media-handling.md`: Strategies for extracting meaning from photos and rich media.
- `visual-design.md`: Layout principles for readability and aesthetics.
- `obsidian-format.md`: Ensuring compatibility with Obsidian and other PKM tools.
- `profile-evolution.md`: How the system maintains a long-term user identity.
- `skill-recommendations.md`: Logic for suggesting new skills based on journal insights.

### Assets (`assets/`)
- `daily-template.md`: The blueprint for daily journal entries.
- `weekly-template.md`: The blueprint for high-level weekly summaries.
- `profile-template.md`: Structure for the `profile.md` persistent identity file.
- `timeline-template.md`: Structure for the `timeline.md` chronological index.
- `growth-map-template.md`: Structure for the `growth-map.md` thematic index.

---
