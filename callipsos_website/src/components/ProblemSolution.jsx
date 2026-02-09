import React, { memo } from "react";
import { AlarmClockCheck, Layers, RefreshCw } from "lucide-react";

/* =========================
   Static data (perf best practice)
   ========================= */
const FEATURES = [
    {
        icon: AlarmClockCheck,
        title: "Always-on trading",
        desc: "Your agent monitors markets around the clock while you live your life.",
    },
    {
        icon: Layers,
        title: "Cross-protocol yield",
        desc: "Find the best rates and move assets automatically.",
    },
    {
        icon: RefreshCw,
        title: "Smart rebalancing",
        desc: "Maintain allocation through swings. Buy dips. Take profits.",
    },
];

const steps = [
    {
        title: "You set the rules",
        desc: "Define spending limits, allowed tokens and approved protocols. Your boundaries, your control.",
    },
    {
        title: "Agent requests action",
        desc: "Agents never sign directly. Every transaction must request permission first.",
    },
    {
        title: "We validate & simulate",
        desc: "Each action is checked against your policies and simulated before execution.",
    },
    {
        title: "Safe execution",
        desc: "Only approved transactions are signed and executed on-chain. Everything is logged.",
    },
];

const StepItem = memo(({ step, index, isLast }) => (
    <li className="relative pl-14">

        {/* vertical line */}
        {!isLast && (
            <span className="absolute left-5 top-10 bottom-0 w-px bg-white/10" />
        )}

        {/* number bubble */}
        <span className="absolute left-0 top-1 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
            {String(index + 1).padStart(2, "0")}
        </span>

        {/* content */}
        <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-emerald-400  transition">
            <h3 className="text-lg md:text-xl text-stone-200 mb-2">
                {step.title}
            </h3>
            <p className="text-stone-500 leading-relaxed">
                {step.desc}
            </p>
        </div>
    </li>
));


/* =========================
   Reusable layout primitives
   ========================= */

const Section = memo(({ children, className = "" }) => (
    <section
        className={`px-6 md:px-20 lg:px-28 py-24 md:py-32 ${className}`}
    >
        <div className="max-w-7xl mx-auto">{children}</div>
    </section>
));

const FullSection = memo(({ children, className = "" }) => (
    <section
        className={`max-h-screen flex items-center justify-center text-center mt-40 px-6 md:px-20 lg:px-28 ${className}`}
    >
        <div className="max-w-5xl mx-auto">{children}</div>
    </section>
));



const FeatureCard = memo(({ Icon, title, desc }) => (
    <div
        className="
      p-10 md:p-12
      rounded-2xl
      bg-white/5
      border border-white/10
      backdrop-blur-md
      hover:border-white/30
      transition
    "
    >
        <Icon className="w-8 h-8 text-amber-400 mb-6" strokeWidth={1.6} />
        <h3 className="text-2xl text-stone-200 mb-4">{title}</h3>
        <p className="text-stone-500 leading-relaxed text-lg">{desc}</p>
    </div>
));

const InsightBand = memo(() => (
    <section className="relative bg-[#494F55] backdrop-blur-lg py-16 md:py-32 overflow-hidden">

        {/* subtle glow background */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/3 to-transparent backdrop-blur-xl" />

        <div className="relative max-w-7xl mx-auto px-10 md:px-16 lg:px-24">
            <div className="grid md:grid-cols-2 gap-14 items-center text-center md:text-left opacity-80">

                {/* LEFT — problem */}
                <div>
                    <h3 className="text-3xl md:text-5xl font-light text-stone-300 leading-tight">
                        The tech exists.
                        <br />
                        <span className="text-stone-50">The trust doesn’t.</span>
                    </h3>

                    <p className="mt-6 text-stone-200 text-lg">
                        “I want AI to manage my DeFi —
                        but I still can’t trust agents with my money.”
                    </p>
                </div>

                {/* RIGHT — solution */}
                <div>
                    <h3 className="text-3xl md:text-5xl font-light leading-tight text-stone-300">
                        What if compromised
                        <br />
                        <span className="text-emerald-400/80">
                            didn’t mean catastrophe?
                        </span>
                    </h3>

                    <p className="mt-6 text-stone-50 text-lg">
                        Boundaries. Permissions. Limits.
                        <br />
                        Agents work freely —
                        <span className="text-emerald-400/80"> your funds stay safe.</span>
                    </p>
                </div>

            </div>
        </div>
    </section>
));

/* =========================
   Main Component
   ========================= */

const ProblemSolution = () => {
    return (
        <div className="bg-black">

            {/* DREAM */}
            <FullSection>
                <p className="text-stone-600 text-sm tracking-widest uppercase mb-8">
                    The Future of DeFi
                </p>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 text-stone-200">
                    Imagine an AI that
                    <br />
                    <span className="text-amber-200/80">manages your portfolio.</span>
                </h2>

                <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto">
                    It trades 24/7. Finds yield opportunities across protocols.
                    Rebalances when markets shift. Executes while you sleep.
                </p>
            </FullSection>


            {/* WHAT BECOMES POSSIBLE (bigger + wider) */}
            <Section>
                <p className="text-stone-600 text-md tracking-widest uppercase mb-10 text-center">
                    What becomes possible
                </p>

                <div className="grid md:grid-cols-3 gap-12">
                    {FEATURES.map((f) => (
                        <FeatureCard
                            key={f.title}
                            Icon={f.icon}
                            title={f.title}
                            desc={f.desc}
                        />
                    ))}
                </div>
            </Section>

            <InsightBand />

            {/* GAP
            <FullSection>
                <h2 className="text-4xl md:text-6xl font-light text-stone-200">
                    The tech exists.
                    <br />
                    <span className="text-stone-600">The trust doesn't.</span>
                </h2>
            </FullSection>


            BLOCKER
            <Section className="text-center">
                <p className="text-2xl md:text-4xl text-stone-300 mb-10">
                    “I want AI to manage my DeFi.
                    <br />
                    <span className="text-stone-500">But I still can’t trust agents.”</span>
                </p>

                <p className="text-stone-500 max-w-2xl mx-auto text-lg">
                    When something breaks, there’s nothing stopping an agent from draining everything.
                    Worst case is total loss.
                </p>
            </Section>


            UNLOCK
            <FullSection>
                <h2 className="text-4xl md:text-6xl font-light text-stone-200">
                    What if compromised
                    <br />
                    <span className="text-emerald-400/80">didn't mean catastrophe?</span>
                </h2>
            </FullSection> */}

            {/* HOW IT WORKS — timeline */}
            <Section>
                <p className="text-center text-stone-500 text-md uppercase tracking-widest mb-16">
                    How it works
                </p>

                <ol className="max-w-3xl mx-auto space-y-10">
                    {steps.map((step, i) => (
                        <StepItem
                            key={step.title}
                            step={step}
                            index={i}
                            isLast={i === steps.length - 1}
                        />
                    ))}
                </ol>
            </Section>



            {/* PROMISE */}
            {/* <Section className="text-center">
                <h2 className="text-4xl md:text-5xl text-stone-200 mb-16">
                    Let agents work.
                    <br />
                    <span className="text-emerald-400">Stay in control.</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-14">
                    <div>
                        <p className="text-4xl text-white">24/7</p>
                        <p className="text-stone-600">Autonomous operation</p>
                    </div>
                    <div>
                        <p className="text-4xl text-white">100%</p>
                        <p className="text-stone-600">Validated</p>
                    </div>
                    <div>
                        <p className="text-4xl text-white">Your rules</p>
                        <p className="text-stone-600">Always enforced</p>
                    </div>
                </div>
            </Section> */}
        </div>
    );
};

export default memo(ProblemSolution);
