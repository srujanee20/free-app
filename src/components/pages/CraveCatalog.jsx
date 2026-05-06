import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMeals, fetchRandomMeal } from "../../clients/freeApiMealClient.js";

import CraveCatalogMealModal from "../common/CraveCatalogMealModal.jsx";

const CraveCatalog = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("null"); // "null" fetches all, or category name
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [refreshRandomKey, setRefreshRandomKey] = useState(0);

    const categories = ["All", "Vegetarian", "Dessert", "Beef", "Chicken", "Seafood", "Pasta"];

    const { data: randomMealData, isFetching: isRandomFetching } = useQuery({
        queryKey: ["randomMeal", refreshRandomKey],
        queryFn: fetchRandomMeal,
        staleTime: 0,
    });

    const { data: mealsData, isFetching: isMealsFetching } = useQuery({
        queryKey: ["meals", page, query],
        queryFn: () => fetchMeals({ 
            page, 
            limit: 12, 
            query: (query === "All" || query === "null") ? "" : query.toLowerCase() 
        }),
        keepPreviousData: true,
    });

    const randomMeal = randomMealData?.data;

    return (
        <div className="flex-grow w-full bg-[#fdfbf7] min-h-screen font-sans selection:bg-orange-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Header */}
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <h1 className="text-5xl font-serif font-bold text-gray-900 tracking-tight mb-4">
                        Crave<span className="text-orange-500 italic">Catalog</span>
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Discover flavors, recipes, and culinary inspiration from around the globe.
                    </p>
                </div>

                {/* Meal of the Day Banner */}
                <section className="relative mb-16 rounded-[2rem] overflow-hidden bg-orange-950 text-white shadow-2xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row">
                        {/* Image side */}
                        <div className="w-full md:w-1/2 lg:w-5/12 h-64 md:h-auto relative">
                            {isRandomFetching ? (
                                <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
                            ) : (
                                <img 
                                    src={randomMeal?.strMealThumb} 
                                    alt="Meal of the day" 
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-orange-950 via-orange-950/80 to-transparent"></div>
                        </div>
                        
                        {/* Content side */}
                        <div className="w-full md:w-1/2 lg:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center -mt-16 md:mt-0 relative z-10">
                            <span className="inline-flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-xs mb-4">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Editor's Pick
                            </span>
                            
                            {isRandomFetching ? (
                                <div className="space-y-4 animate-pulse">
                                    <div className="h-10 bg-white/20 rounded w-3/4"></div>
                                    <div className="h-4 bg-white/20 rounded w-1/4"></div>
                                    <div className="h-4 bg-white/20 rounded w-5/6"></div>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
                                        {randomMeal?.strMeal}
                                    </h2>
                                    <p className="text-orange-200 text-sm font-medium mb-6">
                                        {randomMeal?.strArea} • {randomMeal?.strCategory}
                                    </p>
                                    <p className="text-gray-300 line-clamp-3 mb-8 leading-relaxed">
                                        {randomMeal?.strInstructions}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <button 
                                            onClick={() => setSelectedMeal(randomMeal)}
                                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            View Recipe
                                        </button>
                                        <button 
                                            onClick={() => setRefreshRandomKey(k => k + 1)}
                                            disabled={isRandomFetching}
                                            className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-full backdrop-blur-sm transition-all"
                                        >
                                            Try Another
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <div className="mb-10 flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setQuery(cat); setPage(1); }}
                            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                                query === cat || (query === "null" && cat === "All")
                                    ? "bg-gray-900 text-white shadow-md shadow-gray-900/20"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {isMealsFetching && !mealsData ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm">
                                <div className="aspect-square bg-gray-200"></div>
                                <div className="p-6 space-y-3">
                                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : mealsData?.data?.data?.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {mealsData.data.data.map((meal) => (
                                <div 
                                    key={meal.idMeal}
                                    onClick={() => setSelectedMeal(meal)}
                                    className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-orange-900/5 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                                >
                                    <div className="aspect-square overflow-hidden relative">
                                        <img 
                                            src={meal.strMealThumb} 
                                            alt={meal.strMeal}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                                {meal.strCategory}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-1">
                                            {meal.strMeal}
                                        </h3>
                                        <p className="text-gray-500 text-sm font-medium mb-4">{meal.strArea}</p>
                                        
                                        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-sm font-semibold text-orange-500 group-hover:text-orange-600">
                                            View Recipe
                                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {mealsData.data.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-6 mt-16 pt-8 border-t border-gray-200/60">
                                <button 
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1 || isMealsFetching}
                                    className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <span className="text-gray-500 font-medium">
                                    Page <span className="text-gray-900 font-bold mx-1">{mealsData.data.page}</span> of {mealsData.data.totalPages}
                                </span>
                                <button 
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={!mealsData.data.nextPage || isMealsFetching}
                                    className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No meals found for this category.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <CraveCatalogMealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
        </div>
    );
};

export default CraveCatalog;
