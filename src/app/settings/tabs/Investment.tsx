'use client';

import { createInvestmentLabel, deleteInvestmentLabel, getInvestmentLabels, updateInvestmentLabel } from '@/lib/apiFunctions/settingsAPI';
import { useEffect, useRef, useState } from 'react';
import BlockingLoader from '@/components/common/BlockingLoader';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import AddEditFinanceDataForm from '@/components/common/AddEditFinanceDataForm';
import { toast } from 'react-toastify';
import { useToast } from '@/hooks/useToast';
import FinanceDataList from '@/components/common/FinanceDataList';
import { IFinanceLabel } from "@/types/settings"
import { ApiResponse, IConfirmatinDialogAction } from "@/types/common"
import SKHeader from '@/components/common/Header';

export default function InvestmentSettings() {
  const { successToast, errorToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [labels, setLabels] = useState<IFinanceLabel[]>([]);
  const [loadingCount, setLoadingCount] = useState(0);
  const [action, setAction] = useState<IConfirmatinDialogAction<IFinanceLabel> | null>();

  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async () => {
    try {
      setLoadingCount((prev) => prev + 1);
      const res = await getInvestmentLabels();
      setLabels(res);
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingCount((prev) => prev - 1);
    }

  };

  const handleSubmit = async ({ label, note }) => {

    // check duplication
    const isDuplicate = labels.some(
      (item) =>
        item.label.toLowerCase() === label.toLowerCase() &&
        item._id !== action?.data?._id
    );

    if (isDuplicate) {
      setAction({ command: 'info' })
      return;
    }

    try {
      setLoadingCount((count) => count + 1);
      let res: ApiResponse<IFinanceLabel>;
      if (action?.data?._id) {
        res = await updateInvestmentLabel(action?.data?._id, { label, note });
      } else {
        res = await createInvestmentLabel({ label, note });
      }
      successToast(res?.message)
    } catch (err) {
      errorToast(err);
    } finally {
      setLoadingCount((count) => count - 1);
    }
    fetchLabels();
  };


  const handleDelete = async () => {
    try {
      setLoadingCount((count) => count + 1)
      const res: ApiResponse<IFinanceLabel> = await deleteInvestmentLabel(action?.data?._id);
      toast.success(res.message)
    } catch (err: unknown) {
      console.error(err)
    } finally {
      setLoadingCount((count) => count - 1)
    }
    fetchLabels();
  };

  const handleOk = () => {
    setAction(null)
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  return (
    <div className='relative'>
      <SKHeader text="Manage Investment Labels" />

      <AddEditFinanceDataForm
        editData={action?.command === 'edit' && action?.data}
        ref={inputRef}
        onSubmit={handleSubmit}
      />

      <FinanceDataList
        rowData={labels}
        onEdit={(item) => setAction({ command: 'edit', data: item })}
        onDelete={(item) => setAction({ command: 'delete', data: item })}
      />

      <BlockingLoader show={loadingCount > 0} />
      <ConfirmationDialog
        onConfirm={() => handleDelete()}
        onClose={() => setAction(null)}
        open={action?.command === 'delete'}
        variant='delete'
      />

      <ConfirmationDialog
        onClose={() => handleOk()}
        open={action?.command === 'info'}
        variant='info'
        information="Investment label already exists."
      />

    </div>
  );
}
