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