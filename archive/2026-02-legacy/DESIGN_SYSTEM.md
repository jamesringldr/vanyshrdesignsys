# Vanyshr Design System Reference

**Version:** 1.0  
**Last Updated:** January 2026  
**Purpose:** Directive guide for AI agents building components and views

---

## Table of Contents
1. [Color Tokens](#color-tokens)
2. [Typography Scale](#typography-scale)
3. [Spacing System](#spacing-system)
4. [Component Patterns](#component-patterns)
5. [Forms & Inputs](#forms--inputs)
6. [Status Badges](#status-badges)
7. [Layout & Responsive](#layout--responsive)
8. [Dark Mode Implementation](#dark-mode-implementation)
9. [Accessibility Checklist](#accessibility-checklist)
10. [Common Patterns & Examples](#common-patterns--examples)

---

## Color Tokens

### Brand Colors (Primary)
| Token | Value | Usage |
|-------|-------|-------|
| `--brand-primary` | `#14ABFE` | Primary buttons, links, active states, focus rings, badges |
| `--brand-dark` | `#022136` | Headings, primary text, dark backgrounds, secondary buttons |
| `--brand-light` | `#F0F4F8` | Light page backgrounds, subtle surfaces |

### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--success` | `#00D4AA` | Successful actions, confirmations, completed removals |
| `--warning` | `#FFB81C` | Caution, data-at-risk alerts, warnings |
| `--error` | `#FF5757` | Errors, failed actions, critical states |
| `--info` | `#14ABFE` | Informational notices (same as brand primary) |

### Text Colors (Light Theme)
| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#022136` | Main heading text, body text, primary UI text |
| `--text-secondary` | `#476B84` | Secondary labels, helper text, subheadings |
| `--text-muted` | `#94A3B8` | Disabled text, placeholder text, very subtle information |

### Text Colors (Dark Theme)
| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#FFFFFF` | Main text on dark backgrounds |
| `--text-secondary` | `#A8BFD4` | Secondary text on dark backgrounds |
| `--text-muted` | `#56687F` | Muted text on dark backgrounds |

### Background Colors (Light Theme)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-page` | `#F0F4F8` | Main page/app background |
| `--bg-surface` | `#FFFFFF` | Card, panel, container backgrounds |
| `--border-subtle` | `#D4DFE8` | Border color for cards, inputs |

### Background Colors (Dark Theme)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-page` | `#022136` | Main page/app background (dark) |
| `--bg-surface` | `#0F2D45` | Card, panel backgrounds (dark) |
| `--border-subtle` | `#2A4A68` | Borders in dark mode |

### CSS Variable Setup (Copy into tailwind.css or <style> tag)
```css
:root {
  /* Brand */
  --brand-primary: #14ABFE;
  --brand-dark: #022136;
  --brand-light: #F0F4F8;

  /* Semantic */
  --success: #00D4AA;
  --warning: #FFB81C;
  --error: #FF5757;
  --info: #14ABFE;

  /* Light Theme (default) */
  --text-primary: #022136;
  --text-secondary: #476B84;
  --text-muted: #94A3B8;
  --bg-page: #F0F4F8;
  --bg-surface: #FFFFFF;
  --border-subtle: #D4DFE8;
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #FFFFFF;
    --text-secondary: #A8BFD4;
    --text-muted: #56687F;
    --bg-page: #022136;
    --bg-surface: #0F2D45;
    --border-subtle: #2A4A68;
  }
}

/* Tailwind utility aliases (optional but recommended) */
@layer utilities {
  .text-primary { color: var(--text-primary); }
  .text-secondary { color: var(--text-secondary); }
  .text-muted { color: var(--text-muted); }
  .bg-page { background-color: var(--bg-page); }
  .bg-surface { background-color: var(--bg-surface); }
  .border-subtle { border-color: var(--border-subtle); }
}
```

### How to Use in Components
```jsx
// ✅ CORRECT: Use CSS variables or hex directly
<button className="bg-[#14ABFE] text-white px-4 py-2 rounded-lg">
  Click me
</button>

// ✅ CORRECT: Use Tailwind classes with semantic colors
<div className="text-primary dark:text-white bg-page">
  Content
</div>

// ❌ AVOID: Hard-coded colors (not from tokens)
<div className="bg-blue-500 text-red-400">
  Bad!
</div>
```

---

## Typography Scale

### Font Family
- **Primary:** `font-sans` (Inter from Google Fonts or system)
- **Monospace:** `font-mono` (Roboto Mono for code/sensitive data)

### Font Sizes & Weights

| Name | Size | Weight | Line Height | Tailwind | Usage |
|------|------|--------|-------------|----------|-------|
| Display | 32px | 700 | 1.2 | `text-4xl font-bold` | Hero/banner titles |
| Heading 1 | 24px | 700 | 1.3 | `text-2xl font-bold` | Page titles |
| Heading 2 | 20px | 600 | 1.4 | `text-xl font-semibold` | Section headings |
| Heading 3 | 18px | 600 | 1.4 | `text-lg font-semibold` | Card titles |
| Body Large | 16px | 400 | 1.5 | `text-base font-normal` | Main body text |
| Body | 14px | 400 | 1.5 | `text-sm font-normal` | Default body, form labels |
| Body Small | 12px | 400 | 1.4 | `text-xs font-normal` | Helper text, captions |
| Caption | 12px | 500 | 1.4 | `text-xs font-medium` | Labels, badge text |
| Overline | 11px | 600 | 1.4 | (custom) | Section labels, small caps |

### Weight Mapping
```
font-light      = 300
font-normal     = 400 (default)
font-medium     = 500
font-semibold   = 600
font-bold       = 700
```

### Examples
```jsx
// Page heading
<h1 className="text-2xl font-bold text-primary">
  Privacy Dashboard
</h1>

// Section heading
<h2 className="text-xl font-semibold text-primary">
  Found Data
</h2>

// Body text
<p className="text-sm text-secondary leading-normal">
  We found your information on 5 sites. Remove it?
</p>

// Small/helper text
<p className="text-xs text-muted">
  This process may take 24-48 hours
</p>

// Monospace (for sensitive data)
<code className="font-mono text-sm bg-surface p-1 rounded">
  user@example.com
</code>
```

---

## Spacing System

### Scale (Tight Design)
```
2px   = 0.125rem  (use inline style if needed)
4px   = 0.25rem   (Tailwind: p-1, m-1, gap-1)
6px   = 0.375rem  (use inline style)
8px   = 0.5rem    (Tailwind: p-2, m-2, gap-2)
12px  = 0.75rem   (Tailwind: p-3, m-3, gap-3)
16px  = 1rem      (Tailwind: p-4, m-4, gap-4) ← DEFAULT
20px  = 1.25rem   (Tailwind: p-5, m-5, gap-5)
24px  = 1.5rem    (Tailwind: p-6, m-6, gap-6)
32px  = 2rem      (Tailwind: p-8, m-8, gap-8)
```

### Default Component Spacing
```
Button padding:           px-4 py-2 (16px × 8px)
Input padding:            px-3 py-2 (12px × 8px)
Card/Container padding:   p-4 (16px)
Form field gap:           gap-2 or gap-3 (8px or 12px)
Section gap:              gap-4 (16px between major sections)
Component gap:            gap-2 or gap-3 (8px–12px inside containers)
```

### Exception: Privacy/Trust Spacing
Increase spacing in sensitive contexts (e.g., separating exposed data, showing warnings):
```jsx
// ✅ More breathing room for critical information
<div className="border-l-4 border-warning pl-4 py-3 mb-4">
  Your email was found on 5 sites
</div>
```

### ❌ DON'Ts
- Don't default to `gap-6`, `gap-8`, `p-6`, `m-6` spacing (too loose)
- Don't add padding "just in case" around components
- Don't assume you need margin between grid items (use gap instead)

---

## Component Patterns

### Button (See Button.tsx for full implementation)
```jsx
// Primary
<Button onClick={handleClick}>
  Start Scan
</Button>

// Secondary
<Button variant="secondary">
  Cancel
</Button>

// Danger
<Button variant="danger">
  Delete
</Button>

// Tertiary (minimal)
<Button variant="tertiary">
  Learn more
</Button>

// Loading
<Button isLoading={loading} onClick={handleSubmit}>
  Submitting...
</Button>

// Icon-only
<Button isIcon aria-label="Close dialog">
  <X size={20} />
</Button>
```

### Card Container
```jsx
<div className="bg-surface dark:bg-[#172D4C] border border-subtle dark:border-[#263C59] rounded-lg p-4">
  <h3 className="text-lg font-semibold text-primary dark:text-white mb-3">
    Card Title
  </h3>
  <p className="text-sm text-secondary dark:text-[#94A3B8]">
    Card content here
  </p>
</div>
```

### Alert/Warning Box
```jsx
<div className="bg-warning/10 border-l-4 border-warning rounded px-3 py-2">
  <p className="text-sm font-medium text-warning">
    Warning: Data found on 3 sites
  </p>
</div>
```

---

## Forms & Inputs

### Text Input with Icon (PRIMARY PATTERN - From Design System)
```jsx
<div className="space-y-1.5">
  <label htmlFor="email" className="block text-sm font-medium text-primary dark:text-white">
    Email Address
  </label>
  <div className="relative">
    <input
      id="email"
      type="email"
      placeholder="james@vanyshr.com"
      className="h-[52px] w-full rounded-xl border border-subtle px-12 py-3 text-sm bg-[#F0F4F8]/50 dark:bg-[#022136]/50 text-primary dark:text-white placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14ABFE] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
    />
    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
  </div>
  {/* Error message */}
  <p className="text-xs text-[#FF5757] mt-1">Email is required</p>
</div>
```

**Key Properties (FROM DESIGN SYSTEM):**
- **Height:** `h-[52px]` (3.25rem - touch-optimized for mobile PWA)
- **Border radius:** `rounded-xl` (NOT `rounded-md`)
- **Background:**
  - Light mode: `bg-[#F0F4F8]/50` (brand-light with 50% opacity - NOT white)
  - Dark mode: `bg-[#022136]/50` (brand-dark with 50% opacity - NOT solid)
- **Padding:** `px-12` (48px left for icon), `py-3` (12px vertical)
- **Icon position:** `left-4` (16px from left), `w-5 h-5` (20px), `text-muted`, `pointer-events-none`
- **Focus state:** `focus-visible:ring-2 ring-[#14ABFE] ring-offset-2` (ring, not outline)

**Common Icons for Inputs:**
- `Mail`: Email fields
- `User`: First/Last Name, Profile fields
- `MapPin`: Address/Location/ZIP code fields
- `Search`: Search inputs
- `Lock`: Password fields
- `Phone`: Phone number fields

### Text Input (Standard - Legacy)
```jsx
<div className="mb-4">
  <label htmlFor="email" className="block text-sm font-medium text-primary dark:text-white mb-2">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    placeholder="user@example.com"
    className="w-full px-3 py-2 text-sm rounded-md border border-subtle dark:border-[#263C59] bg-surface dark:bg-[#172D4C] text-primary dark:text-white placeholder-[#94A3B8] focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#14ABFE] focus:border-[#14ABFE]"
  />
  {/* Error message */}
  <p className="text-xs text-error mt-1">Email is required</p>
</div>
```
**Note:** This pattern is legacy. Prefer the icon-based pattern above for consistency with the design system.

### Textarea
```jsx
<textarea
  className="w-full px-3 py-2 text-sm rounded-md border border-subtle dark:border-[#263C59] bg-surface dark:bg-[#172D4C] text-primary dark:text-white placeholder-[#94A3B8] focus:outline focus:outline-2 focus:outline-[#14ABFE]"
  placeholder="Enter your message"
  rows={4}
/>
```

### Checkbox
```jsx
<div className="flex items-center gap-2">
  <input
    id="agree"
    type="checkbox"
    className="w-4 h-4 rounded border border-subtle dark:border-[#263C59] focus:outline focus:outline-2 focus:outline-[#14ABFE]"
  />
  <label htmlFor="agree" className="text-sm text-primary dark:text-white">
    I agree to the terms
  </label>
</div>
```

### Select Dropdown
```jsx
<select
  className="w-full px-3 py-2 text-sm rounded-md border border-subtle dark:border-[#263C59] bg-surface dark:bg-[#172D4C] text-primary dark:text-white focus:outline focus:outline-2 focus:outline-[#14ABFE]"
>
  <option>Choose an option</option>
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

---

## Status Badges

### Success Badge
```jsx
<div className="inline-flex items-center gap-2 bg-[#E8F9F3] text-[#00C896] px-3 py-1 rounded-full text-xs font-medium">
  <Check size={14} />
  Removed
</div>
```

### Warning Badge
```jsx
<div className="inline-flex items-center gap-2 bg-[#FFF8E1] text-[#FFBC0A] px-3 py-1 rounded-full text-xs font-medium">
  <AlertCircle size={14} />
  Pending
</div>
```

### Error Badge
```jsx
<div className="inline-flex items-center gap-2 bg-[#FFE8E8] text-[#FF4D4D] px-3 py-1 rounded-full text-xs font-medium">
  <X size={14} />
  Failed
</div>
```

### Info Badge
```jsx
<div className="inline-flex items-center gap-2 bg-[#E0F7FF] text-[#14ABFE] px-3 py-1 rounded-full text-xs font-medium">
  <Info size={14} />
  In Progress
</div>
```

### Default/Muted Badge
```jsx
<div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-[#263C59] text-gray-600 dark:text-[#94A3B8] px-3 py-1 rounded-full text-xs font-medium">
  Pending Review
</div>
```

---

## Layout & Responsive

### Breakpoints (Tailwind, Mobile-First)
```
xs   = 0px     (mobile, default)
sm   = 640px   (large mobile / tablet portrait)
md   = 768px   (tablet landscape)
lg   = 1024px  (desktop)
xl   = 1280px  (large desktop)
2xl  = 1536px  (extra large)
```

### Common Patterns
```jsx
// Mobile-first grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>

// Flex layout
<div className="flex flex-col lg:flex-row gap-4">
  <aside className="lg:w-1/4">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>

// Responsive text size
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Title
</h1>

// Hide/show based on breakpoint
<div className="hidden md:block">
  Desktop only
</div>
```

### Container Widths
```jsx
// Standard max-width for centered content
<div className="max-w-6xl mx-auto px-4">
  Content
</div>

// Narrow for forms
<div className="max-w-md mx-auto">
  Form
</div>
```

---

## Dark Mode Implementation

### Auto-Detection
The system uses `@media (prefers-color-scheme: dark)` to automatically detect dark mode preference.

### Manual Toggle (Optional)
If supporting manual toggle in Settings:
```jsx
// Apply to <html> or <body>
<html className={darkMode ? 'dark' : ''}>
  {children}
</html>

// CSS variables automatically swap via media query or class
```

### Using Dark Mode in Components
```jsx
<div className="bg-page dark:bg-[#0D203B] text-primary dark:text-white">
  Automatically switches in dark mode
</div>

// More complex example
<button className="
  bg-[#14ABFE] dark:bg-[#14ABFE]
  text-white dark:text-white
  hover:bg-[#0D203B] dark:hover:bg-[#0D203B]
">
  Click me
</button>
```

### CSS Variables (Always Available)
```jsx
// Use variables directly if Tailwind arbitrary values don't work
<div style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-surface)' }}>
  Fallback using CSS variables
</div>
```

---

## Accessibility Checklist

### Keyboard Navigation
- [ ] All interactive elements are focusable (buttons, links, inputs)
- [ ] Tab order follows visual order (left-to-right, top-to-bottom)
- [ ] Focus is visible on all interactive elements (outline or ring visible)
- [ ] Can dismiss modals with Escape key
- [ ] Can submit forms with Enter key

### Color Contrast
- [ ] Text on background has minimum 4.5:1 contrast (WCAG AA)
- [ ] Status indicators use both color + icon/text (not color alone)
- [ ] Hover/focus states are distinguishable

### Screen Reader
- [ ] Form labels are associated with inputs via `htmlFor`
- [ ] Buttons have descriptive text (not just icons)
- [ ] Icon-only buttons have `aria-label`
- [ ] Dynamic content updates use `aria-live="polite"`
- [ ] Headings are semantic (`<h1>`, `<h2>`, etc.)

### Cognitive Load
- [ ] Forms have 5 fields or fewer per view
- [ ] One primary action per screen
- [ ] Instructions are clear and simple
- [ ] Progress is shown for multi-step flows

---

## Common Patterns & Examples

### Privacy Scan Result
```jsx
<div className="bg-surface dark:bg-[#172D4C] border border-subtle dark:border-[#263C59] rounded-lg p-4 mb-4">
  <div className="flex items-start justify-between mb-3">
    <h3 className="text-lg font-semibold text-primary dark:text-white">
      Found on 5 Sites
    </h3>
    <span className="bg-error/10 text-error px-3 py-1 rounded-full text-xs font-medium">
      Action Required
    </span>
  </div>
  
  <p className="text-sm text-secondary dark:text-[#94A3B8] mb-3">
    Your email address appears on:
  </p>
  
  <ul className="space-y-2 text-sm font-mono text-primary dark:text-white">
    <li>• databroker.com</li>
    <li>• peoplesearch.com</li>
    <li>• whitepages.com</li>
  </ul>
  
  <Button className="mt-4" onClick={handleRemove}>
    Start Removal
  </Button>
</div>
```

### Data Removal Status
```jsx
<div className="bg-surface dark:bg-[#172D4C] rounded-lg p-4 mb-3">
  <div className="flex items-center justify-between mb-2">
    <span className="font-medium text-primary dark:text-white">
      databroker.com
    </span>
    <div className="inline-flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full text-xs font-medium">
      <Check size={14} />
      Removed
    </div>
  </div>
  <p className="text-xs text-muted">
    Completed on Jan 10, 2026
  </p>
</div>
```

### Form with Validation
```jsx
<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-primary dark:text-white mb-2">
      Email Address
    </label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-3 py-2 text-sm rounded-md border border-subtle dark:border-[#263C59] bg-surface dark:bg-[#172D4C] text-primary dark:text-white focus:outline focus:outline-2 focus:outline-[#14ABFE]"
      placeholder="user@example.com"
    />
    {errors.email && (
      <p className="text-xs text-error mt-1">{errors.email}</p>
    )}
  </div>

  <Button type="submit" onClick={handleSubmit}>
    Continue
  </Button>
</form>
```

### Mobile-First Responsive Card Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {sites.map((site) => (
    <div key={site.id} className="bg-surface dark:bg-[#172D4C] border border-subtle dark:border-[#263C59] rounded-lg p-4">
      <h4 className="font-semibold text-primary dark:text-white mb-2">
        {site.name}
      </h4>
      <p className="text-xs text-secondary dark:text-[#94A3B8] mb-3">
        {site.description}
      </p>
      <Button size="sm" variant="secondary">
        View Details
      </Button>
    </div>
  ))}
</div>
```

---

## File Structure (Recommended)

```
src/
├── design-system/
│   ├── colors.ts          # Color token exports
│   ├── spacing.ts         # Spacing scale constants
│   ├── typography.ts      # Font sizes, weights
│   └── tokens.ts          # Unified token object
├── components/
│   ├── Common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── ScreenWrapper.tsx
│   ├── Auth/
│   ├── Dashboard/
│   ├── Reports/
│   └── Settings/
├── theme/
│   └── tailwind.css       # Global theme + CSS variables
└── pages/
    ├── Dashboard.tsx
    ├── Settings.tsx
    └── ...
```

---

## Quick Reference

### Most-Used Classes
```
Text Colors:        text-primary, text-secondary, text-muted
Background:         bg-page, bg-surface
Borders:            border-subtle
Padding:            p-4, px-3 py-2, p-6
Margin:             m-4, mb-3, mt-2
Gap:                gap-2, gap-3, gap-4
Rounded:            rounded-md, rounded-lg
Focus:              focus:outline focus:outline-2 focus:outline-[#14ABFE]
Dark Mode:          dark:bg-[#172D4C], dark:text-white
```

### Testing Checklist
- [ ] Component renders in light mode
- [ ] Component renders in dark mode
- [ ] Focus states are visible (Tab key)
- [ ] Color contrast is sufficient (WCAG AA)
- [ ] Responsive breakpoints work (mobile, tablet, desktop)
- [ ] Text is legible (font sizes, line heights)
- [ ] Spacing feels tight but not cramped
- [ ] Buttons are clickable (at least 44×44px on mobile)

---

**Questions?** Refer back to `.cursorrules` for strict implementation guidelines.
