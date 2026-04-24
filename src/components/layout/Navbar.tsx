'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}

export function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
          {!mounted ? (
            <div className="h-8 w-auto" style={{ width: 160 }} />
          ) : (
            <Image
              src={theme === 'dark' ? '/brand/logo-dark.png' : '/brand/logo-default.png'}
              alt="Capucor Business Solutions"
              height={40}
              width={200}
              priority
              className="h-8 w-auto"
            />
          )}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button
            nativeButton={false}
            render={
              <a
                href={siteConfig.links.calendly}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            size="sm"
          >
            Book a Call
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border">
                  <Button
                    nativeButton={false}
                    render={
                      <a
                        href={siteConfig.links.calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    className="w-full"
                  >
                    Book a Call
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
