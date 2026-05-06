import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRandomQuote } from "../../clients/freeApiQuoteClient.js";

const InkWellRandomQuoteBanner = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const { data, isFetching } = useQuery({
        queryKey: ["randomQuote", refreshKey],
        queryFn: fetchRandomQuote,
        staleTime: 0,
    });

    const quote = data?.data;

    const handleRegenerate = useCallback(() => {
        setRefreshKey((k) => k + 1);
    }, []);

    return (
        <section className="relative mb-12">
            {/* Background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-950 via-indigo-900 to-blue-900 overflow-hidden">
                <div className="absolute inset-0 opacity-30"
                    style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #818cf8 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c084fc 0%, transparent 40%)" }}
                />
                <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20"
                    style={{ background: "radial-gradient(circle, #f472b6, transparent)" }}
                />
            </div>

            <div className="relative z-10 px-8 py-14 md:py-20 flex flex-col items-center text-center max-w-3xl mx-auto">
                <p className="text-indigo-300 uppercase tracking-[0.2em] text-xs font-semibold mb-8">
                    ✦ &nbsp; Quote of the Moment &nbsp; ✦
                </p>

                <div className="min-h-[120px] flex flex-col items-center justify-center">
                    {isFetching ? (
                        <div className="flex gap-1.5 items-center justify-center h-10">
                            {[0, 1, 2].map(i => (
                                <span key={i}
                                    className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            <p className="text-white text-2xl md:text-3xl font-light leading-relaxed tracking-wide mb-6"
                                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                                &#8220;{quote?.content}&#8221;
                            </p>
                            <p className="text-indigo-300 text-sm font-semibold tracking-widest uppercase">
                                — {quote?.author}
                            </p>
                        </>
                    )}
                </div>

                <button
                    onClick={handleRegenerate}
                    disabled={isFetching}
                    className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white border border-white/20 bg-white/10 hover:bg-white/20 disabled:opacity-40 transition-all duration-200 backdrop-blur-sm"
                >
                    <svg className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    New quote
                </button>
            </div>
        </section>
    );
};

export default InkWellRandomQuoteBanner;
