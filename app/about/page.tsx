import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.author} — cybersecurity researcher and engineer.`,
};

const FOCUS = [
  "Offensive security & CVE research",
  "Detection engineering (Snort IDS/IPS)",
  "Embedded & firmware security (ARM, HSM, applied crypto)",
  "IoT & network security",
  "Critical infrastructure & risk modeling",
  "Database security & Zero Trust",
];

const EXPERIENCE = [
  {
    role: "Technical Director",
    org: "NU IoT Connect — Northeastern University",
    when: "Sep 2024 – Present",
    points: [
      "Redesigned the lab program for a 100+ member club around hands-on IoT security, network hardening, and offensive-security fundamentals.",
      "Built and delivered labs on MQTT protocol attacks, Snort IDS/IPS configuration, CVE analysis, and network troubleshooting.",
      "Secured university funding and coordinated a five-student delegation to DEF CON 34 (August 2026).",
    ],
  },
  {
    role: "Java Full-Stack Developer Intern",
    org: "Sonata Software — Bengaluru, India",
    when: "Jan 2024 – May 2024",
    points: [
      "Automated environment validation and configuration checks with Python and Bash, cutting manual errors by ~25%.",
      "Triaged recurring enterprise-software defects end-to-end and documented repeatable resolutions.",
    ],
  },
  {
    role: "Application Security Analyst",
    org: "Flixverse — Early-Stage Startup, Bengaluru, India",
    when: "Jul 2020 – Apr 2022",
    points: [
      "Primary triage point for application-layer security incidents across web interfaces, authentication, and session management.",
      "Audited account assignments against role definitions during quarterly access reviews, remediating misconfigurations before exploitation.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="About"
        title={`Hello, I'm ${site.author}.`}
        description="Cybersecurity researcher and engineer based in Boston — working across offensive security, embedded systems, and the infrastructure we all depend on."
      />

      <div className="grid gap-16 lg:grid-cols-[1fr_24rem]">
        <div className="min-w-0">
          <div className="prose prose-stone max-w-none dark:prose-invert prose-headings:font-display prose-a:text-accent">
            <p>
              I'm an M.S. Cybersecurity candidate at Northeastern University
              (expected May 2027), Technical Director of NU IoT Connect, and the
              author of <em>Beneath the Shell</em>. My work runs from
              bare-metal firmware and applied cryptography up through network
              defense, critical-infrastructure risk, and full-stack
              engineering.
            </p>
            <p>
              This site, <strong>{site.name}</strong>, is where I keep
              everything in one place — security research and writing, my{" "}
              <a href="/books">book</a>, and selected{" "}
              <a href="/work">work</a>. No feeds, no algorithms; just the work
              itself.
            </p>
          </div>

          <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight">
            What I focus on
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {FOCUS.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight">
            Experience
          </h2>
          <div className="mt-6 space-y-8">
            {EXPERIENCE.map((job) => (
              <div
                key={job.org}
                className="border-l-2 border-border pl-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-medium">{job.role}</h3>
                  <span className="text-sm text-muted-foreground">
                    {job.when}
                  </span>
                </div>
                <p className="text-sm text-accent">{job.org}</p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {job.points.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden>—</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight">
            Education
          </h2>
          <div className="mt-4 border-l-2 border-border pl-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-medium">M.S. in Cybersecurity</h3>
              <span className="text-sm text-muted-foreground">
                Expected May 2027
              </span>
            </div>
            <p className="text-sm text-accent">Northeastern University — Boston, MA</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Coursework: Network Security, Systems Administration, Critical
              Infrastructure Protection, Database Security.
            </p>
          </div>
        </div>

        <aside id="contact" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Get in touch
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Research, collaborations, speaking, or just to say hello.
          </p>
          <div className="mt-5">
            <ContactForm />
          </div>
        </aside>
      </div>
    </div>
  );
}
