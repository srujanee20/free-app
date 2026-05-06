import { useState } from "react";
import RandomQuoteBanner from "../common/RandomQuoteBanner.jsx";
import QuoteGrid from "../common/QuoteGrid.jsx";
import QuoteModal from "../common/QuoteModal.jsx";

const InkwellPage = () => {
    const [selectedQuote, setSelectedQuote] = useState(null);

    return (
        <div className="flex-grow w-full bg-gray-50">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">

                <div className="mb-10">
                    <h1 className="text-5xl font-bold text-gray-900 tracking-tight"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                        Ink<span className="text-indigo-600">Well</span>
                    </h1>
                    <p className="mt-2 text-gray-500 text-base">
                        Words that linger. Thoughts that echo.
                    </p>
                </div>

                <RandomQuoteBanner />

                <div className="mb-6 flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-gray-900 whitespace-nowrap">All Quotes</h2>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <QuoteGrid onCardClick={setSelectedQuote} />
            </div>

            {selectedQuote && (
                <QuoteModal quote={selectedQuote} onClose={() => setSelectedQuote(null)} />
            )}
        </div>
    );
};

export default InkwellPage;