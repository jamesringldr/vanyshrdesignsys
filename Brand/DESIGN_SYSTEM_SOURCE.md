# Vanyshr Design System - Source of Truth

**Last Updated:** January 2026

---

## Primary Design System Sources (In Order of Priority)

### 1. **`.pen` File (Pencil Design)** 🎨 PRIMARY SOURCE
**Location:** `/DesignSystem/Vanyshr-Designs.pen`

This is the **master design file** containing the complete visual design system including:
- Light and dark mode specifications
- All color tokens and variables
- Component designs and layouts
- Spacing, typography, and interaction patterns

**To view:** Use the Pencil MCP tools to read and inspect the design

**Frames:**
- `EWsGF`: Design System - Light Mode
- `Gcpon`: Design System - Dark Mode
- Other frames: Logo system, mobile dashboard, etc.

---

### 2. **Live Design System (Vite App)** 🖥️ INTERACTIVE REFERENCE
**Location:** `/DesignSystem/vanyshr-ui/new-vanyshr-design-system/`
**URL:** http://localhost:5180
**Start command:** `npm run dev:design` (or `cd DesignSystem/vanyshr-ui/new-vanyshr-design-system && npm run dev`)

This is the **interactive implementation** of the design system showing all components in action.

**Key Files:**
- `src/App.tsx` - Complete design system showcase
- `src/index.css` - Design tokens and CSS variables
- `src/components/ui/*.tsx` - Reusable component implementations

**To access in app:** Navigate to `/design-system` route or use `DesignSystemView.tsx` component

---

### 3. **Design System Documentation** 📚 IMPLEMENTATION GUIDE
**Location:** `/docs/DESIGN_SYSTEM.md`

Comprehensive guide for implementing the design system in code, includes:
- Color token reference with hex values
- Typography scale and usage
- Spacing system
- Component patterns and examples
- Accessibility guidelines
- Responsive design patterns

---

## Design Token Hierarchy

### Color Variables

```css
/* From index.css (Vite Design System) */
:root {
  /* Brand */
  --color-brand-primary: #14ABFE;
  --color-brand-dark: #022136;
  --color-brand-light: #F0F4F8;
  --color-brand-accent: #00D4FF;

  /* Semantic */
  --color-success: #00D4AA;
  --color-warning: #FFB81C;
  --color-error: #FF5757;
  --color-info: #14ABFE;

  /* Light Theme */
  --color-bg-page: #F0F4F8;
  --color-bg-card: #FFFFFF;
  --color-text-primary: #022136;
  --color-text-secondary: #476B84;
  --color-text-tertiary: #7A92A8;
  --color-border-subtle: #D4DFE8;
}

[data-theme="dark"] {
  /* Dark Theme */
  --bg-page: #022136;
  --bg-card: #0F2D45;
  --bg-nested: #1A3A52;
  --text-primary: #FFFFFF;
  --text-secondary: #A8BFD4;
  --text-tertiary: #7A92A8;
  --border-subtle: #2A4A68;
}
```

### Spacing System (Mobile-First PWA)

```css
--spacing-pwa-xs: 0.25rem;  /* 4px */
--spacing-pwa-sm: 0.5rem;   /* 8px */
--spacing-pwa-md: 0.75rem;  /* 12px */
--spacing-pwa-lg: 1rem;     /* 16px */
--spacing-pwa-xl: 1.25rem;  /* 20px */
--spacing-pwa-2xl: 1.5rem;  /* 24px */
```

### Component Heights

```css
--input-height-mobile: 3.25rem; /* 52px - optimized for touch */
--button-height-mobile: 3.25rem; /* 52px - consistency with inputs */
```

---

## Form Input Pattern (FROM DESIGN SYSTEM)

### Correct Implementation

```jsx
<div className="relative">
  <input
    type="text"
    className="h-[52px] w-full rounded-xl border border-subtle px-12 py-3 text-sm bg-[#F0F4F8]/50 dark:bg-[#022136]/50 text-primary dark:text-white placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14ABFE] focus-visible:ring-offset-2 transition-all"
    placeholder="Email address"
  />
  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
</div>
```

### Key Properties:
- **Height:** `h-[52px]` (touch-optimized for mobile)
- **Border radius:** `rounded-xl` (larger than standard `rounded-lg`)
- **Background:** 
  - Light: `bg-[#F0F4F8]/50` (brand-light with 50% opacity)
  - Dark: `bg-[#022136]/50` (brand-dark with 50% opacity)
  - **NOT white in light mode, NOT solid color in dark mode**
- **Padding:** `px-12` (left padding for icon), `py-3` (vertical)
- **Icon:** Absolutely positioned, `left-4`, `w-5 h-5`, `text-muted`
- **Focus:** `focus-visible:ring-2 ring-[#14ABFE] ring-offset-2` (ring, not outline)

---

## Other Design System Files (Reference Only)

These files contain supporting information but should NOT be used as primary sources:

- `DESIGN_SYSTEM_INTEGRATION_GUIDE.md` - Migration guide (may be outdated)
- `DESIGN_SYSTEM_QUICK_START.md` - Quick start guide
- `DESIGN_SYSTEM_COLOR_REFERENCE.md` - Color reference
- `DESIGN_SYSTEM_MIGRATION_PLAN.md` - Migration plan
- `for_agents/new-vanyshr-design-system/` - Duplicate/backup (use main one in `/DesignSystem/`)

---

## Design System Workflow

### For AI Agents / Developers:

1. **Visual Reference:** Check `.pen` file or live design system (port 5180)
2. **Implementation:** Use `DESIGN_SYSTEM.md` for code patterns
3. **Component Library:** Import from `/DesignSystem/vanyshr-ui/new-vanyshr-design-system/src/components/ui/`
4. **Verify:** Compare implementation against live design system

### When Building New Components:

1. Open design system at http://localhost:5180
2. Find matching component in the showcase
3. Copy component code from `/DesignSystem/vanyshr-ui/new-vanyshr-design-system/src/components/ui/`
4. Adapt for your use case
5. Test in light AND dark mode

---

## Component Import Paths

```typescript
// ✅ CORRECT: Import from design system
import { Button } from '@/DesignSystem/vanyshr-ui/new-vanyshr-design-system/src/components/ui/Button';
import { Input } from '@/DesignSystem/vanyshr-ui/new-vanyshr-design-system/src/components/ui/Input';
import { Card } from '@/DesignSystem/vanyshr-ui/new-vanyshr-design-system/src/components/ui/Card';

// ❌ AVOID: Using old/custom implementations that don't match design system
import { Button } from '@/components/Common/Button';
```

---

## Testing Checklist

When implementing any component, verify:

- [ ] Matches `.pen` design or live design system (port 5180)
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Uses correct spacing (PWA mobile-first)
- [ ] Uses correct colors (CSS variables from `index.css`)
- [ ] Has proper focus states (`focus-visible:ring-2`)
- [ ] Touch-optimized (52px height for inputs/buttons)
- [ ] Rounded corners match (`rounded-xl` for inputs/cards)

---

**Questions?** Always refer to:
1. `.pen` file (visual source of truth)
2. Live design system at port 5180 (interactive reference)
3. `DESIGN_SYSTEM.md` (implementation patterns)
