import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Origin() {
  const sectionRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;

    if (!section || !text1 || !text2) return;

    const ctx = gsap.context(() => {
      // ONE ScrollTrigger owns the pin
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=300vh",
        scrub: true,
        pin: true,
        markers: true,
      });

      // Animation 1
      gsap.to(text1, {
        x: "-100vw",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300vh",
          scrub: true,
        },
      });

      // Animation 2
      gsap.to(text2, {
        x: "100vw",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300vh",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-15"
    >
      <div className="font-mono text-[0.6rem] tracking-[0.14rem] text-foreground/80 px-15">
        <span className="text-destructive">COLLECTION</span>{" "}
        // THE_ORIGIN_DROP
      </div>

      <div className="text-[clamp(5rem,22vw,16rem)] flex justify-center items-center leading-normal">
        <span ref={text1Ref}>THE</span>
        <span ref={text2Ref}>ORIGIN</span>
      </div>
    </section>
  );
}

export default Origin;
