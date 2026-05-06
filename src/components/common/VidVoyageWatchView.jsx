import { useQuery } from "@tanstack/react-query";
import { fetchVideoById, fetchVideoComments } from "../../clients/freeApiYoutubeClient.js";
import { formatViews, timeAgo } from "../../utils/vidVoyageUtils.js";

const VidVoyageWatchView = ({ videoId, onBack }) => {
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

export default VidVoyageWatchView;
