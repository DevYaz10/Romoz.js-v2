import PageLayout from "../PageLayout";
import { Link } from "react-router";


// ==========================================
// DATA DIRECTORY (DRY METHODOLOGY)
// ==========================================

const experiencesData = [
  {
    id: "exp-techhub",
    role: "EVENT LEADERSHIP & OPERATIONS",
    organization: "TECHHUB3",
    date: "APRIL 2026",
    status: "24 HOURS LOGGED",
    details: [
      "Directed and supervised a team of volunteers, providing task guidance, delegation, and leadership to ensure smooth event operations.",
      "Managed the overall organization and logistics of the event, including the planning and seamless execution of the final closing ceremony.",
      "Coordinated the setup and execution of the students' graduation project showcase, facilitating an organized and professional environment for attendees."
    ]
  },
  {
    id: "exp-ncnp",
    role: "COMMUNITY OUTREACH & LOGISTICS",
    organization: "NATIONAL CENTER FOR NON-PROFIT SECTOR",
    date: "JUNE 2016 - APRIL 2024",
    status: "10 HOURS LOGGED",
    details: [
      "Organized and managed the Palm Walk Initiative, ensuring smooth visitor flow while providing refreshments and addressing inquiries.",
      "Participated in a Humanitarian Awareness Session, promoting understanding and effective communication with individuals with disabilities.",
      "Managed the sorting and processing of clothing donations for the Eid Charity initiative, ensuring high-quality items were distributed to those in need."
    ]
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function Contributions() {
  const logButton = (
    <Link to="/services" prefetch="intent" className="cta-button group inline-block">
      <span className="btn-bracket-tl"></span>
      <span className="btn-bracket-br"></span>
      &gt; Initialize_Services<span className="animate-pulse">_</span>
    </Link>
  );

  return (
    <PageLayout
      wText="Field"
      gText="Operations"
      paragraph="Accessing historical logs of volunteer deployments, community outreach, and team leadership initiatives."
      button={logButton}
      classes="contributions-container"
    >
      <div className="w-full">
        {experiencesData.map((exp) => (
          <div key={exp.id} className="log-card group">
            {/* Aesthetic Corners */}
            <div className="card-corner-tl"></div>
            <div className="card-corner-br"></div>
            
            {/* Header / Meta Data */}
            <div className="log-header">
              <div>
                <h3 className="log-role">{exp.role}</h3>
                <p className="log-org">// {exp.organization}</p>
              </div>
              <div className="log-meta">
                <span>DATE: {exp.date}</span>
                <span>STATUS: {exp.status}</span>
              </div>
            </div>

            {/* Bullet Points */}
            <div className="flex flex-col">
              {exp.details.map((detail, index) => (
                <div key={index} className="log-detail-item">
                  <span className="log-bullet">[+]</span>
                  <p>{detail}</p>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </PageLayout>
  );
}