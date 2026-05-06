import { Link } from "react-router-dom";

const apps = [
  { name: "PersonaDeck", path: "/persona-deck", description: "Discover and view random user profiles." },
  { name: "CraveCatalog", path: "/crave-catalog", description: "Browse delicious meals and recipes." },
  { name: "WhiskerView", path: "/whisker-view", description: "A purrfect place to view random cats." },
  { name: "JestVault", path: "/jest-vault", description: "Your daily dose of random jokes." },
  { name: "InkWell", path: "/ink-well", description: "Your favorite quotes listing." },
  { name: "BazaarBoard", path: "/bazaar-board", description: "Explore and filter various products." },
  { name: "VidVoyage", path: "/vid-voyage", description: "Watch and discover amazing YouTube videos." },
  { name: "GateKeeper", path: "/gate-keeper", description: "A complete authentication flow." }
];

const HomePage = () => {
  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Free<span className="text-indigo-600">App</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          A unified collection of amazing tools.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {apps.map((app) => (
          <Link
            key={app.path}
            to={app.path}
            className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {app.name}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                {app.description}
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">Launch App</span>
              <svg className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;