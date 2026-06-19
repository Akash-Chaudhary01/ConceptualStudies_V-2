import { DEMO_FLOW } from "../lib/content";

export default function DemoFlow() {
    return (
        <section data-testid="demo-flow" className="bg-[#FAFAFC] py-20 md:py-24 border-y border-[#0F2744]/10">
            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
                <div className="max-w-2xl mb-12">
                    <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Your Free Demo</div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F2744] leading-tight">What happens when you book a demo</h2>
                    <p className="mt-3 text-[#4A5568]">No sales pitch. No commitment. Just one real class.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {DEMO_FLOW.map((d, i) => (
                        <div key={i} data-testid={`demo-flow-step-${i}`} className="bg-white border border-[#0F2744]/10 rounded-sm p-7 relative">
                            <div className="absolute -top-4 left-6 w-10 h-10 bg-[#0F2744] text-[#D4A93A] grid place-items-center font-serif text-lg font-bold rounded-sm">
                                {i + 1}
                            </div>
                            <h3 className="mt-3 font-serif text-2xl text-[#0F2744]">{d.step}</h3>
                            <p className="mt-2 text-sm text-[#4A5568] leading-relaxed">{d.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
