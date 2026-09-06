import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image1 from "@/assets/images/image1.png"
import Image2 from "@/assets/images/image2.png"
import Image3 from "@/assets/images/image3.png"
import Image4 from "@/assets/images/image4.png"

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
      // "vh" (viewport height) instead of "%" (element's own height) so
      // images actually start below the visible screen, not just below
      // their final resting spot.
      const OFFSCREEN_Y = 100; // in vh

      gsap.set(images, { y: `${OFFSCREEN_Y}vh`, opacity: 1 });

      // -------------------------
      // Phase boundaries (0 → 1 total progress)
      // -------------------------
      const TEXT_END = 0.2;      // 0 → 20%: text slides off
      const IMAGES_START = 0.2;  // 20% → 80%: images come in one by one
      const IMAGES_END = 0.8;
      const FADE_START = 0.5;    // 80% → 100%: all images fade out

      const imageSlice = (IMAGES_END - IMAGES_START) / images.length;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=1300vh",
        scrub: true,
        pin: true,

        onUpdate: (self) => {
          const progress = self.progress;

          // -------------------------
          // Text: 0 → TEXT_END
          // -------------------------
          const textProgress = Math.min(
            Math.max(progress / TEXT_END, 0),
            1
          );

          gsap.set(text1, { x: `${-100 * textProgress}vw` });
          gsap.set(text2, { x: `${100 * textProgress}vw` });

          // -------------------------
          // Images: each gets its own slice between IMAGES_START and IMAGES_END
          // -------------------------
          images.forEach((img, i) => {
            const start = IMAGES_START + i * imageSlice;
            const end = start + imageSlice;
            const imgProgress = Math.min(
              Math.max((progress - start) / (end - start), 0),
              1
            );

            gsap.set(img, { y: `${OFFSCREEN_Y * (1 - imgProgress)}vh` });
          });

          // -------------------------
          // Fade: FADE_START → 1
          // -------------------------
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
      {/* Top metadata */}
      <div className="absolute top-15 left-0 right-0 px-15 font-mono text-[0.6rem] tracking-[0.14rem] text-foreground/80">
        <span className="text-destructive">COLLECTION</span>{" "}
        // THE_ORIGIN_DROP
      </div>

      {/* Centered title */}
      <div className="absolute inset-0 flex items-center justify-center text-[clamp(5rem,22vw,16rem)] leading-none">
        <span ref={text1Ref}>THE</span>
        <span ref={text2Ref}>ORIGIN</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="relative w-[clamp(9rem,24vw,14.5rem)] aspect-3/4"
          ref={imageContainerRef}
        >
          {/* Image 1 - back left */}
          <div className="absolute inset-0 z-10 -translate-x-[69%] translate-y-[1%] -rotate-5">
            <img src={Image1} alt="" className="w-full h-full object-cover" />
          </div>
          {/* Image 2 */}
          <div className="absolute inset-0 z-20 -translate-x-[38%] -rotate-2">
            <img src={Image2} alt="" className="w-full h-full object-cover" />
          </div>
          {/* Image 3 */}
          <div className="absolute inset-0 z-30 translate-x-0 rotate-2">
            <img src={Image3} alt="" className="w-full h-full object-cover" />
          </div>
          {/* Image 4 - front right */}
          <div className="absolute inset-0 z-40 translate-x-[34%] translate-y-[1%] rotate-5">
            <img src={Image4} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Origin;
