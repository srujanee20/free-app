# BazaarBoard

**Description**: A vibrant e-commerce mock platform for discovering random products.

## Functionalities
- Features a "Featured Discovery" banner highlighting a completely random product.
- Includes a responsive, paginated grid of products.
- Provides a search bar to filter products globally.
- Features a detailed product modal that displays an image gallery, pricing, discounts, stock levels, and ratings.

## APIs Interacted With
Base URL: `https://api.freeapi.app/api/v1`
- `GET /public/randomproducts` - Fetches a paginated list of products with optional query filtering.
- `GET /public/randomproducts/{id}` - Fetches detailed information for a specific product.
- `GET /public/randomproducts/product/random` - Fetches a completely random product.

## Aesthetic Choices
Designed as a clean, premium e-commerce platform. It features a crisp, light background (`bg-[#f8fafc]`), deep indigo highlights, soft drop shadows (`shadow-sm` up to `shadow-xl` on hover), and highly legible typography to ensure the products take center stage.
