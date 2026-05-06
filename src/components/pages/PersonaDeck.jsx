import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRandomUser } from "../../clients/freeApiRandomUserClient.js";

import PersonaDeckUserDetails from "../common/PersonaDeckUserDetails.jsx";

const PersonaDeck = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    const { data, isFetching, isError } = useQuery({
        queryKey: ["randomUser", refreshKey],
        queryFn: fetchRandomUser,
        staleTime: 0, 
    });

    const user = data?.data;

    const handleNextUser = () => {
        setShowDetails(false);
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="flex-grow w-full min-h-screen relative flex flex-col items-center py-12 px-4 sm:px-6 bg-slate-50">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-indigo-400/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight mb-3">
                    Persona<span className="text-gray-900">Deck</span>
                </h1>
                <p className="text-gray-500 font-medium max-w-md mx-auto">
                    Discover and explore randomly generated identities and user profiles.
                </p>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 w-full max-w-md mx-auto">
                {isError ? (
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 text-center shadow-xl border border-gray-100">
                        <p className="text-red-500 font-medium">Unable to fetch profile data. Please try again.</p>
                        <button onClick={handleNextUser} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors">
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className={`bg-white rounded-[2rem] shadow-2xl shadow-blue-900/5 overflow-hidden transition-all duration-500 ease-in-out border border-gray-100 ${showDetails ? 'max-w-xl' : 'max-w-md'}`}>
                        
                        {/* Profile Header Card */}
                        <div className="relative pt-20 px-6 sm:px-8 pb-6 text-center">
                            {/* Top Banner */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                            
                            {/* Avatar */}
                            <div className="relative mx-auto w-32 h-32 rounded-full p-1.5 bg-white shadow-lg mb-4">
                                {isFetching ? (
                                    <div className="w-full h-full rounded-full bg-gray-100 animate-pulse"></div>
                                ) : (
                                    user && (
                                        <img 
                                            src={user.picture?.large || "https://via.placeholder.com/150"} 
                                            alt="Profile"
                                            className="w-full h-full object-cover rounded-full bg-gray-50"
                                        />
                                    )
                                )}
                                
                                {/* Status Indicator */}
                                {!isFetching && user && (
                                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
                                )}
                            </div>

                            {/* Name & Basic Info */}
                            {isFetching ? (
                                <div className="space-y-3 flex flex-col items-center mt-2">
                                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                                </div>
                            ) : (
                                user && (
                                    <div className="animate-fade-in mt-2">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {user.name?.title} {user.name?.first} {user.name?.last}
                                        </h2>
                                        <div className="flex items-center justify-center gap-2 mt-1">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p className="text-gray-500 font-medium text-sm">
                                                {user.location?.city}, {user.nat}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Expandable Details Section */}
                        <div 
                            className={`px-6 sm:px-8 overflow-hidden transition-all duration-500 ease-in-out ${
                                showDetails ? "max-h-[800px] pb-6 opacity-100" : "max-h-0 pb-0 opacity-0"
                            }`}
                        >
                            <PersonaDeckUserDetails user={user} />
                        </div>

                        {/* Action Buttons */}
                        <div className="p-6 pt-0 flex flex-col gap-3">
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                disabled={isFetching || !user}
                                className="w-full py-3.5 px-6 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold rounded-2xl transition-colors disabled:opacity-50"
                            >
                                {showDetails ? "Hide Full Profile" : "View Full Profile"}
                            </button>
                            <button
                                onClick={handleNextUser}
                                disabled={isFetching}
                                className="w-full py-3.5 px-6 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl transition-all shadow-lg shadow-gray-900/20 disabled:opacity-50 flex items-center justify-center gap-2 group"
                            >
                                <span>Generate Next Profile</span>
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonaDeck;
