export default function CategorySelection({ onSelectCategory }) {
    const categories = ['Safety', 'Reliability', 'Quality', 'Performance'];
    return (
        <div className="p-6 bg-white rounded-xl shadow-md mt-4">
            <h3 className="font-bold mb-4">Select CATCH Category</h3>
            <div className="flex gap-4">
                {categories.map(cat => (
                    <button key={cat} className="px-6 py-3 bg-blue-600 text-white rounded-full" onClick={() => onSelectCategory(cat)}>{cat}</button>
                ))}
            </div>
        </div>
    );
}