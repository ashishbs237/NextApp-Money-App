import React, { useState } from 'react';
import { Plus, Save } from "lucide-react";

interface Data {
    label: string;
    note: string
}

const AddEditFinanceDataForm = ({ onSubmit, ref, editData }) => {
    const [data, setData] = useState<Data>({
        label: editData?.data?.label || '',
        note: editData?.data?.note || ''
    });

    const handleChange = (key: string, value: string) => {
        setData({ ...data, [key]: value })
    }

    const handleSubmit = () => {
        onSubmit(data);
        setData({ label: '', note: '' })
    }

    return (
        <div className="mb-8 space-y-4">
            <div className="flex gap-4">
                <input
                    type="text"
                    ref={ref}
                    placeholder="Label"
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
                onClick={() => handleSubmit()}
                className="bg-[var(--accent)] text-white px-6 py-2 rounded hover:opacity-90 flex items-center gap-2"
            >
                {editData ? (
                    <>
                        <Save size={16} /> Update
                    </>
                ) : (
                    <>
                        <Plus size={16} /> Add
                    </>
                )}
            </button>

        </div>
    )
}

export default AddEditFinanceDataForm