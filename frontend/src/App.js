import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "@/App.css";
import { AuthProvider } from "@/lib/auth";
import Layout from "@/components/Layout";

import Home from "@/pages/Home";
import AboutMentor from "@/pages/AboutMentor";
import SubjectPage from "@/pages/SubjectPage";
import CrashCourses from "@/pages/CrashCourses";
import CUETPrep from "@/pages/CUETPrep";
import Reviews from "@/pages/Reviews";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Results from "@/pages/Results";
import CityPage from "@/pages/CityPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import { SUBJECTS } from "@/lib/content";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
    return null;
}

function SiteRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-mentor" element={<AboutMentor />} />
                {SUBJECTS.map((s) => (
                    <Route key={s.slug} path={`/${s.slug}`} element={<SubjectPage subject={s} />} />
                ))}
                <Route path="/crash-courses" element={<CrashCourses />} />
                <Route path="/cuet-preparation" element={<CUETPrep />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/results" element={<Results />} />
                <Route path="/cities/:city" element={<CityPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="*" element={<div className="max-w-3xl mx-auto py-32 px-5 text-center"><h1 className="font-serif text-4xl text-[#0F2744]">Page not found</h1></div>} />
            </Routes>
        </Layout>
    );
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/*" element={<SiteRoutes />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
