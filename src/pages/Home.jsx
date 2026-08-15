import { useOutletContext } from "react-router";
import PageLayout from "../PageLayout";
import CCTVFrame from "../components/CCTVFrame";
import CommandButton from "../components/CommandButton";

export default function Home() {
  const { activeVideo } = useOutletContext();

  return (
    <PageLayout
      title="System"
      accent="Ready"
      description="Architecting secure digital infrastructure and high-performance web interfaces. Awaiting command parameters."
      action={
        <CommandButton to="/services">
          &gt; Initialize_Services<span className="command-cursor">_</span>
        </CommandButton>
      }
      contentClassName="cctv-container"
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
