import { useOutletContext, Link } from "react-router";
import PageLayout from "../PageLayout";
import CCTVFrame from "../components/CCTVFrame";

export default function Home() {
  const { activeVideo } = useOutletContext();

  const homeButton = (
    <Link to="/services" prefetch="intent" className="cta-button group inline-block">
      <span className="btn-bracket-tl"></span>
      <span className="btn-bracket-br"></span>
      &gt; Initialize_Services<span className="animate-pulse">_</span>
    </Link>
  );

  return (
    <PageLayout
      wText="System"
      gText="Ready"
      paragraph="Architecting secure digital infrastructure and high-performance web interfaces. Awaiting command parameters."
      button={homeButton}
      classes="cctv-container"
    >
      <CCTVFrame>
        <video
          key={activeVideo}
          src={activeVideo}
          autoPlay
          loop
          muted
          className="cctv-video"
        />
      </CCTVFrame>
    </PageLayout>
  );
}
