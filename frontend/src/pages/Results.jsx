import SEO from "../components/SEO";
import { PageHero, Breadcrumbs, CTABanner } from "./SubjectPage";
import { RESULTS } from "../lib/content";
import { Award, BadgeCheck, TrendingUp } from "lucide-react";

export default function Results() {
    const total = RESULTS.length;
    const verified = RESULTS.filter((r) => r.verified).length;
    const highScorers = RESULTS.filter((r) => parseInt(r.score) >= 95).length;

    return (
        <>
            <SEO
                title="Student Results — Real Board Scores"
                description="Real board exam results from Conceptual Studies students — 90+ scorers across Accountancy, Economics and Business Studies for Class 11 and Class 12."
                path="/results"
            />
            <PageHero kicker="Real Results" title="Scores that speak louder than promises" subtitle="Every score below is from a real student. Verified ones come from Google reviews." />
            <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Results" }]} />

            <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pt-12">
                <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12">
                    <Stat icon={Award} value={total + "+"} label="Toppers Mentored" />
                    <Stat icon={TrendingUp} value={highScorers + "+"} label="Above 95/100" />
                    <Stat icon={BadgeCheck} value={verified} label="Google-Verified" />
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pb-16 md:pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {RESULTS.map((r, i) => (
                        <div key={i} data-testid={`results-page-${i}`} className="relative bg-white border border-[#0F2744]/10 rounded-sm p-6 hover:-translate-y-1 hover:shadow-[0_14px_38px_rgba(15,39,68,0.12)] transition-all">
                            {r.verified && (
                                <span className="absolute top-3 right-3 flex items-center gap-1 text-[9px] tracking-[0.15em] uppercase font-semibold text-[#1E4F8C]">
                                    <BadgeCheck className="w-3.5 h-3.5" /> Verified
                                </span>
                            )}
                            <Award className="w-5 h-5 text-[#D4A93A] mb-3" />
                            <div className="font-serif text-4xl text-[#0F2744] leading-none">{r.score}</div>
                            <div className="text-[11px] tracking-[0.15em] uppercase text-[#4A5568] mt-1.5">{r.subject}</div>
                            <div className="mt-3 pt-3 border-t border-[#0F2744]/8 text-sm text-[#0F2744] font-medium">{r.name}</div>
                            <div className="text-xs text-[#4A5568]">{r.classLabel} · {r.board}</div>
                        </div>
                    ))}
                </div>

                <p className="mt-10 text-xs text-[#4A5568] text-center max-w-2xl mx-auto">
                    Student names shown are last-name initials to protect privacy. Verified badges indicate students with public Google reviews. Mark sheets available on request from the mentor.
                </p>
            </section>

            <CTABanner text="Be the next score on this wall." />
        </>
    );
}

const Stat = ({ icon: Icon, value, label }) => (
    <div className="bg-white border border-[#0F2744]/10 rounded-sm p-5 md:p-7">
        <Icon className="w-5 h-5 text-[#D4A93A] mb-3" />
        <div className="font-serif text-3xl md:text-4xl text-[#0F2744] leading-none">{value}</div>
        <div className="text-[11px] tracking-[0.18em] uppercase text-[#4A5568] font-semibold mt-2">{label}</div>
    </div>
);
