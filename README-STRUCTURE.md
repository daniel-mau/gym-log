# Trainings Log - Modular Structure

This document describes the modularized codebase structure.

## File Structure

```
gm-log/
├── index.html                      # Main HTML file (modular)
├── index-original-backup.html      # Original monolithic file (backup)
├── css/
│   ├── variables.css              # CSS custom properties (light/dark theme)
│   ├── base.css                   # Global resets, body, container
│   └── components.css             # All UI component styles
└── js/
    ├── supabase-client.js         # Supabase initialization
    ├── app.js                     # Main application logic
    └── ui.js                      # UI utilities (placeholder for future refactoring)
```

## CSS Organization

### variables.css
- `:root` - Light theme CSS variables
- `[data-theme="dark"]` - Dark theme CSS variables

### base.css
- Global box-sizing reset
- Body styles
- Container layout

### components.css
- All component-specific styles in order:
  - Header (profile, avatar, theme toggle)
  - Week navigator
  - Day buttons
  - Session cards
  - Exercise cards
  - Forms and inputs
  - Stats and charts
  - Calendar
  - Modals
  - Stopwatch
  - Media queries
  - Read-only mode

## JavaScript Organization

### supabase-client.js
- Supabase client initialization
- Exposes `supabaseClient` globally

### app.js
- Training plan definition (WEEK_PLAN)
- Exercise images mapping
- State management
- Data persistence (localStorage, Supabase)
- Rendering functions
- Event handlers
- Stopwatch logic
- Body metrics
- Calendar
- Initialization

### ui.js
- Placeholder for future UI-specific code
- Currently, UI logic is in app.js

## Design Principles

1. **No design changes** - All glassmorphism effects, blur filters, colors, spacing preserved
2. **Relative paths** - CSS and JS files linked with relative paths
3. **Complete transfer** - All styles including hover states, active states, and dark theme variations preserved
4. **Maintainability** - Code split into logical modules for easier maintenance

## Usage

Simply open `index.html` in a browser. The file automatically loads:
1. External dependencies (Supabase, Chart.js, Cropper.js)
2. CSS modules (variables → base → components)
3. JS modules (supabase-client → app)

## Backup

The original monolithic `index.html` is preserved as `index-original-backup.html` for reference.
