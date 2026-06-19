import { useState } from "react";
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

export default function SampleQuestion({ q }) {
    const [open, setOpen] = useState(false);
    if (!q) return null;
    return (
        <section data-testid="sample-question" className="bg-[#0F2744] text-white py-16 md:py-20">
            <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12">
                <div className="text-xs tracking-[0.25em] uppercase text-[#D4A93A] font-semibold mb-3">A Concept-First Glimpse</div>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight">Try a question Komal solves in 3 minutes</h2>

                <div className="mt-8 bg-white/5 backdrop-blur border border-white/10 rounded-sm p-6 md:p-8">
                    <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-[#D4A93A] mt-1 shrink-0" />
                        <p className="font-serif text-xl md:text-2xl text-white leading-relaxed">{q.question}</p>
                    </div>

                    <button
                        onClick={() => setOpen(!open)}
                        data-testid="sample-question-toggle"
                        className="mt-6 inline-flex items-center gap-2 text-sm text-[#D4A93A] font-medium hover:gap-3 transition-all"
                    >
                        {open ? "Hide solution" : "See how Komal teaches this"}
                        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {open && (
                        <div className="mt-6 pt-6 border-t border-white/10 space-y-5">
                            <div>
                                <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4A93A] font-semibold mb-2">The Approach</div>
                                <p className="text-white/85 leading-relaxed">{q.approach}</p>
                            </div>
                            <div className="bg-[#D4A93A]/15 border-l-2 border-[#D4A93A] pl-5 py-3">
                                <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4A93A] font-semibold mb-1">Concept Takeaway</div>
                                <p className="text-white leading-relaxed">{q.takeaway}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
