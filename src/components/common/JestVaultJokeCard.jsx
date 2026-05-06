const JestVaultJokeCard = ({ joke, isFetching, onNext }) => {
    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* Decorative background elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur opacity-30 animate-pulse"></div>
            
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                
                {/* Vault Theme Accents */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>

                <div className="mb-8">
                    <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)] rotate-3">
                        <span className="text-3xl">🎭</span>
                    </div>
                </div>

                <div className="min-h-[150px] flex items-center justify-center w-full relative z-10">
                    {isFetching ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                            </div>
                            <span className="text-gray-400 font-medium text-sm tracking-widest uppercase">Unlocking Vault...</span>
                        </div>
                    ) : (
                        <div className="animate-fade-in w-full">
                            {/* Decorative quote marks */}
                            <span className="text-6xl text-yellow-400/20 font-serif absolute -top-6 -left-4 select-none">"</span>
                            <span className="text-6xl text-yellow-400/20 font-serif absolute -bottom-12 -right-4 select-none">"</span>
                            
                            <p className="text-2xl sm:text-3xl font-bold text-white leading-relaxed tracking-wide">
                                {joke?.content || "No joke found. The vault is empty."}
                            </p>
                            
                            {joke?.categories && joke.categories.length > 0 && (
                                <div className="mt-6 flex justify-center gap-2 flex-wrap">
                                    {joke.categories.map((cat, idx) => (
                                        <span key={idx} className="bg-white/10 text-yellow-300 border border-yellow-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <button
                    onClick={onNext}
                    disabled={isFetching}
                    className="mt-12 group relative inline-flex items-center justify-center px-8 py-4 font-bold text-gray-900 bg-yellow-400 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(250,204,21,0.3)] focus:outline-none"
                >
                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                    <span className="relative flex items-center gap-2">
                        Get Another Joke
                        <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default JestVaultJokeCard;
