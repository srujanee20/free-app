import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVideos, fetchVideoById, fetchVideoComments } from "../../clients/freeApiYoutubeClient.js";

import VidVoyageVideoCard from "../common/VidVoyageVideoCard.jsx";
import VidVoyageWatchView from "../common/VidVoyageWatchView.jsx";

// --- MAIN PAGE COMPONENT ---
const VidVoyage = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("javascript");
    const [searchInput, setSearchInput] = useState("javascript");
    const [sortBy, setSortBy] = useState("latest");
    const [selectedVideoId, setSelectedVideoId] = useState(null);

    const { data, isFetching, isError } = useQuery({
        queryKey: ["videos", page, query, sortBy],
        queryFn: () => fetchVideos({ page, limit: 12, query, sortBy }),
        keepPreviousData: true,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(searchInput);
        setPage(1);
    };

    if (selectedVideoId) {
        return (
            <div className="bg-[#0f0f0f] min-h-screen">
                <VidVoyageWatchView videoId={selectedVideoId} onBack={() => setSelectedVideoId(null)} />
            </div>
        );
    }

    return (
        <div className="flex-grow w-full bg-[#0f0f0f] min-h-screen font-sans">
            <div className="max-w-[1600px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
                
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 pb-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/50">
                            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            Vid<span className="text-red-500">Voyage</span>
                        </h1>
                    </div>

                    <div className="flex-1 max-w-xl w-full">
                        <form onSubmit={handleSearch} className="flex relative items-center">
                            <input 
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search videos..."
                                className="w-full bg-[#121212] border border-gray-700 text-white rounded-l-full px-6 py-2.5 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
                            />
                            <button 
                                type="submit"
                                className="bg-[#222222] border border-l-0 border-gray-700 text-gray-300 px-6 py-2.5 rounded-r-full hover:bg-gray-700 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </form>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="text-gray-400 text-sm font-medium">Sort by</label>
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-[#121212] border border-gray-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-gray-500 cursor-pointer"
                        >
                            <option value="latest">Latest</option>
                            <option value="mostLiked">Most Liked</option>
                            <option value="mostViewed">Most Viewed</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>
                </div>

                {/* Categories Pill (Static UI for aesthetic) */}
                <div className="flex gap-3 overflow-x-auto pb-4 mb-6 hide-scrollbar">
                    {["All", "JavaScript", "React", "Next.js", "Tailwind CSS", "Node.js", "Python", "Rust", "Tech News", "Podcasts", "Live"].map((cat, i) => (
                        <button key={cat} onClick={() => { setSearchInput(cat); setQuery(cat); setPage(1); }} className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${i === 1 && query === "javascript" || query.toLowerCase() === cat.toLowerCase() ? "bg-white text-black" : "bg-[#222222] text-gray-200 hover:bg-gray-700"}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Video Grid */}
                {isError ? (
                    <div className="py-20 text-center text-red-400">Failed to load videos. Please try again.</div>
                ) : isFetching ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="animate-pulse flex flex-col gap-3">
                                <div className="aspect-video bg-gray-800 rounded-xl"></div>
                                <div className="flex gap-3 px-1">
                                    <div className="w-9 h-9 rounded-full bg-gray-800 flex-shrink-0"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-800 rounded w-full"></div>
                                        <div className="h-4 bg-gray-800 rounded w-4/5"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
                            {data?.data?.data?.map((video) => (
                                <VidVoyageVideoCard key={video.items.id} video={video} onClick={setSelectedVideoId} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {data?.data?.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-16 pt-8 border-t border-gray-800">
                                <button 
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="text-gray-400 text-sm">
                                    Page <span className="text-white font-medium">{data.data.page}</span> of {data.data.totalPages}
                                </span>
                                <button 
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={!data?.data?.nextPage}
                                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                        
                        {data?.data?.data?.length === 0 && (
                            <div className="text-center py-20 text-gray-400">
                                <p className="text-xl mb-2">No videos found for "{query}"</p>
                                <p className="text-sm">Try searching for something else.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default VidVoyage;
