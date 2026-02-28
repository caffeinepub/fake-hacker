# Specification

## Summary
**Goal:** Rebuild the existing app as a Free Fire game companion panel with a dark military/battle-royale aesthetic, replacing all hacker/terminal content with Free Fire-themed pages and static data.

**Planned changes:**
- Replace all existing hacker/terminal theme with a Free Fire UI aesthetic: near-black background, orange/amber/gold accents, tactical typography, and glow/fire effects on key elements
- Add a header displaying the Free Fire Panel branding
- Create a Dashboard page showing player nickname, UID, level, rank badge, K/D ratio, win rate, total matches, and headshot percentage as stat cards
- Create a Weapons page listing 10+ Free Fire weapons (M1014, AK, M82B, Groza, SCAR, etc.) with stat bars and filter buttons by weapon type (AR, SMG, Sniper, Shotgun, Pistol)
- Create a Characters page listing 8+ Free Fire characters (Alok, Chrono, Dimitri, K, Skyler, etc.) with ability name, description, and stats in a responsive grid
- Create a Match History page showing 10+ simulated recent matches with placement, kills, damage, survival time, and mode; Booyah entries visually highlighted
- Add a fixed bottom navigation bar with four tabs: Home, Weapons, Characters, Matches; active tab highlighted with accent color
- Clear backend Motoko actor to a minimal empty actor with no endpoints
- All data (player stats, weapons, characters, matches) is statically defined on the frontend

**User-visible outcome:** Users can browse a fully themed Free Fire companion panel with player stats, weapon details, character abilities, and match history, all navigable via a bottom tab bar.
