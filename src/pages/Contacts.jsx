import PageLayout from "../PageLayout";
import { Link } from "react-router";

// ==========================================
// DATA DIRECTORY (DRY METHODOLOGY)
// ==========================================

const contactDetails = [
  { label: "SECURE_COMMS", value: "webdevyaz10@gmail.com" },
  { label: "DIRECT_LINE", value: "+966 55 462 5084" },
  { label: "LOCATION", value: "JEDDAH, SAUDI ARABIA" }
];

const socialLinks = [
  { 
    id: "whatsapp", 
    label: "> INITIALIZE_WHATSAPP", 
    url: "https://wa.me/966554625084" 
  },
  { 
    id: "linkedin", 
    label: "> LINKEDIN_NODE", 
    url: "https://www.linkedin.com/in/yazeed-taifi-50670233b/"
  },
  { 
    id: "github", 
    label: "> GITHUB_REPOSITORY", 
    url: "https://github.com/devyaz10/"
  },
  { 
    id: "instagram", 
    label: "> INSTAGRAM_FEED", 
    url: "https://www.instagram.com/romoz.js"
  }
];

const formFields = [
  { id: "name", label: "TARGET_IDENTITY (NAME)", type: "text", placeholder: "ENTER_NAME_" },
  { id: "email", label: "RETURN_ADDRESS (EMAIL)", type: "email", placeholder: "ENTER_EMAIL_" },
  { id: "subject", label: "TRANSMISSION_SUBJECT", type: "text", placeholder: "ENTER_SUBJECT_" }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function Contacts() {
  const commsButton = (
    <Link to="/services" prefetch="intent" className="cta-button group inline-block">
      <span className="btn-bracket-tl"></span>
      <span className="btn-bracket-br"></span>
      &gt; Initialize_Services<span className="animate-pulse">_</span>
    </Link>
  );

  return (
    <PageLayout
      wText="Secure"
      gText="Comms"
      paragraph="Establish a direct connection with the system architect. Awaiting transmission data."
      button={commsButton}
      classes="contact-container"
    >
      <div className="contact-grid">
        
        {/* --- LEFT COLUMN: SECURE MESSAGE FORM --- */}
        <div className="contact-panel">
          <div className="card-corner-tl"></div>
          <div className="card-corner-br"></div>
          
          <h2 className="text-green-500 font-goldman text-2xl mb-6 tracking-widest border-b border-green-500/30 pb-2">
            COMMS_TERMINAL
          </h2>

          {/* 
            FORM ACTION TRICK: 
            By pointing this to formsubmit.co, it will automatically email the form contents 
            directly to your gmail address without needing a backend!
            (You will need to click an activation link in your email the very first time you test it).
          */}
          <form action="https://formsubmit.co/webdevyaz10@gmail.com" method="POST" className="flex flex-col h-full">
            
            {/* Honeypot to prevent spam bots */}
            <input type="text" name="_honey" className="hidden" />
            {/* Disable Captcha for a smoother sci-fi feel */}
            <input type="hidden" name="_captcha" value="false" />
            {/* Success redirect page (Optional: replace with a custom thank you page URL later) */}
            <input type="hidden" name="_next" value={window.location.href} />

            {/* Dynamically map the standard inputs */}
            {formFields.map((field) => (
              <div key={field.id} className="form-group">
                <label htmlFor={field.id} className="form-label">{field.label}</label>
                <input 
                  type={field.type} 
                  name={field.id} 
                  id={field.id} 
                  required 
                  placeholder={field.placeholder}
                  className="form-input"
                />
              </div>
            ))}

            {/* The Message Textarea */}
            <div className="form-group flex-1">
              <label htmlFor="message" className="form-label">DATA_PAYLOAD (MESSAGE)</label>
              <textarea 
                name="message" 
                id="message" 
                required 
                placeholder="ENTER_MESSAGE_DATA_"
                className="form-input h-full min-h-37.5"
              ></textarea>
            </div>

            <button type="submit" className="cta-button group w-full mt-4 self-stretch!">
              <span className="btn-bracket-tl"></span>
              <span className="btn-bracket-br"></span>
              &gt; TRANSMIT_PAYLOAD_
            </button>
          </form>
        </div>

        {/* --- RIGHT COLUMN: DIRECTORIES & LINKS --- */}
        <div className="contact-panel">
          <div className="card-corner-tl"></div>
          <div className="card-corner-br"></div>

          <h2 className="text-green-500 font-goldman text-2xl mb-6 tracking-widest border-b border-green-500/30 pb-2">
            SYS_DIRECTORY
          </h2>

          <div className="contact-info-text">
            {contactDetails.map((detail, index) => (
              <p key={index}>
                <span className="text-green-700 font-goldman text-sm tracking-widest uppercase block -mb-1.25">
                  {detail.label}
                </span>
                {detail.value}
              </p>
            ))}
          </div>

          <h3 className="text-green-700 font-goldman text-sm tracking-widest uppercase mb-2">
            EXTERNAL_NODES
          </h3>
          
          <div className="social-grid">
            {socialLinks.map((link) => (
              <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer" 
                className="service-btn text-center block w-full py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
          
        </div>
      </div>
    </PageLayout>
  );
}