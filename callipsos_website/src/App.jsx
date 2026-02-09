import React, { Suspense, lazy } from "react";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";

const ProblemSolution = lazy(() => import("./components/ProblemSolution.jsx"));
const Features = lazy(() => import("./components/Features.jsx"));
const Chains = lazy(() => import("./components/Chains.jsx"));
const Team = lazy(() => import("./components/Team.jsx"));
const FinalCTA = lazy(() => import("./components/FinalCta.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));

const App = () => {
    return (
        <>
            <Navbar />

            <main>
                <Hero />

                <Suspense fallback={<div style={{ padding: "2rem" }}>Loading...</div>}>
                    <section>
                        <ProblemSolution />
                    </section>

                    <section>
                        <Features />
                    </section>

                    <section>
                        <Chains />
                    </section>

                    <section>
                        <Team />
                    </section>

                    <section>
                        <FinalCTA />
                    </section>

                    <Footer />
                </Suspense>
            </main>
        </>
    );
};

export default App;
