import { useEffect, useRef, useState, type ReactNode } from "react"
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
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!smoothWrapper.current || !smoothContent.current) return;

    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapper.current,
      content: smoothContent.current,
      smooth: 1.2,
      effects: true
    })

    setReady(true)

    return () => {
      smoother.kill()
      setReady(false)
    }
  }, [])

  return (
    <div ref={smoothWrapper} id="smooth-wrapper" className="overflow-hidden w-full">
      <div ref={smoothContent} id="smooth-content" className="w-full">
        {ready ? children : null}
      </div>
    </div>
  )
}

export default SmoothScroll;
