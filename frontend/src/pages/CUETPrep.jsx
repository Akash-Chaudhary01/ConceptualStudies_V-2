import SEO from "../components/SEO";
import { PageHero, Breadcrumbs, CTABanner } from "./SubjectPage";
import { CUET_FEATURES } from "../lib/content";
import { CheckCircle2 } from "lucide-react";

export default function CUETPrep() {
    return (
        <>
            <SEO
                title="CUET Commerce Preparation — Accountancy, Business Studies, Economics"
                description="Comprehensive CUET UG Commerce Preparation by Conceptual Studies — Accountancy, Business Studies and Economics domain preparation with mock tests and exam strategy."
                path="/cuet-preparation"
            />
            <PageHero
                kicker="CUET Preparation"
                title="CUET Commerce — done with concept clarity"
                subtitle="A focused program for CUET UG aspirants targeting the Commerce domain. Accountancy. Business Studies. Economics. Mock tests. Strategy. Mentorship."
                image="https://images.pexels.com/photos/5506217/pexels-photo-5506217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900"
            />
            <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "CUET Preparation" }]} />

            <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-12">
                <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Program Highlights</div>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#0F2744] leading-tight mb-6">What you get</h2>
                    <ul className="space-y-3">
                        {CUET_FEATURES.map((f) => (
                            <li key={f} className="flex items-start gap-3 p-4 bg-white border border-[#0F2744]/8 rounded-sm">
                                <CheckCircle2 className="w-5 h-5 text-[#D4A93A] mt-0.5" />
                                <span className="text-sm text-[#0F2744] font-medium">{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Domain Coverage</div>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#0F2744] leading-tight mb-6">Three domain subjects</h2>
                    <div className="space-y-4">
                        <div className="bg-white border border-[#0F2744]/8 rounded-sm p-5">
                            <h3 className="font-serif text-xl text-[#0F2744]">Accountancy Domain</h3>
                            <p className="text-sm text-[#4A5568] mt-1 leading-relaxed">Partnership, Company Accounts, Cash Flow, Financial Statements — MCQ-focused practice with negative marking strategy.</p>
                        </div>
                        <div className="bg-white border border-[#0F2744]/8 rounded-sm p-5">
                            <h3 className="font-serif text-xl text-[#0F2744]">Business Studies Domain</h3>
                            <p className="text-sm text-[#4A5568] mt-1 leading-relaxed">Principles of Management, Marketing, Financial Management, Business Environment — case-based MCQs.</p>
                        </div>
                        <div className="bg-white border border-[#0F2744]/8 rounded-sm p-5">
                            <h3 className="font-serif text-xl text-[#0F2744]">Economics Domain</h3>
                            <p className="text-sm text-[#4A5568] mt-1 leading-relaxed">Microeconomics, Macroeconomics, Indian Economy — application-based MCQs with formula sheets.</p>
                        </div>
                    </div>
                </div>
            </section>

            <CTABanner text="Ready to crack CUET Commerce? Book a free strategy session." />
        </>
    );
}
