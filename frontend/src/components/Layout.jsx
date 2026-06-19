import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#FAFAFC]">
            <Header />
            <main className="flex-1 pt-16 md:pt-20">{children}</main>
            <Footer />
            <WhatsAppFloat />
        </div>
    );
}
