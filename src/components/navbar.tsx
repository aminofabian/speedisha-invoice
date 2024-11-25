'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, LogIn, UserPlus, FileText, Settings, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Features', href: '/#features' },
    { name: 'Templates', href: '/templates' },
    { name: 'Pricing', href: '/#pricing' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/60 backdrop-blur-md border-b shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl font-bold font-orbitron bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            >
              SPEEDISHA
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="gap-2 group"
                  >
                    <User className="w-4 h-4" />
                    {session.user?.email?.split('@')[0]}
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <FileText className="w-4 h-4" />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      Settings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-2 cursor-pointer text-red-500 focus:text-red-500"
                    onClick={() => signOut()}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    <UserPlus className="w-4 h-4" />
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-primary/10 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="block px-3 py-2 rounded-md text-base hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
              {!session ? (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-base hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign in
                    </motion.div>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-base bg-primary text-primary-foreground"
                    >
                      <UserPlus className="w-4 h-4" />
                      Sign up
                    </motion.div>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-base hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Dashboard
                    </motion.div>
                  </Link>
                  <Link href="/settings" onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-base hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </motion.div>
                  </Link>
                  <motion.div
                    whileHover={{ x: 5 }}
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-base text-red-500 hover:bg-red-500/10 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
