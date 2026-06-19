import { Link } from "react-router-dom";
import { Award, BadgeCheck } from "lucide-react";
import { RESULTS } from "../lib/content";

export default function ResultsStrip() {
    const top = RESULTS.slice(0, 4);
    return (
        <section data-testid="results-strip" className="bg-white py-16 md:py-20 border-y border-[#0F2744]/10">
            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
                <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
                    <div>
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-2">Real Results</div>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F2744] leading-tight">Scores that speak louder than promises</h2>
                    </div>
                    <Link to="/results" data-testid="results-strip-link" className="text-sm text-[#1E4F8C] font-medium hover:underline underline-offset-4 shrink-0">View all results →</Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                    {top.map((r, i) => (
                        <div key={i} data-testid={`result-card-${i}`} className="relative bg-white border border-[#0F2744]/10 rounded-sm p-5 md:p-6 hover:-translate-y-1 hover:shadow-[0_14px_38px_rgba(15,39,68,0.12)] transition-all">
                            {r.verified && (
                                <span className="absolute top-3 right-3 flex items-center gap-1 text-[9px] tracking-[0.15em] uppercase font-semibold text-[#1E4F8C]">
                                    <BadgeCheck className="w-3.5 h-3.5" /> Verified
                                </span>
                            )}
                            <Award className="w-5 h-5 text-[#D4A93A] mb-3" />
                            <div className="font-serif text-3xl md:text-4xl text-[#0F2744] leading-none">{r.score}</div>
                            <div className="text-[11px] tracking-[0.15em] uppercase text-[#4A5568] mt-1.5">{r.subject}</div>
                            <div className="mt-3 pt-3 border-t border-[#0F2744]/8 text-sm text-[#0F2744] font-medium">{r.name}</div>
                            <div className="text-xs text-[#4A5568]">{r.classLabel} · {r.board}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
