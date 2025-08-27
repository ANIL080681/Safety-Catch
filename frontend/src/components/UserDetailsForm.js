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