// Helper to extract ingredients and measurements
const getIngredientsList = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({ ingredient, measure });
        }
    }
    return ingredients;
};

const CraveCatalogMealModal = ({ meal, onClose }) => {
    if (!meal) return null;

    const ingredients = getIngredientsList(meal);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)" }}
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-fade-in relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row h-full overflow-y-auto hide-scrollbar">
                    {/* Left: Image & Quick Info */}
                    <div className="w-full md:w-2/5 shrink-0 bg-gray-50 relative">
                        <img 
                            src={meal.strMealThumb} 
                            alt={meal.strMeal} 
                            className="w-full h-64 md:h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>
                        <div className="absolute bottom-4 left-4 md:hidden">
                            <h2 className="text-3xl font-serif text-white font-bold">{meal.strMeal}</h2>
                            <p className="text-orange-300 font-medium">{meal.strArea} • {meal.strCategory}</p>
                        </div>
                    </div>

                    {/* Right: Recipe Details */}
                    <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col bg-white">
                        <div className="hidden md:block mb-8 border-b border-orange-100 pb-6">
                            <h2 className="text-4xl font-serif text-gray-900 font-bold mb-2">{meal.strMeal}</h2>
                            <div className="flex items-center gap-3">
                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                                    {meal.strCategory}
                                </span>
                                <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm font-semibold">
                                    {meal.strArea}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                            {/* Ingredients */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
                                    Ingredients
                                </h3>
                                <ul className="space-y-3">
                                    {ingredients.map((item, idx) => (
                                        <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                            <span className="font-medium text-gray-800">{item.ingredient}</span>
                                            <span className="text-gray-500 text-right ml-4">{item.measure}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Instructions */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
                                    Instructions
                                </h3>
                                <div className="text-gray-600 text-sm leading-relaxed space-y-4 whitespace-pre-wrap max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {meal.strInstructions}
                                </div>
                            </div>
                        </div>

                        {meal.strYoutube && (
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <a 
                                    href={meal.strYoutube} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                    </svg>
                                    Watch Video Tutorial
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CraveCatalogMealModal;
