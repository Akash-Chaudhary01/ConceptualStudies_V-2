import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { Breadcrumbs, CTABanner } from "./SubjectPage";
import api from "../lib/api";
import { Clock, ArrowLeft, Share2, MessageCircle, Twitter, Facebook, Link2, Check, ChevronRight } from "lucide-react";
import { ASSETS, SITE } from "../lib/content";

// Minimal markdown -> HTML
function mdToHtml(md) {
    if (!md) return "";
    const lines = md.split("\n");
    const out = [];
    let inList = false, listType = null, inTable = false, tableRows = [];
    const flushList = () => { if (inList) { out.push(`</${listType}>`); inList = false; listType = null; } };
    const flushTable = () => {
        if (inTable && tableRows.length) {
            const header = tableRows[0];
            const body = tableRows.slice(2);
            out.push("<table>");
            out.push("<thead><tr>" + header.map((c) => `<th>${c.trim()}</th>`).join("") + "</tr></thead>");
            out.push("<tbody>" + body.map((row) => `<tr>${row.map((c) => `<td>${inline(c.trim())}</td>`).join("")}</tr>`).join("") + "</tbody>");
            out.push("</table>");
        }
        inTable = false; tableRows = [];
    };
    const inline = (s) =>
        s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
         .replace(/\*([^*]+)\*/g, "<em>$1</em>")
         .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    lines.forEach((raw) => {
        const line = raw.trimEnd();
        if (/^\s*$/.test(line)) { flushList(); flushTable(); return; }
        if (line.startsWith("|")) {
            if (!inTable) inTable = true;
            const cells = line.split("|").filter((c, i, a) => i !== 0 && i !== a.length - 1);
            tableRows.push(cells); return;
        } else flushTable();
        if (line.startsWith("### ")) { flushList(); out.push(`<h3>${inline(line.slice(4))}</h3>`); return; }
        if (line.startsWith("## ")) { flushList(); out.push(`<h2>${inline(line.slice(3))}</h2>`); return; }
        if (line.startsWith("# ")) { flushList(); out.push(`<h2>${inline(line.slice(2))}</h2>`); return; }
        if (/^\d+\.\s/.test(line)) {
            if (!inList || listType !== "ol") { flushList(); out.push("<ol>"); inList = true; listType = "ol"; }
            out.push(`<li>${inline(line.replace(/^\d+\.\s/, ""))}</li>`); return;
        }
        if (/^[-*]\s/.test(line)) {
            if (!inList || listType !== "ul") { flushList(); out.push("<ul>"); inList = true; listType = "ul"; }
            out.push(`<li>${inline(line.slice(2))}</li>`); return;
        }
        flushList();
        out.push(`<p>${inline(line)}</p>`);
    });
    flushList(); flushTable();
    return out.join("\n");
}

export default function BlogPost() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setLoading(true);
        Promise.all([api.get(`/blog/${slug}`), api.get("/blog")])
            .then(([postRes, allRes]) => {
                setPost(postRes.data);
                const rel = allRes.data
                    .filter((p) => p.slug !== postRes.data.slug)
                    .sort((a, b) => (a.category === postRes.data.category ? -1 : 1))
                    .slice(0, 3);
                setRelated(rel);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [slug]);

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareTitle = post?.title || "";

    const doShare = (kind) => {
        const enc = encodeURIComponent(shareUrl);
        const t = encodeURIComponent(shareTitle);
        const urls = {
            whatsapp: `https://wa.me/?text=${t}%20${enc}`,
            twitter: `https://twitter.com/intent/tweet?text=${t}&url=${enc}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc}`,
        };
        if (urls[kind]) window.open(urls[kind], "_blank", "noopener,noreferrer");
    };

    const copyLink = async () => {
        try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
    };

    if (loading) return <div className="max-w-3xl mx-auto px-5 py-32 text-center text-[#4A5568]">Loading...</div>;
    if (!post) return (
        <div className="max-w-3xl mx-auto px-5 py-32 text-center">
            <h1 className="font-serif text-3xl text-[#0F2744] mb-3">Post not found</h1>
            <Link to="/blog" className="text-[#1E4F8C] underline">Back to blog</Link>
        </div>
    );

    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.cover_image,
        "datePublished": post.created_at,
        "dateModified": post.updated_at,
        "author": { "@type": "Person", "name": post.author },
        "publisher": { "@type": "Organization", "name": "Conceptual Studies" },
    };

    return (
        <>
            <SEO title={post.meta_title || post.title} description={post.meta_description || post.excerpt} path={`/blog/${post.slug}`} image={post.cover_image} schema={schema} />
            <Breadcrumbs items={[{ to: "/", label: "Home" }, { to: "/blog", label: "Blog" }, { label: post.title }]} />

            <article className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16">
                <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#4A5568] hover:text-[#0F2744] mb-6">
                    <ArrowLeft className="w-4 h-4" /> All articles
                </Link>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#D4A93A] font-semibold mb-3">{post.category}</div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0F2744] leading-[1.1]">{post.title}</h1>
                <div className="mt-5 flex items-center gap-4 text-sm text-[#4A5568]">
                    <span>By <strong className="text-[#0F2744]">{post.author}</strong></span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.read_time}</span>
                </div>

                <div className="my-8 rounded-sm overflow-hidden">
                    <img src={post.cover_image} alt={post.title} className="w-full h-72 md:h-96 object-cover" />
                </div>

                <div className="prose-editorial" dangerouslySetInnerHTML={{ __html: mdToHtml(post.content) }} />

                {/* Share strip */}
                <div className="mt-12 border-t border-[#0F2744]/10 pt-6 flex items-center justify-between flex-wrap gap-4">
                    <span className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#4A5568] font-semibold"><Share2 className="w-4 h-4" /> Share this</span>
                    <div className="flex gap-2">
                        <ShareBtn onClick={() => doShare("whatsapp")} icon={MessageCircle} label="WhatsApp" color="#25D366" testid="share-whatsapp" />
                        <ShareBtn onClick={() => doShare("twitter")} icon={Twitter} label="Twitter" color="#1DA1F2" testid="share-twitter" />
                        <ShareBtn onClick={() => doShare("facebook")} icon={Facebook} label="Facebook" color="#1877F2" testid="share-facebook" />
                        <ShareBtn onClick={copyLink} icon={copied ? Check : Link2} label={copied ? "Copied" : "Copy"} color="#0F2744" testid="share-copy" />
                    </div>
                </div>

                {/* Author card */}
                <div className="mt-10 bg-white border border-[#0F2744]/10 rounded-sm p-6 md:p-7 flex flex-col sm:flex-row gap-5 items-start">
                    <img src={ASSETS.mentor} alt={post.author} className="w-20 h-20 object-cover object-top rounded-sm bg-[#F4F6FB]" />
                    <div className="flex-1">
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold">Written by</div>
                        <h3 className="font-serif text-2xl text-[#0F2744]">{post.author}</h3>
                        <p className="text-xs tracking-[0.15em] uppercase text-[#4A5568] mt-0.5">PhD Scholar · NET JRF · SRF · CA Intermediate</p>
                        <p className="mt-2 text-sm text-[#4A5568] leading-relaxed">10+ years teaching Class 11, Class 12 Commerce and CUET aspirants. Founder of Conceptual Studies.</p>
                        <Link to="/about-mentor" className="mt-2 inline-flex items-center gap-1 text-sm text-[#1E4F8C] font-medium hover:gap-2 transition-all">Read full bio <ChevronRight className="w-4 h-4" /></Link>
                    </div>
                </div>
            </article>

            {/* Related posts */}
            {related.length > 0 && (
                <section data-testid="related-posts" className="bg-white border-t border-[#0F2744]/10 py-16 md:py-20">
                    <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
                        <div className="mb-8">
                            <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-2">Keep Reading</div>
                            <h2 className="font-serif text-3xl text-[#0F2744]">Related articles</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {related.map((r) => (
                                <Link key={r.id} to={`/blog/${r.slug}`} data-testid={`related-${r.slug}`} className="group bg-[#FAFAFC] border border-[#0F2744]/8 rounded-sm overflow-hidden hover:-translate-y-1 hover:shadow-[0_14px_38px_rgba(15,39,68,0.12)] transition-all">
                                    <div className="h-36 overflow-hidden">
                                        <img src={r.cover_image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-5">
                                        <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4A93A] font-semibold mb-2">{r.category}</div>
                                        <h3 className="font-serif text-lg text-[#0F2744] leading-snug group-hover:text-[#1E4F8C]">{r.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <CTABanner text="Ready to put concepts into practice? Book a free demo." />
        </>
    );
}

const ShareBtn = ({ onClick, icon: Icon, label, color, testid }) => (
    <button onClick={onClick} data-testid={testid} aria-label={label} className="w-10 h-10 grid place-items-center rounded-sm border border-[#0F2744]/10 hover:border-[#0F2744]/30 hover:bg-[#FAFAFC] transition" style={{ color }}>
        <Icon className="w-4 h-4" />
    </button>
);
