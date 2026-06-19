import { useEffect } from "react";

const SITE_URL = process.env.REACT_APP_BACKEND_URL || "";
const BRAND = "Conceptual Studies";

export default function SEO({ title, description, path = "/", schema, image }) {
    useEffect(() => {
        const fullTitle = title ? `${title} | ${BRAND}` : `${BRAND} — Strong Concepts. Confident Results.`;
        document.title = fullTitle;

        const setMeta = (name, content, isProperty = false) => {
            const attr = isProperty ? "property" : "name";
            let tag = document.querySelector(`meta[${attr}="${name}"]`);
            if (!tag) {
                tag = document.createElement("meta");
                tag.setAttribute(attr, name);
                document.head.appendChild(tag);
            }
            tag.setAttribute("content", content);
        };

        const desc = description || "Premium online commerce coaching across India by Komal Sejwal — Accountancy, Economics, Business Studies, Crash Courses and CUET preparation for Class 11 and Class 12.";
        setMeta("description", desc);
        setMeta("og:title", fullTitle, true);
        setMeta("og:description", desc, true);
        setMeta("og:type", "website", true);
        setMeta("og:url", `${SITE_URL}${path}`, true);
        if (image) setMeta("og:image", image, true);
        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", fullTitle);
        setMeta("twitter:description", desc);

        // Canonical
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", `${SITE_URL}${path}`);

        // JSON-LD schema
        const existing = document.getElementById("page-schema");
        if (existing) existing.remove();
        if (schema) {
            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.id = "page-schema";
            script.text = JSON.stringify(schema);
            document.head.appendChild(script);
        }
    }, [title, description, path, image, JSON.stringify(schema)]);

    return null;
}
