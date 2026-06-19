import { useParams, Navigate } from "react-router-dom";
import SEO from "../components/SEO";
import { PageHero, Breadcrumbs, CTABanner } from "./SubjectPage";
import DemoForm from "../components/DemoForm";
import { CITIES, SUBJECTS, WHY_US } from "../lib/content";
import { CheckCircle2, MapPin } from "lucide-react";

export default function CityPage() {
    const { city } = useParams();
    const data = CITIES.find((c) => c.slug === city);
    if (!data) return <Navigate to="/" replace />;

    const schema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": `Conceptual Studies — Commerce Coaching in ${data.name}`,
        "description": `Online Commerce coaching for Class 11, Class 12 and CUET students in ${data.name}, ${data.region}.`,
        "areaServed": { "@type": "City", "name": data.name },
    };

    return (
        <>
            <SEO
                title={`Commerce Coaching in ${data.name} — Accountancy, Economics, Business Studies`}
                description={`Premium online Commerce coaching in ${data.name} (${data.region}) for Class 11 and Class 12. Accountancy, Economics, Business Studies and CUET preparation by Komal Sejwal.`}
                path={`/cities/${data.slug}`}
                schema={schema}
            />
            <PageHero
                kicker={`${data.region} · Online`}
                title={`Commerce Coaching in ${data.name}`}
                subtitle={`Online Accountancy, Economics and Business Studies coaching for Class 11, Class 12 and CUET aspirants across ${data.name} — from ${data.focus}.`}
            />
            <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: data.name }]} />

            <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-20">
                <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
                    <div className="lg:col-span-2 prose-editorial">
                        <h2>Why students in {data.name} choose Conceptual Studies</h2>
                        <p>
                            Commerce students in <strong>{data.name}</strong> face a particular challenge — board syllabus depth combined with the new CUET MCQ pattern. Most local tuitions teach to memorise. We don't. We teach the <strong>why</strong> behind every entry, every formula, every principle.
                        </p>
                        <p>
                            Our classes are fully online and live. Students from <strong>{data.focus}</strong> attend the same batches as students across India — small batches, personal attention, and a recorded library for revision. No commute. No compromise on quality.
                        </p>

                        <h3>What you get</h3>
                        <ul>
                            <li>Live online classes via Zoom — 5–6 days a week</li>
                            <li>Recordings of every class available within hours</li>
                            <li>Weekly assessments + detailed feedback</li>
                            <li>Monthly parent-teacher meetings</li>
                            <li>Free Q&A doubt-clearing sessions every week</li>
                            <li>Full coverage of CBSE, ISC, HBSE and State Boards</li>
                            <li>Dedicated CUET Commerce Preparation track</li>
                        </ul>

                        <h3>Subjects taught</h3>
                        <p>Full syllabus coverage for:</p>
                        <ul>
                            {SUBJECTS.map((s) => (
                                <li key={s.slug}><strong>{s.title}</strong> — {s.summary}</li>
                            ))}
                        </ul>

                        <h3>How it works for {data.name} students</h3>
                        <p>
                            Step 1 — Book a free demo class. Pick any evening slot. Step 2 — Attend one full class with Komal and judge for yourself. Step 3 — If concepts feel clearer, enroll. If not, no commitment — keep the free study plan we share.
                        </p>
                    </div>

                    <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
                        <div className="bg-white border border-[#0F2744]/10 rounded-sm p-6">
                            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">
                                <MapPin className="w-3.5 h-3.5" /> {data.region}
                            </div>
                            <h3 className="font-serif text-xl text-[#0F2744] mb-4">Why parents in {data.name} prefer us</h3>
                            <ul className="space-y-2">
                                {WHY_US.slice(0, 5).map((w) => (
                                    <li key={w.title} className="flex items-start gap-2 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-[#D4A93A] mt-0.5 shrink-0" />
                                        <span className="text-[#0F2744] font-medium">{w.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <DemoForm compact />
                    </aside>
                </div>
            </section>

            <CTABanner text={`Looking for trusted Commerce coaching in ${data.name}? Start with a free demo.`} />
        </>
    );
}
