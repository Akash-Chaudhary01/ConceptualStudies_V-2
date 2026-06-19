import SEO from "../components/SEO";
import { PageHero, Breadcrumbs, CTABanner } from "./SubjectPage";
import { SITE } from "../lib/content";
import { CheckCircle2 } from "lucide-react";

export default function AboutMentor() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Komal Sejwal",
        "jobTitle": "Commerce Educator & Mentor",
        "description": "PhD Scholar, NET JRF, SRF, CA Intermediate with 10+ years of teaching Class 11, Class 12 Commerce and CUET aspirants.",
        "knowsAbout": ["Accountancy", "Economics", "Business Studies", "CUET Commerce"],
    };
    return (
        <>
            <SEO title="About Komal Sejwal — Commerce Mentor" description="Meet Komal Sejwal — PhD Scholar, NET JRF, SRF, CA Intermediate. A Commerce Educator and Mentor with 10+ years of teaching experience." path="/about-mentor" schema={schema} />
            <PageHero kicker="The Mentor" title="Komal Sejwal" subtitle="A Commerce Educator and Mentor — not a tuition teacher. Here's the story." />
            <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "About Mentor" }]} />

            <section className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-5 gap-10 lg:gap-16">
                <div className="md:col-span-2">
                    <div className="relative">
                        <div className="absolute -top-3 -left-3 w-full h-full border-2 border-[#D4A93A] rounded-sm" />
                        <img
                            src="https://images.pexels.com/photos/37811218/pexels-photo-37811218.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900"
                            alt="Komal Sejwal"
                            className="relative w-full h-auto object-cover rounded-sm shadow-[0_18px_50px_rgba(15,39,68,0.18)]"
                        />
                    </div>

                    <div className="mt-8 bg-white border border-[#0F2744]/8 rounded-sm p-6">
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Credentials</div>
                        <ul className="space-y-2">
                            {SITE.mentor.credentials.map((c) => (
                                <li key={c} className="flex items-center gap-2 text-sm text-[#0F2744] font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-[#D4A93A]" /> {c}
                                </li>
                            ))}
                            <li className="flex items-center gap-2 text-sm text-[#0F2744] font-medium pt-2 border-t border-[#0F2744]/8 mt-3">
                                <CheckCircle2 className="w-4 h-4 text-[#D4A93A]" /> {SITE.mentor.experience}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="md:col-span-3 prose-editorial">
                    <h2>Concept-first, always</h2>
                    <p>
                        I started teaching over a decade ago — not as a side hustle, but as a calling. After CA Intermediate and NET JRF, I realised something disturbing: most Commerce students were not failing because of intelligence. They were failing because of <strong>method</strong>. They were memorising entries without understanding them. Reciting principles without seeing their use. Solving questions without knowing why.
                    </p>
                    <p>
                        Conceptual Studies was born from that frustration. The premise is simple — <strong>if you understand the concept, you can solve any question</strong>. Not just the ones in the textbook. Not just the ones in the past 10 years' papers. Any question.
                    </p>

                    <h3>How my classes are different</h3>
                    <ul>
                        <li><strong>Concept before practice.</strong> We never start with "solve this question". We start with "why does this work?".</li>
                        <li><strong>Small batches.</strong> Every student is heard. Every doubt is addressed. Every test is reviewed.</li>
                        <li><strong>Structured pace.</strong> A clear monthly roadmap, mapped to the board calendar.</li>
                        <li><strong>Parent communication.</strong> Monthly progress reports. Direct access. No black-box coaching.</li>
                    </ul>

                    <h3>My philosophy</h3>
                    <blockquote className="border-l-2 border-[#D4A93A] pl-5 italic font-serif text-xl text-[#0F2744]">
                        "If you understand the concept, you can solve any question."
                    </blockquote>

                    <h3>Who I teach</h3>
                    <p>
                        Class 11 and Class 12 Commerce students. CUET aspirants. Across all major boards — CBSE, ISC, HBSE and State Boards. Online, across India.
                    </p>
                </div>
            </section>

            <CTABanner text="Want to experience the difference? Book a free demo." />
        </>
    );
}
