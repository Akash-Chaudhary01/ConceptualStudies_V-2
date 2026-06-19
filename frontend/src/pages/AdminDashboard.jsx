import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SEO from "../components/SEO";
import { useAuth } from "../lib/auth";
import api from "../lib/api";
import { Loader2, LogOut, Trash2, Mail, Phone, MapPin } from "lucide-react";

const TABS = ["Leads", "Blog Posts", "Reviews"];

export default function AdminDashboard() {
    const { user, loading: authLoading, logout } = useAuth();
    const [tab, setTab] = useState("Leads");
    const [leads, setLeads] = useState([]);
    const [posts, setPosts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        setLoading(true);
        try {
            const [l, p, r] = await Promise.all([
                api.get("/leads"),
                api.get("/blog?published_only=false"),
                api.get("/reviews"),
            ]);
            setLeads(l.data);
            setPosts(p.data);
            setReviews(r.data);
        } catch {
            // 401 handled by redirect
        }
        setLoading(false);
    };

    useEffect(() => {
        if (user && user.role === "admin") refresh();
    }, [user]);

    if (authLoading) return <div className="grid place-items-center h-screen text-[#4A5568]">Loading...</div>;
    if (!user || user.role !== "admin") return <Navigate to="/admin/login" replace />;

    const deleteLead = async (id) => {
        if (!window.confirm("Delete this lead?")) return;
        await api.delete(`/leads/${id}`);
        refresh();
    };
    const deletePost = async (id) => {
        if (!window.confirm("Delete this post?")) return;
        await api.delete(`/blog/${id}`);
        refresh();
    };
    const deleteReview = async (id) => {
        if (!window.confirm("Delete this review?")) return;
        await api.delete(`/reviews/${id}`);
        refresh();
    };

    return (
        <>
            <SEO title="Admin Dashboard" path="/admin" />
            <div className="bg-[#FAFAFC] min-h-screen">
                <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="text-xs tracking-[0.2em] uppercase text-[#D4A93A] font-semibold">Conceptual Studies</div>
                            <h1 className="font-serif text-3xl md:text-4xl text-[#0F2744]">Admin Dashboard</h1>
                            <p className="text-sm text-[#4A5568] mt-1">Welcome, {user.name}</p>
                        </div>
                        <button onClick={logout} data-testid="admin-logout" className="flex items-center gap-2 text-sm text-[#0F2744] border border-[#0F2744]/15 rounded-sm px-4 py-2 hover:bg-[#0F2744] hover:text-white transition">
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <Stat label="Total Leads" value={leads.length} />
                        <Stat label="Blog Posts" value={posts.length} />
                        <Stat label="Reviews" value={reviews.length} />
                    </div>

                    <div className="flex gap-1 border-b border-[#0F2744]/10 mb-6">
                        {TABS.map((t) => (
                            <button
                                key={t}
                                data-testid={`admin-tab-${t.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => setTab(t)}
                                className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
                                    tab === t ? "border-[#D4A93A] text-[#0F2744]" : "border-transparent text-[#4A5568] hover:text-[#0F2744]"
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-[#4A5568]"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
                    ) : (
                        <>
                            {tab === "Leads" && (
                                <div className="grid gap-4">
                                    {leads.length === 0 ? <Empty>No leads yet.</Empty> : leads.map((l) => (
                                        <div key={l.id} data-testid={`admin-lead-${l.id}`} className="bg-white border border-[#0F2744]/8 rounded-sm p-5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="font-serif text-xl text-[#0F2744]">{l.student_name}</h3>
                                                        <span className="text-[10px] tracking-[0.15em] uppercase bg-[#D4A93A]/15 text-[#B68E2C] px-2 py-0.5 rounded-sm font-semibold">{l.status || "new"}</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 text-xs text-[#4A5568] mb-2">
                                                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{l.phone}</span>
                                                        {l.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{l.email}</span>}
                                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{l.city}</span>
                                                    </div>
                                                    <div className="text-sm text-[#0F2744]"><strong>{l.student_class}</strong> · {l.board} · {l.subject}</div>
                                                    {l.message && <p className="text-sm text-[#4A5568] mt-2 italic">"{l.message}"</p>}
                                                    <div className="text-[11px] text-[#4A5568] mt-2">{new Date(l.created_at).toLocaleString()}</div>
                                                </div>
                                                <button onClick={() => deleteLead(l.id)} data-testid={`admin-delete-lead-${l.id}`} className="text-red-600 hover:bg-red-50 rounded-sm p-2"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {tab === "Blog Posts" && (
                                <div className="grid gap-4">
                                    {posts.map((p) => (
                                        <div key={p.id} data-testid={`admin-post-${p.id}`} className="bg-white border border-[#0F2744]/8 rounded-sm p-5 flex items-start justify-between gap-4">
                                            <div>
                                                <div className="text-[10px] tracking-[0.2em] uppercase text-[#D4A93A] font-semibold mb-1">{p.category}</div>
                                                <h3 className="font-serif text-xl text-[#0F2744]">{p.title}</h3>
                                                <p className="text-sm text-[#4A5568] mt-1 line-clamp-2">{p.excerpt}</p>
                                                <div className="text-[11px] text-[#4A5568] mt-2">{p.read_time} · {new Date(p.created_at).toLocaleDateString()}</div>
                                            </div>
                                            <button onClick={() => deletePost(p.id)} data-testid={`admin-delete-post-${p.id}`} className="text-red-600 hover:bg-red-50 rounded-sm p-2"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {tab === "Reviews" && (
                                <div className="grid gap-4">
                                    {reviews.map((r) => (
                                        <div key={r.id} data-testid={`admin-review-${r.id}`} className="bg-white border border-[#0F2744]/8 rounded-sm p-5 flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-serif text-xl text-[#0F2744]">{r.name} <span className="text-xs text-[#4A5568] font-sans">· {r.rating}/5</span></h3>
                                                <p className="text-sm text-[#0F2744] mt-1 italic">"{r.text}"</p>
                                                {r.role && <div className="text-[11px] tracking-[0.15em] uppercase text-[#4A5568] mt-2">{r.role}</div>}
                                            </div>
                                            <button onClick={() => deleteReview(r.id)} data-testid={`admin-delete-review-${r.id}`} className="text-red-600 hover:bg-red-50 rounded-sm p-2"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

const Stat = ({ label, value }) => (
    <div className="bg-white border border-[#0F2744]/8 rounded-sm p-5">
        <div className="text-xs tracking-[0.2em] uppercase text-[#4A5568] font-semibold">{label}</div>
        <div className="font-serif text-3xl text-[#0F2744] mt-1">{value}</div>
    </div>
);

const Empty = ({ children }) => <div className="text-center py-12 text-[#4A5568] bg-white border border-dashed border-[#0F2744]/15 rounded-sm">{children}</div>;
