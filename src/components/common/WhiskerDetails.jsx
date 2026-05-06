// Helper component for rating bars
export const RatingBar = ({ label, value }) => (
    <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 font-medium">{label}</span>
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <div 
                    key={star} 
                    className={`w-4 h-4 rounded-full ${star <= value ? 'bg-pink-400' : 'bg-pink-100'}`}
                ></div>
            ))}
        </div>
    </div>
);

const WhiskerDetails = ({ cat }) => {
    if (!cat) return null;

    return (
        <div className="space-y-6 animate-fade-in delay-150">
            {/* Description */}
            <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                <p className="text-gray-700 text-sm leading-relaxed italic">
                    "{cat.description}"
                </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Life Span</p>
                    <p className="text-lg font-extrabold text-gray-800">{cat.life_span} yrs</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Weight</p>
                    <p className="text-lg font-extrabold text-gray-800">{cat.weight?.metric} kg</p>
                </div>
            </div>

            {/* Temperament */}
            <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">Temperament</p>
                <div className="flex flex-wrap gap-2">
                    {cat.temperament?.split(', ').map(temp => (
                        <span key={temp} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                            {temp}
                        </span>
                    ))}
                </div>
            </div>

            {/* Breed Traits Bars */}
            <div className="pt-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-3">Breed Traits</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                    <RatingBar label="Affection Level" value={cat.affection_level} />
                    <RatingBar label="Energy Level" value={cat.energy_level} />
                    <RatingBar label="Child Friendly" value={cat.child_friendly} />
                    <RatingBar label="Dog Friendly" value={cat.dog_friendly} />
                    <RatingBar label="Intelligence" value={cat.intelligence} />
                    <RatingBar label="Grooming Need" value={cat.grooming} />
                </div>
            </div>

            {cat.wikipedia_url && (
                <div className="text-center pt-2">
                    <a 
                        href={cat.wikipedia_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-pink-500 hover:text-pink-600 underline underline-offset-2"
                    >
                        Read more on Wikipedia
                    </a>
                </div>
            )}
        </div>
    );
};

export default WhiskerDetails;
