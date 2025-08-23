import generalCatalystLogo from "@/assets/general-catalyst-logo.png";
import indexVenturesLogo from "@/assets/index-ventures-logo.png";
import sequoiaLogo from "@/assets/sequoia-logo.png";
import sheLogo from "@/assets/she-logo.png";

const logos = [
  { name: "General Catalyst", src: generalCatalystLogo, alt: "General Catalyst" },
  { name: "Index Ventures", src: indexVenturesLogo, alt: "Index Ventures" },
  { name: "Sequoia", src: sequoiaLogo, alt: "Sequoia Capital" },
  { name: "SHE", src: sheLogo, alt: "SHE" }
];

export const LogoRow = () => {
  return (
    <div className="mt-16 text-center">
      <p className="text-sm text-muted-foreground mb-8">
        Connecting talents to startups backed by
      </p>
      <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="h-12 flex items-center justify-center px-4"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-8 w-auto object-contain filter grayscale opacity-70 hover:opacity-90 transition-opacity duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};