import { useState } from "react";
import api from "../lib/api";
import { CheckCircle2, Loader2 } from "lucide-react";

const CLASS_OPTIONS = ["Class 11", "Class 12", "CUET Aspirant", "Other"];
const BOARDS = ["CBSE", "ISC", "HBSE", "State Board", "Other"];
const SUBJECTS = ["Accountancy", "Economics", "Business Studies", "All Three", "CUET Commerce", "Crash Course"];

export default function DemoForm({ compact = false }) {
    const [form, setForm] = useState({
        student_name: "",
        student_class: "Class 11",
        board: "CBSE",
        subject: "Accountancy",
        phone: "",
        city: "",
        message: "",
        email: "",
    });
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [error, setError] = useState("");

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setError("");
        try {
            await api.post("/leads", form);
            setStatus("success");
            setForm({ ...form, student_name: "", phone: "", city: "", message: "", email: "" });
        } catch (err) {
            setStatus("error");
            const d = err?.response?.data?.detail;
            setError(typeof d === "string" ? d : "Something went wrong. Please try again or call us.");
        }
    };

    if (status === "success") {
        return (
            <div data-testid="demo-form-success" className="bg-white rounded-sm shadow-[0_4px_24px_rgba(15,39,68,0.06)] border border-[#0F2744]/5 p-8 text-center">
                <CheckCircle2 className="w-14 h-14 mx-auto text-[#D4A93A] mb-3" />
                <h3 className="font-serif text-2xl text-[#0F2744] mb-2">Thank you!</h3>
                <p className="text-[#4A5568]">We have received your demo request. Our team will reach out within a few hours.</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-5 text-sm text-[#1E4F8C] underline underline-offset-4"
                    data-testid="demo-form-reset-btn"
                >
                    Submit another request
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            data-testid="demo-form"
            className="bg-white rounded-sm shadow-[0_4px_24px_rgba(15,39,68,0.06)] border border-[#0F2744]/5 p-6 md:p-8"
        >
            {!compact && (
                <div className="mb-6">
                    <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-2">Free Demo</div>
                    <h3 className="font-serif text-3xl text-[#0F2744]">Book your free demo class</h3>
                    <p className="text-sm text-[#4A5568] mt-1">No payment. No commitment. Just one class to feel the difference.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Student Name" name="student_name" value={form.student_name} onChange={onChange} required testid="form-name" />
                <Field label="Phone Number" name="phone" value={form.phone} onChange={onChange} required type="tel" testid="form-phone" />

                <Select label="Class" name="student_class" value={form.student_class} onChange={onChange} options={CLASS_OPTIONS} testid="form-class" />
                <Select label="Board" name="board" value={form.board} onChange={onChange} options={BOARDS} testid="form-board" />

                <Select label="Subject" name="subject" value={form.subject} onChange={onChange} options={SUBJECTS} testid="form-subject" />
                <Field label="City" name="city" value={form.city} onChange={onChange} required testid="form-city" />

                <div className="md:col-span-2">
                    <label className="text-xs tracking-[0.18em] uppercase font-semibold text-[#4A5568]">Message (optional)</label>
                    <textarea
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={onChange}
                        data-testid="form-message"
                        className="mt-1.5 w-full border border-[#0F2744]/20 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A93A]/60 focus:border-[#D4A93A] transition"
                        placeholder="Tell us about your goals or any specific topic you're struggling with..."
                    />
                </div>
            </div>

            {error && <div className="mt-4 text-sm text-red-600" data-testid="demo-form-error">{error}</div>}

            <button
                type="submit"
                disabled={status === "loading"}
                data-testid="demo-form-submit"
                className="mt-6 w-full bg-[#0F2744] text-white hover:bg-[#1E4F8C] disabled:opacity-60 transition-colors rounded-sm px-6 py-3.5 text-sm font-medium tracking-wide flex items-center justify-center gap-2"
            >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {status === "loading" ? "Submitting..." : "Book Free Demo"}
            </button>

            <p className="mt-3 text-[11px] text-[#4A5568] text-center">By submitting, you agree to be contacted about your demo class.</p>
        </form>
    );
}

function Field({ label, name, value, onChange, required, type = "text", testid }) {
    return (
        <div>
            <label className="text-xs tracking-[0.18em] uppercase font-semibold text-[#4A5568]">{label}{required && <span className="text-[#D4A93A]"> *</span>}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                data-testid={testid}
                className="mt-1.5 w-full border border-[#0F2744]/20 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A93A]/60 focus:border-[#D4A93A] transition"
            />
        </div>
    );
}

function Select({ label, name, value, onChange, options, testid }) {
    return (
        <div>
            <label className="text-xs tracking-[0.18em] uppercase font-semibold text-[#4A5568]">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                data-testid={testid}
                className="mt-1.5 w-full border border-[#0F2744]/20 rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D4A93A]/60 focus:border-[#D4A93A] transition"
            >
                {options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
        </div>
    );
}
