import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import SEO from "../components/SEO";
import { useAuth } from "../lib/auth";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (user && user.role === "admin") return <Navigate to="/admin" replace />;

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await login(email, password);
            navigate("/admin");
        } catch (err) {
            const d = err?.response?.data?.detail;
            setError(typeof d === "string" ? d : "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO title="Admin Login" description="Conceptual Studies admin panel" path="/admin/login" />
            <div className="min-h-[calc(100vh-80px)] grid place-items-center px-5 py-12 bg-[#FAFAFC]">
                <form onSubmit={onSubmit} data-testid="admin-login-form" className="w-full max-w-md bg-white border border-[#0F2744]/8 rounded-sm p-8 shadow-[0_12px_40px_rgba(15,39,68,0.08)]">
                    <div className="w-12 h-12 bg-[#0F2744] grid place-items-center rounded-sm mx-auto mb-5">
                        <Lock className="w-5 h-5 text-[#D4A93A]" />
                    </div>
                    <h1 className="font-serif text-3xl text-[#0F2744] text-center">Admin Login</h1>
                    <p className="text-sm text-[#4A5568] text-center mt-1">Sign in to manage leads, blog & reviews</p>

                    <div className="mt-6 space-y-4">
                        <div>
                            <label className="text-xs tracking-[0.18em] uppercase font-semibold text-[#4A5568]">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                data-testid="admin-email-input"
                                className="mt-1.5 w-full border border-[#0F2744]/20 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A93A]/60 focus:border-[#D4A93A] transition"
                            />
                        </div>
                        <div>
                            <label className="text-xs tracking-[0.18em] uppercase font-semibold text-[#4A5568]">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                data-testid="admin-password-input"
                                className="mt-1.5 w-full border border-[#0F2744]/20 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A93A]/60 focus:border-[#D4A93A] transition"
                            />
                        </div>
                    </div>

                    {error && <div className="mt-4 text-sm text-red-600" data-testid="admin-login-error">{error}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        data-testid="admin-login-submit"
                        className="mt-6 w-full bg-[#0F2744] text-white hover:bg-[#1E4F8C] disabled:opacity-60 transition rounded-sm px-5 py-3 text-sm font-medium flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Sign In
                    </button>
                </form>
            </div>
        </>
    );
}
