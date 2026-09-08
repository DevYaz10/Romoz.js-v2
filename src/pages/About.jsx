import PageLayout from "../PageLayout";
import CFI from "../assets/images/Confidentail Face Id.webp";
import CommandButton from "../components/CommandButton";
import { PanelCorners } from "../components/CornerMarks";

// ==========================================
// DATA DIRECTORY
// ==========================================

const identityData = {
  id: "Y.TAIFI",
  name: "YAZEED H. S. TAIFI",
  role: "SYSTEM ARCHITECT // FOUNDER",
  image: CFI,
  specs: [
    { label: "LOC", value: "JEDDAH, SAUDI ARABIA" },
    { label: "EDU", value: "B.S. COMPUTER SCIENCE" },
    { label: "UNI", value: "KING ABDULAZIZ UNIVERSITY (MAWHIBA ALUMNI)" },
    { label: "GPA", value: "4.31" },
  ],
  links: [
    { label: "> ENCRYPTED_EMAIL", url: "mailto:yazeed.h.s.taifi@gmail.com" },
    { label: "> LINKEDIN_NODE", url: "https://www.linkedin.com/in/yazeed-taifi-50670233b/" },
  ],
};

const coreDirective =
  "Full-stack developer and system architect currently pursuing a Bachelor of Information Systems at King Abdulaziz University. Specializing in designing, developing, and deploying high-performance web applications from the ground up. Combining rigorous academic foundations with hands-on freelance architecture, UI/UX design, and complex domain configurations to deliver fully optimized digital solutions.";

const skillMatrix = [
  {
    category: "FRONT_END & UI/UX",
    skills: [
      "REACT.JS",
      "VITE",
      "TAILWIND CSS",
      "GSAP",
      "FIGMA",
      "AFFINITY DESIGNER",
    ],
  },
  {
    category: "BACK_END & INFRASTRUCTURE",
    skills: [
      "APPWRITE",
      "JAVA",
      "SQL",
      "DNS MANAGEMENT",
      "GIT / VERSION CONTROL",
      "NGINX",
      "DOCKER",
      "OBSIDIAN",
    ],
  },
  {
    category: "SECURITY, MEDIA & MARKETING",
    skills: [
      "CYBER THREAT ANALYSIS (eJPT PREP)",
      "NETWORK SECURITY (NMAP/FFUF)",
      "E-COMMERCE STRATEGY",
      "DAVINCI RESOLVE",
    ],
  },
];

const recordsAndAwards = [
  {
    title: "TAFASEER: QURANIC RESEARCH AI",
    date: "MULTIPLE AWARDS (2024)",
    description:
      "Developed an advanced AI-integrated application to serve readers and researchers of the Quran. Awarded 1st Place at the University of Jeddah Technology Challenge, 2nd Place at the PNU Eduthon, and 3rd Place at the Samsung Solve for Tomorrow initiative.",
  },
  {
    title: "NATIONAL CYBERSECURITY PROGRAM",
    date: "KAUST ACADEMY & NCA (FEB 2025)",
    description:
      "Successfully completed stages 1 & 2 of the intensive national program, gaining foundational skills in threat analysis, network security, and advanced cybersecurity principles.",
  },
  {
    title: "AUTONOMOUS ROBOTICS (WRO)",
    date: "FUTURE ENGINEERS CATEGORY (SEPT 2023)",
    description:
      "Bronze Medal winner. Led the software development and physical design of a self-driving robot capable of optimal mobility, obstacle navigation, and autonomous parking.",
  },
];

const professionalDeployments = [
  {
    title: "FULL-STACK FREELANCE ARCHITECT",
    date: "SEPT 2025 - APR 2026",
    description:
      "Designed, developed, and deployed comprehensive full-stack web solutions for various clients. Managed end-to-end architecture including UI/UX design, server hosting, and custom domain routing.",
  },
  {
    title: "DIGITAL MARKETING & OPERATIONS",
    date: "MODERN DESIGNER CO. (SEPT 2024 - PRESENT)",
    description:
      "Engineered e-commerce strategies across social platforms resulting in a 15% sales increase. Balanced targeted ad campaigns with high-efficiency customer care and transaction processing.",
  },
  {
    title: "EVENT LEADERSHIP: TECHHUB3",
    date: "VOLUNTEER OPERATIONS (APR 2026)",
    description:
      "Directed a team of volunteers through 24 hours of non-stop event operations. Managed logistics, closing ceremonies, and the seamless setup of a major student graduation project showcase.",
  },
];

function Timeline({ items }) {
  return (
    <ul className="list-none p-0 m-0">
      {items.map((item) => (
        <li key={`${item.title}-${item.date}`} className="timeline-item">
          <span className="timeline-dot" aria-hidden="true" />
          <h4 className="timeline-title">{item.title}</h4>
          <p className="timeline-date">{item.date}</p>
          <p className="timeline-desc">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function About() {
  return (
    <PageLayout
      title="System"
      accent="Admin"
      description="Accessing classified credentials for the lead architect and founder of ROMOZ.JS."
      action={
        <CommandButton to="/services">
          &gt; INITIATE_CONTACT<span className="command-cursor" aria-hidden="true">_</span>
        </CommandButton>
      }
      contentClassName="about-container"
    >
      <div className="about-grid">
        {/* --- LEFT COLUMN: IDENTITY CARD --- */}
        <section className="profile-card">
          <PanelCorners />

          <div className="profile-img-wrapper">
            <div
              className="profile-image"
              style={{ backgroundImage: `url('${identityData.image}')` }}
              role="img"
              aria-label="Lead System Architect Profile Image"
            ></div>
            <div className="profile-id" aria-hidden="true">
              ID: {identityData.id}
            </div>
          </div>

          <header>
            <h2 className="profile-name">
              {identityData.name}
            </h2>
            <p className="profile-role">
              {identityData.role}
            </p>
          </header>

          <div className="profile-specs">
            {identityData.specs.map((spec, index) => (
              <p key={index}>
                <span className="accent-label">{spec.label}:</span>{" "}
                {spec.value}
              </p>
            ))}
          </div>

          <nav aria-label="Profile Links" className="profile-links">
            {identityData.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="project-button project-button--wide"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </section>

        {/* --- RIGHT COLUMN: DATABASE RECORDS --- */}
        <div className="info-panel">
          {/* CORE DIRECTIVE */}
          <section className="info-section">
            <PanelCorners />
            <header>
              <h3 className="section-title">CORE_DIRECTIVE</h3>
            </header>
            <p className="body-copy">
              {coreDirective}
            </p>
          </section>

          {/* SKILL MATRIX */}
          <section className="info-section">
            <PanelCorners />
            <header>
              <h3 className="section-title">SKILL_MATRIX</h3>
            </header>

            {skillMatrix.map((matrix, index) => (
              <div key={index} className="mb-4">
                <h4 className="skill-category">
                  {matrix.category}
                </h4>
                <ul className="skill-grid list-none p-0">
                  {matrix.skills.map((skill, sIndex) => (
                    <li key={sIndex} className="skill-tag">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* ACHIEVEMENTS & AWARDS */}
          <section className="info-section">
            <PanelCorners />
            <header>
              <h3 className="section-title">RECORDS_&_AWARDS</h3>
            </header>

            <Timeline items={recordsAndAwards} />
          </section>

          {/* PROFESSIONAL DEPLOYMENTS */}
          <section className="info-section">
            <PanelCorners />
            <header>
              <h3 className="section-title">PROFESSIONAL_DEPLOYMENTS</h3>
            </header>

            <Timeline items={professionalDeployments} />
          </section>
        </div>
      </div>
    </PageLayout>
  );
}