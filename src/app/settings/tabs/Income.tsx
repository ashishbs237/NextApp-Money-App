'use client';

import { createIncomeSource, getIncomeSource } from '@/lib/apiFunctions/settingsAPI';
import fetchWrapper from '@/utils/fetchWrapper';
import { useEffect, useState } from 'react';

interface IncomeSource {
  _id?: string;
  source: string;
  note: string;
}

export default function IncomeSettings() {
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
  const [source, setSource] = useState('');
  const [note, setNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    const res = await getIncomeSource();
    setIncomeSources(res);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetchWrapper.put(`/api/income-source/${editingId}`, { source, note });
    } else {
      await await createIncomeSource({ source, note });
    }
    setSource('');
    setNote('');
    setEditingId(null);
    fetchSources();
  };

  const handleEdit = (item: IncomeSource) => {
    setEditingId(item._id || null);
    setSource(item.source);
    setNote(item.note);
  };

  const handleDelete = async (id: string) => {
    await fetchWrapper.delete(`/api/income-source/${id}`);
    fetchSources();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Income Sources</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Income Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md w-1/2"
          />
          <input
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-1/2"
          />
        </div>
        <button
          type="submit"
          className="bg-[var(--accent)] text-white px-6 py-2 rounded hover:opacity-90"
        >
          {editingId ? 'Update Source' : 'Add Source'}
        </button>
      </form>

      <table className="w-full text-left border border-gray-200">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-3 border">#</th>
            <th className="p-3 border">Source</th>
            <th className="p-3 border">Note</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomeSources.map((item, idx) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="p-3 border">{idx + 1}</td>
              <td className="p-3 border">{item.source}</td>
              <td className="p-3 border">{item.note}</td>
              <td className="p-3 border space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => item._id && handleDelete(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
