import { Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE } from "../lib/content";

export default function MobileStickyBar() {
    const waUrl = `https://wa.me/${SITE.phoneDigits}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
    return (
        <div data-testid="mobile-sticky-bar" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#0F2744]/12 shadow-[0_-8px_24px_rgba(15,39,68,0.08)] grid grid-cols-2 gap-px">
            <Link
                to="/contact"
                data-testid="msb-demo"
                className="bg-[#0F2744] text-white flex items-center justify-center gap-2 py-3.5 text-sm font-medium"
            >
                <Phone className="w-4 h-4" /> Book Free Demo
            </Link>
            <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="msb-whatsapp"
                className="bg-[#25D366] text-white flex items-center justify-center gap-2 py-3.5 text-sm font-medium"
            >
                <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
        </div>
    );
}
