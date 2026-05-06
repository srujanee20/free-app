import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchRandomProduct } from "../../clients/freeApiProductClient.js";

import BazaarBoardProductCard from "../common/BazaarBoardProductCard.jsx";
import BazaarBoardProductModal from "../common/BazaarBoardProductModal.jsx";

const BazaarBoard = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [refreshRandom, setRefreshRandom] = useState(0);

    const { data: randomProductData, isFetching: isRandomFetching } = useQuery({
        queryKey: ["randomProduct", refreshRandom],
        queryFn: fetchRandomProduct,
        staleTime: 0,
    });

    const { data: productsData, isFetching: isProductsFetching } = useQuery({
        queryKey: ["products", page, query],
        queryFn: () => fetchProducts({ page, limit: 12, query }),
        keepPreviousData: true,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(searchInput);
        setPage(1);
    };

    const randomProduct = randomProductData?.data;

    return (
        <div className="flex-grow w-full bg-[#f8fafc] min-h-screen font-sans">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            Bazaar<span className="text-indigo-600">Board</span>
                        </h1>
                        <p className="text-gray-500 mt-1">Explore, discover, and shop the random.</p>
                    </div>

                    <form onSubmit={handleSearch} className="flex-1 max-w-md w-full relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search products, categories..."
                            className="w-full bg-white border border-gray-200 text-gray-900 rounded-full pl-11 pr-32 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                        />
                        <button 
                            type="submit"
                            className="absolute inset-y-1.5 right-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-full text-sm font-semibold transition-colors shadow-sm"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Featured Product Banner */}
                {!query && page === 1 && (
                    <div className="mb-12 relative bg-indigo-900 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        
                        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
                            <span className="inline-flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-widest text-xs mb-4">
                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                                Featured Discovery
                            </span>
                            
                            {isRandomFetching ? (
                                <div className="space-y-4 animate-pulse">
                                    <div className="h-10 bg-white/10 rounded w-3/4"></div>
                                    <div className="h-6 bg-white/10 rounded w-1/4"></div>
                                    <div className="h-4 bg-white/10 rounded w-full mt-4"></div>
                                    <div className="h-4 bg-white/10 rounded w-5/6"></div>
                                </div>
                            ) : (
                                randomProduct && (
                                    <>
                                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                                            {randomProduct.title}
                                        </h2>
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-2xl font-bold text-white">${randomProduct.price}</span>
                                            {randomProduct.discountPercentage > 0 && (
                                                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                                                    -{randomProduct.discountPercentage.toFixed(0)}% OFF
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-indigo-200 line-clamp-3 mb-8 max-w-lg">
                                            {randomProduct.description}
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            <button 
                                                onClick={() => setSelectedProductId(randomProduct.id)}
                                                className="bg-white hover:bg-gray-50 text-indigo-900 font-bold py-3.5 px-8 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
                                            >
                                                View Details
                                            </button>
                                            <button 
                                                onClick={() => setRefreshRandom(r => r + 1)}
                                                className="bg-indigo-800/50 hover:bg-indigo-800 text-white font-semibold py-3.5 px-6 rounded-full border border-indigo-700 transition-all backdrop-blur-sm"
                                            >
                                                Shuffle
                                            </button>
                                        </div>
                                    </>
                                )
                            )}
                        </div>
                        
                        <div className="w-full md:w-1/2 min-h-[300px] relative bg-white flex items-center justify-center p-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-transparent w-8 z-10 hidden md:block"></div>
                            {isRandomFetching ? (
                                <div className="w-full h-full bg-gray-100 animate-pulse rounded-2xl"></div>
                            ) : (
                                <img 
                                    src={randomProduct?.thumbnail} 
                                    alt={randomProduct?.title}
                                    className="max-w-full max-h-[400px] object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-110"
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {query ? `Search Results for "${query}"` : "Explore Products"}
                    </h2>
                    {productsData?.data?.totalItems > 0 && (
                        <span className="text-sm font-medium text-gray-500">{productsData.data.totalItems} items found</span>
                    )}
                </div>

                {isProductsFetching && !productsData ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-2xl border border-gray-100 overflow-hidden">
                                <div className="aspect-square bg-gray-200"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : productsData?.data?.data?.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                            {productsData.data.data.map((product) => (
                                <BazaarBoardProductCard 
                                    key={product.id} 
                                    product={product} 
                                    onClick={(p) => setSelectedProductId(p.id)} 
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {productsData.data.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-gray-200">
                                <button 
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1 || isProductsFetching}
                                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors shadow-sm"
                                >
                                    Previous
                                </button>
                                <span className="text-gray-500 text-sm font-medium">
                                    Page <span className="text-gray-900 font-bold mx-1">{productsData.data.page}</span> of {productsData.data.totalPages}
                                </span>
                                <button 
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={!productsData.data.nextPage || isProductsFetching}
                                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors shadow-sm"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500">We couldn't find anything matching "{query}". Try adjusting your search.</p>
                        <button 
                            onClick={() => { setQuery(""); setSearchInput(""); setPage(1); }}
                            className="mt-6 text-indigo-600 font-semibold hover:text-indigo-800"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            <BazaarBoardProductModal 
                productId={selectedProductId} 
                onClose={() => setSelectedProductId(null)} 
            />
        </div>
    );
};

export default BazaarBoard;
