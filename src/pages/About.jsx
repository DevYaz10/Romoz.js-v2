import PageLayout from "../PageLayout";
import { Link } from "react-router";
import CFI from "../assets/images/Confidentail Face Id.webp";

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

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function About() {
  const hireButton = (
    <Link
      to="/services"
      prefetch="intent"
      className="cta-button group inline-block"
    >
      <span className="btn-bracket-tl"></span>
      <span className="btn-bracket-br"></span>
      &gt; INITIATE_CONTACT<span className="animate-pulse">_</span>
    </Link>
  );

  return (
    <PageLayout
      wText="System"
      gText="Admin"
      paragraph="Accessing classified credentials for the lead architect and founder of ROMOZ.JS."
      button={hireButton}
      classes="about-container"
    >
      <div className="about-grid">
        {/* --- LEFT COLUMN: IDENTITY CARD --- */}
        <div className="profile-card group">
          <div className="card-corner-tl"></div>
          <div className="card-corner-br"></div>

          <div className="profile-img-wrapper">
            <div
              className="w-full h-full bg-cover bg-center grayscale contrast-125 opacity-80 group-hover:opacity-100 transition-opacity"
              style={{ backgroundImage: `url('${identityData.image}')` }}
            ></div>
            <div className="absolute bottom-2 right-2 bg-black/80 border border-green-500/50 px-2 text-green-500 font-goldman text-xs">
              ID: {identityData.id}
            </div>
          </div>

          <h2 className="text-green-500 font-goldman text-3xl mb-1 leading-none">
            {identityData.name}
          </h2>
          <p className="text-gray-400 font-goldman tracking-widest text-sm mb-6 pb-4 border-b border-green-500/30">
            {identityData.role}
          </p>

          <div className="flex flex-col gap-2 font-teko text-xl text-gray-300 mb-6">
            {identityData.specs.map((spec, index) => (
              <p key={index}>
                <span className="text-green-700">{spec.label}:</span>{" "}
                {spec.value}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-auto">
            {identityData.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="project-btn text-center block w-full py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN: DATABASE RECORDS --- */}
        <div className="info-panel">
          {/* CORE DIRECTIVE */}
          <div className="info-section">
            <div className="card-corner-tl"></div>
            <div className="card-corner-br"></div>
            <h3 className="section-title">CORE_DIRECTIVE</h3>
            <p className="text-gray-300 font-teko text-2xl leading-snug">
              {coreDirective}
            </p>
          </div>

          {/* SKILL MATRIX */}
          <div className="info-section">
            <div className="card-corner-tl"></div>
            <div className="card-corner-br"></div>
            <h3 className="section-title">SKILL_MATRIX</h3>

            {skillMatrix.map((matrix, index) => (
              <div key={index}>
                <p
                  className={`text-green-600 font-goldman text-sm tracking-widest ${index > 0 ? "mt-6" : "mt-4"}`}
                >
                  {matrix.category}
                </p>
                <div className="skill-grid">
                  {matrix.skills.map((skill, sIndex) => (
                    <span key={sIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ACHIEVEMENTS & AWARDS */}
          <div className="info-section">
            <div className="card-corner-tl"></div>
            <div className="card-corner-br"></div>
            <h3 className="section-title">RECORDS_&_AWARDS</h3>

            {recordsAndAwards.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <h4 className="timeline-title">{item.title}</h4>
                <p className="timeline-date">{item.date}</p>
                {/* React strictly parses raw HTML if needed, but a standard string works for simple text. */}
                <p className="timeline-desc">{item.description}</p>
              </div>
            ))}
          </div>

          {/* PROFESSIONAL DEPLOYMENTS */}
          <div className="info-section">
            <div className="card-corner-tl"></div>
            <div className="card-corner-br"></div>
            <h3 className="section-title">PROFESSIONAL_DEPLOYMENTS</h3>

            {professionalDeployments.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <h4 className="timeline-title">{item.title}</h4>
                <p className="timeline-date">{item.date}</p>
                <p className="timeline-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
