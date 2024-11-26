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
    <div className={cn('pb-6 h-full flex flex-col', className)}>
      {/* User Profile Header */}
      <div className="flex items-center px-4 border-b">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
          <div className="h-6 w-6 rounded-full bg-primary/20" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold truncate">
            {session?.user?.name || 'User'}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {session?.user?.email || 'user@example.com'}
          </span>
        </div>
      </div>

      <ScrollArea className="flex-1 py-6">
        <div className="space-y-4 px-3">
          {/* Navigation Section */}
          <div className="space-y-1">
            <h2 className="text-xs uppercase text-muted-foreground font-semibold px-4 mb-2">
              Navigation
            </h2>
            {routes.slice(0, 3).map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen?.(false)}
                className={cn(
                  'group flex items-center gap-x-3 px-4 py-2.5 text-sm font-medium rounded-lg transition',
                  pathname === route.href 
                    ? 'bg-primary/10 text-primary hover:bg-primary/15' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <route.icon className={cn('flex-shrink-0 h-4 w-4', route.color)} />
                {route.label}
              </Link>
            ))}
          </div>

          {/* Management Section */}
          <div className="space-y-1">
            <h2 className="text-xs uppercase text-muted-foreground font-semibold px-4 mb-2">
              Management
            </h2>
            {routes.slice(3, 6).map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen?.(false)}
                className={cn(
                  'group flex items-center gap-x-3 px-4 py-2.5 text-sm font-medium rounded-lg transition',
                  pathname === route.href 
                    ? 'bg-primary/10 text-primary hover:bg-primary/15' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <route.icon className={cn('flex-shrink-0 h-4 w-4', route.color)} />
                {route.label}
              </Link>
            ))}
          </div>

          {/* Settings Section */}
          <div className="space-y-1">
            <h2 className="text-xs uppercase text-muted-foreground font-semibold px-4 mb-2">
              Settings
            </h2>
            {routes.slice(6).map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen?.(false)}
                className={cn(
                  'group flex items-center gap-x-3 px-4 py-2.5 text-sm font-medium rounded-lg transition',
                  pathname === route.href 
                    ? 'bg-primary/10 text-primary hover:bg-primary/15' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <route.icon className={cn('flex-shrink-0 h-4 w-4', route.color)} />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* User Profile and Logout */}
      <div className="border-t pt-4 px-3">
        <div className="px-4 py-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
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
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
