const BazaarBoardProductCard = ({ product, onClick }) => {
    return (
        <div 
            onClick={() => onClick(product)}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 cursor-pointer"
        >
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img 
                    src={product.thumbnail || "https://via.placeholder.com/300"} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-2.5 py-1 rounded-md text-[10px] font-bold shadow-sm uppercase tracking-wider">
                        {product.category}
                    </span>
                    {product.discountPercentage > 0 && (
                        <span className="bg-red-500 text-white px-2.5 py-1 rounded-md text-[10px] font-bold shadow-sm self-start">
                            -{Math.round(product.discountPercentage)}%
                        </span>
                    )}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                </h3>
                
                <div className="mt-1 flex items-center gap-1.5 mb-3 text-sm text-gray-500">
                    <div className="flex items-center text-yellow-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                    <span>{product.rating ? product.rating.toFixed(1) : "New"}</span>
                </div>

                <div className="mt-auto flex items-end justify-between">
                    <div>
                        <p className="text-xl font-bold text-gray-900">${product.price}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BazaarBoardProductCard;
