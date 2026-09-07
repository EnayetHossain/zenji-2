import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !labelRef.current ||
      !titleRef.current ||
      !paragraphRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(labelRef.current, {
        opacity: 0,
      });

      gsap.set(titleRef.current, {
        y: 40,
        opacity: 0,
      });

      gsap.set(paragraphRef.current, {
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        toggleActions: "play none none none",

        onEnter: () => {
          gsap.to(labelRef.current, {
            opacity: 1,
            duration: 3,
            ease: "power2.out",
          });

          gsap.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.25,
            ease: "power2.out",
          });

          gsap.to(paragraphRef.current, {
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
            ease: "power2.out",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[url('@/assets/images/background.avif')] bg-cover bg-center bg-no-repeat py-15 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-background/50"
    >
      <div className="mx-13 relative z-110">
        <div
          ref={labelRef}
          className="font-mono text-[0.5rem] tracking-[0.14rem] text-destructive relative before:absolute before:w-9 before:h-px before:bg-destructive before:-bottom-2 before:left-0"
        >
          MANIFESTO_001
        </div>

        <div
          ref={titleRef}
          className="text-[4rem] mt-5 mb-7 leading-none"
        >
          THE
          <br />
          <span className="text-destructive">ZENJI</span>
          <br />
          ETHOS
        </div>

        <p
          ref={paragraphRef}
          className="font-mono text-[0.6rem] max-w-75 text-foreground/70 leading-loose"
        >
          We exist at the intersection of technical precision and cultural
          expression. Our garments are engineered for those navigating an
          increasingly fragmented world, built from Japanese craftsmanship,
          anime culture and modern Australian streetwear.
        </p>
      </div>
    </section>
  );
}

export default About;
