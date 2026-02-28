# Specification

## Summary
**Goal:** Enhance the Terminal page of the Fake Hacker app with more dramatic visual effects — an animated multi-stage hacking progress bar and a typewriter effect for command output.

**Planned changes:**
- Add a multi-stage animated progress bar triggered by the `hack` command, cycling through labels like "Bypassing firewall...", "Injecting payload...", and "Extracting data...", ending with a dramatic success or failure message
- Implement a typewriter/streaming animation for all terminal command responses, printing output character-by-character or line-by-line
- Ensure all new UI elements match the existing green OKLCH terminal color theme, CRT scanline overlay, and monospace font aesthetic

**User-visible outcome:** Typing commands in the terminal now feels more dramatic — responses animate in with a typewriter effect, and the `hack` command triggers a cinematic multi-stage progress sequence before revealing the result.
