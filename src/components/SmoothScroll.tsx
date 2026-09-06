import { useEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

interface SmoothScrollProps {
  children: ReactNode;
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

function SmoothScroll({ children }: SmoothScrollProps) {
  const smoothWrapper = useRef<HTMLDivElement>(null)
  const smoothContent = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!smoothWrapper.current || !smoothContent.current) return;

    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapper.current,
      content: smoothContent.current,
      smooth: 0.7,
      effects: true
    })

    return () => smoother.kill()
  }, [])

  return (
    <div ref={smoothWrapper} id="smooth-wrapper" className="overflow-hidden w-full">
      <div ref={smoothContent} id="smooth-content" className="w-full">
        {children}
      </div>
    </div>
  )
}

export default SmoothScroll;
