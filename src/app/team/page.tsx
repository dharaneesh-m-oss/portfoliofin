import React from "react";
import { prisma } from "@/lib/prisma";
import TeammateCard from "@/components/TeammateCard";

// Force dynamic since we read from DB
export const dynamic = "force-dynamic";

export default async function TeamPage() {
  let team: any[] = [];
  try {
    team = await prisma.teammate.findMany({
      orderBy: { createdAt: 'asc' }
    });
  } catch (error) {
    console.error("Database fetch error in TeamPage:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative py-24 px-6 max-w-5xl mx-auto w-full flex-1">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary mb-4">
            Visionary Team.
          </h1>
          <p className="text-xl text-text-muted max-w-2xl">
            The brilliant minds collaborating on edge hardware and infrastructure.
          </p>
        </div>

        {team.length === 0 ? (
          <div className="text-text-muted font-medium text-lg">
            Team roster is currently being assembled.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <TeammateCard key={member.id} member={member} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
