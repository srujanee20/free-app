import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRandomCat } from "../../clients/freeApiCatClient.js";

// Helper component for rating bars (e.g. affection: 5/5)
const RatingBar = ({ label, value }) => (
    <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 font-medium">{label}</span>
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <div 
                    key={star} 
                    className={`w-4 h-4 rounded-full ${star <= value ? 'bg-pink-400' : 'bg-pink-100'}`}
                ></div>
            ))}
        </div>
    </div>
);

const WhiskerView = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    const { data, isFetching, isError } = useQuery({
        queryKey: ["randomCat", refreshKey],
        queryFn: fetchRandomCat,
        staleTime: 0, // always fetch new on refreshKey change
    });

    const cat = data?.data;

    const handleNextCat = () => {
        setShowDetails(false);
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="flex-grow w-full min-h-screen relative flex flex-col items-center py-12 px-4 sm:px-6">
            {/* Playful Animated Gradient Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
                {/* Decorative blob patterns */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-40 w-72 h-72 bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 tracking-tight mb-3">
                    Whisker<span className="text-gray-800">View</span> 🐾
                </h1>
                <p className="text-gray-600 font-medium max-w-md mx-auto">
                    Discover adorable feline friends and learn what makes each breed purr-fect!
                </p>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 w-full max-w-lg mx-auto">
                {isError ? (
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 text-center shadow-xl">
                        <p className="text-red-500 font-medium">Oops! Failed to summon a cat. Try again.</p>
                        <button onClick={handleNextCat} className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-colors">
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className={`bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-500 ease-in-out border border-white/50 ${showDetails ? 'max-w-2xl' : 'max-w-lg'}`}>
                        
                        {/* Polaroid Style Image Container */}
                        <div className="p-4 sm:p-6 pb-0">
                            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-inner group">
                                {isFetching ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-pink-50">
                                        <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    cat && (
                                        <>
                                            <img 
                                                src={cat.image || "https://via.placeholder.com/600?text=No+Image+Found"} 
                                                alt={cat.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Name badge floating over image */}
                                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/40">
                                                    <h2 className="text-2xl font-bold text-gray-800">{cat.name}</h2>
                                                    <p className="text-pink-600 font-semibold text-sm">{cat.origin}</p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Expandable Details Section */}
                        <div 
                            className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                                showDetails ? "max-h-[800px] py-6 opacity-100" : "max-h-0 py-0 opacity-0"
                            }`}
                        >
                            {cat && (
                                <div className="space-y-6 animate-fade-in delay-150">
                                    {/* Description */}
                                    <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                                        <p className="text-gray-700 text-sm leading-relaxed italic">
                                            "{cat.description}"
                                        </p>
                                    </div>

                                    {/* Quick Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Life Span</p>
                                            <p className="text-lg font-extrabold text-gray-800">{cat.life_span} yrs</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Weight</p>
                                            <p className="text-lg font-extrabold text-gray-800">{cat.weight?.metric} kg</p>
                                        </div>
                                    </div>

                                    {/* Temperament */}
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">Temperament</p>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.temperament?.split(', ').map(temp => (
                                                <span key={temp} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                                                    {temp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Breed Traits Bars */}
                                    <div className="pt-2">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-3">Breed Traits</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                                            <RatingBar label="Affection Level" value={cat.affection_level} />
                                            <RatingBar label="Energy Level" value={cat.energy_level} />
                                            <RatingBar label="Child Friendly" value={cat.child_friendly} />
                                            <RatingBar label="Dog Friendly" value={cat.dog_friendly} />
                                            <RatingBar label="Intelligence" value={cat.intelligence} />
                                            <RatingBar label="Grooming Need" value={cat.grooming} />
                                        </div>
                                    </div>

                                    {cat.wikipedia_url && (
                                        <div className="text-center pt-2">
                                            <a 
                                                href={cat.wikipedia_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-sm font-bold text-pink-500 hover:text-pink-600 underline underline-offset-2"
                                            >
                                                Read more on Wikipedia
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="p-6 pt-4 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                disabled={isFetching || !cat}
                                className="flex-1 py-3.5 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-2xl transition-colors shadow-sm disabled:opacity-50"
                            >
                                {showDetails ? "Hide Details" : "Know more about the cat"}
                            </button>
                            <button
                                onClick={handleNextCat}
                                disabled={isFetching}
                                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-2xl transition-all shadow-md shadow-pink-500/25 disabled:opacity-50 flex items-center justify-center gap-2 group"
                            >
                                <span>Next Cat</span>
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Custom animations added to a local style block to ensure they work without tailwind config changes */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}} />
        </div>
    );
};

export default WhiskerView;
