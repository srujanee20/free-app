import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchQuotes } from "../../clients/freeApiQuoteClient.js";
import QuoteCard from "./QuoteCard.jsx";

const LIMIT = 30;

const SkeletonCard = () => (
    <div className="break-inside-avoid mb-5 bg-white rounded-2xl p-6 border border-gray-100 animate-pulse flex flex-col gap-3 min-h-[160px]">
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-5/6" />
        <div className="h-3 bg-gray-100 rounded-full w-4/6" />
        <div className="h-3 bg-gray-100 rounded-full w-3/6" />
        <div className="mt-auto pt-4 border-t border-gray-50 h-3 bg-gray-100 rounded-full w-1/3" />
    </div>
);

const QuoteGrid = ({ onCardClick }) => {
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
                        <QuoteCard quote={quote} onClick={onCardClick} />
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
                        className="inline-flex items-center gap-2.5 bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white font-medium px-8 py-3 rounded-full transition-all duration-200 text-sm"
                    >
                        {isFetching ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Loading…
                            </>
                        ) : (
                            "Load more quotes"
                        )}
                    </button>
                ) : accumulated.length > 0 && (
                    <p className="text-gray-400 text-sm">
                        All {accumulated.length} quotes loaded.
                    </p>
                )}
            </div>
        </>
    );
};

export default QuoteGrid;