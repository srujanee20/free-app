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
        <section className="relative mb-12 shadow-2xl rounded-3xl">
            {/* Background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2c1e16] via-[#3e2723] to-[#4e342e] overflow-hidden border border-[#5d4037]">
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #d7ccc8 0%, transparent 50%), radial-gradient(circle at 80% 20%, #a1887f 0%, transparent 40%)" }}
                />
            </div>

            <div className="relative z-10 px-8 py-16 md:py-24 flex flex-col items-center text-center max-w-4xl mx-auto">
                <p className="text-[#a1887f] uppercase tracking-[0.3em] text-[10px] font-bold mb-10 font-serif">
                    ~ &nbsp; Passage of the Moment &nbsp; ~
                </p>

                <div className="min-h-[140px] flex flex-col items-center justify-center">
                    {isFetching ? (
                        <div className="flex gap-2 items-center justify-center h-10">
                            {[0, 1, 2].map(i => (
                                <span key={i}
                                    className="w-2 h-2 bg-[#d7ccc8]/50 rounded-full animate-bounce"
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            <p className="text-[#efebe9] text-3xl md:text-4xl font-serif italic leading-relaxed tracking-wide mb-8 drop-shadow-md"
                                style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>
                                "{quote?.content}"
                            </p>
                            <p className="text-[#d7ccc8] text-sm font-serif font-bold tracking-widest uppercase">
                                — {quote?.author}
                            </p>
                        </>
                    )}
                </div>

                <button
                    onClick={handleRegenerate}
                    disabled={isFetching}
                    className="mt-12 inline-flex items-center gap-2 px-6 py-2.5 rounded text-xs font-serif font-bold text-[#3e2723] bg-[#d7ccc8] hover:bg-[#efebe9] disabled:opacity-40 transition-all duration-300 shadow-[0_0_15px_rgba(215,204,200,0.2)] uppercase tracking-widest"
                >
                    <svg className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Turn the Page
                </button>
            </div>
        </section>
    );
};

export default InkWellRandomQuoteBanner;
