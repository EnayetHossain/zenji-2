import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image1 from "@/assets/images/image1.avif"
import Image2 from "@/assets/images/image2.avif"
import Image3 from "@/assets/images/image3.avif"
import Image4 from "@/assets/images/image4.avif"

gsap.registerPlugin(ScrollTrigger);

function Origin() {
  const sectionRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    const imageEls = imageContainerRef.current?.querySelectorAll("div");

    if (!section || !text1 || !text2 || !imageEls) return;

    const images = Array.from(imageEls) as HTMLElement[];

    const ctx = gsap.context(() => {
      const OFFSCREEN_Y = 100; // in vh

      gsap.set(images, { y: `${OFFSCREEN_Y}vh`, opacity: 1 });

      const TEXT_END = 0.2;
      const IMAGES_START = 0.2;
      const IMAGES_END = 0.8;
      const FADE_START = 0.5;

      const imageSlice = (IMAGES_END - IMAGES_START) / images.length;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=1300vh",
        scrub: true,
        pin: true,

        onUpdate: (self) => {
          const progress = self.progress;

          const textProgress = Math.min(
            Math.max(progress / TEXT_END, 0),
            1
          );

          gsap.set(text1, { x: `${-100 * textProgress}vw` });
          gsap.set(text2, { x: `${100 * textProgress}vw` });

          images.forEach((img, i) => {
            const start = IMAGES_START + i * imageSlice;
            const end = start + imageSlice;
            const imgProgress = Math.min(
              Math.max((progress - start) / (end - start), 0),
              1
            );

            gsap.set(img, { y: `${OFFSCREEN_Y * (1 - imgProgress)}vh` });
          });

          const fadeProgress = Math.min(
            Math.max((progress - FADE_START) / (1 - FADE_START), 0),
            1
          );

          gsap.set(images, { opacity: 1 - fadeProgress });
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute top-15 left-0 right-0 px-15 font-mono text-[0.6rem] tracking-[0.14rem] text-foreground/80">
        <span className="text-destructive">COLLECTION</span>{" "}
        // THE_ORIGIN_DROP
      </div>

      <div className="absolute inset-0 flex items-center justify-center text-[clamp(5rem,22vw,16rem)] leading-none">
        <span ref={text1Ref}>THE</span>
        <span ref={text2Ref}>ORIGIN</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="relative w-[clamp(9rem,24vw,14.5rem)] aspect-3/4"
          ref={imageContainerRef}
        >
          <div className="absolute inset-0 z-10 translate-x-[-69%] translate-y-[1%] -rotate-5">
            <img src={Image1} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 z-20 translate-x-[-38%] -rotate-2">
            <img src={Image2} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 z-30 translate-x-0 rotate-2">
            <img src={Image3} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 z-40 translate-x-[34%] translate-y-[1%] rotate-5">
            <img src={Image4} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Origin;
