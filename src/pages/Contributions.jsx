import PageLayout from "../PageLayout";
import CommandButton from "../components/CommandButton";
import { PanelCorners } from "../components/CornerMarks";

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
  return (
    <PageLayout
      title="Field"
      accent="Operations"
      description="Accessing historical logs of volunteer deployments, community outreach, and team leadership initiatives."
      action={
        <CommandButton to="/services">
          &gt; Initialize_Services<span className="command-cursor" aria-hidden="true">_</span>
        </CommandButton>
      }
      contentClassName="contributions-container"
    >
      <div className="logs-list">
        {experiencesData.map((exp) => (
          <article key={exp.id} className="log-card">
            <PanelCorners />
            
            {/* Header / Meta Data */}
            <header className="log-header">
              <div>
                <h3 className="log-role">{exp.role}</h3>
                <p className="log-org">// {exp.organization}</p>
              </div>
              <div className="log-meta">
                <span>DATE: {exp.date}</span>
                <span>STATUS: {exp.status}</span>
              </div>
            </header>

            {/* Bullet Points */}
            <ul className="log-details">
              {exp.details.map((detail, index) => (
                <li key={index} className="log-detail-item">
                  <span className="log-bullet" aria-hidden="true">[+]</span>
                  <p>{detail}</p>
                </li>
              ))}
            </ul>

          </article>
        ))}
      </div>
    </PageLayout>
  );
}