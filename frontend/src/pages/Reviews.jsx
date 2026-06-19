import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { PageHero, Breadcrumbs, CTABanner } from "./SubjectPage";
import { ReviewSkeleton } from "../components/Skeletons";
import api from "../lib/api";
import { Star, BadgeCheck } from "lucide-react";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/reviews").then((r) => { setReviews(r.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Conceptual Studies Commerce Coaching",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": reviews.length || 6,
        },
        "review": reviews.map((r) => ({
            "@type": "Review",
            "reviewRating": { "@type": "Rating", "ratingValue": r.rating || 5 },
            "author": { "@type": "Person", "name": r.name },
            "reviewBody": r.text,
        })),
    };

    return (
        <>
            <SEO title="Student Reviews & Testimonials" description="Read what students of Conceptual Studies say about our Commerce coaching — concept clarity, board results and CUET success." path="/reviews" schema={schema} />
            <PageHero kicker="Student Reviews" title="Stories that matter" subtitle="Real reviews from real students. Sourced from Google." />
            <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Reviews" }]} />

            <section className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
                {loading ? <ReviewSkeleton count={4} /> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews.map((r) => (
                            <div key={r.id} data-testid={`reviews-card-${r.id}`} className="bg-white border border-[#0F2744]/8 rounded-sm p-7 relative">
                                {r.source && (
                                    <span className="absolute top-4 right-4 flex items-center gap-1 text-[10px] tracking-[0.18em] uppercase font-semibold text-[#1E4F8C]">
                                        <BadgeCheck className="w-3.5 h-3.5" /> {r.source} Review
                                    </span>
                                )}
                                <div className="flex gap-0.5 mb-4">
                                    {Array.from({ length: r.rating || 5 }).map((_, j) => (
                                        <Star key={j} className="w-4 h-4 fill-[#D4A93A] text-[#D4A93A]" />
                                    ))}
                                </div>
                                <p className="text-[#0F2744] leading-relaxed text-lg mb-5 font-serif italic">"{r.text}"</p>
                                <div className="pt-4 border-t border-[#0F2744]/8">
                                    <div className="font-serif text-lg text-[#0F2744]">{r.name}</div>
                                    {r.role && <div className="text-xs tracking-[0.15em] uppercase text-[#4A5568] mt-1">{r.role}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <CTABanner text="Be the next success story." />
        </>
    );
}
