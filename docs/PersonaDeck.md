# PersonaDeck

**Description**: An interactive identity viewer for discovering random user profiles.

## Functionalities
- Displays a high-quality "ID card" style profile for a randomly generated user.
- Shows basic information such as the user's name, profile picture, and city.
- Features an expandable "View Full Profile" section that elegantly reveals deep details including age, full location (coordinates, timezone), contact info (email, cell), and account references (UUID, username).
- Provides a button to seamlessly fetch and render a new random identity.

## APIs Interacted With
Base URL: `https://api.freeapi.app/api/v1`
- `GET /public/randomusers/user/random` - Fetches a detailed profile of a random user.

## Aesthetic Choices
Features a sleek, modern "ID card" design. Uses soft, airy blue and indigo gradients against a clean, off-white background (`bg-slate-50`). Smooth CSS transitions are used for expanding the profile card, giving it a polished, corporate identity-management look.
