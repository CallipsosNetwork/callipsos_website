import React, { useEffect, useState, memo } from "react";
import Globe from "./Globe";
import { useWaitlist } from "../hooks/useWaitlist";

/* ------------------------------
   Typewriter Hook (lightweight)
--------------------------------*/
const phrases = [
    "Autonomous Agents",
    "AI Systems",
    // "Smart Contracts",
];

function useTypewriter(words, speed = 40, pause = 1000) {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let char = 0;
        const word = words[index];

        const type = setInterval(() => {
            char++;
            setText(word.slice(0, char));

            if (char === word.length) {
                clearInterval(type);

                setTimeout(() => {
                    setIndex((prev) => (prev + 1) % words.length);
                    setText("");
                }, pause);
            }
        }, speed);

        return () => clearInterval(type);
    }, [index, words, speed, pause]);

    return text;
}

const Hero = () => {
    const { email, setEmail, handleSubmit, isLoading, isSuccess } = useWaitlist();
    const typed = useTypewriter(phrases);

    return (
        <section id="hero" className="relative h-screen overflow-hidden bg-black">

            {/* MOBILE */}
            <div className="lg:hidden absolute inset-0 flex flex-col">

                <div className="pt-20 px-6 z-20">
                    <h1 className="text-4xl font-light text-stone-400 tracking-tight">
                        Callipsos
                    </h1>
                </div>

                {/* Globe */}
                <div className="flex-1 relative flex items-center justify-center">
                    <div className="w-full h-full max-w-[500px] max-h-[500px]">
                        <Globe />
                    </div>
                </div>

                {/* Terminal section */}
                <div className="pb-8 px-6 z-20 font-mono text-sm sm:text-base text-stone-500 space-y-2">

                    <p>
            /// Safety layer for{" "}
                        <span className="text-stone-200 text-base sm:text-lg font-semibold">
                            {typed}
                            <span className="animate-pulse">_</span>
                        </span>
                    </p>

                    <p>///</p>

                    {isSuccess ? (
                        <span className="text-emerald-500 text-base">✓ You're in</span>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center gap-3 mt-3"
                        >
                            <span className="text-emerald-400 font-semibold">
                                &gt;&gt;&gt; Join the waitlist
                            </span>

                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                disabled={isLoading}
                                className="bg-transparent border-b-2 border-stone-700 text-stone-200 px-2 py-1 w-44 focus:outline-none focus:border-emerald-400 transition text-sm"
                            />

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-emerald-500 text-black px-3 py-1 rounded-md font-semibold hover:scale-105 hover:bg-emerald-400 transition"
                            >
                                {isLoading ? "..." : "Join"}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden lg:flex absolute inset-0 items-center justify-center">
                <div className="w-full h-full max-w-[900px] max-h-[900px]">
                    <Globe />
                </div>
            </div>

            <div className="hidden lg:block absolute bottom-0 left-0 right-0 p-10 z-20">
                <div className="flex justify-between lg:px-36 items-end">

                    <div className="font-mono text-base text-stone-500 space-y-2">
                        <p>/// Callipsos Network</p>

                        <p>
              /// Safety layer for{" "}
                            <span className="text-stone-200 text-xl font-semibold">
                                {typed}
                                <span className="animate-pulse">_</span>
                            </span>
                        </p>

                        {isSuccess ? (
                            <span className="text-emerald-500">✓ You're in</span>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex items-center gap-3 mt-2">
                                <span className="text-emerald-400 font-semibold">
                                    &gt;&gt;&gt; Join the waitlist
                                </span>

                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    disabled={isLoading}
                                    className="bg-transparent border-b-2 border-stone-700 text-stone-200 px-2 py-1 w-52 focus:outline-none focus:border-emerald-400 transition"
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-emerald-500 text-black px-4 py-1 rounded-md font-semibold hover:scale-105 hover:bg-emerald-400 transition"
                                >
                                    {isLoading ? "..." : "Join"}
                                </button>
                            </form>
                        )}
                    </div>

                    <h1 className="text-6xl font-light text-stone-400 tracking-tight">
                        Callipsos
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default memo(Hero);
