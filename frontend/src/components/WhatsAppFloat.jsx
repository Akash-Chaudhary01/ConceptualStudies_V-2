import { MessageCircle } from "lucide-react";
import { SITE } from "../lib/content";

export default function WhatsAppFloat() {
    const url = `https://wa.me/${SITE.phoneDigits}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="whatsapp-float-btn"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5a] text-white w-14 h-14 rounded-full grid place-items-center shadow-[0_8px_28px_rgba(37,211,102,0.45)] transition-transform hover:-translate-y-0.5"
        >
            <MessageCircle className="w-6 h-6" fill="currentColor" />
        </a>
    );
}
