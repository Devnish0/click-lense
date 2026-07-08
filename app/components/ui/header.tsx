"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative w-full pt-4 z-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-6 py-2 md:py-3.5 bg-card/70 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm transition-all duration-300">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-sm select-none">
            C
          </span>
          <span className="text-xl font-bold tracking-tight text-foreground sm:text-2xl cursor-pointer">
            Clause
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-[0.95rem] font-medium text-secondary">
            <li>
              <a href="#solutions" className="transition-colors hover:text-primary">
                solutions
              </a>
            </li>
            <li>
              <a href="#project" className="transition-colors hover:text-primary">
                project
              </a>
            </li>
            <li>
              <a href="#basics" className="transition-colors hover:text-primary">
                basics
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="outline"
            className="border-2 border-border bg-transparent text-primary hover:bg-muted font-semibold transition-all"
          >
            Login
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all">
            Start now
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex lg:hidden items-center justify-center p-2 rounded-lg text-secondary hover:text-primary hover:bg-muted focus:outline-none transition-colors"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            // Close / X Icon
            <svg
              className="h-6 w-6 transition-transform duration-200 rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              className="h-6 w-6 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full left-5 right-5 mt-2 lg:hidden transition-all duration-300 ease-out origin-top z-40 ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl border border-border/60 bg-card/95 backdrop-blur-lg p-6 shadow-xl flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            <a
              href="#solutions"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-secondary hover:text-primary transition-colors py-2 border-b border-border/45"
            >
              solutions
            </a>
            <a
              href="#project"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-secondary hover:text-primary transition-colors py-2 border-b border-border/45"
            >
              project
            </a>
            <a
              href="#basics"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-secondary hover:text-primary transition-colors py-2 border-b border-border/45"
            >
              basics
            </a>
          </nav>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full border-2 border-border bg-transparent text-primary hover:bg-muted font-semibold py-5"
            >
              Login
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-5"
            >
              Start now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
