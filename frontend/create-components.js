const fs = require('fs');
const path = require('path');

const components = {
    'AirLiquideLogo.js': `
export default function AirLiquideLogo() {
    return <span style={{fontWeight: 'bold', color: '#0072c6', marginRight: 12}}>Air Liquide</span>;
}
`,
    'GeminiSparkIcon.js': `
export default function GeminiSparkIcon() {
    return <span role="img" aria-label="Gemini">✨</span>;
}
`,
    'PaperclipIcon.js': `
export default function PaperclipIcon() {
    return <span role="img" aria-label="Attach">📎</span>;
}
`,
    'MicIcon.js': `
export default function MicIcon() {
    return <span role="img" aria-label="Mic">🎤</span>;
}
`,
    'SendIcon.js': `
export default function SendIcon() {
    return <span role="img" aria-label="Send">📤</span>;
}
`,
    'Spinner.js': `
export default function Spinner() {
    return <span>⏳</span>;
}
`,
    'WelcomeScreen.js': `
export default function WelcomeScreen({ setChatState }) {
    return (
        <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to Safety CATCH Submission</h2>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full" onClick={() => setChatState('getting_details')}>Start</button>
        </div>
    );
}
`,
    'UserDetailsForm.js': `
import React, { useState } from 'react';
export default function UserDetailsForm({ onDetailsSubmit }) {
    const [details, setDetails] = useState({ email: '', department: '', location: '', specificArea: '' });
    return (
        <form className="p-6 bg-white rounded-xl shadow-md" onSubmit={e => { e.preventDefault(); onDetailsSubmit(details); }}>
            <h3 className="font-bold mb-4">Enter Your Details</h3>
            <input className="mb-2 p-2 border rounded w-full" placeholder="Email" value={details.email} onChange={e => setDetails(d => ({ ...d, email: e.target.value }))} required />
            <input className="mb-2 p-2 border rounded w-full" placeholder="Department" value={details.department} onChange={e => setDetails(d => ({ ...d, department: e.target.value }))} required />
            <input className="mb-2 p-2 border rounded w-full" placeholder="Facility Location" value={details.location} onChange={e => setDetails(d => ({ ...d, location: e.target.value }))} required />
            <input className="mb-2 p-2 border rounded w-full" placeholder="Specific Area" value={details.specificArea} onChange={e => setDetails(d => ({ ...d, specificArea: e.target.value }))} required />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full mt-2" type="submit">Continue</button>
        </form>
    );
}
`,
    'CategorySelection.js': `
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
`,
    'ChatMessage.js': `
export default function ChatMessage({ message }) {
    return (
        <div className={\`mb-3 \${message.role === 'user' ? 'text-right' : 'text-left'}\`}>
            <div className={\`inline-block px-4 py-2 rounded-xl \${message.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-800'}\`}>
                {message.content}
            </div>
        </div>
    );
}
`,
    'SafetyQuestionsForm.js': `
import React, { useState } from 'react';
export default function SafetyQuestionsForm({ questions, onSubmit }) {
    const [answers, setAnswers] = useState({});
    const handleChange = (key, value) => setAnswers(a => ({ ...a, [key]: value }));
    const handleMultiChange = (key, value) => {
        setAnswers(a => ({
            ...a,
            [key]: a[key]?.includes(value)
                ? a[key].filter(v => v !== value)
                : [...(a[key] || []), value]
        }));
    };
    return (
        <form className="p-6 bg-white rounded-xl shadow-md" onSubmit={e => { e.preventDefault(); onSubmit(answers); }}>
            <h3 className="font-bold mb-4">Safety Questions</h3>
            {questions.map(q => (
                <div key={q.key} className="mb-4">
                    <label className="block font-semibold mb-2">{q.label}</label>
                    {q.type === 'radio' && q.options.map(opt => (
                        <label key={opt} className="mr-4">
                            <input type="radio" name={q.key} value={opt} checked={answers[q.key] === opt} onChange={e => handleChange(q.key, opt)} required={q.required} /> {opt}
                        </label>
                    ))}
                    {q.type === 'select' && (
                        <select className="p-2 border rounded w-full" value={answers[q.key] || ''} onChange={e => handleChange(q.key, e.target.value)} required={q.required}>
                            <option value="">Select...</option>
                            {q.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    )}
                    {q.type === 'multiselect' && (
                        <div className="flex flex-wrap gap-2">
                            {q.options.map(opt => (
                                <label key={opt} className="flex items-center">
                                    <input type="checkbox" checked={answers[q.key]?.includes(opt) || false} onChange={() => handleMultiChange(q.key, opt)} />
                                    <span className="ml-2">{opt}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full mt-2" type="submit">Continue</button>
        </form>
    );
}
`,
    'SafetyDescriptionForm.js': `
import React, { useState } from 'react';
export default function SafetyDescriptionForm({ onSubmit, initialDescription = '', initialFile = null }) {
    const [description, setDescription] = useState(initialDescription);
    const [file, setFile] = useState(initialFile);
    return (
        <form className="p-6 bg-white rounded-xl shadow-md" onSubmit={e => { e.preventDefault(); onSubmit({ description, file }); }}>
            <h3 className="font-bold mb-4">Describe the CATCH or attach a photo</h3>
            <textarea className="mb-2 p-2 border rounded w-full" rows={3} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full mt-2" type="submit">Continue</button>
        </form>
    );
}
`,
    'SafetyCatchSummary.js': `
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
                <li><strong>Description:</strong> {answers.description || (answers.file ? \`Image: \${answers.file.name}\` : '')}</li>
                <li><strong>Primary Hazard:</strong> {answers.primaryHazard}</li>
                <li><strong>Life Saving Rules:</strong> {answers.lifeSavingRules?.join(', ')}</li>
                <li><strong>Tags:</strong> {answers.tags?.join(', ')}</li>
            </ul>
            <button onClick={onConfirm} className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 font-semibold mr-2">Confirm & Submit</button>
            <button onClick={onEdit} className="px-6 py-3 bg-gray-300 text-black rounded-full hover:bg-gray-400 font-semibold">Edit</button>
        </div>
    );
}
`,
    'CatchCategoriesSidebar.js': `
export default function CatchCategoriesSidebar() {
    return (
        <aside className="hidden md:block w-64 bg-white/80 border-l border-gray-200 p-6">
            <h4 className="font-bold mb-4">CATCH Categories</h4>
            <ul>
                <li>Safety</li>
                <li>Reliability</li>
                <li>Quality</li>
                <li>Performance</li>
            </ul>
        </aside>
    );
}
`
};

const componentsDir = path.join(__dirname, 'src', 'components');
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

for (const [filename, code] of Object.entries(components)) {
    fs.writeFileSync(path.join(componentsDir, filename), code.trim());
}

console.log('All component files created in src/components');