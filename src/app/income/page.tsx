'use client'
import ConfirmationDialog from '@/components/common/ConfirmationDialog'
import SKHeader from '@/components/common/Header'
import SKDataTable, { ColumnDefinition } from '@/components/common/SKDataTable'
import SKModal from '@/components/common/SKModal'
import { getIncomeLabels } from '@/lib/apiFunctions/settingsAPI'
import { IDialogType } from '@/types/common'
import { IFinanceLabel } from '@/types/settings'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [action, setAction] = useState<IDialogType<any> | null>();
  console.log("Action Data : ", action?.data)
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getIncomeLabels()
      setLabels(res);
    })()
  }, [])


  const columns: ColumnDefinition[] = [
    { label: 'Amount', accessor: 'amount' },
    {
      label: 'Actions',
      accessor: 'actions',
      renderCell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => setAction({ command: 'add', data: row })}>Edit</button>
          <button onClick={() => setAction({ command: 'delete' })}>Delete</button>
        </div>
      )
    }
  ];

  const handleChange = (key, value) => {
    setAction({ ...action, data: { ...action?.data, [key]: value } })
  }


  return (
    <>
      <SKHeader text={'Income List'}>
        <button onClick={() => setAction({ command: 'add', data: {} })}>
          Add
        </button>
      </SKHeader>
      <SKDataTable
        columns={columns}
        rows={incomeList}
      // checkBoxSelection
      />

      {/* Add / Update Income Source */}
      <SKModal
        open={action?.command === 'add'}
        onClose={() => setAction(null)}
        onSave={() => { }}
        title={`${action?.data?._id ? 'Update' : 'Save'} Income Entry`}
      >
        <div className="space-y-6 px-2 pt-1 pb-4">
          {/* Amount Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={action?.data.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              required
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {/* Label Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium">Label</label>
            <select
              value={action?.data.label}
              onChange={(e) => handleChange('label', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white"
            >
              <option value="">Select Label</option>
              {labels?.map(({ label }, index) => (
                <option key={label + index} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Label Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium">Custom Label (optional)</label>
            <input
              type="text"
              placeholder="Enter custom label"
              value={action?.data.customLabel}
              onChange={(e) => handleChange('customLabel', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        </div>
      </SKModal>


      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        variant='delete'
        onClose={() => setAction(null)}
        open={action?.command === 'delete'}
        onConfirm={() => alert('deleted')}
      />
    </>
  );
}

export default page