import React, { useState } from 'react'
import { ArrowRight, Zap, Shield, Globe, ChevronRight } from 'lucide-react'
import { chains } from "../constants/index.js";
import { useWaitlist } from '../hooks/useWaitlist'

// Glassmorphism card style
const glassStyle = {
    background: 'rgba(255, 254, 254, 0.03)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 254, 254, 0.08)',
}

const glassStyleHover = {
    background: 'rgba(255, 254, 254, 0.06)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 254, 254, 0.15)',
}

// Chain Card Component
const ChainCard = ({ chain, index }) => {
    const [isHovered, setIsHovered] = useState(false)
    const isLive = chain.status === 'live'



    return (
        <div
            className="group relative rounded-2xl p-6 md:p-8 transition-all duration-500 cursor-pointer h-full"
            style={isHovered ? glassStyleHover : glassStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient glow on hover */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${chain.color}15 0%, transparent 70%)`,
                }}
            />

            {/* Animated border gradient */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, ${chain.color}20 0%, transparent 50%, ${chain.color}10 100%)`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header: Logo + Status */}
                <div className="flex items-start justify-between mb-6">
                    {/* Logo */}
                    <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                            background: `linear-gradient(135deg, ${chain.color}15 0%, ${chain.color}05 100%)`,
                            border: `1px solid ${chain.color}25`,
                        }}
                    >
                        <img
                            src={chain.logo}
                            alt={`${chain.name} logo`}
                            className="w-8 h-8 md:w-10 md:h-10 object-contain"
                            style={{ filter: isLive ? 'none' : 'grayscale(50%)' }}
                        />
                    </div>

                    {/* Status badge */}
                    <div
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${isLive
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-stone-800/50 text-stone-500 border border-stone-700/50'
                            }`}
                    >
                        <span className="flex items-center gap-1.5">
                            {isLive && (
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                            )}
                            {isLive ? 'Live' : 'Coming Soon'}
                        </span>
                    </div>
                </div>

                {/* Chain name */}
                <h3
                    className="text-2xl md:text-3xl font-light mb-3 transition-colors duration-300"
                    style={{ color: isHovered ? chain.color : '#e7e5e4' }}
                >
                    {chain.name}
                </h3>

                {/* Description */}
                <p className="text-stone-500 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                    {chain.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                    {chain.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-stone-600">
                            <div
                                className="w-1 h-1 rounded-full transition-colors duration-300"
                                style={{ backgroundColor: isHovered ? chain.color : '#57534e' }}
                            />
                            <span className="group-hover:text-stone-400 transition-colors duration-300">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Bottom action hint */}
                <div
                    className="flex items-center gap-2 text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                    style={{ color: chain.color }}
                >
                    <span>{isLive ? 'View documentation' : 'Get notified'}</span>
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    )
}

// Stats component
const StatItem = ({ value, label, color }) => (
    <div className="text-center">
        <div className="text-3xl md:text-4xl font-light mb-1" style={{ color }}>
            {value}
        </div>
        <div className="text-stone-600 text-xs md:text-sm">{label}</div>
    </div>
)

const Chains = () => {
    const { email, setEmail, handleSubmit, isLoading, isSuccess } = useWaitlist()

    return (
        <div className="bg-black min-h-screen border-t border-stone-900">
            {/* ============================================ */}
            {/* HERO SECTION */}
            {/* ============================================ */}
            <section id="chains" className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-8 overflow-hidden">
                {/* Background gradient */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)',
                    }}
                />

                <div className="max-w-5xl mx-auto relative z-10">
                    {/* Label */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Globe className="w-4 h-4 text-emerald-500/60" />
                        <span className="text-stone-600 text-sm tracking-widest uppercase">
                            Multi-Chain Support
                        </span>
                    </div>

                    {/* Main headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-center leading-tight mb-6">
                        One safety layer.
                        <br />
                        <span className="text-stone-500">Every chain.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-stone-500 font-light text-center max-w-2xl mx-auto mb-12">
                        Your agent operates across multiple blockchains.
                        Callipsos protects them all with a single integration.
                    </p>

                    {/* Stats bar */}
                    <div
                        className="flex items-center justify-center gap-8 md:gap-16 p-6 md:p-8 rounded-2xl max-w-2xl mx-auto"
                        style={glassStyle}
                    >
                        <StatItem value="5" label="Chains" color="#10b981" />
                        <div className="w-px h-12 bg-stone-800" />
                        <StatItem value="3" label="Live Now" color="#e7e5e4" />
                        <div className="w-px h-12 bg-stone-800" />
                        <StatItem value="1" label="Integration" color="#6FBCF0" />
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* CHAINS GRID */}
            {/* ============================================ */}
            <section className="px-6 md:px-8 py-16 md:py-24">
                <div className="max-w-6xl mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl font-light text-stone-300 mb-4">
                            Supported Networks
                        </h2>
                        <p className="text-stone-600 text-sm md:text-base">
                            Native asset control. No bridges. No wrapping.
                        </p>
                    </div>

                    {/* Cards grid - equal height cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {chains.map((chain, index) => (
                            <ChainCard key={chain.name} chain={chain} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* HOW IT WORKS */}
            {/* ============================================ */}
            <section className="px-6 md:px-8 py-16 md:py-24 border-t border-stone-900/50">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left: Content */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Zap className="w-4 h-4 text-emerald-500/60" />
                                <span className="text-stone-600 text-sm tracking-widest uppercase">
                                    How It Works
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-light mb-6 text-stone-200">
                                One SDK.
                                <br />
                                <span className="text-stone-500">All chains.</span>
                            </h2>

                            <p className="text-stone-500 leading-relaxed mb-8">
                                Callipsos uses Ika's Multi Party Computation technology to sign transactions
                                on any supported chain. Your agent doesn't need separate
                                keys or integrations for each blockchain.
                            </p>

                            {/* Benefits list */}
                            <div className="space-y-4">
                                {[
                                    { icon: Shield, text: 'Single SDK for all chains' },
                                    { icon: Zap, text: 'Unified policy engine across networks' },
                                    { icon: Globe, text: 'No bridges, no wrapping, native assets' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                            <item.icon className="w-5 h-5 text-emerald-500/70" />
                                        </div>
                                        <span className="text-stone-400">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Flow diagram */}
                        <div className="rounded-2xl p-6 md:p-8" style={glassStyle}>
                            <div className="space-y-6">
                                {/* Flow steps */}
                                {[
                                    {
                                        step: '01',
                                        icon: '🤖',
                                        label: 'Your Agent',
                                        sublabel: 'Requests transaction',
                                        color: '#78716c',
                                    },
                                    {
                                        step: '02',
                                        icon: '🛡️',
                                        label: 'Callipsos',
                                        sublabel: 'Validates & simulates',
                                        color: '#10b981',
                                    },
                                    {
                                        step: '03',
                                        icon: '🔐',
                                        label: 'Ika Network',
                                        sublabel: '2PC-MPC signing',
                                        color: '#6FBCF0',
                                    },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                                                style={{
                                                    background: `${item.color}15`,
                                                    border: `1px solid ${item.color}30`,
                                                }}
                                            >
                                                {item.icon}
                                            </div>
                                            <div>
                                                <div className="text-stone-300 font-medium">
                                                    {item.label}
                                                </div>
                                                <div className="text-stone-600 text-sm">
                                                    {item.sublabel}
                                                </div>
                                            </div>
                                            <div className="ml-auto text-stone-700 text-sm font-mono">
                                                {item.step}
                                            </div>
                                        </div>
                                        {i < 2 && (
                                            <div className="flex items-center pl-6 py-2">
                                                <div className="w-px h-6 bg-gradient-to-b from-stone-700 to-stone-800" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Chains output */}
                                <div className="pt-4 border-t border-stone-800/50">
                                    <div className="text-stone-600 text-xs mb-3 uppercase tracking-wider">
                                        Executes on
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {chains.map((chain) => (
                                            <div
                                                key={chain.name}
                                                className="px-3 py-1.5 rounded-lg text-xs flex items-center gap-2"
                                                style={{
                                                    background: `${chain.color}10`,
                                                    border: `1px solid ${chain.color}20`,
                                                    color: chain.color,
                                                }}
                                            >
                                                <img
                                                    src={chain.logo}
                                                    alt=""
                                                    className="w-3.5 h-3.5"
                                                />
                                                {chain.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* POWERED BY */}
            {/* ============================================ */}
            <section className="px-6 md:px-8 py-16 md:py-24">
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl p-8 md:p-12 text-center" style={glassStyle}>
                        <p className="text-stone-600 text-sm tracking-widest uppercase mb-6">
                            Powered By
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
                            {['Ika Network', 'dWallets', '2PC-MPC', 'Sui'].map((tech) => (
                                <div
                                    key={tech}
                                    className="px-5 py-2.5 rounded-xl bg-stone-900/50 border border-stone-800/50 text-stone-400"
                                >
                                    {tech}
                                </div>
                            ))}
                        </div>

                        <p className="text-stone-500 text-sm max-w-lg mx-auto">
                            Ika's decentralized MPC network enables secure, non-custodial signing
                            across any blockchain. No single point of failure.
                        </p>
                    </div>
                </div>
            </section>


            {/* UNIFIED CTA + REQUEST CHAIN */}
            {/* ============================================ */}
            <section className="px-6 md:px-8 py-24 md:py-32 border-t border-stone-900/50">
                <div className="max-w-5xl mx-auto">
                    <div
                        className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
                        style={glassStyle}
                    >
                        {/* background glow */}
                        <div
                            className="absolute inset-0 opacity-50"
                            style={{
                                background:
                                    'radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.12) 0%, transparent 60%)',
                            }}
                        />

                        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                            {/* ================================== */}
                            {/* LEFT — Request Chain */}
                            {/* ================================== */}
                            <div className="flex-1 text-center lg:text-left">
                                <h3 className="text-2xl md:text-3xl font-light text-stone-200 mb-4">
                                    Don’t see your chain?
                                </h3>

                                <p className="text-stone-500 mb-6 max-w-md mx-auto lg:mx-0">
                                    We're constantly expanding. Tell us which network you need and we’ll
                                    prioritize support.
                                </p>

                                <a
                                    href="mailto:chains@callipso.network"
                                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
                                >
                                    <span>Request a chain</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            {/* divider for desktop */}
                            <div className="hidden lg:block w-px self-stretch bg-stone-800/70" />

                            {/* ================================== */}
                            {/* RIGHT — Waitlist Signup */}
                            {/* ================================== */}
                            <div className="flex-1 text-center lg:text-left w-full">
                                <h2 className="text-3xl md:text-4xl font-light mb-4 text-stone-200">
                                    Build cross-chain agents
                                    <br />
                                    <span className="text-emerald-400/90">with confidence.</span>
                                </h2>

                                <p className="text-stone-500 mb-8 max-w-md mx-auto lg:mx-0">
                                    Get early access to the Callipsos SDK and start building secure,
                                    multi-chain AI agents today.
                                </p>

                                {isSuccess ? (
                                    <div className="text-emerald-400 py-3 font-medium">
                                        You’re on the list! 🎉
                                    </div>
                                ) : (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
                                    >
                                        <input
                                            type="email"
                                            placeholder="you@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={isLoading}
                                            className="flex-1 px-5 py-3.5 bg-black/50 border border-stone-800 rounded-xl text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                                        />

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="px-6 py-3.5 bg-white text-black font-medium rounded-xl hover:bg-emerald-400 transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2 group disabled:opacity-50"
                                        >
                                            <span>{isLoading ? 'Joining...' : 'Join Waitlist'}</span>
                                            {!isLoading && (
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            )}
                                        </button>
                                    </form>
                                )}

                                {/* trust indicators */}
                                <div className="flex items-center justify-center lg:justify-start gap-6 mt-6 text-stone-600 text-xs">
                                    <span className="flex items-center gap-1.5">
                                        <Shield className="w-3.5 h-3.5" />
                                        No spam
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Zap className="w-3.5 h-3.5" />
                                        Early access
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Chains