import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowLongRight } from "react-icons/hi2";
import { Button } from "./ui/button";
import sale from "@/assets/images/sale.jpg";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { id: 1, title: "WARRIOR SPIRIT TEE" },
  { id: 2, title: "BLUE FLAME TEE" },
  { id: 3, title: "DEMON BLOOD TEE" },
  { id: 4, title: "WILL OF THE SUN TEE" },
];

function Sale() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cardEls = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || cardEls.length === 0) return;

    const N = cardEls.length;

    const ctx = gsap.context(() => {
      const GAP = 30;          // px: how much of each earlier card peeks above the next
      const SHRINK_STEP = 0.06; // how much smaller each "buried" layer gets

      // Initial state: card 0 in place, all others waiting below the viewport.
      cardEls.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,             // horizontal centering paired with CSS `left: 50%`
          top: i * GAP,
          y: i === 0 ? 0 : "100vh",
          scale: 1,
          transformOrigin: "top center",
        });
      });

      const totalSteps = N - 1; // number of "new card arrives" transitions

      ScrollTrigger.create({
        trigger: section,
        start: "top+=180 top",
        end: `+=${totalSteps * 300}vh`,
        scrub: true,
        pin: true,

        onUpdate: (self) => {
          const progress = self.progress;
          const segment = 1 / totalSteps;

          // How "arrived" each incoming card (index 1..N-1) is, 0 → 1
          const arrival: number[] = new Array(N).fill(0);

          for (let i = 1; i < N; i++) {
            const segStart = (i - 1) * segment;
            const a = Math.min(Math.max((progress - segStart) / segment, 0), 1);
            arrival[i] = a;

            gsap.set(cardEls[i], { y: `${100 * (1 - a)}vh` });
          }

          // Each card's scale shrinks once for every later card that has arrived.
          for (let k = 0; k < N; k++) {
            let shrinkCount = 0;
            for (let i = k + 1; i < N; i++) shrinkCount += arrival[i];

            const scale = 1 - SHRINK_STEP * shrinkCount;
            gsap.set(cardEls[k], { scale });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-foreground text-background py-20">
      <div className="px-5 flex justify-between items-end mb-20">
        <div>
          <div className="font-mono text-[0.6rem] text-destructive pb-1 tracking-widest">
            COLLECTION // THE_ORIGIN_DROP
          </div>
          <div className="text-6xl">SALE</div>
        </div>
        <Button className="font-mono text-[0.6rem] bg-foreground rounded-none border border-background text-background px-5 py-4 hover:bg-background hover:text-foreground">
          VIEW_ALL
        </Button>
      </div>

      <div
        ref={stackRef}
        className="relative w-full min-h-screen overflow-hidden"
      >
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute left-1/2 w-[calc(100%-2.5rem)] max-w-208 aspect-[clamp(0.75,calc(0.75+(2.35-0.75)*((100vw-24rem)/(80rem-24rem))),2.35)] overflow-hidden border-2 border-background/70 border-t-3 border-t-destructive"
            style={{ zIndex: 10 * (i + 1) }}
          >
            <img
              src={sale}
              alt={card.title}
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute bottom-5 left-5 text-foreground">
              <div className="font-mono text-[0.6rem] tracking-widest">
                <span className="text-destructive">COLLECTION</span> // THE_ORIGIN_DROP
              </div>
              <div className="text-3xl hover:text-destructive py-2">{card.title}</div>
              <Button className="rounded-none bg-transparent border-b border-b-foreground px-0 font-mono text-[0.6rem] h-5 hover:bg-transparent hover:text-destructive hover:border-b-destructive">
                SHOP {card.title}
                <HiArrowLongRight />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sale;
