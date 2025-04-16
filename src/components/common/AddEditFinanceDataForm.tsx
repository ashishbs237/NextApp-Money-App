import React, { useState } from 'react';
import { Plus, Save } from "lucide-react";

const AddEditFinanceDataForm = ({ onSubmit, ref, editingId }) => {
    const [data, setData] = useState({
        label: '',
        note: ''
    });

    const handleChange = (key: string, value: string) => {
        setData({ ...data, [key]: value })
    }
    return (
        <div className="mb-8 space-y-4">
            <div className="flex gap-4">
                <input
                    type="text"
                    ref={ref}
                    placeholder="Income Source"
                    value={data.label}
                    onChange={(e) => handleChange('label', e.target.value)}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md w-1/2"
                />
                <input
                    type="text"
                    placeholder="Note"
                    value={data.note}
                    onChange={(e) => handleChange('note', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md w-1/2"
                />
            </div>
            <button
                onClick={onSubmit(data)}
                className="bg-[var(--accent)] text-white px-6 py-2 rounded hover:opacity-90 flex items-center gap-2"
            >
                {editingId ? (
                    <>
                        <Save size={16} /> Update Source
                    </>
                ) : (
                    <>
                        <Plus size={16} /> Add Source
                    </>
                )}
            </button>

        </div>
    )
}

export default AddEditFinanceDataForm