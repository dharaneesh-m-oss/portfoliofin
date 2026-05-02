import { prisma } from "@/lib/prisma";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";

// Force dynamic since we read from DB
export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const projectsData = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  const timelineData = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });

  // Map the JSON strings back to arrays for the component
  const formattedProjects = projectsData.map(p => ({
    ...p,
    tags: JSON.parse(p.tags) as string[],
    details: JSON.parse(p.details) as string[]
  }));

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
