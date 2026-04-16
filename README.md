# AutoElite

A modern e-commerce marketplace built with Next.js 16, featuring a responsive product catalog, persistent cart, and wishlist functionality. Product data is sourced from the [Fake Store API](https://fakestoreapi.com/).

## Features

- Responsive product catalog with category filtering
- Dynamic product detail pages with image gallery
- Shopping cart with quantity controls and localStorage persistence
- Wishlist with add / remove toggle and localStorage persistence
- Smooth page and micro-interactions powered by Framer Motion
- Fully responsive layout (mobile, tablet, desktop)

## Technologies Used

| Category | Stack |
|----------|-------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) |
| Data Fetching | [TanStack Query v5](https://tanstack.com/query) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Linting | ESLint 9 + `eslint-config-next` |
| Data Source | [Fake Store API](https://fakestoreapi.com/) |

## Installation

### Prerequisites

- **Node.js** 18.18 or newer (20+ recommended for Next.js 16)
- **npm**, **yarn**, **pnpm**, or **bun**

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd auto-elite
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server with Turbopack |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Lint the codebase using ESLint |

## Project Structure

```
app/
├── cart/                 # Cart page
├── components/           # Reusable UI components
│   └── layout/           # Navbar, Footer, HeroBanner, etc.
├── lib/                  # API clients, types, utilities
├── products/[id]/        # Dynamic product detail page
├── providers/            # Redux + React Query providers
├── store/                # Redux slices (cart, wishlist) + hooks
└── wishlist/             # Wishlist page
```

## Handling Hydration Issues with Cart Persistence

Persisting the cart (and wishlist) across page reloads in a Next.js App Router project introduces a classic **hydration mismatch** problem: `localStorage` is a browser-only API, but Next.js renders components on the server first. If the Redux initial state is populated from `localStorage` at import time, the HTML produced on the server will differ from the markup React generates on the client, and React will throw a hydration error.

This project solves the issue with a **deferred hydration pattern**:

### 1. Start with an empty server-safe initial state

The cart slice (`app/store/cartSlice.ts`) is created with an empty `items` array. `localStorage` is **never** touched during module initialization, so the reducer state is identical on the server and on the client's first render.

```ts
const initialState: CartState = { items: [] };
```

### 2. Guard storage access

Helper functions always check for `window` before reading from or writing to `localStorage`, so the code is safe to import in a server-rendered environment:

```ts
function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
```

### 3. Hydrate after the client mounts

A dedicated `hydrateCart` reducer loads the persisted items from `localStorage`. It's dispatched from inside a `useEffect` in `app/providers/Providers.tsx` — which only runs on the client, **after** the first render. This guarantees the server-rendered HTML and the client's initial render are identical; the cart contents are injected on the next render.

```tsx
useEffect(() => {
  storeRef.current?.dispatch(hydrateCart());
  storeRef.current?.dispatch(hydrateWishlist());
}, []);
```

### 4. Create the Redux store per request

The store is created inside the `Providers` client component using a `useRef`, ensuring each SSR request gets its own store instance and preventing state leaking between users.

```tsx
const storeRef = useRef<AppStore>(undefined);
if (!storeRef.current) {
  storeRef.current = makeStore();
}
```

### 5. Persist on every mutation

Each cart reducer (`addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`) calls `saveCartToStorage` after mutating state. The wishlist slice follows the same pattern. Since these reducers only run in response to user actions, they always execute on the client — no SSR concerns.

### Result

- No hydration warnings from React
- Cart and wishlist persist across page reloads and tab sessions
- Works seamlessly with streaming SSR and the App Router

## Data Fetching

Product data is fetched via TanStack Query (`app/lib/api.ts`) with a 5-minute stale time to reduce redundant network calls. Queries are cached per query key, so navigating back to a previously viewed page is instant.

## License

This project is for demonstration and assessment purposes.
