'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled ? "bg-[#060a14]/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
          <Image
            src="/brand/logo-dark.png"
            alt="Capucor Business Solutions"
            height={40}
            width={200}
            priority
            className="h-8 w-auto brightness-0 invert"
            style={{ width: 'auto' }}
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <MagneticButton>
            <Link 
              href="/client-portal"
              className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors px-4"
            >
              Portal
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
            >
              Get Started
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-white" />
              }
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-[#060a14] border-white/10">
              <SheetHeader>
                <SheetTitle className="text-left text-white/20 uppercase tracking-[0.3em] text-[10px]">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-12 flex flex-col gap-8">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-3xl font-bold text-white hover:text-emerald-400 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
                   <Link
                     href="/pricing"
                     className="w-full py-4 rounded-2xl bg-emerald-500 text-[#060a14] text-center font-bold"
                     onClick={() => setOpen(false)}
                   >
                     Build Subscription
                   </Link>
                   <Link
                     href="/client-portal"
                     className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-center font-bold"
                     onClick={() => setOpen(false)}
                   >
                     Client Portal
                   </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
