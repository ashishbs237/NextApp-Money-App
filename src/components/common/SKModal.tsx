import React from 'react';

type SKModalProps = {
    open: boolean;
    title: string;
    onClose: () => void;
    onSave: () => void;
    saveButtonText?: string;
    children: React.ReactNode;
};

const SKModal: React.FC<SKModalProps> = ({
    open,
    title,
    onClose,
    onSave,
    saveButtonText = 'Save',
    children,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        className="text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Body */}
                <div className="space-y-4">{children}</div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 py-2 rounded bg-[var(--accent)] text-white hover:opacity-90 text-sm"
                    >
                        {saveButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SKModal;
