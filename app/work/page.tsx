import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and case studies.",
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Portfolio"
        title="Selected work"
        description="Projects I've designed and built — with the problem, the approach, and the outcome."
      />

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
