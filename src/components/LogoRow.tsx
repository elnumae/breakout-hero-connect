import generalCatalystLogo from "@/assets/General_Catalyst_logo.png";
import indexVenturesLogo from "@/assets/index.png";
import sequoiaLogo from "@/assets/Sequoia_Capital.png";
import cherryVcLogo from "@/assets/cherryvc.png";

const logos = [
  { name: "General Catalyst", src: generalCatalystLogo, alt: "General Catalyst" },
  { name: "Index Ventures", src: indexVenturesLogo, alt: "Index Ventures" },
  { name: "Sequoia Capital", src: sequoiaLogo, alt: "Sequoia Capital" },
  { name: "Cherry VC", src: cherryVcLogo, alt: "Cherry VC" }
];

export const LogoRow = () => {
  return (
    <div className="mt-16 text-center">
      <p className="text-sm text-muted-foreground mb-8">
        Connecting talents to startups backed by
      </p>
      <div className="flex items-center justify-center gap-12 flex-wrap opacity-60">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="h-12 flex items-center justify-center px-4"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-8 w-auto object-contain filter grayscale brightness-0 invert opacity-50 hover:opacity-70 transition-opacity duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};