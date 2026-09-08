import { Link } from "react-router";
import PageLayout from "../PageLayout";
import CommandButton from "../components/CommandButton";
import { PanelCorners } from "../components/CornerMarks";

const servicesData = [
  {
    id: "pkg_01",
    tier: "Tier 1 // One-Time",
    title: "PROTOCOL_01: CORE ARCHITECTURE",
    description: "A comprehensive, single-deployment package for custom web application development. From initial codebase engineering to live server launch.",
    features: [
      "Full Web App Development & Launch",
      "Responsive UI/UX Engineering",
      "Basic SEO & SSL Setup",
      "System Handover & Training"
    ]
  },
  {
    id: "pkg_02",
    tier: "Tier 2 // Retainer",
    title: "PROTOCOL_02: ACTIVE SUSTAINMENT",
    description: "Continuous system optimization via a monthly retainer. Ensures zero downtime with active tech support and iterative feature updates.",
    features: [
      "24/7 Tech Support & Bug Fixing",
      "Security Patching & Updates",
      "Server Uptime Monitoring",
      "Routine Database Backups"
    ]
  },
  {
    id: "pkg_03",
    tier: "Tier 3 // One-Time",
    title: "PROTOCOL_03: BRAND GENESIS",
    description: "Building your digital identity from the ground up. Encompasses Core Architecture web deployment, augmented with complete corporate identity design.",
    features: [
      "Includes PROTOCOL_01 Services",
      "Logo & Corporate Identity Design",
      "Professional Brand Photography",
      "Comprehensive Brand Guidelines Book"
    ]
  },
  {
    id: "pkg_04",
    tier: "Tier 4 // Retainer",
    title: "PROTOCOL_04: TOTAL OVERRIDE",
    description: "The ultimate digital transformation ecosystem. Fuses Brand Genesis and Sustainment with aggressive digital market positioning to dominate your sector.",
    features: [
      "Includes All Previous Protocols",
      "Comprehensive Social Media Management",
      "Advanced SEO & Analytics Integration",
      "Omni-channel Digital Marketing Strategy"
    ]
  }
];

export default function Services() {
  return (
    <PageLayout
      title="Service"
      accent="Protocols"
      description="Select a deployment package to initiate your digital infrastructure upgrade. Custom parameters available upon request."
      action={
        <CommandButton to="/contacts">
          &gt; CONTACT_COMMAND<span className="command-cursor" aria-hidden="true">_</span>
        </CommandButton>
      }
      contentClassName="services-container"
    >
      <div className="services-grid">
        {servicesData.map((service) => (
          <article key={service.id} className="service-card">
            <PanelCorners />

            {/* Header */}
            <header className="service-header">
              <h3 className="service-title">{service.title}</h3>
              <span className="service-tier">{service.tier}</span>
            </header>

            {/* Description */}
            <p className="service-desc">{service.description}</p>

            {/* Features List */}
            <ul className="service-features">
              {service.features.map((feature, index) => (
                <li key={index} className="service-feature-item">
                  <span className="service-feature-icon" aria-hidden="true">&gt;</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Call to Action */}
            <Link to="/contacts" prefetch="intent" className="service-button">
              &gt; INITIATE_PROTOCOL_
            </Link>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}