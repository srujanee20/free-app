# GateKeeper

**Description**: A secure authentication control center that handles user identity and session management.

## Functionalities
- User registration with email, username, and password.
- User login with secure session handling (JWT token stored locally).
- Fetching and displaying the current user's profile and status.
- Secure logout and session termination.
- Interactive cyber-themed terminal output to simulate secure identity actions.

## APIs Interacted With
Base URL: `https://api.freeapi.app/api/v1`
- `POST /users/register` - Registers a new identity.
- `POST /users/login` - Authenticates and receives a JWT token.
- `POST /users/logout` - Terminates the active session.
- `GET /users/current-user` - Retrieves the authenticated user's record.

## Aesthetic Choices
Employs a "cyber-security" dark mode interface (`bg-[#0a0f18]`) with terminal-style outputs (`bg-slate-950`). Features neon cyan highlights, pulse animations, and monospace fonts to emulate a highly secure, hacker-style "Control Center".
