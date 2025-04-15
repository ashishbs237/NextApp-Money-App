'use client';

import { createIncomeSource, getIncomeSource, updateIncomeSource } from '@/lib/apiFunctions/settingsAPI';
import fetchWrapper from '@/utils/fetchWrapper';
import { useEffect, useRef, useState } from 'react';
import { Pencil, Trash2 } from "lucide-react"; // <-- Lucide icons
import { Plus, Save } from "lucide-react";
import Loader from '@/components/common/Loader';
import BlockingLoader from '@/components/common/BlockingLoader';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';

interface IncomeSource {
  _id?: string;
  source: string;
  note: string;
}

interface Action {
  data?: IncomeSource;  // Using the IncomeSource type for the data field
  command?: 'default' | 'edit' | 'delete';  // Command can only be 'edit' or 'delete'
}

export default function IncomeSettings() {
  const sourceInputRef = useRef<HTMLInputElement>(null);
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
  const [source, setSource] = useState('');
  const [note, setNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingCount, setLoadingCount] = useState(0);
  const [action, setAction] = useState<Action | null>();

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    try {
      setLoadingCount((prev) => prev + 1);
      const res = await getIncomeSource();
      setIncomeSources(res);
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingCount((prev) => prev - 1);
    }

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // check duplication
    const isDuplicate = incomeSources.some(
      (item) =>
        item.source.toLowerCase() === source.toLowerCase() &&
        item._id !== editingId
    );

    if (isDuplicate) {
      alert("Income source already exists.");
      setSource('');
      // Refocus input after alert
      setTimeout(() => {
        sourceInputRef.current?.focus();
      }, 0); // 👈 slight delay to ensure focus happens after alert closes
      return;
    }

    if (editingId) {
      await updateIncomeSource(editingId, { source, note });
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
    <div className='relative'>
      <h1 className="text-2xl font-bold mb-6">Manage Income Sources</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            ref={sourceInputRef}
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

      </form>

      <table className="w-full text-left border border-gray-200">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-3 border">#</th>
            <th className="p-3 border">Source</th>
            <th className="p-3 border">Note</th>
            <th className="p-3 border text-center w-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomeSources.map((item, idx) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="p-3 border">{idx + 1}</td>
              <td className="p-3 border">{item.source}</td>
              <td className="p-3 border">{item.note}</td>
              <td className="p-2 border text-center">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:opacity-80 p-1 cursor-pointer"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => item._id && setAction({ command: 'delete', data: item })}
                    className="text-red-600 hover:opacity-80 p-1 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>


            </tr>
          ))}
        </tbody>
      </table>
      <BlockingLoader show={loadingCount > 0} />
      <ConfirmationDialog
        onClose={() => setAction(null)}
        open={action?.command === 'delete'}
        variant='save'
      />
    </div>
  );
}
