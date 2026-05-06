const InkWellQuoteModal = ({ quote, onClose }) => {
    if (!quote) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            style={{ backgroundColor: "rgba(62,39,35,0.7)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
        >
            <div
                className="bg-[#fcfaf5] w-full sm:max-w-2xl rounded-none p-8 sm:p-12 relative shadow-[0_0_50px_rgba(44,30,22,0.4)] border border-[#e6dcc3]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-none border border-transparent hover:border-[#d7ccc8] text-[#a1887f] hover:text-[#5d4037] transition-all text-sm font-serif bg-transparent"
                >
                    ✕
                </button>

                <span className="block text-7xl leading-none text-[#e6dcc3] font-serif mb-0 -mt-4 select-none italic">
                    "
                </span>

                <p className="text-[#3e2723] text-2xl md:text-3xl leading-relaxed -mt-4 mb-10 italic"
                    style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>
                    {quote.content}
                </p>

                <div className="flex flex-col gap-6">
                    <p className="text-[#8b4513] font-bold text-lg font-serif uppercase tracking-widest">— {quote.author}</p>

                    {quote.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                            {quote.tags.map((tag) => (
                                <span key={tag}
                                    className="bg-[#efebe9] text-[#5d4037] text-xs font-serif font-bold uppercase tracking-widest px-3 py-1 border border-[#d7ccc8]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-6 text-xs text-[#a1887f] pt-4 border-t border-[#e6dcc3] font-serif uppercase tracking-widest mt-2">
                        <span>{quote.length} characters</span>
                        <span>Archived {quote.dateAdded}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InkWellQuoteModal;
