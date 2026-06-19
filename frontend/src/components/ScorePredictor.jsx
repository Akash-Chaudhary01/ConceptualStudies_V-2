import { useState } from "react";
import { Calculator, RotateCcw } from "lucide-react";

const SUBJECTS = [
    { key: "accountancy", label: "Accountancy", weight: 0.4 },
    { key: "economics", label: "Economics", weight: 0.3 },
    { key: "businessStudies", label: "Business Studies", weight: 0.3 },
];

const GAINS = { weak: 6, average: 12, strong: 4 };

function bandLabel(score) {
    if (score >= 95) return { label: "97/100 Topper Zone", desc: "Concept clarity + writing skill — both locked. CUET / top colleges in reach." };
    if (score >= 90) return { label: "Distinction", desc: "Strong fundamentals. With sharper writing skill you'll cross 95." };
    if (score >= 80) return { label: "First Division", desc: "Solid base. Concept depth + regular practice will push you to 90+." };
    if (score >= 70) return { label: "Average", desc: "Gaps in concepts. Structured concept-first coaching can lift you to 85+ in one term." };
    return { label: "Needs Foundation", desc: "Don't worry. We've taken students from 50s to 80+ — it starts with fixing concepts." };
}

export default function ScorePredictor() {
    const [scores, setScores] = useState({ accountancy: 75, economics: 75, businessStudies: 75 });
    const [confidence, setConfidence] = useState("average"); // weak | average | strong
    const [submitted, setSubmitted] = useState(false);

    const current = Math.round(SUBJECTS.reduce((sum, s) => sum + (scores[s.key] || 0) * s.weight, 0));
    const projected = Math.min(100, current + (GAINS[confidence] || 0));
    const band = bandLabel(projected);

    const reset = () => { setScores({ accountancy: 75, economics: 75, businessStudies: 75 }); setConfidence("average"); setSubmitted(false); };

    return (
        <section data-testid="score-predictor" className="bg-white py-20 md:py-24 border-y border-[#0F2744]/10">
            <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
                    <div>
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Free Tool</div>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#0F2744] leading-tight">Predict your board score</h2>
                        <p className="mt-3 text-[#4A5568] leading-relaxed">Enter your current marks (out of 100) and tell us how confident you feel in each subject. Get an instant projection of where structured coaching can take you.</p>

                        <div className="mt-6 space-y-5">
                            {SUBJECTS.map((s) => (
                                <div key={s.key}>
                                    <div className="flex justify-between mb-1.5">
                                        <label className="text-xs tracking-[0.18em] uppercase text-[#4A5568] font-semibold">{s.label}</label>
                                        <span className="text-sm text-[#0F2744] font-semibold">{scores[s.key]}/100</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={40}
                                        max={100}
                                        value={scores[s.key]}
                                        onChange={(e) => setScores({ ...scores, [s.key]: Number(e.target.value) })}
                                        data-testid={`predictor-${s.key}`}
                                        className="w-full accent-[#D4A93A]"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="text-xs tracking-[0.18em] uppercase text-[#4A5568] font-semibold">Your confidence</label>
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                    {["weak", "average", "strong"].map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setConfidence(c)}
                                            data-testid={`predictor-conf-${c}`}
                                            className={`text-xs uppercase tracking-[0.15em] font-semibold py-2.5 rounded-sm border transition ${
                                                confidence === c
                                                    ? "bg-[#0F2744] text-white border-[#0F2744]"
                                                    : "bg-white text-[#4A5568] border-[#0F2744]/15 hover:border-[#0F2744]/40"
                                            }`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setSubmitted(true)}
                                data-testid="predictor-calc"
                                className="w-full bg-[#0F2744] text-white hover:bg-[#1E4F8C] transition rounded-sm py-3 text-sm font-medium flex items-center justify-center gap-2"
                            >
                                <Calculator className="w-4 h-4" /> Predict My Score
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#0F2744] to-[#1E4F8C] text-white rounded-sm p-6 md:p-10 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#D4A93A]/15 blur-2xl" />
                        <div className="relative">
                            <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold">{submitted ? "Your Projected Score" : "Sample Projection"}</div>
                            <div className="mt-3 font-serif text-6xl sm:text-7xl md:text-8xl leading-none">{projected}<span className="text-2xl text-white/60">/100</span></div>
                            <div className="mt-2 text-sm text-white/70">Current weighted: {current}/100</div>

                            <div className="mt-8 border-t border-white/15 pt-5">
                                <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4A93A] font-semibold">Performance Band</div>
                                <div className="mt-1 font-serif text-2xl">{band.label}</div>
                                <p className="mt-2 text-sm text-white/80 leading-relaxed">{band.desc}</p>
                            </div>

                            <a
                                href="/contact"
                                data-testid="predictor-cta"
                                className="mt-6 inline-flex items-center gap-2 bg-[#D4A93A] text-[#0F2744] font-semibold hover:bg-[#c2982f] transition rounded-sm px-6 py-3 text-sm"
                            >
                                Book Free Demo to start
                            </a>
                            <button onClick={reset} className="mt-3 ml-3 text-xs text-white/60 hover:text-white inline-flex items-center gap-1" data-testid="predictor-reset"><RotateCcw className="w-3 h-3" /> Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
