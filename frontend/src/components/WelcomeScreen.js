export default function WelcomeScreen({ setChatState }) {
    return (
        <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to Safety CATCH Submission</h2>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full" onClick={() => setChatState('getting_details')}>Start</button>
        </div>
    );
}