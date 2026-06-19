import SEO from "../components/SEO";
import { PageHero, Breadcrumbs, CTABanner } from "./SubjectPage";
import { CRASH_COURSES } from "../lib/content";

export default function CrashCourses() {
    return (
        <>
            <SEO
                title="Crash Courses for Commerce — Partnership, Company Accounts, Board Revision"
                description="Targeted crash courses for Class 11 & 12 Commerce — Partnership Accounts, Company Accounts, Board Revision, Exam Strategy and Last Minute Revision by Komal Sejwal."
                path="/crash-courses"
            />
            <PageHero kicker="Crash Courses" title="Targeted programs. Real results." subtitle="Focused crash courses designed for specific chapters and exam phases — from Partnership Accounts to last-minute revision." />
            <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Crash Courses" }]} />

            <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CRASH_COURSES.map((c, i) => (
                        <div key={c.title} data-testid={`crashpage-card-${i}`} className="bg-white border border-[#0F2744]/8 rounded-sm p-7 hover:-translate-y-1 hover:shadow-[0_14px_42px_rgba(15,39,68,0.12)] transition-all">
                            <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-3">{c.duration}</div>
                            <h3 className="font-serif text-2xl text-[#0F2744] mb-2">{c.title}</h3>
                            <p className="text-sm text-[#4A5568] leading-relaxed">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <CTABanner text="Pick a crash course. Strengthen the weakest link. Walk into the exam confident." />
        </>
    );
}
