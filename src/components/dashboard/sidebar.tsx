'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  PlusCircle,
  Receipt,
  Clock,
  LineChart,
  LogOut
} from 'lucide-react';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  placeHolderData?: string;
}

export function Sidebar({ className, placeHolderData }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: 'text-sky-500'
    },
    {
      label: 'All Invoices',
      icon: FileText,
      href: '/dashboard/invoices',
      color: 'text-violet-500',
    },
    {
      label: 'Create Invoice',
      icon: PlusCircle,
      href: '/dashboard/create',
      color: 'text-pink-700',
    },
    {
      label: 'Recurring',
      icon: Clock,
      href: '/dashboard/recurring',
      color: 'text-orange-700',
    },
    {
      label: 'Clients',
      icon: Users,
      href: '/dashboard/clients',
      color: 'text-emerald-500',
    },
    {
      label: 'Reports',
      icon: LineChart,
      href: '/dashboard/reports',
      color: 'text-green-700',
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/dashboard/settings',
      color: 'text-gray-500',
    },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden fixed left-4 top-4 z-40"
            size="icon"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent 
            routes={routes} 
            pathname={pathname} 
            className="px-3"
            setIsOpen={setIsOpen}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <nav className={cn(
        'hidden lg:flex flex-col w-72 border-r bg-background h-screen',
        className
      )}>
        <SidebarContent 
          routes={routes} 
          pathname={pathname} 
          className="px-3"
        />
      </nav>
    </>
  );
}

interface SidebarContentProps {
  routes: any[];
  pathname: string;
  className?: string;
  setIsOpen?: (open: boolean) => void;
}

function SidebarContent({ routes, pathname, className, setIsOpen }: SidebarContentProps) {
  const { data: session } = useSession();

  return (
    <div className={cn('pb-12 h-full flex flex-col', className)}>
      <div className="space-y-4 py-4 flex flex-col h-full">
        <div className="px-3 py-2">
          <Link href="/">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Speedisha
            </h2>
          </Link>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen?.(false)}
                className={cn(
                  'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                  pathname === route.href ? 'text-primary bg-primary/10' : 'text-muted-foreground',
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn('h-4 w-4 mr-3', route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-auto px-3 py-2">
          <div className="space-y-1">
            {/* User Profile */}
            <div className="px-3 py-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <div className="h-6 w-6 rounded-full bg-primary/20" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {session?.user?.name || 'User'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {session?.user?.email || 'user@example.com'}
                  </span>
                </div>
              </div>
            </div>
            {/* Logout Button */}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
