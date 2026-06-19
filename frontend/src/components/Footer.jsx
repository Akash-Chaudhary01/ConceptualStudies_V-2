import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { SITE } from "../lib/content";

export default function Footer() {
    return (
        <footer data-testid="site-footer" className="bg-[#0F2744] text-white/80 mt-20">
            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-sm bg-[#D4A93A] grid place-items-center text-[#0F2744] font-serif font-bold text-lg">
                            CS
                        </div>
                        <div className="font-serif text-white text-xl">Conceptual Studies</div>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                        Premium online Commerce coaching across India by <span className="text-[#D4A93A]">Komal Sejwal</span> — concept-based learning that builds confidence and consistency.
                    </p>
                </div>

                <div>
                    <h4 className="font-serif text-white text-lg mb-4">Subjects</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/accountancy" className="hover:text-[#D4A93A]">Accountancy</Link></li>
                        <li><Link to="/economics" className="hover:text-[#D4A93A]">Economics</Link></li>
                        <li><Link to="/business-studies" className="hover:text-[#D4A93A]">Business Studies</Link></li>
                        <li><Link to="/crash-courses" className="hover:text-[#D4A93A]">Crash Courses</Link></li>
                        <li><Link to="/cuet-preparation" className="hover:text-[#D4A93A]">CUET Preparation</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-serif text-white text-lg mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-[#D4A93A]">Home</Link></li>
                        <li><Link to="/about-mentor" className="hover:text-[#D4A93A]">About Mentor</Link></li>
                        <li><Link to="/reviews" className="hover:text-[#D4A93A]">Reviews</Link></li>
                        <li><Link to="/blog" className="hover:text-[#D4A93A]">Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-[#D4A93A]">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-serif text-white text-lg mb-4">Contact</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                            <Phone className="w-4 h-4 mt-0.5 text-[#D4A93A]" />
                            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} data-testid="footer-phone" className="hover:text-[#D4A93A]">{SITE.phone}</a>
                        </li>
                        <li className="flex items-start gap-2">
                            <Mail className="w-4 h-4 mt-0.5 text-[#D4A93A]" />
                            <a href={`mailto:${SITE.email}`} data-testid="footer-email" className="hover:text-[#D4A93A]">{SITE.email}</a>
                        </li>
                        <li className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 text-[#D4A93A]" />
                            <span>Online Commerce Coaching Across India</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Instagram className="w-4 h-4 mt-0.5 text-[#D4A93A]" />
                            <a
                                href={SITE.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="footer-instagram"
                                className="hover:text-[#D4A93A]"
                            >
                                @conceptual.studies
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
                    <div>© {new Date().getFullYear()} Conceptual Studies. All rights reserved.</div>
                    <div className="flex gap-5">
                        <Link to="/admin/login" data-testid="footer-admin-link" className="hover:text-[#D4A93A]">Admin</Link>
                        <span>CBSE · ISC · HBSE · CUET</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
