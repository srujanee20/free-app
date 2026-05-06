# FreeApp Suite

Welcome to the **FreeApp Suite**, a modular, multi-app React application that serves as a frontend client for various endpoints provided by [FreeAPI](https://api.freeapi.app).

This project was built to demonstrate clean architectural patterns, robust state management, and highly customized, immersive UI/UX design. Instead of a monolithic, uniform design system, each application within the suite features a distinct, bespoke aesthetic tailored to its specific use case.

---

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/) via [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [@tanstack/react-query](https://tanstack.com/query/latest) (for robust API data fetching, caching, and pagination)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Routing**: [React Router](https://reactrouter.com/)

---

## 🧩 The Applications

The suite comprises 8 fully-featured mini-applications. Detailed documentation for each app can be found in the [`/docs`](./docs) directory.

### 1. 🔐 GateKeeper
A cyber-themed, secure authentication control center. Handles user registration, login, logout, and session persistence via JWT. Features interactive terminal-style feedback.
- **Docs**: [GateKeeper.md](./docs/GateKeeper.md)

### 2. 🎭 JestVault
A neon-brutalist "vault" serving up your daily dose of random jokes. Features glassmorphic overlays and "unlocking" load animations.
- **Docs**: [JestVault.md](./docs/JestVault.md)

### 3. 🛍️ BazaarBoard
A clean, modern e-commerce mock platform. Browse, search, and view highly detailed product cards with discount banners and immersive modal galleries.
- **Docs**: [BazaarBoard.md](./docs/BazaarBoard.md)

### 4. 🪪 PersonaDeck
An interactive identity viewer. Presents randomly generated user profiles using frosted-glass ID cards that elegantly expand to reveal deep contact and location details.
- **Docs**: [PersonaDeck.md](./docs/PersonaDeck.md)

### 5. 📜 InkWell
A vintage, Shakespearean-styled archive for discovering classic quotes. Uses sepia tones, aged parchment textures, and serif typography for a literary reading experience.
- **Docs**: [InkWell.md](./docs/InkWell.md)

### 6. 🎬 VidVoyage
A YouTube-inspired video browser. Optimized for high-density content with a dark-mode minimalist UI, featuring a comprehensive "watch view" with threaded comments.
- **Docs**: [VidVoyage.md](./docs/VidVoyage.md)

### 7. 🍳 CraveCatalog
A warm, appetizing culinary directory. Features a vibrant "Editor's Pick" hero banner and detailed, parseable recipe modals for discovering global meals.
- **Docs**: [CraveCatalog.md](./docs/CraveCatalog.md)

### 8. 🐱 WhiskerView
A playful and energetic cat picture and breed information viewer. Uses bouncy animations and vibrant gradients to match the casual fun of random cats.
- **Docs**: [WhiskerView.md](./docs/WhiskerView.md)

---

## 🏗️ Architecture & Patterns

- **API Layer**: Centralized Axios instance (`src/configs/axiosConfig.js`) with dedicated API client files per domain (e.g., `freeApiProductClient.js`, `freeApiCatClient.js`).
- **Component Modularity**: Monolithic pages have been aggressively refactored. Reusable pieces (Cards, Modals, Banners) live in `src/components/common/` with strict prefix naming conventions corresponding to their parent app (e.g., `BazaarBoardProductCard.jsx`).
- **Data Fetching**: Extensively uses TanStack Query (`useQuery`, `useMutation`) to gracefully handle loading states, error boundaries, caching, and pagination.

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation & Execution

1. **Clone the repository**
   ```bash
   git clone https://github.com/srujanee20/free-app.git
   cd free-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

*This project relies entirely on [FreeAPI](https://api.freeapi.app) for its backend infrastructure. No local backend setup is required.*
