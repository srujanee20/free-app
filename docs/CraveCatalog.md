# CraveCatalog

**Description**: A vibrant culinary directory for discovering global recipes and meals.

## Functionalities
- Features an "Editor's Pick" hero section showing a random meal of the day.
- Allows browsing meals via categories (Vegetarian, Dessert, Seafood, etc.).
- Renders meal cards with hover animations.
- Provides a detailed modal view that parses and lists the exact ingredients, measurements, and step-by-step instructions.

## APIs Interacted With
Base URL: `https://api.freeapi.app/api/v1`
- `GET /public/meals` - Fetches a paginated list of meals, optionally filtered by category.
- `GET /public/meals/meal/random` - Fetches a single random meal for the hero banner.

## Aesthetic Choices
Designed to be warm and appetizing. Uses a soft, off-white background (`bg-[#fdfbf7]`) with vibrant orange and red culinary highlights. It incorporates premium layout patterns, like an "Editor's Pick" hero banner and large, elegant serif typography for recipe titles.
