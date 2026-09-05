import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroVideo from "../assets/videos/hero-scroll.mp4";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let scrollTrigger: ScrollTrigger | null = null;

    const setup = () => {
      if (!video.duration || !Number.isFinite(video.duration)) {
        return;
      }

      video.pause();
      video.currentTime = 0;

      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=900vh",
        scrub: true,
        pin: true,
        anticipatePin: 1,

        onUpdate: (self) => {
          const time = self.progress * video.duration;

          if (Math.abs(video.currentTime - time) > 0.01) {
            video.currentTime = time;
          }
        },
      });

      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup);
    }

    return () => {
      video.removeEventListener("loadedmetadata", setup);
      scrollTrigger?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="block h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

export default HeroSection;
