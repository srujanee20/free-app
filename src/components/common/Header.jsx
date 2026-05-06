import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navLinks = [
    { name: "InkWell", path: "/ink-well" },
    { name: "PersonaDeck", path: "/persona-deck" },
    { name: "CraveCatalog", path: "/crave-catalog" },
    { name: "WhiskerView", path: "/whisker-view" },
    { name: "JestVault", path: "/jest-vault" },
    { name: "BazaarBoard", path: "/bazaar-board" },
    { name: "VidVoyage", path: "/vid-voyage" },
    { name: "GateKeeper", path: "/gate-keeper" },
];

const Header = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between h-14 items-center gap-8">
                    <Link to="/" className="text-xl font-bold text-gray-900 shrink-0 tracking-tight">
                        Free<span className="text-indigo-600">App</span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1 overflow-x-auto flex-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                    location.pathname === link.path
                                        ? "bg-indigo-600 text-white"
                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <button
                        className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        onClick={() => setMenuOpen((o) => !o)}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 grid grid-cols-2 gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setMenuOpen(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                location.pathname === link.path
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;