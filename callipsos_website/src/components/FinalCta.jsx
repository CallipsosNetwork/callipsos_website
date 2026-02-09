import React, { useState } from 'react'
import { ArrowRight, Check, Shield, Zap } from 'lucide-react'
import { useWaitlist } from '../hooks/useWaitlist'

const FinalCTA = () => {
    const [submitted, setSubmitted] = useState(false)
    const { email, setEmail, handleSubmit, isLoading, isSuccess } = useWaitlist()


    return (
        <section id="cta" className="relative min-h-[50vh] flex flex-col justify-center items-center overflow-hidden bg-black">
            {/* ============================================ */}
            {/* HERO TEXT WITH VIDEO MASK */}
            {/* Uses mix-blend-mode knockout technique */}
            {/* ============================================ */}
            <div
                className="relative w-full flex items-center justify-center mb-8 md:mb-12"
                style={{ isolation: 'isolate' }}
            >
                {/* Video layer - sits behind */}
                {/* <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                    style={{
                        minHeight: '100%',
                        minWidth: '100%',
                    }}
                >
                    <source src="/videos/matrix-rain.webm" type="video/webm" />
                </video> */}

                {/* Text knockout mask layer */}
                <div
                    className="relative w-full flex items-center justify-center"
                    style={{ mixBlendMode: 'multiply' }}
                >
                    {/* Black background that will be knocked out by the text */}
                    <div className="absolute inset-0 bg-black" />

                    {/* White text creates the knockout/window into the video */}
                    <h1
                        className="relative text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] xl:text-[10vw] font-light tracking-tight select-none text-white py-8 md:py-12"
                        style={{
                            fontFamily: 'Outfit, system-ui, -apple-system, sans-serif',
                            letterSpacing: '-0.04em'
                        }}
                    >
                        Callipsos
                    </h1>
                </div>
            </div>

            {/* ============================================ */}
            {/* MAIN CONTENT */}
            {/* ============================================ */}
            <div className="relative z-10 max-w-3xl mx-auto text-center px-6 md:px-8">
                {/* Headline */}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 text-stone-200">
                    The future of DeFi
                    <br />
                    <span className="text-emerald-400/80">is autonomous.</span>
                </h2>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-stone-400 font-light max-w-xl mx-auto mb-10 leading-relaxed">
                    AI agents that trade, yield farm, and manage your portfolio 24/7, with
                    guardrails you control. Join the waitlist for early access.
                </p>

                {/* Email signup form */}
                {!isSuccess ? (
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="you@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                                className="flex-1 px-5 py-4 bg-stone-900/50 border border-stone-800 rounded-xl text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 transition-colors text-center sm:text-left disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group px-8 py-4 bg-white text-black font-medium rounded-xl hover:bg-emerald-400 transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <span>{isLoading ? 'Joining...' : 'Join Waitlist'}</span>
                                {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                        <p className="text-stone-600 text-sm mt-4">
                            Be first in line • No spam • Unsubscribe anytime
                        </p>
                    </form>
                ) : (
                    <div className="max-w-md mx-auto p-6 border border-emerald-500/30 rounded-xl bg-emerald-500/5">
                        <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <Check className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="font-medium text-white mb-1">You're on the list!</p>
                        <p className="text-stone-500 text-sm">We'll reach out when early access is ready.</p>
                    </div>
                )}

                {/* Trust indicators */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-12 text-sm text-stone-600">
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-500/50" />
                        <span>Your keys, your control</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-500/50" />
                        <span>Launching Q1 2026</span>
                    </div>
                </div>
            </div>

            {/* Ambient glow effects */}
            <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-30"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                }}
            />
        </section>
    )
}

export default FinalCTA