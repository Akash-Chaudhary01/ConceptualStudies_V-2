import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { PageHero, Breadcrumbs } from "./SubjectPage";
import api from "../lib/api";
import { ChevronRight, Clock } from "lucide-react";

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/blog").then((r) => {
            setPosts(r.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    return (
        <>
            <SEO title="Commerce Blog — Accountancy, Economics & CUET Tips" description="Insights, study tips and exam strategies for Class 11, Class 12 Commerce and CUET aspirants — written by Komal Sejwal." path="/blog" />
            <PageHero kicker="The Blog" title="Notes from the mentor" subtitle="Long-form essays on Commerce concepts, exam strategy and study plans." />
            <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Blog" }]} />

            <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
                {loading ? (
                    <div className="text-center text-[#4A5568]">Loading posts...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((p) => (
                            <Link
                                key={p.id}
                                to={`/blog/${p.slug}`}
                                data-testid={`blog-card-${p.slug}`}
                                className="group bg-white border border-[#0F2744]/8 rounded-sm overflow-hidden hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(15,39,68,0.14)] transition-all"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4A93A] font-semibold mb-2">{p.category}</div>
                                    <h2 className="font-serif text-xl text-[#0F2744] leading-tight group-hover:text-[#1E4F8C] transition-colors">{p.title}</h2>
                                    <p className="mt-3 text-sm text-[#4A5568] leading-relaxed line-clamp-3">{p.excerpt}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs text-[#4A5568]"><Clock className="w-3 h-3" /> {p.read_time}</div>
                                        <span className="flex items-center gap-1 text-xs text-[#1E4F8C] font-medium">Read <ChevronRight className="w-3 h-3" /></span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
