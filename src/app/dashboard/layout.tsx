import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { requireUser } from '@/utils/hooks';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await requireUser();

  // if (!session) {
  //   redirect('/login');
  // }

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}