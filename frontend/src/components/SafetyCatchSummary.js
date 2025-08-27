export default function SafetyCatchSummary({ answers, onConfirm, onEdit }) {
    return (
        <div className="p-6 bg-white border rounded-2xl shadow-lg mt-4">
            <h3 className="font-bold text-lg mb-4">Safety CATCH Submission Summary</h3>
            <ul className="mb-4">
                <li><strong>Email:</strong> {answers.email}</li>
                <li><strong>Department:</strong> {answers.department}</li>
                <li><strong>Facility Location:</strong> {answers.location}</li>
                <li><strong>Specific Area:</strong> {answers.specificArea}</li>
                <li><strong>SWA:</strong> {answers.isSWA}</li>
                <li><strong>Description:</strong> {answers.description || (answers.file ? `Image: ${answers.file.name}` : '')}</li>
                <li><strong>Primary Hazard:</strong> {answers.primaryHazard}</li>
                <li><strong>Life Saving Rules:</strong> {answers.lifeSavingRules?.join(', ')}</li>
                <li><strong>Tags:</strong> {answers.tags?.join(', ')}</li>
            </ul>
            <button onClick={onConfirm} className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 font-semibold mr-2">Confirm & Submit</button>
            <button onClick={onEdit} className="px-6 py-3 bg-gray-300 text-black rounded-full hover:bg-gray-400 font-semibold">Edit</button>
        </div>
    );
}