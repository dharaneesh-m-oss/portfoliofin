import Contact from "@/components/Contact";
import ResumeDownload from "@/components/ResumeDownload";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ResumeDownload />
      <Contact />
    </div>
  );
}
