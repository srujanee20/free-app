const QuoteModal = ({ quote, onClose }) => {
    if (!quote) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
        >
            <div
                className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl p-8 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors text-sm font-bold"
                >
                    ✕
                </button>

                <span className="block text-6xl leading-none text-indigo-100 font-serif mb-0 -mt-2 select-none">
                    "
                </span>

                <p className="text-gray-900 text-xl font-light leading-relaxed -mt-3 mb-8"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                    {quote.content}
                </p>

                <div className="flex flex-col gap-4">
                    <p className="text-indigo-600 font-semibold text-base">— {quote.author}</p>

                    {quote.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {quote.tags.map((tag) => (
                                <span key={tag}
                                    className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-6 text-xs text-gray-400 pt-2 border-t border-gray-100">
                        <span>{quote.length} characters</span>
                        <span>Added {quote.dateAdded}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteModal;
