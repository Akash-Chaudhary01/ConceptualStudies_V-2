import Marquee from "react-fast-marquee";
import { Award, BookOpen, Users, GraduationCap, Globe2, Sparkles } from "lucide-react";

const items = [
    { icon: Award, label: "10+ Years Experience" },
    { icon: BookOpen, label: "Concept-Based Learning" },
    { icon: Users, label: "Small Batch Learning" },
    { icon: Sparkles, label: "Personal Attention" },
    { icon: GraduationCap, label: "Live Interactive Classes" },
    { icon: Globe2, label: "CUET Preparation" },
];

export default function TrustBar() {
    return (
        <div data-testid="trust-bar" className="bg-[#F4F6FB] border-y border-[#0F2744]/10 py-5">
            <Marquee gradient={false} speed={36} pauseOnHover>
                {items.concat(items).map((it, i) => {
                    const Icon = it.icon;
                    return (
                        <div key={i} className="flex items-center gap-3 mx-12 text-[#0F2744]">
                            <Icon className="w-4 h-4 text-[#D4A93A]" />
                            <span className="text-sm tracking-[0.18em] uppercase font-medium">{it.label}</span>
                            <span className="text-[#D4A93A]">•</span>
                        </div>
                    );
                })}
            </Marquee>
        </div>
    );
}
