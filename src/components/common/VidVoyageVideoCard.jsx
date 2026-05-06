import { formatViews, timeAgo } from "../../utils/vidVoyageUtils.js";

const VidVoyageVideoCard = ({ video, onClick }) => {
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
                    ▶ Play
                </div>
            </div>
            <div className="flex gap-3 px-1">
                <div className="w-9 h-9 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-gray-400 font-bold overflow-hidden">
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

export default VidVoyageVideoCard;
