import heroVideo from "../assets/videos/hero.mp4";

function HeroSection() {
  return (
    <section>
      <video className="w-full h-screen object-cover" loop muted autoPlay playsInline>
        <source src={heroVideo} type="video/mp4" />
      </video>
    </section>
  )
}

export default HeroSection;
