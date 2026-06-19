import SEO from "../components/SEO";
import { PageHero, Breadcrumbs } from "./SubjectPage";
import DemoForm from "../components/DemoForm";
import { SITE } from "../lib/content";
import { Phone, Mail, MessageCircle, MapPin, Instagram } from "lucide-react";

export default function Contact() {
    return (
        <>
            <SEO title="Contact Us — Book a Free Demo" description="Contact Conceptual Studies for online Commerce coaching. Call +91 9910502275 or email info@conceptualstudies.in. Book a free demo class today." path="/contact" />
            <PageHero kicker="Contact" title="Let's begin with a free demo class" subtitle="Pick the channel you're most comfortable with. We respond within a few hours." />
            <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Contact" }]} />

            <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid lg:grid-cols-5 gap-10 items-start">
                <div className="lg:col-span-2 space-y-5">
                    <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} data-testid="contact-call-btn" className="block bg-white border border-[#0F2744]/8 rounded-sm p-6 hover:shadow-[0_12px_36px_rgba(15,39,68,0.1)] transition group">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#D4A93A]/15 grid place-items-center rounded-sm">
                                <Phone className="w-5 h-5 text-[#D4A93A]" />
                            </div>
                            <div>
                                <div className="text-xs tracking-[0.18em] uppercase text-[#4A5568] font-semibold">Call Now</div>
                                <div className="font-serif text-2xl text-[#0F2744] group-hover:text-[#1E4F8C]">{SITE.phone}</div>
                                <div className="text-xs text-[#4A5568] mt-1">Mon - Sat, 10am - 8pm IST</div>
                            </div>
                        </div>
                    </a>

                    <a href={`https://wa.me/${SITE.phoneDigits}?text=${encodeURIComponent(SITE.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp-btn" className="block bg-white border border-[#0F2744]/8 rounded-sm p-6 hover:shadow-[0_12px_36px_rgba(15,39,68,0.1)] transition group">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#25D366]/15 grid place-items-center rounded-sm">
                                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                            </div>
                            <div>
                                <div className="text-xs tracking-[0.18em] uppercase text-[#4A5568] font-semibold">WhatsApp</div>
                                <div className="font-serif text-2xl text-[#0F2744] group-hover:text-[#1E4F8C]">Chat now</div>
                                <div className="text-xs text-[#4A5568] mt-1">Fastest response</div>
                            </div>
                        </div>
                    </a>

                    <a href={`mailto:${SITE.email}`} data-testid="contact-email-btn" className="block bg-white border border-[#0F2744]/8 rounded-sm p-6 hover:shadow-[0_12px_36px_rgba(15,39,68,0.1)] transition group">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#1E4F8C]/15 grid place-items-center rounded-sm">
                                <Mail className="w-5 h-5 text-[#1E4F8C]" />
                            </div>
                            <div>
                                <div className="text-xs tracking-[0.18em] uppercase text-[#4A5568] font-semibold">Email</div>
                                <div className="font-serif text-xl text-[#0F2744] group-hover:text-[#1E4F8C] break-all">{SITE.email}</div>
                            </div>
                        </div>
                    </a>

                    <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" data-testid="contact-instagram-btn" className="block bg-white border border-[#0F2744]/8 rounded-sm p-6 hover:shadow-[0_12px_36px_rgba(15,39,68,0.1)] transition group">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] grid place-items-center rounded-sm">
                                <Instagram className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div className="text-xs tracking-[0.18em] uppercase text-[#4A5568] font-semibold">Instagram</div>
                                <div className="font-serif text-xl text-[#0F2744] group-hover:text-[#1E4F8C]">@conceptual.studies</div>
                                <div className="text-xs text-[#4A5568] mt-1">Follow for daily concept tips</div>
                            </div>
                        </div>
                    </a>

                    <div className="bg-[#0F2744] text-white rounded-sm p-6">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-[#D4A93A] mt-0.5" />
                            <div>
                                <div className="text-xs tracking-[0.18em] uppercase text-[#D4A93A] font-semibold">Reach</div>
                                <div className="font-serif text-xl mt-1">Online Commerce Coaching Across India</div>
                                <div className="text-sm text-white/70 mt-2">Delhi NCR · Gurgaon · Noida · Mumbai · Bangalore · Hyderabad and beyond.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <DemoForm />
                </div>
            </section>
        </>
    );
}
