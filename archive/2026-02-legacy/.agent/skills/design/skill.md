## Design

### Roles

- **Front-End Designer**: Responsible for implementing UI views using the
  **Untitled UI** component library as the structural base, while strictly
  enforcing **Vanyshr** visual tokens for color, radius, and spacing.
- **Design System Guardian**: Responsible for validating that implemented
  components match the "Source of Truth" hierarchy and maintain accessibility
  standards.

### Source of Truth (Priority Order)

1. **Visual Master**: `.pen` File (Pencil Design) -
   `/DesignSystem/Vanyshr-Designs.pen`
2. **Interactive Reference**: Live Vite App (Port 5180) -
   `/DesignSystem/vanyshr-ui/new-vanyshr-design-system/`
3. **Documentation**: `@DESIGN_SYSTEM.md` and `@DESIGN_SYSTEM_SOURCE.md`

### Integration Strategy (Untitled UI x Vanyshr)

**Do not use Untitled UI styles blindly.** You must adapt them to the Vanyshr
brand:

- **Structure**: Use Untitled UI for layout, component structure, and
  accessibility patterns.
- **Colors**: **OVERRIDE** Untitled UI colors with Vanyshr Semantic Tokens.
  - _Example:_ Replace `bg-primary-600` with `bg-[var(--brand-primary)]` or
    `bg-[#14ABFE]`.
  - _Reference:_ See "Color Tokens" in `@DESIGN_SYSTEM.md`.
- **Inputs & Buttons (Critical)**:
  - **Height**: MUST be `h-[52px]` (3.25rem) for touch optimization. Standard
    Untitled UI is often smaller.
  - **Radius**: MUST be `rounded-xl`. Do not use `rounded-lg` or `rounded-md`.
  - **Background**: Inputs use `bg-[#F0F4F8]/50` (Light) or `bg-[#022136]/50`
    (Dark).
- **Typography**: Use `Inter` (sans) and `Roboto Mono` (code).

### Directives

1. **Mobile-First PWA**: All touch targets (inputs/buttons) must meet the 52px
   height requirement defined in the PWA spacing guidelines.
2. **Dark Mode Compliance**: All components must support dark mode using the
   semantic variable mapping (e.g., `dark:bg-[#022136]`).
3. **Iconography**: Prefer Lucide or Heroicons (specifically `Mail`, `User`,
   `MapPin`, `Lock`) over standard Untitled UI icons when implementing input
   fields.

### User Preferences

- **Verification**: The user prefers to verify changes in real-time. Do NOT
  prioritize creating screenshots for verification unless explicitly requested.

### Common Patterns

- **Primary Input**: `h-[52px]`, `rounded-xl`, `px-12` (if icon present),
  `bg-brand-light/50`.
- **Primary Button**: `bg-[#14ABFE]`, `text-white`, `rounded-lg`, `px-4 py-2`.
- **Card**: `bg-surface` (Light: `#FFFFFF`, Dark: `#0F2D45`), `border-subtle`.

### Tools

- **Vite**: Build tool and dev server.
- **Tailwind CSS**: Utility-first CSS framework (configured with Vanyshr
  variables).
- **Pencil.dev**: Design file inspection.

### Context Files

- `@DESIGN_SYSTEM.md`: Color codes, typography scale, and component specific
  classes.
- `@DESIGN_SYSTEM_SOURCE.md`: Implementation rules, file paths, and strict
  component dimensions.
