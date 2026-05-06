const InkWellQuoteCard = ({ quote, onClick }) => (
    <div
        onClick={() => onClick(quote)}
        className="group relative bg-[#fcfaf5] p-6 cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[4px_4px_15px_rgba(139,69,19,0.1)] border border-[#e6dcc3] flex flex-col"
    >
        {/* Large decorative quote mark */}
        <span className="absolute top-4 right-5 text-5xl text-[#e6dcc3] font-serif leading-none select-none group-hover:text-[#d7ccc8] transition-colors italic">
            "
        </span>

        <p className="text-[#4e342e] text-lg leading-relaxed line-clamp-5 flex-1 relative z-10 group-hover:text-[#2c1e16] transition-colors italic"
            style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>
            {quote.content}
        </p>

        <div className="mt-6 pt-4 border-t border-[#e6dcc3]/50 flex items-center justify-between">
            <span className="text-[#8b4513] text-sm font-bold font-serif uppercase tracking-widest">— {quote.author}</span>
            {quote.tags?.length > 0 && (
                <span className="bg-[#efebe9] text-[#5d4037] text-[10px] px-2 py-1 uppercase tracking-widest font-serif border border-[#d7ccc8]">
                    {quote.tags[0]}
                </span>
            )}
        </div>
    </div>
);

export default InkWellQuoteCard;