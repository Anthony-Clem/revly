import Hero from "@/components/landing/hero";
import LandingHeader from "@/components/landing/landing-header";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col">
      <LandingHeader />
      <Hero />
    </div>
  );
}
