'use client';

import { createIncomeSource, getIncomeSource, updateIncomeSource } from '@/lib/apiFunctions/settingsAPI';
import fetchWrapper from '@/utils/fetchWrapper';
import { useEffect, useRef, useState } from 'react';
import { Pencil, Trash2 } from "lucide-react"; // <-- Lucide icons
import BlockingLoader from '@/components/common/BlockingLoader';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import AddEditFinanceDataForm from '@/components/common/AddEditFinanceDataForm';
import { toast } from 'react-toastify';
import { useToast } from '@/hooks/useToast';


interface ApiResponse<T> {
  message: string;
  data: T;
}

interface IncomeSource {
  _id: string;
  source: string;
  note: string;
}



interface Action {
  data?: IncomeSource;  // Using the IncomeSource type for the data field
  command?: 'default' | 'edit' | 'delete';  // Command can only be 'edit' or 'delete'
}

export default function IncomeSettings() {
  const { successToast, errorToast } = useToast();
  const sourceInputRef = useRef<HTMLInputElement>(null);
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
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

  const handleSubmit = async ({ label, note }) => {

    // check duplication
    const isDuplicate = incomeSources.some(
      (item) =>
        item.source.toLowerCase() === label.toLowerCase() &&
        item._id !== editingId
    );

    if (isDuplicate) {
      alert("Income source already exists.");
      // Refocus input after alert
      setTimeout(() => {
        sourceInputRef.current?.focus();
      }, 0);
      return;
    }

    try {
      setLoadingCount((count) => count + 1);
      let res: ApiResponse<IncomeSource>;
      if (editingId) {
        res = await updateIncomeSource(editingId, { source: label, note });
      } else {
        res = await createIncomeSource({ source: label, note });
      }
      successToast(res?.message)
    } catch (err) {
      errorToast(err);
    } finally {
      setLoadingCount((count) => count - 1);
    }
    setEditingId(null);
    fetchSources();
  };

  const handleDelete = async () => {
    try {
      setLoadingCount((count) => count + 1)
      const res: ApiResponse<IncomeSource> = await fetchWrapper.delete(`/api/settings/income-source/${action?.data?._id}`);
      toast.success(res.message)
    } catch (err: unknown) {
      console.error(err)
    } finally {
      setLoadingCount((count) => count - 1)
    }
    fetchSources();
  };

  return (
    <div className='relative'>
      <h1 className="text-2xl font-bold mb-6">Manage Income Sources</h1>

      <AddEditFinanceDataForm
        editData={action?.command === 'edit' && action?.data}
        ref={sourceInputRef}
        onSubmit={handleSubmit}
      />

      <div className="max-h-96 overflow-y-auto border border-gray-200 rounded">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              <th className="p-3 border bg-gray-100 dark:bg-gray-800">#</th>
              <th className="p-3 border bg-gray-100 dark:bg-gray-800">Source</th>
              <th className="p-3 border bg-gray-100 dark:bg-gray-800">Note</th>
              <th className="p-3 border text-center w-0 bg-gray-100 dark:bg-gray-800">Actions</th>
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
                      onClick={() => setAction({ command: 'edit', data: item })}
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
      </div>

      <BlockingLoader show={loadingCount > 0} />
      <ConfirmationDialog
        onConfirm={() => handleDelete()}
        onClose={() => setAction(null)}
        open={action?.command === 'delete'}
        variant='delete'
      />
    </div>
  );
}
