import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image1 from "@/assets/images/image1.png"
import Image2 from "@/assets/images/image2.png"
import Image3 from "@/assets/images/image3.png"
import Image4 from "@/assets/images/image4.png"

gsap.registerPlugin(ScrollTrigger);

function Origin() {
  const sectionRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    const imageEls = imageContainerRef.current?.querySelectorAll("div")

    if (!section || !text1 || !text2 || !imageEls) return;

    gsap.set(imageEls, { y: "100%", opacity: 1 })

    // ONE ScrollTrigger owns the pin
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=300vh",
      scrub: true,
      pin: true,
    });

    // THE
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

    // ORIGIN
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

    gsap.to(imageEls, {
      y: "0%",
      opacity: 0,
      ease: "none",
      stagger: 0.2,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300vh",
        scrub: true
      }
    })
  });

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
        <div className="relative w-58 aspect-3/4" ref={imageContainerRef}>

          {/* Image 1 - back left */}
          <div className="absolute inset-0 z-10 -translate-x-40 translate-y-1 -rotate-5">
            <img
              src={Image1}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image 2 */}
          <div className="absolute inset-0 z-20 -translate-x-22 -rotate-2">
            <img
              src={Image2}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image 3 */}
          <div className="absolute inset-0 z-30 translate-x-0 rotate-2">
            <img
              src={Image3}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image 4 - front right */}
          <div className="absolute inset-0 z-40 translate-x-20 translate-y-1 rotate-5">
            <img
              src={Image4}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Origin;
