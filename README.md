# ConfigurableFormBuilder

A lightweight, interactive React component that allows users to construct forms dynamically, configure field properties, manage recursively nested groups, preview the form live with real-time validation, and export/import the form configuration as JSON.

Built with **React 19**, **TypeScript**, and **Vite**, featuring a **modular Vanilla CSS design system** and a **lightweight, dependency-free state and validation engine**.

---

## Features

### 1. Supported Field Types
- **`text`**: Standard text input.
- **`number`**: Numeric input with optional `min` and `max` constraints.
- **`group`**: Logical container that holds child fields and can be **recursively nested to any depth**.

### 2. Field Property Editing & Hierarchy Controls
- **Common Properties**:
  - **Label**: Editable string label.
  - **Required**: Boolean toggle enforcing required validation.
- **Type-Specific Properties**:
  - **Number**: Optional `min` and `max` range values (flags an inline error if `max <= min`).
  - **Group**: Dynamic array of child fields (`text`, `number`, or sub-`group`).
- **Hierarchy Manipulation**:
  - **Reorder**: Move fields up (`↑`) and down (`↓`) within their parent group (automatically disabled at array boundaries).
  - **Delete**: Instant deletion (`×`) at root or any nested level.

### 3. Live Form Preview & Validation
- **Immediate Synchronisation**: The preview panel updates instantly as the schema changes while preserving active input values.
- **Built-in Validation**:
  - Validates required fields on blur and on form submit.
  - Evaluates group requirements (ensuring child fields are satisfied).
  - Predictable handling for invalid data: entering non-numeric text in a number field immediately flags `"Enter a number"`.
  - Enforces `min` and `max` constraints with clear descriptive error messages.
  - Accessible feedback with visual indicators (`*`), `aria-invalid`, and `aria-describedby` associations.
  - Success message upon valid form submission.

### 4. Configuration Export & Import
- **Export**: Generates clean, formatted JSON in a readonly textarea with one-click clipboard copy (with temporary `"Copied"` feedback).
- **Import**: Allows pasting a JSON configuration to reconstruct the form structure.
  - Supports both `{ "fields": [...] }` object and raw `[...]` array formats.
  - Automatically validates types, structure, and constraints.
  - Forgiving schema: auto-generates unique IDs if missing or duplicate.

---

## Architecture & Engineering Highlights

- **Framework**: React 19 + TypeScript + Vite.
- **Zero External Runtime Dependencies**: Relies purely on native React 19 primitives, keeping the production bundle minimal (~72 kB gzipped including React runtime).
- **State Orchestration**: Powered by split React Contexts (`FieldsContext` and `FieldActionsContext`), ensuring action-dispatching controls do not trigger unnecessary canvas re-renders.
- **Native Form & Validation Engine**: Encapsulated in the `usePreviewForm` hook to handle controlled values, blur states, recursive validation, and error states without external library overhead.
- **Modular Vanilla CSS Design System**: Built with CSS custom properties (variables), responsive grid/flexbox layouts, and accessible interaction states without framework lock-in.
- **Performance Optimizations**:
  - React `memo` paired with custom equality comparator (`previewFieldPropsAreEqual`) prevents unaffected input re-renders.
  - Stable function references (`useCallback`) and memoized calculations (`useMemo`).
- **Clean Component Encapsulation**: Modular atomic UI primitives in `@/components/ui` (`Button`, `Input`, `Tabs`, `Container`) with centralized barrel exports.
- **Code Quality & Tooling**: Static typing with TypeScript and ultra-fast formatting and linting via **Biome**.

---

## Project Structure

```
src/
├── App.tsx                                 # Application entry component
├── main.tsx                                # React DOM mount
├── index.css                               # Global tokens, reset, and base styles
├── components/
│   ├── ui/                                 # Reusable atomic UI design system
│   │   ├── index.ts                        # Barrel export (@/components/ui)
│   │   ├── Container.tsx                   # Max-width layout wrapper
│   │   ├── button/                         # Button component & variants (default, primary, icon)
│   │   │   ├── Button.tsx
│   │   │   └── Button.css
│   │   ├── input/                          # Unified input (text, number, checkbox with label & error)
│   │   │   ├── Input.tsx
│   │   │   └── Input.css
│   │   └── tabs/                           # Accessible tab switcher
│   │       ├── Tabs.tsx
│   │       └── Tabs.css
│   └── form-builder/                       # Feature module
│       ├── index.ts                        # Module entry point (@/components/form-builder)
│       ├── ConfigurableFormBuilder.tsx     # Main container component
│       ├── ConfigurableFormBuilder.css     # Responsive builder grid layout
│       └── _component/                     # Encapsulated private subcomponents
│           ├── header/                     # Application header
│           │   ├── FormBuilderHeader.tsx
│           │   └── FormBuilderHeader.css
│           ├── field-builder/              # Left canvas: field creation & tree controls
│           │   ├── FieldBuilder.tsx
│           │   ├── FieldBuilder.css
│           │   ├── FieldBuilderProvider.tsx# Context state provider
│           │   ├── useFieldBuilder.ts      # Builder tree state management hook
│           │   ├── fields.ts               # Pure tree manipulation utilities (immutable)
│           │   ├── types.ts                # TypeScript data models
│           │   └── _component/
│           │       ├── FieldCard.tsx       # Recursive field card with controls
│           │       └── AddFieldActions.tsx # Quick-add action buttons
│           └── aside/                      # Right panel: Tabbed output
│               ├── FormBuilderAside.tsx
│               ├── FormBuilderAside.css
│               └── _component/
│                   ├── preview/            # Live Preview tab
│                   │   ├── FormPreview.tsx
│                   │   ├── FormPreview.css
│                   │   ├── usePreviewForm.ts# Preview form state & validation hook
│                   │   ├── preview-fields.ts# Validation rules and logic
│                   │   └── _component/
│                   │       └── PreviewField.tsx# Recursive form renderer
│                   └── json/               # JSON Export / Import tab
│                       ├── FormJson.tsx
│                       ├── FormJson.css
│                       └── json-fields.ts  # Serialization and parsing logic
```

---

## Example Form Configuration JSON

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
      "label": "Address Details",
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
          "type": "group",
          "label": "Regional",
          "required": false,
          "fields": [
            {
              "id": "6",
              "type": "text",
              "label": "City",
              "required": true
            },
            {
              "id": "7",
              "type": "number",
              "label": "Postal Code",
              "required": true
            }
          ]
        }
      ]
    }
  ]
}
```

---

## Getting Started

### Prerequisites
- Node.js `20+`
- `pnpm` (or `npm`)

### Installation

```bash
pnpm install
```

### Development Server

Start the local Vite development server:

```bash
pnpm dev
```

### Production Build

Typecheck and create the optimized production bundle:

```bash
pnpm build
```

### Code Quality & Formatting

```bash
pnpm run check    # Runs Biome lint, format check, and TypeScript typechecking
pnpm run ready    # Formats, fixes lint issues, and verifies all checks pass
```
