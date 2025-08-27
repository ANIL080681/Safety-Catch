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