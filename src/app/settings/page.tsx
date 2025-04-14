'use client'

import { useState } from 'react'

const tabs = ['Income', 'Expense', 'EMI', 'Investment']

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('Income')

    return (<div className="w-full"> <h1 className="text-2xl font-semibold mb-6 text-[var(--foreground)]"> Settings </h1>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-300 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium border-b-2 transition-all cursor-pointer
          ${activeTab === tab
                            ? 'border-[var(--accent)] text-[var(--accent)]'
                            : 'border-transparent text-gray-500 hover:text-[var(--accent)]'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Tab Content */}
        <div className="bg-[var(--background)] rounded-xl shadow-sm p-6 border border-gray-200 transition-all">
            {activeTab === 'Income' && (
                <TabSection
                    title="Income Settings"
                    desc="Configure income categories, default sources, and preferences."
                />
            )}
            {activeTab === 'Expense' && (
                <TabSection
                    title="Expense Settings"
                    desc="Manage expense categories, limits, and tracking options."
                />
            )}
            {activeTab === 'EMIs' && (
                <TabSection
                    title="EMI Settings"
                    desc="Set up EMI plans, durations, reminders, and alerts."
                />
            )}
            {activeTab === 'Investment' && (
                <TabSection
                    title="Investment Settings"
                    desc="Customize SIPs, investment types, and growth goals."
                />
            )}
        </div>
    </div>
    )
}

function TabSection({ title, desc }: { title: string; desc: string }) {
    return (
        <div> <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
            {title}
        </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
            {/* Placeholder for settings form */}
            <div className="mt-6">
                <p className="text-sm italic text-gray-400">Settings form coming soon...
                </p>
            </div>
        </div>)
}