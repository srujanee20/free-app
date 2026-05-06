import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVideos, fetchVideoById, fetchVideoComments } from "../../clients/freeApiYoutubeClient.js";

// Helper to format view count (e.g., 1.5K, 2M)
const formatViews = (views) => {
    if (!views) return "0";
    const num = parseInt(views, 10);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
};

// Helper to format relative time
const timeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

// --- VIDEO CARD COMPONENT ---
const VideoCard = ({ video, onClick }) => {
    const { snippet, statistics } = video.items;
    
    return (
        <div 
            onClick={() => onClick(video.items.id)}
            className="group cursor-pointer flex flex-col gap-3"
        >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-800">
                <img 
                    src={snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url} 
                    alt={snippet.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium tracking-wide">
                    {/* Duration usually needs parsing from PT15M12S format, displaying placeholder or keeping simple */}
                    ▶ Play
                </div>
            </div>
            <div className="flex gap-3 px-1">
                <div className="w-9 h-9 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-gray-400 font-bold overflow-hidden">
                    {/* Placeholder for channel avatar as it's not always in the list API */}
                    {snippet.channelTitle.charAt(0)}
                </div>
                <div className="flex flex-col overflow-hidden">
                    <h3 className="text-white text-sm font-semibold line-clamp-2 leading-tight group-hover:text-red-400 transition-colors">
                        {snippet.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1 truncate hover:text-white transition-colors">
                        {snippet.channelTitle}
                    </p>
                    <div className="flex items-center text-gray-400 text-xs mt-0.5">
                        <span>{formatViews(statistics?.viewCount)} views</span>
                        <span className="mx-1">•</span>
                        <span>{timeAgo(snippet.publishedAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- WATCH VIEW COMPONENT ---
const WatchView = ({ videoId, onBack }) => {
    const { data: videoData, isLoading: videoLoading } = useQuery({
        queryKey: ["video", videoId],
        queryFn: () => fetchVideoById(videoId),
    });

    const { data: commentsData, isLoading: commentsLoading } = useQuery({
        queryKey: ["comments", videoId],
        queryFn: () => fetchVideoComments(videoId),
    });

    if (videoLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[600px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    const video = videoData?.data?.video?.items;
    const channel = videoData?.data?.channel;
    const comments = commentsData?.data || [];

    if (!video) return <div className="text-white p-8">Video not found.</div>;

    const { snippet, statistics } = video;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">
            <button 
                onClick={onBack}
                className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium bg-gray-800/50 hover:bg-gray-800 px-4 py-2 rounded-full w-fit"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Browse
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Video + Details) */}
                <div className="lg:col-span-2">
                    {/* Video Player Placeholder / Iframe */}
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-red-900/10 border border-gray-800 relative">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                            title={snippet.title} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="absolute inset-0"
                        ></iframe>
                    </div>

                    <h1 className="text-2xl font-bold text-white mt-5 mb-2">{snippet.title}</h1>
                    
                    {/* Actions Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4 mb-6">
                        {/* Channel Info */}
                        <div className="flex items-center gap-3">
                            <img 
                                src={channel?.info?.thumbnails?.default?.url} 
                                alt={channel?.info?.title}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-white font-semibold text-sm">{channel?.info?.title}</h3>
                                <p className="text-gray-400 text-xs">{formatViews(channel?.statistics?.subscriberCount)} subscribers</p>
                            </div>
                            <button className="ml-4 bg-white text-black font-semibold text-sm px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
                                Subscribe
                            </button>
                        </div>
                        
                        {/* Likes & Actions */}
                        <div className="flex items-center gap-2 bg-gray-800 rounded-full p-1">
                            <button className="flex items-center gap-2 px-4 py-1.5 hover:bg-gray-700 rounded-full text-white text-sm font-medium transition-colors border-r border-gray-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                {formatViews(statistics?.likeCount)}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-1.5 hover:bg-gray-700 rounded-full text-white text-sm font-medium transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Share
                            </button>
                        </div>
                    </div>

                    {/* Description Box */}
                    <div className="bg-gray-800/60 hover:bg-gray-800 transition-colors rounded-xl p-4 cursor-pointer mb-8">
                        <div className="text-white text-sm font-medium mb-1">
                            {formatViews(statistics?.viewCount)} views • {new Date(snippet.publishedAt).toLocaleDateString()}
                        </div>
                        <p className="text-gray-300 text-sm whitespace-pre-wrap line-clamp-3">
                            {snippet.description}
                        </p>
                        <span className="text-gray-400 text-xs font-semibold mt-2 inline-block">Show more</span>
                    </div>
                </div>

                {/* Sidebar / Comments */}
                <div className="lg:col-span-1">
                    <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                        Comments <span className="text-gray-400 text-sm font-normal">{formatViews(statistics?.commentCount)}</span>
                    </h3>
                    
                    {commentsLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-3 animate-pulse">
                                    <div className="w-10 h-10 rounded-full bg-gray-800 flex-shrink-0"></div>
                                    <div className="flex-1 space-y-2 py-1">
                                        <div className="h-3 bg-gray-800 rounded w-1/3"></div>
                                        <div className="h-3 bg-gray-800 rounded w-full"></div>
                                        <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : comments.length > 0 ? (
                        <div className="space-y-6">
                            {comments.map((comment) => {
                                const { snippet: commentSnippet } = comment.snippet.topLevelComment;
                                return (
                                    <div key={comment.id} className="flex gap-4">
                                        <img 
                                            src={commentSnippet.authorProfileImageUrl} 
                                            alt={commentSnippet.authorDisplayName}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-white text-sm font-semibold truncate">{commentSnippet.authorDisplayName}</span>
                                                <span className="text-gray-400 text-xs">{timeAgo(commentSnippet.publishedAt)}</span>
                                            </div>
                                            <p className="text-gray-300 text-sm whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: commentSnippet.textDisplay }}></p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <button className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                    </svg>
                                                    {commentSnippet.likeCount > 0 ? commentSnippet.likeCount : ""}
                                                </button>
                                                <button className="flex items-center gap-1 text-gray-400 hover:text-white text-xs">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                    </svg>
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm">No comments available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

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
                <WatchView videoId={selectedVideoId} onBack={() => setSelectedVideoId(null)} />
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
                                <VideoCard key={video.items.id} video={video} onClick={setSelectedVideoId} />
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
