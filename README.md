# Configurable Form Builder

An interactive form builder built with React 19, TypeScript, and Vite. Users can construct forms dynamically, configure field rules, nest groups to any depth, preview the form with live validation, and import/export the configuration as JSON.

## Quick Start

### Prerequisites
- Node.js 20+
- pnpm (or npm / yarn)

### Installation & Run

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Typecheck and build for production
pnpm build

# Run linting, formatting, and type checks
pnpm check
```

## Features

- **Field Types**: Supports `text`, `number` (with optional `min` and `max` constraints), and `group` fields.
- **Arbitrary Nesting**: Groups can contain any combination of text, number, or other groups to any depth.
- **Hierarchy Controls**: Reorder fields up and down within their parent container or delete fields at any level.
- **Live Preview & Validation**:
  - Real-time synchronization between the builder and preview canvas.
  - Validates required inputs, numeric types, and min/max ranges on blur and form submit.
  - Accessible error indicators and field association (`aria-invalid`, `aria-describedby`).
  - Submission status feedback.
- **JSON Import / Export**:
  - Export current form configuration with one-click clipboard copy.
  - Import JSON schemas with automated validation and error reporting for invalid structures.

## Schema Example

```json
{
  "fields": [
    {
      "id": "1",
      "type": "text",
      "label": "Full Name",
      "required": true
    },
    {
      "id": "2",
      "type": "number",
      "label": "Age",
      "required": false,
      "min": 18,
      "max": 100
    },
    {
      "id": "3",
      "type": "group",
      "label": "Address",
      "required": true,
      "fields": [
        {
          "id": "4",
          "type": "text",
          "label": "Street",
          "required": true
        },
        {
          "id": "5",
          "type": "text",
          "label": "City",
          "required": true
        }
      ]
    }
  ]
}
```

## Technical Notes

- **State Management**: Form state is split between state and action dispatch contexts (`FieldsContext` and `FieldActionsContext`) so that dispatching field mutations does not cause unnecessary re-renders across unaffected components.
- **Styling**: Vanilla CSS using custom properties (CSS variables) and responsive flex/grid layouts without third-party UI framework dependencies.
- **Tooling**: Built on Vite with TypeScript, using Biome for code formatting and linting.
