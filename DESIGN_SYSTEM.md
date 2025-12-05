# 🎨 VehicleShare - UI/UX Improvements Visual Guide

## Color Palette

### Primary Colors

- **Primary:** `oklch(0.205 0 0)` - Deep Blue/Black
- **Accent:** `oklch(0.97 0 0)` - Light neutral
- **Background:** `oklch(1 0 0)` - White
- **Foreground:** `oklch(0.145 0 0)` - Dark text

### Status Colors

- **Success:** Green-600 (`#16a34a`)
- **Warning:** Yellow-600 (`#ca8a04`)
- **Error:** Red-600 (`#dc2626`)
- **Info:** Blue-600 (`#2563eb`)

### Stat Card Colors

- **Blue:** `bg-blue-50` / `text-blue-600` - Bookings
- **Red:** `bg-red-50` / `text-red-600` - Favorites
- **Green:** `bg-green-50` / `text-green-600` - Spending
- **Purple:** `bg-purple-50` / `text-purple-600` - Hosts

---

## Typography

### Font Family

- **Font:** Roboto (Google Fonts)
- **Fallback:** System sans-serif, ui-sans-serif

### Text Hierarchy

```
H1 - 4xl (36px) - Main page headings
     font-bold tracking-tight

H2 - 3xl (30px) - Section headings
     font-bold

H3 - 2xl (24px) - Card titles
     font-semibold

H4 - lg (18px) - Subsection titles
     font-semibold

Body - base (16px) - Regular text
       text-slate-600

Small - sm (14px) - Secondary text
        text-slate-500

Tiny - xs (12px) - Labels & hints
       text-slate-500
```

---

## Spacing Scale

**Base Unit:** 8px grid

```
px-2  = 8px (0.5rem)   - Tight spacing
px-3  = 12px (0.75rem) - Small padding
px-4  = 16px (1rem)    - Default padding
px-6  = 24px (1.5rem)  - Generous padding
px-8  = 32px (2rem)    - Large padding

py-2  = 8px (vertical)
py-4  = 16px (vertical)
py-6  = 24px (vertical)
py-8  = 32px (vertical)
```

---

## Component Library

### Buttons

#### Primary Button

```tsx
<Button size="lg" className="w-full gap-2 rounded-lg">
  <Icon className="h-5 w-5" />
  Action Text
</Button>
```

- Background: Primary
- Text: White
- Padding: 10px × 24px (h-10)
- Hover: bg-primary/90

#### Outline Button

```tsx
<Button variant="outline" size="sm" className="rounded-lg">
  Secondary Action
</Button>
```

- Background: Transparent
- Border: 1px border-slate-200
- Text: Slate-900
- Hover: bg-accent

#### Ghost Button

```tsx
<Button variant="ghost" size="icon">
  <Icon className="h-5 w-5" />
</Button>
```

- Background: Transparent
- Text: Slate-600
- Hover: bg-accent

### Cards

```tsx
<Card className="overflow-hidden transition-shadow hover:shadow-lg">
  <CardHeader className="space-y-2">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content goes here</CardContent>
</Card>
```

#### Features

- Border: 1px solid border-slate-200
- Rounded: 8px (0.5rem)
- Shadow: subtle (default) → lg (hover)
- Padding: p-6 (24px)
- Transition: smooth (150ms)

### Input Fields

```tsx
<div className="relative">
  <Icon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
  <Input placeholder="..." className="pl-10" />
</div>
```

#### Features

- Padding: px-3 py-2 with icon (pl-10)
- Border: 1px solid border-slate-200
- Focus: ring-2 ring-primary/50
- Rounded: 8px
- Background: White
- Placeholder: text-slate-500

---

## Page Layouts

### Hero Section

```
┌─────────────────────────────────────┐
│  Headline | Badge                   │
│  "Your Journey, Our Vehicles"       │
│                                     │
│  Search Bar (Location + Vehicle)    │
│  [Search] [Browse]                  │
│                                     │
│  Stats: 50K+ | 4.9/5 | 24/7        │
│                                     │
│  Vehicle Types: 5 Cards             │
│  Featured Vehicles: 6 Cards (3x2)   │
└─────────────────────────────────────┘
```

### Dashboard

```
┌─────────────────────────────────────┐
│  Welcome Header                     │
│                                     │
│  Stat Cards: 4 in a row             │
│  [Bookings] [Favorites] [Spent]     │
│                                     │
│  ┌──────────────────┬──────────────┐│
│  │ Recent Bookings  │ Quick Actions││
│  │ [List of 3]      │ [3 Buttons]  ││
│  │ [View All]       │              ││
│  │                  │ Feature Card ││
│  │                  │ Support Card ││
│  └──────────────────┴──────────────┘│
└─────────────────────────────────────┘
```

### Vehicle Browse

```
┌─────────────────────────────────────┐
│  Heading: Browse Vehicles           │
│                                     │
│  ┌─ Filters ─────────────────────┐  │
│  │ Search [...search...]         │  │
│  │ Type: [All] [Compact] [Sedan] │  │
│  │ Sort: [Popular] [Price] [Rad] │  │
│  └───────────────────────────────┘  │
│                                     │
│  Results: Showing 8 vehicles        │
│                                     │
│  ┌─────────┬──────────┬─────────┐   │
│  │Vehicle 1│Vehicle 2 │Vehicle 3│   │
│  │[Image]  │ [Image]  │[Image]  │   │
│  ├─────────┼──────────┼─────────┤   │
│  │Vehicle 4│Vehicle 5 │Vehicle 6│   │
│  │[Image]  │ [Image]  │[Image]  │   │
│  └─────────┴──────────┴─────────┘   │
└─────────────────────────────────────┘
```

### Vehicle Detail

```
┌─────────────────────────────────────┐
│  < Back                             │
│                                     │
│  ┌──────────────────┬──────────────┐│
│  │ [Large Image]    │ Booking Card ││
│  │ ★ 4.8 (156 rev) │ Rp 500,000   ││
│  │                  │ [Dates]      ││
│  ├──────────────────┤ ────────     ││
│  │ Specs Grid       │ [Calculator] ││
│  │ [4 Stat Cards]   │ [Book Now]   ││
│  │                  │              ││
│  │ Features List    │ Trust & Safe ││
│  │ [8 Features]     │              ││
│  │                  │              ││
│  │ Owner Info       │              ││
│  │ [Avatar] [Name]  │              ││
│  └──────────────────┴──────────────┘│
└─────────────────────────────────────┘
```

### Authentication

```
┌─────────────────────────────────────┐
│  [Logo] VehicleShare                     │
├─────────────────────────────────────┤
│                                     │
│        ┌──────────────────────┐     │
│        │ [Icon] Welcome Back  │     │
│        │ Sign In Form:        │     │
│        │ [Email Input]        │     │
│        │ [Password Input]     │     │
│        │ [Sign In Button]     │     │
│        │ ─ Or continue with ─ │     │
│        │ [Google Button]      │     │
│        │ [Sign Up Link]       │     │
│        └──────────────────────┘     │
│                                     │
├─────────────────────────────────────┤
│  © 2025 VehicleShare                     │
└─────────────────────────────────────┘
```

---

## Animations

### Fade In

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Duration: 0.5s */
```

### Slide In Left

```css
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Bounce Subtle

```css
@keyframes bounce-subtle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
/* Duration: 2s */
```

---

## Responsive Breakpoints

### Mobile First

- **Default:** 320px+ (Mobile)
- **sm:** 640px+ (Small tablets)
- **md:** 768px+ (Tablets & small desktops)
- **lg:** 1024px+ (Desktops)
- **xl:** 1280px+ (Large screens)

### Layout Changes

**Mobile (< 768px)**

- Stack layouts vertically
- Full-width components
- Hidden desktop nav
- Show mobile menu

**Tablet (768px - 1024px)**

- Two-column layouts
- Show navigation
- Adjust spacing

**Desktop (> 1024px)**

- Multi-column layouts
- Full navigation visible
- Expanded components
- Optimal spacing

---

## Interactive States

### Button States

```
Normal:   background-color: primary
Hover:    background-color: primary/90 (brightness 95%)
Active:   transform: scale(0.98)
Focus:    outline: 3px ring ring-primary/50
Disabled: opacity: 0.5, pointer-events: none
```

### Input States

```
Normal:   border-slate-200
Focus:    ring-2 ring-primary/50
Error:    border-destructive
Disabled: background-slate-100, opacity-0.5
```

### Card States

```
Normal:   shadow-none, border-slate-200
Hover:    shadow-lg, ring-1 ring-primary
Active:   shadow-xl
```

---

## Accessible Components

### Focus Indicators

- All interactive elements have visible focus
- Ring style: 3px ring-primary/50
- Color: Primary blue with transparency

### ARIA Labels

- Links and buttons have descriptive text or aria-labels
- Form inputs have associated labels
- Images have alt text
- Icons without text have aria-labels

### Semantic HTML

- Use `<button>` for buttons
- Use `<a>` for navigation
- Use `<form>` for forms
- Use `<nav>` for navigation
- Use proper heading hierarchy

---

## Component Variants

### Button Sizes

- **sm:** h-8, px-3, text-sm
- **default:** h-9, px-4, text-base
- **lg:** h-10, px-6, text-base
- **icon:** square (h-9 w-9)

### Rounded Corners

- **none:** 0px
- **sm:** 4px
- **default:** 8px (0.5rem)
- **md:** 10px (0.625rem)
- **lg:** 12px
- **full:** 9999px

### Shadow Sizes

- **none:** none
- **sm:** 0 1px 2px rgba
- **md:** 0 4px 6px rgba
- **lg:** 0 10px 15px rgba
- **xl:** 0 20px 25px rgba

---

## Best Practices

### Design

✅ Maintain consistent spacing (8px grid)
✅ Use color purposefully (status indicators)
✅ Limit font sizes to 3-4 choices
✅ Keep components simple and focused
✅ Use icons consistently

### Interaction

✅ Provide visual feedback for all actions
✅ Keep transitions smooth (150-300ms)
✅ Disable actions when appropriate
✅ Show loading states
✅ Give clear confirmation messages

### Accessibility

✅ Ensure sufficient color contrast (WCAG AA)
✅ Keyboard navigate all content
✅ Provide alt text for images
✅ Use semantic HTML
✅ Test with screen readers

### Performance

✅ Lazy load images
✅ Optimize CSS (use utilities)
✅ Use GPU-accelerated transforms
✅ Minimize repaints/reflows
✅ Code split where appropriate

---

## Files Reference

### Component Files

- `src/components/hero.tsx` - Landing page hero
- `src/components/navbar.tsx` - Top navigation
- `src/components/ui/*.tsx` - UI primitives

### Page Files

- `src/app/(main)/page.tsx` - Home page
- `src/app/(main)/dashboard/page.tsx` - Dashboard
- `src/app/(main)/vehicles/cars/page.tsx` - Vehicle list
- `src/app/(auth)/sign-in/` - Login
- `src/app/(auth)/sign-up/` - Registration

### Style Files

- `src/app/globals.css` - Global styles & animations

---

## 🎯 Design Principles Applied

1. **Clarity** - Clear hierarchy and purpose
2. **Consistency** - Unified design language
3. **Efficiency** - Quick and easy interactions
4. **Accessibility** - Inclusive for all users
5. **Delight** - Smooth animations and polish
6. **Responsiveness** - Works on all devices
7. **Performance** - Fast and smooth

---

**Version:** 1.0
**Last Updated:** December 5, 2025
