import { prisma } from "@/lib/prisma";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";

// Force dynamic since we read from DB
export const dynamic = "force-dynamic";

export default async function WorkPage() {
  let formattedProjects: any[] = [];
  let timelineData: any[] = [];

  try {
    const projectsData = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    timelineData = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });

    // Map the JSON strings back to arrays for the component
    formattedProjects = projectsData.map(p => {
      try {
        return {
          ...p,
          tags: p.tags ? (JSON.parse(p.tags) as string[]) : [],
          details: p.details ? (JSON.parse(p.details) as string[]) : [],
          hardware: p.hardware ?? undefined,
        };
      } catch (e) {
        console.error("Error parsing project data for ID:", p.id, e);
        return null;
      }
    }).filter(Boolean);
  } catch (error) {
    console.error("Database fetch error in WorkPage:", error);
    // Fallback to empty arrays will trigger the static content fallback in components
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* We pass the DB data to the components, which internally will use it if passed, or fallback to static */}
      <Projects initialData={formattedProjects} />
      <Timeline initialData={timelineData} />
      <Experience initialData={timelineData} />
      <Achievements />
    </div>
  );
}
