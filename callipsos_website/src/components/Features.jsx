import React from 'react'
import {
    Shield,
    Play,
    AlertTriangle,
    FileText,
    Zap,
    Clock,
    CheckCircle2,
    XCircle
} from 'lucide-react'
import { useWaitlist } from '../hooks/useWaitlist'
import TypewriterText from "./ui/TypewriterText";


/* =========================================================
   HEADER
========================================================= */
const FeaturesHeader = () => (
    <section
        id="features"
        className="py-28 md:py-36 text-center px-8 border-b border-t border-stone-900"
    >
        <div className="max-w-4xl mx-auto">
            <p className="text-stone-600 text-sm tracking-widest uppercase mb-8">
                Features
            </p>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 text-stone-200">
                Four layers of
                <br />
                <span className="text-stone-400">protection.</span>
            </h2>

            <p className="text-lg md:text-xl text-stone-500 font-light max-w-xl mx-auto mb-12 leading-relaxed">
                Every transaction passes through multiple checkpoints before it ever
                touches the blockchain.
            </p>

            <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-stone-800 rounded-full bg-stone-950/50">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-stone-400 text-sm">
                    All four checks in under{' '}
                    <span className="text-white font-medium">200ms</span>
                </span>
            </div>
        </div>
    </section>
)



/* =========================================================
   REUSABLE FEATURE SECTION
========================================================= */
const FeatureSection = ({
    number,
    icon: Icon,
    title,
    description,
    bullets,
    glow,
    reverse = false,
    children
}) => {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden">

            {/* soft full-width glow */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: `radial-gradient(ellipse at ${reverse ? '70%' : '30%'
                        } 50%, ${glow} 0%, transparent 60%)`
                }}
            />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div
                    className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''
                        }`}
                >
                    {/* LEFT CONTENT */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl font-semibold text-emerald-400 font-mono">{number}</span>
                            <div className="h-px w-8 bg-emerald-400" />
                            <Icon className="w-6 h-8 text-emerald-400" strokeWidth={1.5} />
                        </div>

                        <h3 className="text-3xl md:text-5xl font-medium mb-6 text-stone-100">
                            {title}
                        </h3>

                        <p className="text-lg text-stone-400 leading-relaxed mb-8">
                            {description}
                        </p>

                        <ul className="space-y-3 text-stone-500">
                            {bullets.map((b, i) => (
                                <li key={i} className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full mt-2 bg-white/50" />
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT VISUAL */}
                    <div className="rounded-2xl p-6 md:p-8 bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}



/* =========================================================
   MAIN COMPONENT
========================================================= */
const Features = () => {
    const waitlist1 = useWaitlist()
    const waitlist2 = useWaitlist()

    return (
        <div className="bg-black text-white">

            {/* Header */}
            <FeaturesHeader />


            {/* ======================================= */}
            {/* 01 — Policy Engine */}
            {/* ======================================= */}
            <FeatureSection
                number="01"
                icon={Shield}
                glow="rgba(59,130,246,0.15)"
                title="Your Rules"
                description="Define exactly what your agent can and can't do. Your boundaries are enforced cryptographically, not by trust."
                bullets={[
                    'Maximum transaction amounts',
                    'Whitelisted tokens & protocols',
                    'Time-based restrictions',
                    'Custom conditions'
                ]}

            >
                

                <div className="font-mono text-sm text-stone-400 space-y-2">
                    <p className="text-stone-600">// policy.json</p>
                    <p>max_transaction: 1000 USDC</p>
                    <p>daily_limit: 5000 USDC</p>
                    <p>allowed_tokens: [USDC, ETH, BTC]</p>
                    <p className="text-emerald-400 flex items-center gap-2 mt-3">
                        <CheckCircle2 size={14} /> Agent cannot exceed limits
                    </p>
                </div>
            </FeatureSection>


            {/* ======================================= */}
            {/* 02 — Simulation */}
            {/* ======================================= */}
            <FeatureSection
                number="02"
                icon={Play}
                reverse
                glow="rgba(168,85,247,0.15)"
                title="Safe Preview"
                description="Every transaction is simulated before execution so you know exactly what will happen."
                bullets={[
                    'Fork chain state',
                    'Catch failures early',
                    'Verify expected outcomes'
                ]}
            >
                <div className="space-y-3 text-sm text-stone-400">
                    <div className="flex justify-between"><span>Swap</span><span>500 → ETH</span></div>
                    <div className="flex justify-between"><span>Gas</span><span>$2.40</span></div>
                    <div className="text-emerald-400 flex items-center gap-2 pt-3">
                        <CheckCircle2 size={14} /> Safe to execute
                    </div>
                </div>
            </FeatureSection>


            {/* ======================================= */}
            {/* 03 — Error Catcher */}
            {/* ======================================= */}
            <FeatureSection
                number="03"
                icon={AlertTriangle}
                glow="rgba(251,146,60,0.15)"
                title="Error Catcher"
                description="We inspect raw calldata and detect suspicious actions before they execute."
                bullets={[
                    'Calldata inspection',
                    'Unverified token detection',
                    'Attack pattern matching',
                    'Hidden approval detection'
                ]}
            >
                <div className="text-xs font-mono text-stone-400 space-y-2">
                    <p className="text-red-400 flex gap-2 items-center">
                        <XCircle size={14} /> BLOCKED: suspicious signature
                    </p>
                </div>
            </FeatureSection>


            {/* ======================================= */}
            {/* 04 — Transparency */}
            {/* ======================================= */}
            <FeatureSection
                number="04"
                icon={FileText}
                reverse
                glow="rgba(16,185,129,0.15)"
                title="Full Transparency"
                description="Every action is logged immutably so you always know what happened."
                bullets={[
                    'Complete audit trail',
                    'Every validation recorded',
                    'Verifiable anytime'
                ]}
            >
                <div className="text-xs font-mono text-stone-400 space-y-1">
                    <p>14:23 Policy check passed</p>
                    <p>14:23 Simulation successful</p>
                    <p className="text-emerald-400">Execution confirmed</p>
                </div>
            </FeatureSection>


            {/* ======================================= */}
            {/* CTA */}
            {/* ======================================= */}
            <section className="py-20 text-center px-8 border-t border-stone-900">
                {waitlist2.isSuccess ? (
                    <p className="text-emerald-400">You're on the list 🎉</p>
                ) : (
                    <form
                        onSubmit={waitlist2.handleSubmit}
                        className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
                    >
                        <input
                            type="email"
                            value={waitlist2.email}
                            onChange={(e) => waitlist2.setEmail(e.target.value)}
                            placeholder="you@email.com"
                            className="flex-1 px-4 py-3 bg-stone-900 border border-stone-800 rounded-lg"
                        />
                        <button className="px-6 py-3 bg-white text-black rounded-lg">
                            Join Waitlist
                        </button>
                    </form>
                )}
            </section>
        </div>
    )
}

export default Features
