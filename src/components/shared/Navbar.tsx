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
import { useScroll } from "@/context/ScrollContext";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const { scrolled } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const dropdownRef = useRef<HTMLDivElement>(null)

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
    if (!navRef.current) return;
    if (mobileOpen) return;

    gsap.to(navRef.current, {
      backgroundColor: scrolled ? "rgba(14, 11, 11, 1)" : "transparent",
      duration: 0.3,
      ease: "power2.out",
    });
  }, [scrolled]);

  useGSAP(() => {
    if (!mobileMenuRef.current || !navRef.current) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!mobileOpen) return;
    }

    const tl = gsap.timeline();
    const linkEls = mobileMenuRef.current.querySelectorAll("a");

    if (mobileOpen) {
      tl.set(mobileMenuRef.current, { height: 0, pointerEvents: "auto" })
        .set(linkEls, { x: -5, y: 5, opacity: 0 });

      tl.to(navRef.current, { backgroundColor: "rgba(14, 11, 11, 1)", duration: 0.3, ease: "power4.inOut" }, 0)
        .to(mobileMenuRef.current, { height: "auto", duration: 0.3, ease: "power4.inOut" }, "-=0.09")
        .to(linkEls, { x: 0, y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power2.inOut" }, "-=0.15");
    } else {
      const reversedLinks = Array.from(linkEls).toReversed();

      tl.to(reversedLinks, { x: -5, y: 5, opacity: 0, duration: 0.5, stagger: 0.04, ease: "power4.inOut" }, 0)
        .to(mobileMenuRef.current, { height: 0, duration: 0.3, ease: "power4.inOut", pointerEvents: "none" }, "-=0.25");

      // Only transition back to transparent if the user is not currently scrolled
      if (!scrolled) {
        tl.to(navRef.current, { backgroundColor: "transparent", duration: 0.3, ease: "power4.inOut" }, "-=0.25");
      }
    }
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "top-0 shadow-md" : "top-7"
      )}
      ref={navRef}
    >
      <div className="flex justify-between items-center px-4 md:px-10 py-3.5 bg-transparent w-full max-w-360 mx-auto">
        <div className="text-[1.7rem]">ZENJI</div>
        <div className="font-mono text-[0.6rem] font-semibold flex items-center justify-center">
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
          <div ref={dropdownRef} className="relative mx-3">
            <Button
              variant="ghost"
              onClick={() => setOpen(!open)}
              className={cn("text-[0.6rem] h-max rounded-none p-0 transition-all duration-300 ease-in-out relative text-foreground/80 cursor-pointer hidden md:inline-flex",
                "before:absolute before:top-1/2 before:left-1/2 before:w-full before:h-[0.7rem] before:rounded-lg before:bg-foreground/30 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-2 before:blur-xs before:hidden",
                "hover:bg-transparent! hover:before:block hover:translate-y-[-0.08rem]")}
            >
              MORE
              <MdKeyboardArrowDown className="h-max w-max" />
            </Button>

            <div
              className={cn(
                "absolute top-full left-0 min-w-36 overflow-hidden ease-out z-50 bg-foreground text-background border border-background",
                open
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              )}
            >
              {links.slice(4, -1).map((l) => (
                <Link
                  key={l.label}
                  to={l.link}
                  className={cn(
                    "group block py-1.5 pl-3 hover:bg-background hover:text-foreground border-t border-background/30 tracking-widest transition-all duration-500"
                  )}
                >
                  <span
                    className={cn(
                      "relative inline-block",
                      "before:hidden before:absolute before:top-1/2 before:left-1/2 before:w-full before:h-[0.7rem] before:rounded-lg before:bg-foreground/30 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-2 before:blur-xs",
                      "group-hover:before:block group-hover:translate-y-[-0.08rem]"
                    )}
                  >
                    {l.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
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

      <div className={cn("flex flex-col md:hidden bg-background overflow-hidden px-4 md:px-10 h-0 font-mono text-[0.8rem] font-bold")} ref={mobileMenuRef}>
        {
          links.map(link => <Link key={link.label} to={link.link} className="py-2.5 border-t border-foreground/10">{link.label}</Link>)
        }
      </div>
    </nav>
  )
}

export default Navbar;
