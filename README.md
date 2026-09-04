# Checkboxes Plus

An [Obsidian](https://obsidian.md) plugin that renders interactive checkboxes inside tables and lets you switch between alternative checkbox states from a right-click selection menu.

## Features

- **Checkboxes in tables**: write `- [ ]`, `- [x]`, `- [/]`, `- [>]`, `- [-]`, or `- [~]` inside a table cell and it renders as a real, clickable checkbox. Click it to toggle between checked and unchecked; the underlying Markdown is updated for you.
- **Alternative checkbox states**: right-click a checkbox (in a list or a table) to open a menu and pick a state:
  - **Task** — `- [ ]`
  - **Done** — `- [x]`
  - **In progress** — `- [/]`
  - **Forwarded** — `- [>]`
  - **Cancelled** — `- [-]`
  - **Failed** — `- [~]`
- **Number widgets in tables**: a cell containing `{5}` renders as a clickable badge; click it to toggle the highlighted form `{/5/}`.

## How to use

1. Install and enable the plugin.
2. In any table, type a task marker such as `- [ ]` in a cell. It becomes a live checkbox.
3. Right-click any checkbox to change its state from the menu.
4. Use the **Insert checkbox** command (or the editor context menu) to insert `- [ ]` at the cursor.

## Installation

### From the community directory

Open **Settings → Community plugins → Browse**, search for "Checkboxes Plus", and select **Install**.

### Manual installation

Copy `main.js`, `manifest.json`, and `styles.css` into your vault at:

```
<Vault>/.obsidian/plugins/checkboxes-plus/
```

Then reload Obsidian and enable the plugin in **Settings → Community plugins**.

## Privacy

This plugin runs entirely offline. It makes no network requests, collects no telemetry, and only reads and modifies the note you are actively editing.

## License

[MIT](LICENSE)
