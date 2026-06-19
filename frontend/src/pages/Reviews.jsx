import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { PageHero, Breadcrumbs, CTABanner } from "./SubjectPage";
import api from "../lib/api";
import { Star } from "lucide-react";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        api.get("/reviews").then((r) => setReviews(r.data)).catch(() => {});
    }, []);

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Conceptual Studies Commerce Coaching",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": reviews.length || 3,
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
            <PageHero kicker="Student Reviews" title="Stories that matter" subtitle="Real reviews from real students. No filters, no edits." />
            <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Reviews" }]} />

            <section className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((r) => (
                    <div key={r.id} data-testid={`reviews-card-${r.id}`} className="bg-white border border-[#0F2744]/8 rounded-sm p-7">
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
            </section>

            <CTABanner text="Be the next success story." />
        </>
    );
}
