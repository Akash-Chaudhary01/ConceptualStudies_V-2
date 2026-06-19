import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import SEO from "../components/SEO";
import SampleQuestion from "../components/SampleQuestion";
import { SAMPLE_QUESTIONS } from "../lib/content";

export function PageHero({ kicker, title, subtitle, image }) {
    return (
        <section className="relative overflow-hidden border-b border-[#0F2744]/10 isolate">
            {image && (
                <div className="absolute inset-0 -z-10">
                    <img src={image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F2744] via-[#0F2744]/95 to-[#0F2744]/70" />
                </div>
            )}
            <div className={`max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-20 md:py-28 ${image ? "text-white" : ""}`}>
                <div className="text-xs tracking-[0.25em] uppercase text-[#D4A93A] font-semibold mb-4">{kicker}</div>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-3xl">{title}</h1>
                {subtitle && <p className={`mt-5 max-w-2xl text-base md:text-lg leading-relaxed ${image ? "text-white/85" : "text-[#4A5568]"}`}>{subtitle}</p>}
            </div>
        </section>
    );
}

export function Breadcrumbs({ items }) {
    return (
        <nav data-testid="breadcrumbs" aria-label="Breadcrumb" className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pt-6 text-xs text-[#4A5568] flex flex-wrap items-center gap-1.5">
            {items.map((it, i) => (
                <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="w-3 h-3 text-[#0F2744]/30" />}
                    {it.to ? <Link to={it.to} className="hover:text-[#0F2744]">{it.label}</Link> : <span className="text-[#0F2744]">{it.label}</span>}
                </span>
            ))}
        </nav>
    );
}

export function CTABanner({ text = "Ready to learn with concept clarity?" }) {
    return (
        <section data-testid="cta-banner" className="bg-[#0F2744] text-white">
            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-14 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl max-w-2xl leading-tight">{text}</h3>
                <Link to="/contact" data-testid="cta-banner-btn" className="bg-[#D4A93A] text-[#0F2744] font-semibold hover:bg-[#c2982f] transition-colors rounded-sm px-7 py-3.5 text-sm flex items-center gap-2 shrink-0">
                    Book Free Demo <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}

export default function SubjectPage({ subject }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": `${subject.title} Coaching by Conceptual Studies`,
        "description": subject.summary,
        "provider": {
            "@type": "EducationalOrganization",
            "name": "Conceptual Studies",
        },
    };

    return (
        <>
            <SEO
                title={`${subject.title} Classes for Class 11 & 12 | Online ${subject.title} Coaching`}
                description={`${subject.title} coaching by Komal Sejwal — ${subject.summary}`}
                path={`/${subject.slug}`}
                image={subject.image}
                schema={schema}
            />
            <PageHero
                kicker={subject.kicker}
                title={subject.title}
                subtitle={subject.summary}
                image={subject.image}
            />
            <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: subject.title }]} />

            <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Curriculum</div>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#0F2744] mb-6">What we cover in {subject.title}</h2>
                        <ul className="grid sm:grid-cols-2 gap-3">
                            {subject.topics.map((t, i) => (
                                <li key={t} data-testid={`topic-${i}`} className="bg-white border border-[#0F2744]/8 rounded-sm p-4 flex items-start gap-3">
                                    <span className="w-7 h-7 rounded-sm bg-[#D4A93A]/15 text-[#D4A93A] grid place-items-center text-xs font-bold font-serif shrink-0">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="text-sm text-[#0F2744] font-medium">{t}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-12">
                            <h3 className="font-serif text-2xl text-[#0F2744] mb-3">Our teaching approach</h3>
                            <p className="text-[#4A5568] leading-relaxed">
                                Every topic in {subject.title} is taught from first principles. We start with the <strong className="text-[#0F2744]">why</strong>, then move to the <strong className="text-[#0F2744]">how</strong>, and end with rigorous practice. No memorisation. No shortcuts. Just clarity.
                            </p>
                            <p className="text-[#4A5568] leading-relaxed mt-4">
                                Each class is followed by structured practice questions, weekly assessments and personalised feedback. Parents receive monthly progress reports so you always know where your child stands.
                            </p>
                        </div>
                    </div>

                    <aside className="bg-white border border-[#0F2744]/8 rounded-sm p-6 h-fit md:sticky md:top-24">
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-2">Quick Facts</div>
                        <h3 className="font-serif text-xl text-[#0F2744] mb-4">{subject.title} Program</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between"><span className="text-[#4A5568]">Mode</span><span className="text-[#0F2744] font-medium">Live Online</span></li>
                            <li className="flex justify-between"><span className="text-[#4A5568]">Batch Size</span><span className="text-[#0F2744] font-medium">Small (10-15)</span></li>
                            <li className="flex justify-between"><span className="text-[#4A5568]">Boards</span><span className="text-[#0F2744] font-medium">CBSE, ISC, HBSE</span></li>
                            <li className="flex justify-between"><span className="text-[#4A5568]">Includes</span><span className="text-[#0F2744] font-medium">CUET Prep</span></li>
                        </ul>
                        <Link to="/contact" data-testid="subject-demo-btn" className="mt-6 block text-center bg-[#0F2744] text-white hover:bg-[#1E4F8C] transition-colors rounded-sm px-5 py-3 text-sm font-medium">
                            Book Free Demo
                        </Link>
                    </aside>
                </div>
            </section>

            <SampleQuestion q={SAMPLE_QUESTIONS[subject.slug]} />

            <CTABanner text={`Strong ${subject.title} concepts. Confident exam performance.`} />
        </>
    );
}
