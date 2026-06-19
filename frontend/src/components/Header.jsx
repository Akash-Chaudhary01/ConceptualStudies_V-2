import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { SITE, ASSETS } from "../lib/content";

const NAV = [
    { to: "/", label: "Home" },
    { to: "/about-mentor", label: "About Mentor" },
    { to: "/accountancy", label: "Accountancy" },
    { to: "/economics", label: "Economics" },
    { to: "/business-studies", label: "Business Studies" },
    { to: "/crash-courses", label: "Crash Courses" },
    { to: "/cuet-preparation", label: "CUET" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            data-testid="site-header"
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                scrolled
                    ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_24px_rgba(15,39,68,0.08)] border-b border-[#0F2744]/10"
                    : "bg-white/70 backdrop-blur-md border-b border-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 flex items-center justify-between h-16 md:h-20">
                <Link to="/" data-testid="logo-link" className="flex items-center group">
                    <img
                        src={ASSETS.logo}
                        alt="Conceptual Studies"
                        className="h-12 md:h-14 w-auto object-contain"
                    />
                </Link>

                <nav className="hidden lg:flex items-center gap-1">
                    {NAV.map((n) => (
                        <NavLink
                            key={n.to}
                            to={n.to}
                            data-testid={`nav-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
                            className={({ isActive }) =>
                                `px-3 py-2 text-sm font-medium transition-colors rounded-sm ${
                                    isActive
                                        ? "text-[#0F2744]"
                                        : "text-[#4A5568] hover:text-[#0F2744]"
                                }`
                            }
                            end={n.to === "/"}
                        >
                            {n.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <a
                        href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                        data-testid="header-call-link"
                        className="hidden xl:flex items-center gap-2 text-sm text-[#0F2744] font-medium hover:text-[#1E4F8C] whitespace-nowrap"
                    >
                        <Phone className="w-4 h-4" /> {SITE.phone}
                    </a>
                    <Link
                        to="/contact"
                        data-testid="header-demo-btn"
                        className="bg-[#0F2744] text-white hover:bg-[#1E4F8C] transition-colors rounded-sm px-5 py-2.5 text-sm font-medium"
                    >
                        Book Free Demo
                    </Link>
                </div>

                <button
                    className="lg:hidden p-2 text-[#0F2744]"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    data-testid="mobile-menu-toggle"
                >
                    {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {open && (
                <div className="lg:hidden border-t border-[#0F2744]/10 bg-white">
                    <nav className="px-5 py-4 flex flex-col gap-1">
                        {NAV.map((n) => (
                            <NavLink
                                key={n.to}
                                to={n.to}
                                end={n.to === "/"}
                                onClick={() => setOpen(false)}
                                data-testid={`mobile-nav-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
                                className={({ isActive }) =>
                                    `px-3 py-3 text-sm font-medium rounded-sm ${
                                        isActive ? "bg-[#0F2744]/5 text-[#0F2744]" : "text-[#4A5568]"
                                    }`
                                }
                            >
                                {n.label}
                            </NavLink>
                        ))}
                        <Link
                            to="/contact"
                            onClick={() => setOpen(false)}
                            data-testid="mobile-demo-btn"
                            className="mt-2 bg-[#0F2744] text-white text-center rounded-sm px-5 py-3 text-sm font-medium"
                        >
                            Book Free Demo
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
