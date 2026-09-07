import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger)

function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const exploreRef = useRef<HTMLDivElement>(null)
  const communityRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const links: Array<Record<string, string>> = [
    { label: "Home", link: "/" },
    { label: "Drop", link: "/" },
    { label: "Collection", link: "/" },
    { label: "Lookbook", link: "/" },
    { label: "Our Story", link: "/" },
    { label: "Collection", link: "/" },
    { label: "TikTok", link: "/" },
    { label: "Instagram", link: "/" },
    { label: "Facebook", link: "/" },
    { label: "FAQ", link: "/" },
    { label: "Review", link: "/" },
    { label: "Privacy Policy", link: "/" },
    { label: "Terms", link: "/" },
    { label: "Help", link: "/" },
    { label: "Return Policy", link: "/" },
    { label: "Contact Us", link: "/" },
  ]

  useEffect(() => {
    const dropLinks = dropRef.current?.querySelectorAll("a");
    const exploreLinks = exploreRef.current?.querySelectorAll("a");
    const communityLinks = communityRef.current?.querySelectorAll("a");
    const contactLinks = contactRef.current?.querySelectorAll("a");

    if (!footerRef.current || !dropLinks || !exploreLinks || !communityLinks || !contactLinks) return;

    const ctx = gsap.context(() => {
      gsap.set(dropLinks, { y: 20, opacity: 0 });
      gsap.set(exploreLinks, { y: 20, opacity: 0 });
      gsap.set(communityLinks, { y: 20, opacity: 0 });
      gsap.set(contactLinks, { y: 20, opacity: 0 });

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 40%",
        toggleActions: "play none none none",
        onEnter: () => {
          gsap.to(dropLinks, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.2
          })

          gsap.to(exploreLinks, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.2
          })

          gsap.to(communityLinks, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.2
          })

          gsap.to(contactLinks, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.2
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef}>
      <div className="mx-auto px-[clamp(1rem,calc(1rem+(100vw-320px)*0.075),4.25rem)] flex flex-col md:flex-row justify-between items-start mt-11 mb-12 py-4 relative before:absolute before:-top-4 before:left-0 before:h-0.5 before:w-full before:bg-text font-mono">
        <div className="mb-15 md:mb-0">
          <div className="text-[1.7rem] font-sans mb-8">ZENJI</div>
          <p className="text-[0.6rem] text-foreground/60 max-w-60 leading-4">
            Wear the Arc. Anime-inspired streetwear for gamers and otaku. Every drop limited. No restocks. Ever.
          </p>
          <div className="mt-5 text-[0.5rem] text-foreground/60 mb-2">Follow the lore</div>
          <div className="flex flex-wrap">
            <Button className="text-[0.6rem] p-4 bg-foreground text-background rounded-none"> <FaTiktok className="size-2.5" /> TikTok</Button>
            <Button className="text-[0.6rem] p-4 mx-1 bg-linear-to-tr from-accent-orange to-accent-pink rounded-none"> <FaInstagram className="size-2.5" /> Instagram</Button>
            <Button className="text-[0.6rem] p-4 bg-accent-blue rounded-none"> <FaFacebook className="size-2.5" /> Facebook</Button>
          </div>
        </div>

        <div className="text-[0.65rem]">
          <div className="text-foreground/50">DROPS</div>
          <div className="flex flex-col" ref={dropRef}>
            {
              links.slice(0, 3).map((link, idx) => <Link key={idx} className="my-1 mx-0 w-max" to={link.link}>{link.label}</Link>)
            }
          </div>
        </div>

        <div className="my-15 md:my-0 text-[0.65rem]">
          <div className="text-foreground/50">EXPLORE</div>
          <div className="flex flex-col" ref={exploreRef}>
            {
              links.slice(3, 6).map((link, idx) => <Link key={idx} className="my-1 mx-0 w-max" to={link.link}>{link.label}</Link>)
            }
          </div>
        </div>

        <div className="text-[0.65rem]">
          <div className="text-foreground/50">COMMUNITY</div>
          <div className="flex flex-col" ref={communityRef}>
            {
              links.slice(6, 9).map((link, idx) => <Link key={idx} className="my-1 mx-0 w-max" to={link.link}>{link.label}</Link>)
            }
          </div>
        </div>

        <div className="mt-15 md:mt-0 text-[0.65rem]">
          <div className="text-foreground/50">CONTACT</div>
          <div className="flex flex-col" ref={contactRef}>
            {
              links.slice(9).map((link, idx) => <Link key={idx} className="my-1 mx-0 w-max" to={link.link}>{link.label}</Link>)
            }
          </div>
        </div>
      </div>

      <div className="font-mono text-[0.5rem] font-medium text-foreground/70 flex flex-col md:flex-row justify-between items-center border-t border-foreground/15 py-4 px-15">
        <div>&copy; 2026 ZENJI. All drops are final. No restocks. Ever.</div>
        <div className="flex justify-center items-center flex-col md:flex-row">
          <div>
            <Link to={"/"} className="mx-3 hover:text-foreground">Privacy</Link>
            <Link to={"/"} className="mx-3 hover:text-foreground">Terms</Link>
            <Link to={"/"} className="mx-3 hover:text-foreground">Cookies</Link>
          </div>
          <div className="mx-3 flex items-center justify-center before:w-1 before:h-1 before:bg-accent-orange before:rounded-full before:mr-1">
            Anime-inspired. Gamer-built. Community-owned.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
