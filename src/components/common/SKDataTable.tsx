import React, { useState } from 'react';

type RowData = {
    _id: string | number;
    [key: string]: any;
};

export type ColumnDefinition = {
    label: string;
    accessor: string;
    renderCell?: (row: RowData) => React.ReactNode;
};


type SKDataTableProps = {
    columns: ColumnDefinition[];  // Column definitions
    rows: RowData[];  // Actual data to be displayed
    totalSelectedRows?: number;
    onDeleteSelected?: (ids: (string | number)[]) => void;
    checkBoxSelection?: boolean;
};

const SKDataTable: React.FC<SKDataTableProps> = ({
    columns,
    rows,
    checkBoxSelection = false
}) => {
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

    const handleSelectRow = (id: string | number) => {
        const updatedSelection = new Set(selectedRows);
        if (updatedSelection.has(id)) {
            updatedSelection.delete(id);
        } else {
            updatedSelection.add(id);
        }
        setSelectedRows(updatedSelection);
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-4">
            {/* Table Header */}
            <div className="flex justify-between items-center">
                <div className="text-xl font-semibold">SKDataTable</div>

            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            {
                                checkBoxSelection && <th className="px-4 py-2">
                                    <input
                                        type="checkbox"
                                        onChange={() => {
                                            if (selectedRows.size === rows.length) {
                                                setSelectedRows(new Set());
                                            } else {
                                                setSelectedRows(new Set(rows.map((row) => row._id)));
                                            }
                                        }}
                                    />
                                </th>
                            }

                            {columns.map((column, index) => (
                                <th key={index} className="px-4 py-2 font-medium">
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={'max-h-64 overflow-y-scroll'}>
                        {rows.map((row) => (
                            <tr
                                key={row._id}
                                className={`border-b ${selectedRows.has(row._id) ? 'bg-gray-200' : ''}`}
                            >
                                {
                                    checkBoxSelection &&
                                    <td className="px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.has(row._id)}
                                            onChange={() => handleSelectRow(row._id)}
                                        />
                                    </td>
                                }
                                {columns.map((column) => (
                                    <td key={column.accessor} className="px-4 py-2">
                                        {column.renderCell ? column.renderCell(row) : row[column.accessor]}

                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                    <div className="text-sm">Total Rows: {rows.length}</div>
                </div>
            </div>
        </div>
    );
};

export default SKDataTable;
