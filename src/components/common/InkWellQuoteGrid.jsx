import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchQuotes } from "../../clients/freeApiQuoteClient.js";
import InkWellQuoteCard from "./InkWellQuoteCard.jsx";

const LIMIT = 30;

const SkeletonCard = () => (
    <div className="break-inside-avoid mb-5 bg-[#fcfaf5] rounded-none p-6 border border-[#e6dcc3] animate-pulse flex flex-col gap-3 min-h-[160px] shadow-[2px_2px_10px_rgba(139,69,19,0.05)]">
        <div className="h-3 bg-[#e6dcc3] w-full" />
        <div className="h-3 bg-[#e6dcc3] w-5/6" />
        <div className="h-3 bg-[#e6dcc3] w-4/6" />
        <div className="h-3 bg-[#e6dcc3] w-3/6" />
        <div className="mt-auto pt-4 border-t border-[#e6dcc3] h-3 bg-[#e6dcc3] w-1/3" />
    </div>
);

const InkWellQuoteGrid = ({ onCardClick }) => {
    const [page, setPage] = useState(1);
    const [accumulated, setAccumulated] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const { data, isFetching, isSuccess } = useQuery({
        queryKey: ["quotes", page],
        queryFn: () => fetchQuotes({ page, limit: LIMIT }),
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (isSuccess && data?.data) {
            const incoming = data.data.data ?? [];
            setTotalPages(data.data.totalPages ?? 1);
            setAccumulated((prev) => {
                const existingIds = new Set(prev.map((q) => q.id));
                const unique = incoming.filter((q) => !existingIds.has(q.id));
                return [...prev, ...unique];
            });
        }
    }, [isSuccess, data]);

    const hasMore = page < totalPages;

    return (
        <>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
                {accumulated.map((quote) => (
                    <div key={quote.id} className="break-inside-avoid mb-5">
                        <InkWellQuoteCard quote={quote} onClick={onCardClick} />
                    </div>
                ))}
                {isFetching && accumulated.length === 0 &&
                    Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
                }
            </div>

            <div className="flex flex-col items-center mt-14 gap-3">
                {hasMore ? (
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={isFetching}
                        className="inline-flex items-center gap-2.5 bg-[#fcfaf5] hover:bg-[#efebe9] disabled:opacity-50 text-[#5d4037] font-serif font-bold px-8 py-3 transition-all duration-200 text-sm border border-[#e6dcc3] uppercase tracking-widest shadow-[0_4px_6px_rgba(139,69,19,0.05)]"
                    >
                        {isFetching ? (
                            <>
                                <span className="w-4 h-4 border-2 border-[#5d4037]/30 border-t-[#5d4037] rounded-full animate-spin" />
                                Retrieving...
                            </>
                        ) : (
                            "Unfurl More Pages"
                        )}
                    </button>
                ) : accumulated.length > 0 && (
                    <p className="text-[#8b4513]/60 text-sm font-serif italic">
                        All {accumulated.length} passages have been unsealed.
                    </p>
                )}
            </div>
        </>
    );
};

export default InkWellQuoteGrid;