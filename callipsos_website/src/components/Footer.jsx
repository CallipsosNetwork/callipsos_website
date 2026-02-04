import React from "react";
import { Twitter, Github, MessageCircle } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative bg-black overflow-hidden">
            {/* Subtle readability + composition gradient */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black via-black/85 to-black/10" />

            {/* Eagle */}
            <div className="pointer-events-none absolute right-0 bottom-0 z-0">
                <img
                    src="/images/eagle.png"
                    alt=""
                    className="
            opacity-90
            w-[min(620px,60vw)]
            md:w-[min(580px,40vw)]
            lg:w-[min(800px,50vw)]
            translate-x-6 md:translate-x-10
            -translate-y-6 md:-translate-y-10
            object-contain object-bottom-right
            [mask-image:radial-gradient(ellipse_at_right_bottom,black_55%,transparent_78%)]
          "
                />
            </div>

            {/* Layout container */}
            <div
                className="
          relative z-10 mx-auto max-w-6xl
          px-6 md:px-12
          py-16 md:py-20
          min-h-[70vh] md:min-h-[60vh] lg:min-h-[70vh]
          flex flex-col
        "
            >
                {/* Center content (optically centered) */}
                <div className="flex-1 grid place-items-center">
                    <div className="text-center md:translate-x-[-1.25rem] md:-translate-y-2">
                        <div className="mb-6">
              <span className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-200 tracking-tight">
                Callipsos
              </span>
                        </div>

                        <p className="text-xl md:text-2xl lg:text-3xl font-light text-stone-400 leading-relaxed">
                            Always Watching.
                            <br />
                            <span className="text-emerald-400/70">Always Protecting.</span>
                        </p>
                    </div>
                </div>

                {/* Bottom row (keeps footer feeling like a footer) */}
                <div className="pt-10 flex items-end justify-between gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <a
                                href="https://x.com/Callipsos_"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-stone-600 transition-all duration-300 hover:scale-110"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                            </a>

                            <a
                                href="https://github.com/CallipsosNetwork"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-stone-600 transition-all duration-300 hover:scale-110"
                                aria-label="GitHub"
                            >
                                <Github className="w-4 h-4 md:w-5 md:h-5" />
                            </a>

                            <a
                                href="https://discord.gg/callipsos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-stone-600 transition-all duration-300 hover:scale-110"
                                aria-label="Discord"
                            >
                                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                        </div>

                        <p className="text-stone-600 text-xs md:text-sm">
                            © 2026 Callipsos. All rights reserved.
                        </p>
                    </div>

                    {/* Optional: a tiny right-side spacer so bottom-left content doesn't feel glued */}
                    <div className="w-10 md:w-20" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;