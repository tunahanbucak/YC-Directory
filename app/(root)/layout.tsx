import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <TooltipProvider>
        <Navbar />
        {children}
        <Footer />
      </TooltipProvider>
    </main>
  );
}
