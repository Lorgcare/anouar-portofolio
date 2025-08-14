"use client";

import React, { useMemo, useState } from "react";

// Categories for the portfolio section
const CATEGORIES = ["Projects", "Badges", "Certifications", "Interests", "Technologies"] as const;
type Category = typeof CATEGORIES[number];

type Item = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  href?: string;
  tags?: string[];
  category: Category;
  date?: string;
};

type Role = {
  role: string;
  org: string;
  time: string;
  responsibilities: string[];
};

const ITEMS: Item[] = [
  // —— Projects ——
  {
    id: "crowdstrike-integration",
    title: "CrowdStrike Falcon Platform Integration",
    subtitle: "Project",
    description:
      "Installed and integrated CrowdStrike Falcon for endpoint protection, configured with existing SIEM systems for improved threat detection.",
    image:
      "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?w=800&auto=format&fit=crop&q=60",
    tags: ["Security", "CrowdStrike", "SIEM"],
    category: "Projects",
  },
  {
    id: "proofpoint-integration",
    title: "Proofpoint Email Security Integration",
    subtitle: "Project",
    description:
      "Implemented Proofpoint for advanced email threat protection, leveraged threat intelligence for proactive defense.",
    image:
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&auto=format&fit=crop&q=60",
    tags: ["Email Security", "Proofpoint"],
    category: "Projects",
  },
  {
    id: "backbox-deployment",
    title: "Backbox Automation Deployment",
    subtitle: "Project",
    description:
      "Installed Backbox for automated backup and recovery of network/security devices.",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&auto=format&fit=crop&q=60",
    tags: ["Backup", "Automation"],
    category: "Projects",
  },
  {
    id: "azure-hybrid-ad",
    title: "Azure Hybrid AD Integration",
    subtitle: "Project",
    description:
      "Extended on-premises AD to Azure, configured synchronization and hybrid identity.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=60",
    tags: ["Azure", "Active Directory"],
    category: "Projects",
  },

  // —— Badges ——
  {
    id: "badge-az900",
    title: "Azure Fundamentals (AZ-900)",
    category: "Badges",
    image:
      "/badges/az900.png",
    tags: ["Azure", "Cloud"],
  },
  {
    id: "badge-az104",
    title: "Azure Administrator Associate (AZ-104)",
    category: "Badges",
    image:
      "/badges/az104.png",
    tags: ["Azure", "Administration"],
  },
  {
    id: "badge-az305",
    title: "Azure Solutions Architect Expert (AZ-305)",
    category: "Badges",
    image:
      "/badges/az305.png",
    tags: ["Azure", "Architecture"],
  },
  {
    id: "badge-az700",
    title: "Azure Network Engineer Associate (AZ-700)",
    category: "Badges",
    image:
      "https://images.credly.com/size/340x340/images/fd4b03b7-d51d-4606-bb0f-790622f74c76/azure-network-engineer-associate-600x600.png",
    tags: ["Azure", "Networking"],
  },

  // —— Certifications ——
  {
    id: "cert-azure-fundamentals",
    title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    category: "Certifications",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    tags: ["Azure", "Cloud"],
  },
  {
    id: "cert-azure-administrator",
    title: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
    category: "Certifications",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60",
    tags: ["Azure", "Administration"],
  },
  {
    id: "cert-azure-architect",
    title: "Microsoft Certified: Azure Solutions Architect Expert (AZ-305)",
    category: "Certifications",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=60",
    tags: ["Azure", "Architecture"],
  },
  {
    id: "cert-azure-network-engineer",
    title: "Microsoft Certified: Azure Network Engineer Associate (AZ-700)",
    category: "Certifications",
    image:
      "https://images.unsplash.com/photo-1555431189-0fabf2667795?w=800&auto=format&fit=crop&q=60",
    tags: ["Azure", "Networking"],
  },
  {
    id: "cert-aws-cloud-quest",
    title: "AWS Solutions Architect - Cloud Quest",
    category: "Certifications",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60",
    tags: ["AWS", "Cloud"],
  },
  {
    id: "cert-fortinet-nse1",
    title: "Fortinet Network Security Expert Level 1: Certified Associate",
    category: "Certifications",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    tags: ["Fortinet", "Security"],
  },
  {
    id: "cert-fortinet-nse2",
    title: "Fortinet Network Security Expert Level 2: Certified Associate",
    category: "Certifications",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    tags: ["Fortinet", "Security"],
  },
  {
    id: "cert-m365-fundamentals",
    title: "Microsoft 365 Certified: Fundamentals",
    category: "Certifications",
    image:
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&auto=format&fit=crop&q=60",
    tags: ["Microsoft 365", "Cloud"],
  },
  {
    id: "cert-ccent",
    title: "Cisco Certified Entry Networking Technician (CCENT 100-105)",
    category: "Certifications",
    image:
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=800&auto=format&fit=crop&q=60",
    tags: ["Cisco", "Networking"],
  },

  // —— Interests ——
  {
    id: "interest-cloud",
    title: "Cloud Computing",
    description:
      "Designing and operating scalable, secure cloud infrastructure on Azure with hybrid AD.",
    category: "Interests",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    tags: ["Azure", "IaaS", "Hybrid Cloud"],
  },
  {
    id: "interest-security",
    title: "Cybersecurity",
    description:
      "Endpoint protection, email security, and proactive monitoring to reduce risk.",
    category: "Interests",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df3?w=800&auto=format&fit=crop&q=60",
    tags: ["EDR", "SIEM", "Email Security"],
  },
  {
    id: "interest-automation",
    title: "Automation",
    description:
      "Automating backups, configurations, and repeatable ops tasks for reliability.",
    category: "Interests",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&auto=format&fit=crop&q=60",
    tags: ["Backbox", "Policies", "RPO/RTO"],
  },

  // —— Technologies ——
  {
    id: "tech-azure",
    title: "Microsoft Azure",
    category: "Technologies",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
    tags: ["IaaS", "PaaS", "Security"],
  },
  {
    id: "tech-m365",
    title: "Microsoft 365",
    category: "Technologies",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_Office_logo_%282013%E2%80%932019%29.svg",
    tags: ["Exchange Online", "Teams", "SharePoint"],
  },
  {
    id: "tech-azure-ad",
    title: "Azure AD / Hybrid AD",
    category: "Technologies",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    tags: ["Identity", "SSO", "Synchronization"],
  },
  {
    id: "tech-crowdstrike",
    title: "CrowdStrike Falcon",
    category: "Technologies",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&auto=format&fit=crop&q=60",
    tags: ["EDR", "Threat Detection"],
  },
  {
    id: "tech-proofpoint",
    title: "Proofpoint",
    category: "Technologies",
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&auto=format&fit=crop&q=60",
    tags: ["Email Security", "Threat Intel"],
  },
  {
    id: "tech-fortinet",
    title: "Fortinet",
    category: "Technologies",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/68/Fortinet-Logo.svg",
    tags: ["Firewalls", "VPN"],
  },
  {
    id: "tech-veeam",
    title: "Veeam Backup & Replication",
    category: "Technologies",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/64/Veeam_logo.svg",
    tags: ["Backup", "Recovery"],
  },
  {
    id: "tech-acronis",
    title: "Acronis Backup",
    category: "Technologies",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Acronis_logo.svg",
    tags: ["Backup", "Recovery"],
  },
  {
    id: "tech-3cx",
    title: "3CX",
    category: "Technologies",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/01/3CX_Logo.png",
    tags: ["VoIP", "PBX"],
  },
];

const RESUME: Role[] = [
  {
    role: "Senior Cloud Services Engineer",
    org: "ATCOM S.A.",
    time: "May 2024 – Present",
    responsibilities: [
      "Design, implement, and support Azure IaaS services and Hybrid Active Directory.",
      "Administer Microsoft 365 (Exchange Online, Teams, SharePoint) and identity integrations (SSO/Conditional Access).",
      "Deploy and tune enterprise security controls (CrowdStrike, Proofpoint) and integrate with SIEM.",
      "Own backup/DR strategy and execution using Veeam/Acronis; ensure RPO/RTO objectives.",
      "Plan and optimize internal/external network topologies for performance, security, and availability.",
      "Lead incident response and problem management; document runbooks and standard operating procedures.",
      "Mentor teammates and collaborate with vendors on complex escalations.",
    ],
  },
  {
    role: "System Administrator",
    org: "ATCOM S.A.",
    time: "Feb 2021 – May 2024",
    responsibilities: [
      "Maintained Windows servers, virtualization, and core services (AD, DNS, DHCP, GPO).",
      "Managed M365 tenant, identity sync, licensing, and user lifecycle operations.",
      "Implemented and monitored backup/restore routines (Veeam/Acronis); performed periodic DR tests.",
      "Hardened endpoints and email security; managed patching and baseline compliance.",
      "Automated routine tasks with PowerShell; improved monitoring and alerting.",
      "Coordinated with providers for hardware, networking, and cloud issues.",
    ],
  },
  {
    role: "IT Support Technician",
    org: "ATCOM S.A.",
    time: "Jul 2016 – Feb 2021",
    responsibilities: [
      "Delivered L1/L2 helpdesk support across Windows/macOS endpoints and core business apps.",
      "Troubleshot network connectivity, printers, and peripherals; handled onsite escalations.",
      "Administered 3CX VoIP (extensions, call flows, phones) and user onboarding/offboarding.",
      "Imaged, deployed, and maintained workstations; documented procedures and knowledge base articles.",
    ],
  },
  {
    role: "IT Support",
    org: "IVT AKMH",
    time: "Mar 2016 – Jun 2016",
    responsibilities: [
      "Provided classroom and lab technical support for staff and students.",
      "Prepared and maintained PCs, installed software, and supported AV/peripherals.",
      "Assisted with basic network troubleshooting and inventory management.",
    ],
  },
];

function classNames(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}

// Inline SVG icon components
const IconLinkedIn = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M100.28 448H7.4V148.9h92.88zM53.84 107C24.66 107 0 82.34 0 52.2A52.2 52.2 0 0 1 104.4 52.2c0 30.14-24.66 54.8-54.56 54.8zM447.9 448h-92.4V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.7 37.7-55.7 76.6V448h-92.4V148.9h88.7v40.8h1.3c12.4-23.6 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
  </svg>
);

const IconGitHub = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 496 512" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.2.3-5.5-1.3-5.5-3.6 0-2 2.3-3.6 5.2-3.6 3-.2 5.5 1.4 5.5 3.6zm-31.1-2.2c-.7 2 1.3 4.3 4.3 4.6 2.6.7 5.5 0 6.2-2s-1.3-4.3-4.3-5c-2.6-.7-5.5.3-6.2 2.4zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.6.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-2-3-3.3-5.9-2.6zM244 8C106.8 8 0 114.6 0 251.6 0 362.3 73.3 454 175 484.7c13 2.3 17.8-5.6 17.8-12.4 0-6.2-.3-26.6-.3-48.3-64.3 11.7-81-15.7-86.1-30.1-2.9-7.5-15.5-30.1-26.6-36.2-9.1-4.9-22-17-.3-17.3 20.4-.3 35 18.8 39.8 26.6 23.3 39.1 60.6 28.1 75.5 21.4 2.3-16.8 9.1-28.1 16.5-34.7-57.2-6.5-117.3-28.6-117.3-127.3 0-28.1 10-51.2 26.2-69.2-2.6-6.5-11.4-33.2 2.6-69.2 0 0 21.6-6.8 70.8 26.2 20.7-5.8 42.8-8.7 64.9-8.7s44.2 2.9 64.9 8.7c49.2-33 70.8-26.2 70.8-26.2 14 36 5.2 62.7 2.6 69.2 16.2 18 26.2 41.1 26.2 69.2 0 98.9-60.3 120.8-117.8 127.3 9.4 8.1 17.4 23.6 17.4 48.3 0 34.7-.3 62.7-.3 71 0 6.8 4.9 14.7 17.8 12.4C422.7 454 496 362.3 496 251.6 496 114.6 389.2 8 252 8z"/>
  </svg>
);

const IconDiscord = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 640 512" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M524.5 69.5a485.1 485.1 0 0 0-104.4-33.1 1 1 0 0 0-1 .5 337.8 337.8 0 0 0-15 31.2 447.1 447.1 0 0 0-134.2 0 309.8 309.8 0 0 0-15-31.2 1 1 0 0 0-1-.5A483.7 483.7 0 0 0 147 69a1 1 0 0 0-.5.4C66.1 183.7 48.6 294.3 54.1 404.2a1 1 0 0 0 .4.7 483.3 483.3 0 0 0 147.4 74.9 1 1 0 0 0 1.1-.4 348.8 348.8 0 0 0 29.9-48.6 1 1 0 0 0-.6-1.4 316.1 316.1 0 0 1-45.2-21.4 1 1 0 0 1 .1-1.7 251.8 251.8 0 0 0 9.2-4.6 1 1 0 0 1 .9 0 322.6 322.6 0 0 0 281.6 0 1 1 0 0 1 .9 0l9.2 4.6a1 1 0 0 1 .1 1.7 301.2 301.2 0 0 1-45.2 21.4 1 1 0 0 0-.6 1.4 309.5 309.5 0 0 0 29.9 48.6 1 1 0 0 0 1.1.4A483.3 483.3 0 0 0 585.5 405a1 1 0 0 0 .4-.7c5.8-103.5-17.9-213.6-61.4-334.8a1 1 0 0 0-.5-.4zM222 337.6c-23.5 0-42.7-21.3-42.7-47.6s19.1-47.6 42.7-47.6 42.7 21.3 42.7 47.6-19.1 47.6-42.7 47.6zm196 0c-23.5 0-42.7-21.3-42.7-47.6s19.1-47.6 42.7-47.6 42.7 21.3 42.7 47.6-19.1 47.6-42.7 47.6z"/>
  </svg>
);

export default function Page() {
  const [category, setCategory] = useState<Category>("Projects");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const base = ITEMS.filter((i) => i.category === category);
    const query = q.trim().toLowerCase();
    if (!query) return base;
    return base.filter((i) =>
      [i.title, i.subtitle, i.description, (i.tags || []).join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [category, q]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-8">
        
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-6 h-max">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <img
                src="/profile.png"
                alt="Anouar Abouelnasr"
                className="h-16 w-16 rounded-full ring-2 ring-white/10 object-cover"
              />
              <div>
                <h1 className="text-xl font-bold leading-5">Anouar Abouelnasr</h1>
                <p className="text-sm text-slate-300">Senior Cloud Services Engineer</p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="col-span-2 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <dt className="text-slate-300">Email</dt>
                <dd className="font-medium">
                  <a href="mailto:anouarabouelnasr@gmail.com" className="hover:underline">
                    anouarabouelnasr@gmail.com
                  </a>
                </dd>
              </div>
              <div className="col-span-2 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <dt className="text-slate-300">Location</dt>
                <dd className="font-medium">Athens, Greece</dd>
              </div>
              <div className="col-span-2 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <dt className="text-slate-300">LinkedIn</dt>
                <dd className="font-medium">
                  <a
                    href="https://www.linkedin.com/in/anouar-abouelnasr-302750120/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    anouar.abouelnasr
                  </a>
                </dd>
              </div>
              {/* Download CV Button */}
              <div className="col-span-2">
                <a
                  href="/Anouar_Abouelnasr_CV_ENG.pdf"
                  download
                  className="block w-full text-center rounded-xl bg-blue-600 px-4 py-2 font-medium hover:bg-blue-500 transition"
                >
                  📄 Download CV
                </a>
              </div>

              {/* Social Icons (inline SVGs) */}
              <div className="col-span-2 flex justify-center gap-4 mt-1">
                <a
                  href="https://www.linkedin.com/in/anouar-abouelnasr-302750120/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-blue-500 transition"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <IconLinkedIn className="h-6 w-6" />
                </a>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-white transition"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <IconGitHub className="h-6 w-6" />
                </a>
                <a
                  href="https://discord.com/users/yourdiscordid"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-indigo-400 transition"
                  aria-label="Discord"
                  title="Discord"
                >
                  <IconDiscord className="h-6 w-6" />
                </a>
              </div>
            </dl>
          </div>
        </aside>

        {/* Main */}
        <main className="space-y-16">
          
          {/* About */}
          <section id="about">
            <SectionTitle title="About" />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300 leading-relaxed space-y-4">
              <p>
                I am a Senior Cloud Services Engineer with 9 years of hands-on experience in designing, implementing, and maintaining secure, scalable, and high-performing IT infrastructures. My expertise spans across cloud platforms, on-premises systems, and hybrid environments, with a strong focus on Microsoft Azure, Office 365, and enterprise-grade network and security solutions.
              </p>
              <p>
                <strong>Cloud & Hybrid Solutions</strong> – Azure IaaS, Azure AD, Hybrid AD integration, and Office 365 administration.
              </p>
              <p>
                <strong>Infrastructure Management</strong> – End-to-end setup, configuration, and maintenance of servers, networks, firewalls, and collaboration tools.
              </p>
              <p>
                <strong>Security & Compliance</strong> – Deployment of enterprise security solutions including CrowdStrike, Proofpoint, and BackBox, integrated with SIEM platforms.
              </p>
              <p>
                <strong>Business Continuity</strong> – Developing and implementing backup and disaster recovery strategies using Veeam and Acronis.
              </p>
              <p>
                <strong>Network Architecture</strong> – Designing internal and external network topologies for performance, security, and availability.
              </p>
              <p>
                With a proven track record in incident management, system optimization, and large-scale migrations, I bring a results-driven approach to every project. My goal is to align technology with business objectives, ensuring reliability, security, and efficiency across all systems.
              </p>
            </div>
          </section>

          {/* Resume (responsibilities as bullets) */}
          <section id="resume">
            <SectionTitle title="Resume" subtitle="Experience" />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-xl">
              <ul className="space-y-8">
                {RESUME.map((r, i) => (
                  <li key={`${r.role}-${i}`} className="flex flex-col md:flex-row md:items-start md:gap-8">
                    <div className="md:w-1/3">
                      <div className="font-semibold text-slate-100">{r.role}</div>
                      <div className="text-sm text-slate-400">{r.org}</div>
                      <div className="text-xs text-slate-400">{r.time}</div>
                    </div>

                    <ul className="mt-3 md:mt-0 space-y-2 text-sm text-slate-300 md:w-2/3">
                      {r.responsibilities.map((line, idx) => (
                        <li key={idx} className="flex gap-2">
                          <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 fill-current text-slate-300">
                            <path d="M7.629 13.233 3.9 9.505l1.414-1.414 2.315 2.315 6.06-6.061 1.414 1.414z" />
                          </svg>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Portfolio */}
          <section id="portfolio">
            <SectionTitle title="Portfolio" subtitle="Filter by category or search" />
            <div className="mb-4 flex flex-col sm:flex-row gap-3">
              <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={classNames(
                      "px-3 py-2 text-sm rounded-lg transition",
                      category === c ? "bg-white/20" : "hover:bg-white/10"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search items..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm placeholder:text-slate-400"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition shadow-lg"
                >
                  {item.image && (
                    <div className="aspect-video">
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wider text-slate-300">{item.category}</div>
                    <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
                    {item.subtitle && <p className="text-sm text-slate-300">{item.subtitle}</p>}
                    {item.description && (
                      <p className="mt-2 text-sm text-slate-300 line-clamp-3">{item.description}</p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(item.tags || []).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer className="py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Anouar Abouelnasr 
      </footer>
    </div>
  );
}
