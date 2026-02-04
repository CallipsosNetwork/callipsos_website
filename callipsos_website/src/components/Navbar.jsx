import React, { useState, useCallback, useEffect, memo } from "react";
import { navLinks } from "../constants/index.js";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
    }, []);

    /* Prevent body scroll when menu open */
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto";
    }, [menuOpen]);

    /* Close on ESC */
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && closeMenu();
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeMenu]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-stone-900">
            {/* CENTERED CONTAINER */}
            <nav className="max-w-800px mx-auto flex items-center justify-between px-6 md:px-10 lg:px-40 py-2">
                {/* Logo */}
                <a
                    href="/"
                    className="flex items-center gap-3 hover:scale-105 transition-transform duration-300"
                >
                    <img
                        src="/logos/callipsos_logo.png"
                        alt="Callipsos logo"
                        loading="lazy"
                        className="w-12 h-12 md:w-16 md:h-16 lg:w-22 lg:h-17 object-contain"
                    />
                </a>

                {/* Hamburger */}
                <button
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    className="p-2 rounded hover:bg-stone-900/50 transition-colors relative z-50"
                >
                    <div className="w-6 h-5 flex flex-col justify-between">
                        <span
                            className={`block h-px bg-stone-300 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""
                                }`}
                        />
                        <span
                            className={`block h-px bg-stone-300 transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`block h-px bg-stone-300 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                                }`}
                        />
                    </div>
                </button>
            </nav>

            {/* Slide-out menu */}
            <aside
                className={`fixed top-0 right-0 w-72 h-full bg-black/95 border-l border-stone-900 
        transform transition-transform duration-300 ease-in-out z-40
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <nav className="flex flex-col gap-2 p-8 pt-24">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={closeMenu}
                            className="text-stone-400 hover:text-white transition-colors text-lg py-2"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* socials */}
                <div className="absolute bottom-8 left-8 flex gap-5">
                    <a
                        href="https://x.com/Callipsos_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-600 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                        </svg>
                    </a>

                    <a
                        href="https://github.com/CallipsosNetwork"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-600 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387..." />
                        </svg>
                    </a>
                </div>
            </aside>

            {/* Backdrop */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={closeMenu}
                />
            )}
        </header>
    );
};

export default memo(Navbar);
