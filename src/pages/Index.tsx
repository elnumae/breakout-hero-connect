import { useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  useEffect(() => {
    document.title = "BreakoutTalents – AI HeadHunter for German Startup Jobs";
    const ensureTag = (selector: string, create: () => Element) => {
      return document.querySelector(selector) || create();
    };
    const metaDescription = ensureTag('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    }) as HTMLMetaElement;
    metaDescription.setAttribute("content", "AI headhunter connecting top operators with VC-backed startups in Berlin, Munich & across Germany. Find breakout roles or hire 10x operators fast.");

    const canonical = ensureTag('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      document.head.appendChild(l);
      return l;
    }) as HTMLLinkElement;
    canonical.setAttribute("href", `${window.location.origin}/`);

    const ogTitle = ensureTag('meta[property="og:title"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      document.head.appendChild(m);
      return m;
    }) as HTMLMetaElement;
    ogTitle.setAttribute("content", "BreakoutTalents – AI Headhunter for German Startup Jobs");

    const ogDesc = ensureTag('meta[property="og:description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:description");
      document.head.appendChild(m);
      return m;
    }) as HTMLMetaElement;
    ogDesc.setAttribute("content", "AI headhunter connecting talents to VC-backed startups. Hire faster with AI-first sourcing and vetting.");

    const ogUrl = ensureTag('meta[property="og:url"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:url");
      document.head.appendChild(m);
      return m;
    }) as HTMLMetaElement;
    ogUrl.setAttribute("content", `${window.location.origin}/`);
  }, []);

  return <HeroSection />;
};

export default Index;
