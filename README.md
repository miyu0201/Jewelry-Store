# Artisan Jewels - Handcrafted Jewelry Collection

Welcome to **Artisan Jewels**, a modern jewelry e-commerce app built with Next.js and React!  
Browse, like, and shop unique handcrafted jewelry pieces from talented artisans.

---

## 🚀 Features

- **Browse Jewelry:** Explore rings, necklaces, earrings, and more
- **Shopping Cart:** Add, remove, and update quantities for items
- **Liked Items:** Heart your favorites and view them in a dedicated page
- **Breadcrumb Navigation:** Easily see where you are in the site
- **Optimized Images:** Fast loading and high quality
- **Persistent Cart & Likes:** Your selections are saved across sessions

---

## 🛠️ Getting Started

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Run the Development Server**
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
src/
  app/
    components/      # Reusable UI components (Navbar, Breadcrumb, ModelCard, etc.)
    context/         # Cart context for global state management
    data/            # Jewelry data (models.json)
    hooks/           # Custom React hooks
    lib/             # Data fetching logic
    types/           # TypeScript types
    3d-models/       # Jewelry collection and detail pages
    cart/            # Shopping cart page
    liked-items/     # Liked items page
    layout.tsx       # App layout
    page.tsx         # Home page
public/
  ...images
```

---

## 🖼️ Image Optimization

- Uses Next.js `<Image />` for fast, responsive images
- All jewelry images are in `/public`
- Images are compressed and served in modern formats

---

## 🛒 Shopping Cart

- Add items from any jewelry card or detail page
- Update quantity or remove items directly in the cart
- Cart icon in navbar shows item count

---

## ❤️ Liked Items

- Heart any jewelry item to save it to your favorites
- View all liked items in the "Liked Items" page
- Clear all liked items with one click

---

## 🧭 Breadcrumbs

- Breadcrumbs show your current location for easy navigation
- Present on all main pages (Home, Jewelry, Cart, Liked Items, Item Detail)

---


## 📦 Build & Deploy

To build for production:
```bash
npm run build
```
Then start the server:
```bash
npm start
```

---

