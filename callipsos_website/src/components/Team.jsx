import React, { useState, useMemo } from 'react'
import { Twitter, Linkedin, Github, Mail, Sparkles, Code2, Blocks, Cpu } from 'lucide-react'
import {team} from "../constants/index.js";



// Expertise areas with icons
const expertiseAreas = [
    { title: 'DevEx + UX', desc: 'Products people actually want to use', icon: Code2 },
    { title: 'Infrastructure', desc: 'Systems that scale globally', icon: Cpu },
    { title: 'Smart Contracts', desc: 'Integrating Blockchain with AI Infrastructure', icon: Blocks },
]

// Glassmorphism style
const glassStyle = {
    background: 'rgba(255, 254, 254, 0.03)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 254, 254, 0.08)',
}

// Generate binary string for background
const generateBinaryRows = (rowCount, charsPerRow) => {
    const rows = []
    for (let i = 0; i < rowCount; i++) {
        let row = ''
        for (let j = 0; j < charsPerRow; j++) {
            row += Math.random() > 0.5 ? '1' : '0'
        }
        rows.push(row)
    }
    return rows
}

// Team member card component
const TeamCard = ({ member, index }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main card */}
            <div
                className="relative rounded-2xl overflow-hidden transition-all duration-500 h-full"
                style={{
                    ...glassStyle,
                    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: isHovered
                        ? '0 20px 40px rgba(16, 185, 129, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)'
                        : glassStyle.boxShadow,
                }}
            >
                {/* Image container with effects */}
                <div className="relative aspect-[4/5] overflow-hidden">
                    {/* The stunning photo */}
                    <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient overlay - always visible, intensifies on hover */}
                    <div
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                            background: `linear-gradient(
                                to top,
                                rgba(0, 0, 0, 0.95) 0%,
                                rgba(0, 0, 0, 0.7) 30%,
                                rgba(0, 0, 0, 0.2) 60%,
                                transparent 100%
                            )`,
                        }}
                    />

                    {/* Emerald tint overlay on hover */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
                        }}
                    />

                    {/* Content overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        {/* Role badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-3">
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 text-xs font-medium">{member.role}</span>
                        </div>

                        {/* Name */}
                        <h3 className="text-2xl md:text-3xl font-light text-white mb-1 tracking-tight">
                            {member.name}
                        </h3>

                        {/* Focus area */}
                        <p className="text-stone-400 text-sm mb-4">{member.focus}</p>

                        {/* Bio - shows on hover */}
                        <div
                            className="overflow-hidden transition-all duration-500"
                            style={{
                                maxHeight: isHovered ? '120px' : '0px',
                                opacity: isHovered ? 1 : 0,
                            }}
                        >
                            <p className="text-stone-500 text-sm leading-relaxed mb-4">
                                {member.bio}
                            </p>

                            {/* Expertise tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {member.expertise.map((exp) => (
                                    <span
                                        key={exp}
                                        className="px-2 py-1 text-xs rounded bg-stone-900/80 text-stone-400 border border-stone-800"
                                    >
                                        {exp}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="flex items-center gap-3">
                            {member.twitter && (
                                <a
                                    href={`https://x.com/${member.twitter}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-stone-600 hover:bg-stone-800 transition-all duration-300"
                                >
                                    <Twitter className="w-4 h-4" />
                                </a>
                            )}
                            {member.linkedin && (
                                <a
                                    href={`https://linkedin.com/in/${member.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-stone-600 hover:bg-stone-800 transition-all duration-300"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            )}
                            {member.github && (
                                <a
                                    href={`https://github.com/${member.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-stone-600 hover:bg-stone-800 transition-all duration-300"
                                >
                                    <Github className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Glow effect behind card */}
            <div
                className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-2xl"
                style={{
                    background: 'radial-gradient(ellipse at 50% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                }}
            />
        </div>
    )
}

const Team = () => {
    // Memoize binary rows so they don't regenerate on every render
    const binaryRows = useMemo(() => generateBinaryRows(40, 200), [])

    return (
        <div className="bg-black">
            {/* ============================================ */}
            {/* HERO SECTION */}
            {/* ============================================ */}
            <section id="team" className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-8 overflow-hidden">
                {/* Gradient glow */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
                    }}
                />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    {/* Label */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-8">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-emerald-400/80 text-sm font-mono tracking-wider">
                            THE_TEAM
                        </span>
                    </div>

                    {/* Main headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-6">
                        Built by people who
                        <br />
                        <span className="text-stone-300">understand the problem.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-stone-500 font-light max-w-2xl mx-auto">
                        Security infrastructure for AI agents requires deep expertise
                        across multiple domains. We've assembled a team that covers them all.
                    </p>
                </div>
            </section>

            {/* ============================================ */}
            {/* TEAM GRID */}
            {/* ============================================ */}
            <section className="px-6 md:px-8 py-16 md:py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {team.map((member, index) => (
                            <TeamCard key={member.name} member={member} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* EXPERTISE AREAS */}
            {/* ============================================ */}
            <section className="px-6 md:px-8 py-16 md:py-24 border-t border-stone-900/50">
                <div className="max-w-5xl mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl font-light text-stone-300 mb-4">
                            Combined Expertise
                        </h2>
                        <p className="text-stone-600">
                            The intersection of skills needed to build secure AI infrastructure
                        </p>
                    </div>

                    {/* Expertise cards */}
                    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                        {expertiseAreas.map((area, index) => (
                            <div
                                key={area.title}
                                className="group relative p-6 md:p-8 rounded-2xl text-center transition-all duration-500 hover:-translate-y-1"
                                style={glassStyle}
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
                                    <area.icon className="w-6 h-6 text-emerald-500/70" />
                                </div>

                                <h3 className="text-xl md:text-2xl font-light text-white mb-2">
                                    {area.title}
                                </h3>
                                <p className="text-stone-500 text-sm">{area.desc}</p>

                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: 'radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* HIRING CTA WITH BINARY BACKGROUND */}
            {/* ============================================ */}
            <section className="relative px-6 md:px-8 py-24 md:py-32 overflow-hidden">
                {/* Binary/Matrix code background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* The binary pattern - emerald colored, very subtle */}
                    <div
                        className="absolute inset-0 font-mono text-[10px] md:text-xs leading-relaxed select-none"
                        style={{
                            color: 'rgba(16, 185, 129, 0.08)',
                            wordBreak: 'break-all',
                            letterSpacing: '0.15em',
                        }}
                    >
                        {binaryRows.map((row, i) => (
                            <div key={i} className="whitespace-nowrap overflow-hidden">
                                {row}
                            </div>
                        ))}
                    </div>

                    {/* Gradient mask - solid black at top, fading to reveal binary at bottom */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(
                                to bottom,
                                rgba(0, 0, 0, 1) 0%,
                                rgba(0, 0, 0, 1) 20%,
                                rgba(0, 0, 0, 0.95) 40%,
                                rgba(0, 0, 0, 0.8) 60%,
                                rgba(0, 0, 0, 0.6) 80%,
                                rgba(0, 0, 0, 0.4) 100%
                            )`,
                        }}
                    />
                </div>

                {/* Content */}
                {/* <div className="max-w-3xl mx-auto text-center relative z-10">
                    Glowing orb decoration
                    <div className="relative inline-block mb-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl -z-10" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-light mb-4 text-stone-200">
                        We're growing the team
                    </h2>
                    <p className="text-stone-500 mb-8 max-w-md mx-auto">
                        Building the future of AI agent safety. Looking for exceptional
                        engineers, researchers, and builders.
                    </p>

                    <a
                        href="mailto:careers@callipso.network"
                        className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white text-black font-medium hover:bg-emerald-400 transition-all duration-300 group"
                    >
                        <Mail className="w-5 h-5" />
                        <span>careers@callipso.network</span>
                    </a>

                    Building in Public section
                    <div className="mt-16 mb-8">
                        <p className="text-stone-600 text-sm tracking-widest uppercase mb-3">
                            Building in Public
                        </p>
                        <p className="text-stone-500 text-sm max-w-md mx-auto">
                            Follow our journey as we build the safety layer for autonomous AI agents.
                        </p>
                    </div>

                    Social links - binary visible behind these
                    <div className="flex items-center justify-center gap-4">
                        <a
                            href="https://x.com/callipsos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/50 border border-stone-800/50 text-stone-500 hover:text-white hover:border-stone-700 backdrop-blur-sm transition-all duration-300"
                        >
                            <Twitter className="w-4 h-4" />
                            <span className="text-sm">@Callipsos_</span>
                        </a>
                        <a
                            href="https://github.com/callipsos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/50 border border-stone-800/50 text-stone-500 hover:text-white hover:border-stone-700 backdrop-blur-sm transition-all duration-300"
                        >
                            <Github className="w-4 h-4" />
                            <span className="text-sm">CallipsosNetwork</span>
                        </a>
                    </div>

                    Open roles hint
                    <p className="text-stone-700 text-sm mt-8">
                        Currently hiring: Senior Engineer, Security Researcher
                    </p>
                </div> */}
            </section>
        </div>
    )
}

export default Team