import { ToastContainer } from 'react-toastify';
import './globals.css';
import Link from 'next/link';
import GetIcons from '@/components/common/GetIcons';

export const metadata = {
  title: 'MoneyMap',
  description: 'Track your money smartly – Income, Expense, EMIs & Investments',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[var(--background)] text-[var(--foreground)] antialiased">
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <div className="flex justify-center min-h-screen px-4 sm:px-8 py-6">
          <div className="w-full max-w-[1280px] flex overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-[var(--background)] transition-all">

            {/* Sidebar */}
            <aside className="w-64 bg-[var(--sidebar-bg)] text-white flex flex-col p-6 space-y-6">
              <h1 className="text-2xl font-bold tracking-wide">💰 MoneyMap</h1>
              <nav className="flex flex-col gap-3">
                <SidebarLink href="/dashboard" label="Dashboard" />
                <SidebarLink href="/income" label="Income" />
                <SidebarLink href="/expense" label="Expense" />
                <SidebarLink href="/emi" label="EMI" />
                <SidebarLink href="/investment" label="Investment" />
                <SidebarLink href="/settings" label="Settings" />
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-[var(--background)] p-6 sm:p-10 overflow-y-auto">
              {/* <header className="mb-6">
                <h2 className="text-2xl font-semibold">Welcome to MoneyMap</h2>
              </header> */}
              <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnHover
                theme="light"

              // transition={Bounce}
              />
              <section className="space-y-6">
                {children}
              </section>
            </main>

          </div>
        </div>
      </body>
    </html>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-lg hover:bg-[var(--sidebar-link-hover)] transition-colors duration-150"
    >
      {/* <GetIcons screenName={label} color={"red"} size={20} /> */}
      {label}
    </Link>
  );
}
