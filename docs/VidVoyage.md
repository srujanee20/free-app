# VidVoyage

**Description**: A modern, sleek video browser interface inspired by YouTube.

## Functionalities
- Provides a clean search interface and filtering system (e.g., sort by latest, most viewed).
- Displays video cards featuring thumbnails, view counts, and publish dates.
- Features a comprehensive "Watch View" that plays videos and renders detailed metadata (channel info, descriptions, likes).
- Displays threaded comments for the currently active video.

## APIs Interacted With
Base URL: `https://api.freeapi.app/api/v1`
- `GET /public/youtube/videos` - Fetches a paginated list of videos, with search and sort parameters.
- `GET /public/youtube/videos/{id}` - Fetches detailed information for a specific video.
- `GET /public/youtube/comments/{id}` - Fetches comments for a specific video.

## Aesthetic Choices
Inspired by modern media streaming platforms. Features a minimalist dark mode (`bg-[#0f0f0f]`) that allows video thumbnails to pop. It uses high contrast with subtle gray borders and avoids distracting UI elements, optimizing for high-density visual content browsing.
