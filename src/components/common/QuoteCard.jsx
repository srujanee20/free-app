const QuoteCard = ({ quote, onClick }) => (
    <div
        onClick={() => onClick(quote)}
        className="group relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100 border border-gray-100 hover:border-indigo-200 flex flex-col"
    >
        {/* Large decorative quote mark */}
        <span className="absolute top-4 right-5 text-5xl text-gray-100 font-serif leading-none select-none group-hover:text-indigo-100 transition-colors">
            "
        </span>

        <p className="text-gray-700 text-sm leading-relaxed line-clamp-5 flex-1 relative z-10 group-hover:text-gray-900 transition-colors"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {quote.content}
        </p>

        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-indigo-500 text-xs font-semibold">— {quote.author}</span>
            {quote.tags?.length > 0 && (
                <span className="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                    {quote.tags[0]}
                </span>
            )}
        </div>
    </div>
);

export default QuoteCard;