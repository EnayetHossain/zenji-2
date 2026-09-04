import { Link } from "react-router";
import { Button } from "../ui/button";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineBars3 } from "react-icons/hi2";
import { RiCloseLargeLine } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: "top top",
      onUpdate: (self) => setScrolled(self.progress > 0.01),
      onLeaveBack: () => setScrolled(false),
    });
    return () => trigger.kill();
  }, [])

  const links: Array<Record<string, string>> = [
    { label: "DROP", link: "/" },
    { label: "COLLECTION", link: "/" },
    { label: "LOOKBOOK", link: "/" },
    { label: "OUR STORY", link: "/" },
    { label: "COLLABORATION", link: "/" },
    { label: "REVIEW", link: "/" },
    { label: "FAQ", link: "/" },
    { label: "ACCOUNT", link: "/" },
  ];

  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    if (mobileOpen) {
      gsap.set(mobileMenuRef.current, {
        height: 0,
        pointerEvents: "auto"
      })

      gsap.to(mobileMenuRef.current, {
        height: "auto",
        duration: 0.3,
        ease: "power4.inOut"
      })

      if (mobileMenuRef.current) {
        const linkEls = mobileMenuRef.current.querySelectorAll("a");
        gsap.set(linkEls, { x: -5, y: 5, opacity: 0 })
        gsap.to(linkEls, {
          x: 0,
          y: 0,
          opacity: 100,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.inOut",
          delay: 0.1
        })
      }
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        duration: 0.3,
        ease: "power4.inOut",
        delay: 0.1,
      })

      if (mobileMenuRef.current) {
        const linkEls = Array.from(mobileMenuRef.current.querySelectorAll("a")).toReversed()
        gsap.to(linkEls, {
          x: -5,
          y: 5,
          opacity: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power4.inOut",
        })
      }
    }
  }, [mobileOpen])

  return (
    <nav className={cn("w-full max-w-360 mx-auto fixed top-0 left-0 right-0 z-50 transition-colors duration-300", scrolled ? "bg-black" : "bg-transparent")}>
      <div className="flex justify-between items-center px-4 md:px-10 py-3.5">
        <div className="text-[1.7rem]">ZENJI</div>
        <div className="font-mono text-[0.6rem] font-semibold">
          {
            links.slice(0, -4).map(link => <Link
              key={link.label}
              to={link.link}
              className={
                cn("mx-4 transition-all duration-300 ease-in-out hidden md:inline-block text-foreground/80 relative",
                  "before:hidden before:absolute before:top-1/2 before:left-1/2 before:w-full before:h-[0.7rem] before:rounded-lg before:bg-foreground/30 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-2 before:blur-xs",
                  "hover:text-foreground hover:translate-y-[-0.08rem] hover:before:block",
                )}
              style={{}}
            >
              {link.label}
            </Link>)
          }
          <Button
            variant="ghost"
            className={cn("text-[0.6rem] h-max rounded-none p-0 transition-all duration-300 ease-in-out relative text-foreground/80 cursor-pointer hidden md:inline-flex",
              "before:absolute before:top-1/2 before:left-1/2 before:w-full before:h-[0.7rem] before:rounded-lg before:bg-foreground/30 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-2 before:blur-xs before:hidden",
              "hover:bg-transparent! hover:before:block hover:translate-y-[-0.08rem]")}
          >
            MORE
            <MdKeyboardArrowDown className="h-max w-max" />
          </Button>
        </div>
        <div className="flex">
          <Button variant="ghost" className="rounded-none p-0 w-max h-max mx-3 hover:text-destructive hover:bg-transparent! cursor-pointer hidden md:block">
            <IoSearchOutline className="size-5" />
          </Button>
          <Button variant="ghost" className="rounded-none p-0 w-max h-max mx-3 hover:text-destructive hover:bg-transparent! cursor-pointer">
            <IoMdHeartEmpty className="size-5" />
          </Button>
          <Button variant="ghost" className="rounded-none p-0 w-max h-max mx-3 hover:text-destructive hover:bg-transparent! cursor-pointer">
            <IoCartOutline className="size-5" />
          </Button>
          <Button variant="ghost" className="rounded-none p-0 w-max h-max mx-3 hover:text-destructive hover:bg-transparent! cursor-pointer hidden md:block">
            <RxPerson className="size-5" />
          </Button>
          <Button variant="ghost" className="rounded-none p-0 w-max h-max mx-3 hover:text-destructive hover:bg-transparent! cursor-pointer block md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <RiCloseLargeLine className="size-5" /> : <HiOutlineBars3 className="size-5" />}
          </Button>
        </div>
      </div>

      <div className="flex flex-col bg-background overflow-hidden px-4 md:px-10 h-0 font-mono pt-2.5 text-[0.8rem] font-bold" ref={mobileMenuRef}>
        {
          links.map(link => <Link key={link.label} to={link.link} className="py-2.5 border-t border-foreground/10">{link.label}</Link>)
        }
      </div>
    </nav>
  )
}

export default Navbar;
