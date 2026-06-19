import { useEffect, useState } from "react";
import { X, Download, Loader2, CheckCircle2 } from "lucide-react";
import api from "../lib/api";

const KEY = "cs_exit_popup_shown_v1";

export default function ExitIntentPopup() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ student_name: "", phone: "", email: "" });
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        if (sessionStorage.getItem(KEY)) return;

        const onLeave = (e) => {
            if (e.clientY <= 0 && !sessionStorage.getItem(KEY)) {
                sessionStorage.setItem(KEY, "1");
                setOpen(true);
            }
        };
        // delay so it doesn't fire instantly on accidental scroll-up
        const t = setTimeout(() => document.addEventListener("mouseleave", onLeave), 6000);

        // fallback: after 45s of activity show once
        const fallback = setTimeout(() => {
            if (!sessionStorage.getItem(KEY)) {
                sessionStorage.setItem(KEY, "1");
                setOpen(true);
            }
        }, 45000);

        return () => {
            clearTimeout(t);
            clearTimeout(fallback);
            document.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await api.post("/leads", {
                student_name: form.student_name,
                student_class: "PDF Request",
                board: "—",
                subject: "Top 10 Accountancy Mistakes (PDF)",
                phone: form.phone,
                city: "—",
                email: form.email,
                message: "Exit-intent PDF download request",
            });
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    if (!open) return null;

    return (
        <div data-testid="exit-popup" className="fixed inset-0 z-[60] grid place-items-center bg-[#0F2744]/60 backdrop-blur-sm px-4 animate-[fadeIn_0.2s_ease-out]" onClick={() => setOpen(false)}>
            <div className="relative bg-white rounded-sm max-w-md w-full p-6 md:p-9 shadow-[0_30px_80px_rgba(0,0,0,0.4)] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-[#4A5568] hover:text-[#0F2744] p-1.5" data-testid="exit-popup-close" aria-label="Close">
                    <X className="w-5 h-5" />
                </button>

                {status === "success" ? (
                    <div className="text-center py-4" data-testid="exit-popup-success">
                        <CheckCircle2 className="w-12 h-12 text-[#D4A93A] mx-auto mb-3" />
                        <h3 className="font-serif text-2xl text-[#0F2744]">Check your WhatsApp!</h3>
                        <p className="text-sm text-[#4A5568] mt-2">We'll send your free PDF and a short concept tip within a few minutes.</p>
                    </div>
                ) : (
                    <>
                        <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-2">Wait — Free Guide</div>
                        <h3 className="font-serif text-2xl md:text-3xl text-[#0F2744] leading-tight">Top 10 Mistakes Students Make in Accountancy</h3>
                        <p className="mt-2 text-sm text-[#4A5568]">A 12-page PDF written by Komal — used by toppers to avoid silly mark-losses in boards. Free for the next 24 hours.</p>

                        <form onSubmit={submit} className="mt-5 space-y-3">
                            <input
                                required
                                placeholder="Your name"
                                value={form.student_name}
                                onChange={(e) => setForm({ ...form, student_name: e.target.value })}
                                data-testid="exit-name"
                                className="w-full border border-[#0F2744]/20 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A93A]/60"
                            />
                            <input
                                required
                                type="tel"
                                placeholder="WhatsApp number"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                data-testid="exit-phone"
                                className="w-full border border-[#0F2744]/20 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A93A]/60"
                            />
                            <input
                                type="email"
                                placeholder="Email (optional)"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                data-testid="exit-email"
                                className="w-full border border-[#0F2744]/20 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A93A]/60"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                data-testid="exit-submit"
                                className="w-full bg-[#D4A93A] text-[#0F2744] font-semibold hover:bg-[#c2982f] disabled:opacity-60 transition rounded-sm py-3 text-sm flex items-center justify-center gap-2"
                            >
                                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                                Send Me The PDF
                            </button>
                            <p className="text-[11px] text-[#4A5568] text-center pt-1">We'll never spam. Just one PDF + tips occasionally.</p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
