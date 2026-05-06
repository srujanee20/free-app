import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRandomJoke } from "../../clients/freeApiJokeClient.js";

import JestVaultJokeCard from "../common/JestVaultJokeCard.jsx";

const JestVault = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const { data, isFetching, isError } = useQuery({
        queryKey: ["randomJoke", refreshKey],
        queryFn: fetchRandomJoke,
        staleTime: 0,
    });

    const joke = data?.data;

    return (
        <div className="flex-grow w-full bg-[#111827] min-h-screen font-sans relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px]"></div>
                {/* Subtle Grid overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
            </div>

            <div className="relative z-10 flex flex-col flex-grow items-center justify-center px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-2 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl mb-4">
                        <span className="text-yellow-400 font-mono text-sm tracking-widest uppercase font-bold px-4">
                            Sector 7G Secure Storage
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                        Jest<span className="text-yellow-400">Vault</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Highly classified, maximum security collection of dad jokes, puns, and one-liners. Handle with care.
                    </p>
                </div>

                {/* Main Content */}
                {isError ? (
                    <div className="bg-red-950/50 border border-red-500/50 rounded-2xl p-8 text-center max-w-lg w-full backdrop-blur-sm">
                        <div className="text-4xl mb-4">🚨</div>
                        <h3 className="text-red-400 font-bold text-xl mb-2">Security Breach</h3>
                        <p className="text-red-200/70 mb-6">Failed to retrieve the joke. The connection might be compromised.</p>
                        <button 
                            onClick={() => setRefreshKey(k => k + 1)}
                            className="px-6 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-colors font-medium"
                        >
                            Retry Connection
                        </button>
                    </div>
                ) : (
                    <JestVaultJokeCard 
                        joke={joke} 
                        isFetching={isFetching} 
                        onNext={() => setRefreshKey(k => k + 1)} 
                    />
                )}
                
                {/* Footer decorations */}
                <div className="mt-16 text-center opacity-40 flex items-center justify-center gap-4">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-500"></div>
                    <span className="text-gray-400 font-mono text-xs tracking-[0.3em] uppercase">Security Level: Maximum</span>
                    <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-500"></div>
                </div>
            </div>
        </div>
    );
};

export default JestVault;
