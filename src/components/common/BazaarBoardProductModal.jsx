import { useState, useEffect } from "react";
import { fetchProductById } from "../../clients/freeApiProductClient.js";

const BazaarBoardProductModal = ({ productId, onClose }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        if (!productId) return;
        
        const loadProduct = async () => {
            setLoading(true);
            try {
                const res = await fetchProductById(productId);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId]);

    if (!productId) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-gray-800 transition-colors"
                >
                    ✕
                </button>

                {loading || !product ? (
                    <div className="w-full p-12 flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-medium">Loading product details...</p>
                    </div>
                ) : (
                    <>
                        {/* Image Gallery */}
                        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col border-r border-gray-100">
                            <div className="w-full flex-grow relative bg-white flex items-center justify-center p-6 min-h-[300px]">
                                <img 
                                    src={product.images?.[activeImage] || product.thumbnail} 
                                    alt={product.title} 
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            {product.images?.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto p-4 bg-gray-50 hide-scrollbar border-t border-gray-100">
                                    {product.images.map((img, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-indigo-600' : 'border-transparent hover:border-gray-300'}`}
                                        >
                                            <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
                            <div className="flex gap-2 mb-3">
                                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {product.category}
                                </span>
                                {product.brand && (
                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {product.brand}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.title}</h2>
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center text-yellow-400">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="ml-1.5 text-sm font-medium text-gray-700">{product.rating?.toFixed(1)}</span>
                                </div>
                                <div className="h-4 w-px bg-gray-300"></div>
                                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                </span>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-extrabold text-gray-900">${product.price}</span>
                                    {product.discountPercentage > 0 && (
                                        <span className="text-lg text-gray-400 line-through">
                                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                {product.discountPercentage > 0 && (
                                    <p className="text-red-500 text-sm font-medium mt-1">You save {product.discountPercentage.toFixed(1)}%</p>
                                )}
                            </div>

                            <div className="prose prose-sm text-gray-600 mb-8">
                                <p>{product.description}</p>
                            </div>

                            <button 
                                disabled={product.stock <= 0}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BazaarBoardProductModal;
