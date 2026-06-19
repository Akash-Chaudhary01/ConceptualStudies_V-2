import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { Breadcrumbs, CTABanner } from "./SubjectPage";
import api from "../lib/api";
import { Clock, ArrowLeft } from "lucide-react";

// Minimal markdown -> HTML for our seeded content (headings, lists, paragraphs, bold, links, tables)
function mdToHtml(md) {
    if (!md) return "";
    const lines = md.split("\n");
    const out = [];
    let inList = false;
    let listType = null;
    let inTable = false;
    let tableRows = [];

    const flushList = () => {
        if (inList) { out.push(`</${listType}>`); inList = false; listType = null; }
    };
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
        s
            .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
            .replace(/\*([^*]+)\*/g, "<em>$1</em>")
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    lines.forEach((raw) => {
        const line = raw.trimEnd();
        if (/^\s*$/.test(line)) { flushList(); flushTable(); return; }

        if (line.startsWith("|")) {
            if (!inTable) inTable = true;
            const cells = line.split("|").filter((c, i, a) => i !== 0 && i !== a.length - 1);
            tableRows.push(cells);
            return;
        } else flushTable();

        if (line.startsWith("### ")) { flushList(); out.push(`<h3>${inline(line.slice(4))}</h3>`); return; }
        if (line.startsWith("## ")) { flushList(); out.push(`<h2>${inline(line.slice(3))}</h2>`); return; }
        if (line.startsWith("# ")) { flushList(); out.push(`<h2>${inline(line.slice(2))}</h2>`); return; }

        if (/^\d+\.\s/.test(line)) {
            if (!inList || listType !== "ol") { flushList(); out.push("<ol>"); inList = true; listType = "ol"; }
            out.push(`<li>${inline(line.replace(/^\d+\.\s/, ""))}</li>`);
            return;
        }
        if (/^[-*]\s/.test(line)) {
            if (!inList || listType !== "ul") { flushList(); out.push("<ul>"); inList = true; listType = "ul"; }
            out.push(`<li>${inline(line.slice(2))}</li>`);
            return;
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get(`/blog/${slug}`).then((r) => { setPost(r.data); setLoading(false); }).catch(() => setLoading(false));
    }, [slug]);

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
            </article>

            <CTABanner text="Ready to put concepts into practice? Book a free demo." />
        </>
    );
}
