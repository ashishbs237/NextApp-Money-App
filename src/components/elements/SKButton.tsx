'use client';

import React from 'react';
import { TAB_COLORS } from '@/components/constants/colors';

interface SKButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    tabType: 'income' | 'expense' | 'emi' | 'investment';
    mode?: 'contained' | 'outlined';
    className?: string;
    children: React.ReactNode;
}

export default function SKButton({
    tabType,
    mode = 'contained',
    className = '',
    children,
    ...props
}: SKButtonProps) {
    const colors = TAB_COLORS[tabType] || {
        background: '#607D8B',
        text: '#FFFFFF',
    };

    const baseClasses = 'px-4 py-2 rounded-md font-semibold text-sm transition duration-200';
    const containedClasses = `bg-[${colors.background}] text-[${colors.text}]`;
    const outlinedClasses = `border-2 border-[${colors.background}] text-[${colors.background}] bg-transparent`;

    const finalClasses =
        mode === 'contained' ? containedClasses : outlinedClasses;

    return (
        <button
            className={`${baseClasses} ${finalClasses} ${className} my-1`}
            {...props}
        >
            {children}
        </button>
    );
}
