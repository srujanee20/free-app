import { useState } from "react";
import InkWellRandomQuoteBanner from "../common/InkWellRandomQuoteBanner.jsx";
import InkWellQuoteGrid from "../common/InkWellQuoteGrid.jsx";
import InkWellQuoteModal from "../common/InkWellQuoteModal.jsx";

const InkwellPage = () => {
    const [selectedQuote, setSelectedQuote] = useState(null);

    return (
        <div className="flex-grow w-full bg-[#fdfbf7] min-h-screen relative shadow-[inset_0_0_100px_rgba(139,69,19,0.05)] selection:bg-[#e6dcc3]">
            {/* Parchment texture overlay */}
            <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">

                <div className="mb-14 text-center">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="h-px w-16 bg-[#8b4513]/30"></div>
                        <h1 className="text-5xl md:text-6xl font-serif text-[#3e2723] tracking-tight italic"
                            style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>
                            Ink<span className="text-[#8b4513]">Well</span>
                        </h1>
                        <div className="h-px w-16 bg-[#8b4513]/30"></div>
                    </div>
                    <p className="mt-4 text-[#5d4037] text-lg font-serif italic max-w-lg mx-auto leading-relaxed">
                        "Words that linger upon the parchment of time. Thoughts that echo through eternity."
                    </p>
                </div>

                <InkWellRandomQuoteBanner />

                <div className="mb-10 mt-16 flex items-center gap-6 max-w-3xl mx-auto">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#8b4513]/20 to-[#8b4513]/20" />
                    <h2 className="text-xl font-serif font-semibold text-[#4e342e] tracking-widest uppercase"
                        style={{ letterSpacing: '0.2em' }}>
                        The Archives
                    </h2>
                    <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#8b4513]/20 to-[#8b4513]/20" />
                </div>

                <InkWellQuoteGrid onCardClick={setSelectedQuote} />
            </div>

            {selectedQuote && (
                <InkWellQuoteModal quote={selectedQuote} onClose={() => setSelectedQuote(null)} />
            )}
        </div>
    );
};

export default InkwellPage;