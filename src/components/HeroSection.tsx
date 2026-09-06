import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { HiArrowLongRight } from "react-icons/hi2";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const TOTAL_FRAMES = 152;

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const heroContentRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const typeWritterRef = useRef<HTMLSpanElement>(null);
  const redDotRef = useRef<HTMLSpanElement>(null);

  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const heroContent = heroContentRef.current;
    const nextButton = nextButtonRef.current;
    const overlay = overlayRef.current;

    if (
      !section ||
      !image ||
      !heroContent ||
      !nextButton ||
      !overlay
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      let currentFrame = -1;

      const updateFrame = (progress: number) => {
        const frame = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        );

        if (frame === currentFrame) return;

        currentFrame = frame;

        image.src = `/hero/frame-${String(frame + 1).padStart(4, "0")}.webp`;
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=900vh",
        scrub: true,
        pin: true,

        onUpdate: (self) => {
          const progress = self.progress;

          // -------------------------
          // Image sequence: 0 → 80%
          // -------------------------
          const imageProgress = Math.min(progress / 0.8, 1);

          updateFrame(imageProgress);

          // -------------------------
          // Original hero content: 0 → 50%
          // -------------------------
          const heroFadeProgress = Math.min(
            Math.max(progress / 0.2, 0),
            1
          );

          gsap.set(heroContent, {
            y: -60 * heroFadeProgress,
            opacity: 1 - heroFadeProgress,
          });

          // -------------------------
          // New button: 70 → 80%
          // -------------------------
          const buttonProgress = Math.min(
            Math.max((progress - 0.4) / 0.1, 0),
            1
          );

          gsap.set(nextButton, {
            opacity: buttonProgress,
            y: 30 * (1 - buttonProgress),
          });

          // -------------------------
          // Overlay: 80 → 100%
          // -------------------------
          const overlayProgress = Math.min(
            Math.max((progress - 0.8) / 0.2, 0),
            1
          );

          gsap.set(overlay, {
            opacity: overlayProgress,
          });
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  useGSAP(() => {
    if (
      !writerRef.current ||
      !titleRef.current ||
      !buttonRef.current ||
      !typeWritterRef.current ||
      !redDotRef.current
    ) {
      return;
    }

    const dot = writerRef.current.querySelector(".dot");

    if (!dot) return;

    const tl = gsap.timeline({
      defaults: {
        duration: 0.3,
        ease: "sine.out",
      },
    });

    tl.set(writerRef.current, {
      y: 30,
      opacity: 0,
    })
      .set(titleRef.current, {
        y: 100,
        opacity: 0,
      })
      .set(buttonRef.current, {
        y: 100,
        opacity: 0,
      })

      .set(redDotRef.current, {
        scale: 1,
        opacity: 1,
        transformOrigin: "center center",
      })

      .to(writerRef.current, {
        y: 0,
        opacity: 1,
      })
      .to(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
        },
        "-=0.13"
      )
      .to(
        buttonRef.current,
        {
          y: 0,
          opacity: 1,
        },
        "-=0.0001"
      )
      .to(typeWritterRef.current, {
        text: {
          value: "THE_ORIGIN_DROP // LOADING",
          delimiter: "",
        },
        ease: "none",
        duration: 2,
      })
      .to(dot, {
        text: {
          value: "...",
          delimiter: "",
        },
        duration: 1.7,
        ease: "none",
        repeat: -1,
      });

    gsap.to(redDotRef.current, {
      scale: 1.5,
      opacity: 0.4,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "center center",
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <img
        ref={imageRef}
        src="/hero/frame-0001.webp"
        alt=""
        className="absolute top-0 left-0 z-1 block h-full w-full object-cover"
        draggable={false}
      />

      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-10 bg-foreground opacity-0"
      />

      <div
        ref={heroContentRef}
        className="absolute bottom-8 left-[clamp(1rem,calc(1rem+(100vw-320px)*0.075),4.25rem)] z-10 flex flex-col items-start"
      >
        <div
          ref={writerRef}
          className="mb-2 flex items-center font-mono text-[0.6rem] font-medium text-destructive"
        >
          <span
            ref={redDotRef}
            className="mr-2 inline-block h-2 w-2 shrink-0 rounded-full bg-destructive"
          />

          <span
            ref={typeWritterRef}
            className="tracking-[0.14rem]"
          />

          <span className="dot" />
        </div>

        <div>
          <h1
            ref={titleRef}
            className="font-sans text-[clamp(3rem,10vw,4rem)] leading-none text-background"
          >
            WEAR YOUR
            <br />
            STORY
          </h1>

          <Button
            ref={buttonRef}
            className="mt-7 rounded-none bg-destructive px-6 py-6 hover:bg-foreground hover:text-background"
          >
            SHOP THE DROP
            <HiArrowLongRight />
          </Button>
        </div>
      </div>

      <Button
        ref={nextButtonRef}
        className="absolute bottom-8 left-[clamp(1rem,calc(1rem+(100vw-320px)*0.075),4.25rem)] z-5 rounded-none bg-background px-6 py-6 opacity-0 hover:bg-destructive"
      >
        SHOP THE DROP
        <HiArrowLongRight />
      </Button>
    </section>
  );
}

export default HeroSection;
