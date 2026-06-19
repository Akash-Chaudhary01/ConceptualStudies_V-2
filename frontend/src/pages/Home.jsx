import { Link } from "react-router-dom";
import { ArrowRight, Phone, CheckCircle2, Star, ChevronRight } from "lucide-react";
import SEO from "../components/SEO";
import TrustBar from "../components/TrustBar";
import DemoForm from "../components/DemoForm";
import { SITE, SUBJECTS, WHY_US, JOURNEY, OUTCOMES, FAQS, CRASH_COURSES, CUET_FEATURES, ASSETS } from "../lib/content";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

const BADGES = ["CBSE", "ISC", "HBSE", "State Boards", "CUET", "Online Across India"];

export default function Home() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        api.get("/reviews").then((r) => setReviews(r.data)).catch(() => {});
    }, []);

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "EducationalOrganization",
                "name": "Conceptual Studies",
                "url": process.env.REACT_APP_BACKEND_URL,
                "telephone": SITE.phone,
                "email": SITE.email,
                "description": "Premium online commerce coaching across India for Class 11, Class 12 and CUET aspirants.",
                "areaServed": "India",
            },
            {
                "@type": "Person",
                "name": "Komal Sejwal",
                "jobTitle": "Commerce Educator & Mentor",
                "description": "PhD Scholar, NET JRF, SRF, CA Intermediate with 10+ years of teaching experience.",
            },
            {
                "@type": "FAQPage",
                "mainEntity": FAQS.map((f) => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a },
                })),
            },
        ],
    };

    return (
        <>
            <SEO
                title="Online Commerce Coaching for Class 11, Class 12 & CUET"
                description="Conceptual Studies — Premium online Commerce coaching by Komal Sejwal across India. Accountancy, Economics, Business Studies, Crash Courses & CUET preparation with concept-based learning."
                path="/"
                schema={schema}
            />

            {/* HERO */}
            <section data-testid="hero-section" className="relative overflow-hidden isolate">
                <div className="absolute inset-0 -z-10">
                    <img
                        src="https://images.pexels.com/photos/8197503/pexels-photo-8197503.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F2744] via-[#0F2744]/95 to-[#0F2744]/70" />
                </div>

                <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-20 md:py-28 lg:py-36 text-white relative">
                    <div className="max-w-3xl reveal">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4A93A] font-semibold">Conceptual Studies</span>
                            <span className="text-[#D4A93A]">·</span>
                            <span className="text-[10px] tracking-[0.3em] uppercase text-white/70">Est. by Komal Sejwal</span>
                        </div>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                            Strong Concepts Today.<br />
                            <span className="text-[#D4A93A]">Confident Results</span> Tomorrow.
                        </h1>
                        <p className="mt-6 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed font-light">
                            Master Accountancy, Economics and Business Studies through concept-based learning, personal attention and exam-focused preparation — designed for Class 11, Class 12 and CUET aspirants across India.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-2.5">
                            {BADGES.map((b) => (
                                <span key={b} data-testid={`badge-${b.toLowerCase().replace(/\s+/g, "-")}`} className="text-[11px] tracking-[0.18em] uppercase font-medium px-3 py-1.5 border border-[#D4A93A]/40 text-[#D4A93A] rounded-sm">
                                    {b}
                                </span>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <Link
                                to="/contact"
                                data-testid="hero-book-demo-btn"
                                className="bg-[#D4A93A] text-[#0F2744] font-semibold hover:bg-[#c2982f] transition-colors rounded-sm px-7 py-3.5 text-sm flex items-center gap-2"
                            >
                                Book Free Demo <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                                data-testid="hero-talk-mentor-btn"
                                className="bg-white/10 backdrop-blur border border-white/30 text-white hover:bg-white/20 transition-colors rounded-sm px-7 py-3.5 text-sm font-medium flex items-center gap-2"
                            >
                                <Phone className="w-4 h-4" /> Talk To Mentor
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <TrustBar />

            {/* About Mentor Preview */}
            <section data-testid="about-mentor-preview" className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-20 md:py-28">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="reveal">
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Your Mentor</div>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F2744] leading-tight">Komal Sejwal</h2>
                        <p className="mt-2 text-sm tracking-[0.15em] uppercase text-[#4A5568] font-medium">
                            PhD Scholar · NET JRF · SRF · CA Intermediate
                        </p>
                        <blockquote className="mt-6 border-l-2 border-[#D4A93A] pl-5 font-serif text-xl md:text-2xl text-[#0F2744] italic leading-snug">
                            "If you understand the concept, you can solve any question."
                        </blockquote>
                        <p className="mt-6 text-[#4A5568] leading-relaxed">
                            With over a decade of teaching experience, Komal positions herself not as a tuition teacher — but as a <strong className="text-[#0F2744]">Commerce Educator and Mentor</strong>. Her philosophy: clarity before practice, understanding before memorisation.
                        </p>
                        <Link
                            to="/about-mentor"
                            data-testid="about-mentor-link"
                            className="mt-6 inline-flex items-center gap-2 text-sm text-[#1E4F8C] font-medium hover:gap-3 transition-all"
                        >
                            Read more about Komal <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="relative max-w-sm mx-auto md:mx-0 md:ml-auto w-full">
                        <div className="absolute -top-3 -left-3 w-full h-full border-2 border-[#D4A93A] rounded-sm" />
                        <img
                            src={ASSETS.mentor}
                            alt="Komal Sejwal — Commerce Mentor"
                            className="relative w-full aspect-[4/5] object-cover object-top rounded-sm shadow-[0_20px_60px_rgba(15,39,68,0.18)] bg-[#F4F6FB]"
                        />
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section data-testid="why-choose-us-section" className="bg-white py-20 md:py-28 border-y border-[#0F2744]/10">
                <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
                    <div className="max-w-2xl mb-14">
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Why Us</div>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F2744] leading-tight">
                            Why Students & Parents Choose Conceptual Studies
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {WHY_US.map((w, i) => (
                            <div
                                key={w.title}
                                data-testid={`why-card-${i}`}
                                className="bg-white border border-[#0F2744]/8 rounded-sm p-7 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,39,68,0.12)] transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 bg-[#0F2744]/5 group-hover:bg-[#D4A93A]/15 transition-colors rounded-sm grid place-items-center mb-5">
                                    <span className="font-serif text-[#D4A93A] text-lg font-bold">0{i + 1}</span>
                                </div>
                                <h3 className="font-serif text-2xl text-[#0F2744] mb-2">{w.title}</h3>
                                <p className="text-sm text-[#4A5568] leading-relaxed">{w.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subjects */}
            <section data-testid="subjects-section" className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-20 md:py-28">
                <div className="max-w-2xl mb-14">
                    <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Subjects Offered</div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F2744] leading-tight">Full syllabus, deeply taught</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SUBJECTS.map((s) => (
                        <Link
                            key={s.slug}
                            to={`/${s.slug}`}
                            data-testid={`subject-card-${s.slug}`}
                            className="group bg-white border border-[#0F2744]/8 rounded-sm overflow-hidden hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,39,68,0.15)] transition-all duration-300"
                        >
                            <div className="h-44 overflow-hidden relative">
                                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2744]/60 to-transparent" />
                                <div className="absolute bottom-3 left-4 text-[10px] tracking-[0.2em] uppercase text-[#D4A93A] font-semibold">{s.kicker}</div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-serif text-2xl text-[#0F2744] mb-2">{s.title}</h3>
                                <p className="text-sm text-[#4A5568] leading-relaxed mb-4">{s.summary}</p>
                                <span className="inline-flex items-center gap-1 text-sm text-[#1E4F8C] font-medium group-hover:gap-2 transition-all">
                                    Explore curriculum <ChevronRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Crash Courses preview */}
            <section data-testid="crash-courses-preview" className="bg-[#0F2744] text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
                    <img src="https://images.pexels.com/photos/5506217/pexels-photo-5506217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 relative">
                    <div className="max-w-2xl mb-14">
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Crash Courses</div>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">Targeted programs for specific chapters & exam phases</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {CRASH_COURSES.map((c, i) => (
                            <div key={c.title} data-testid={`crash-card-${i}`} className="bg-white/5 backdrop-blur border border-white/10 rounded-sm p-6 hover:bg-white/10 transition">
                                <div className="text-[10px] tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-2">{c.duration}</div>
                                <h3 className="font-serif text-xl text-white mb-2">{c.title}</h3>
                                <p className="text-sm text-white/70 leading-relaxed">{c.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10">
                        <Link to="/crash-courses" data-testid="crash-courses-link" className="inline-flex items-center gap-2 text-sm text-[#D4A93A] font-medium hover:gap-3 transition-all">
                            View all crash courses <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CUET Preview */}
            <section data-testid="cuet-preview" className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-20 md:py-28">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">CUET Preparation</div>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F2744] leading-tight">Commerce Domain — done right</h2>
                        <p className="mt-5 text-[#4A5568] leading-relaxed">
                            A focused program for CUET UG aspirants targeting the Commerce domain — Accountancy, Business Studies and Economics — with weekly mocks and detailed analysis.
                        </p>
                        <Link to="/cuet-preparation" data-testid="cuet-cta-btn" className="mt-7 inline-flex items-center gap-2 bg-[#0F2744] text-white hover:bg-[#1E4F8C] transition-colors rounded-sm px-7 py-3.5 text-sm font-medium">
                            Explore CUET Program <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <ul className="space-y-3">
                        {CUET_FEATURES.map((f) => (
                            <li key={f} className="flex items-start gap-3 p-4 bg-white border border-[#0F2744]/8 rounded-sm">
                                <CheckCircle2 className="w-5 h-5 text-[#D4A93A] mt-0.5 shrink-0" />
                                <span className="text-sm text-[#0F2744] font-medium">{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Learning Methodology */}
            <section data-testid="methodology-section" className="bg-white py-20 md:py-28 border-y border-[#0F2744]/10">
                <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
                    <div className="max-w-2xl mb-14">
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Learning Methodology</div>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F2744] leading-tight">The Student Journey</h2>
                    </div>

                    <div className="relative">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#0F2744]/15 md:-translate-x-px" />
                        <div className="space-y-12">
                            {JOURNEY.map((j, i) => (
                                <div key={j.step} className={`relative grid md:grid-cols-2 gap-6 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                                    <div className={`pl-12 md:pl-0 md:px-10 ${i % 2 === 1 ? "[direction:ltr] md:text-right" : ""}`}>
                                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold">Step {i + 1}</div>
                                        <h3 className="font-serif text-2xl md:text-3xl text-[#0F2744] mt-1">{j.step}</h3>
                                        <p className="text-sm text-[#4A5568] mt-2 leading-relaxed">{j.desc}</p>
                                    </div>
                                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[#D4A93A] ring-4 ring-[#FAFAFC] -translate-x-1/2 md:-translate-x-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Outcomes */}
            <section data-testid="outcomes-section" className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-20 md:py-28">
                <div className="max-w-2xl mb-12">
                    <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Outcomes</div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F2744] leading-tight">What students gain</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {OUTCOMES.map((o, i) => (
                        <div key={o} data-testid={`outcome-${i}`} className="bg-white border border-[#0F2744]/8 rounded-sm p-6 flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#D4A93A] mt-0.5 shrink-0" />
                            <span className="text-base text-[#0F2744] font-medium">{o}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reviews */}
            <section data-testid="reviews-section" className="bg-[#F4F6FB] py-20 md:py-28 border-y border-[#0F2744]/10">
                <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
                    <div className="max-w-2xl mb-14">
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Student Reviews</div>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F2744] leading-tight">What students say</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reviews.map((r, i) => (
                            <div key={r.id || i} data-testid={`review-card-${i}`} className="bg-white border border-[#0F2744]/8 rounded-sm p-7 flex flex-col">
                                <div className="flex gap-0.5 mb-4">
                                    {Array.from({ length: r.rating || 5 }).map((_, j) => (
                                        <Star key={j} className="w-4 h-4 fill-[#D4A93A] text-[#D4A93A]" />
                                    ))}
                                </div>
                                <p className="text-[#0F2744] leading-relaxed text-base mb-5 flex-1">"{r.text}"</p>
                                <div className="pt-4 border-t border-[#0F2744]/8">
                                    <div className="font-serif text-lg text-[#0F2744]">{r.name}</div>
                                    {r.role && <div className="text-xs tracking-[0.15em] uppercase text-[#4A5568] mt-1">{r.role}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section data-testid="faq-section" className="max-w-4xl mx-auto px-5 md:px-8 py-20 md:py-28">
                <div className="mb-12 text-center">
                    <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">FAQ</div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F2744]">Common questions</h2>
                </div>
                <Accordion type="single" collapsible className="space-y-3">
                    {FAQS.map((f, i) => (
                        <AccordionItem key={i} value={`f${i}`} data-testid={`faq-item-${i}`} className="bg-white border border-[#0F2744]/10 rounded-sm px-5">
                            <AccordionTrigger className="text-left text-base md:text-lg font-semibold font-sans text-[#0F2744] hover:no-underline py-5">
                                {f.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-[#4A5568] pb-5 leading-relaxed text-base">
                                {f.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* Demo Form */}
            <section id="demo" data-testid="home-demo-section" className="bg-white py-20 md:py-28 border-t border-[#0F2744]/10">
                <div className="max-w-5xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10 items-start">
                    <div>
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">Get Started</div>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F2744] leading-tight">Book your free demo class</h2>
                        <p className="mt-4 text-[#4A5568] leading-relaxed">
                            Take one class with us. See the difference concept-based learning makes. Then decide.
                        </p>
                        <div className="mt-6 space-y-3">
                            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-[#0F2744] hover:text-[#1E4F8C]" data-testid="demo-section-phone">
                                <Phone className="w-4 h-4 text-[#D4A93A]" /> {SITE.phone}
                            </a>
                            <div className="text-sm text-[#4A5568]">{SITE.email}</div>
                        </div>
                    </div>
                    <DemoForm />
                </div>
            </section>
        </>
    );
}
