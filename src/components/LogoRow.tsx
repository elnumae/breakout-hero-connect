const logos = [
  { name: "Project A", width: "w-24" },
  { name: "HV Capital", width: "w-20" },
  { name: "Cherry", width: "w-16" },
  { name: "Speedinvest", width: "w-24" },
  { name: "Lakestar", width: "w-20" },
  { name: "Point Nine", width: "w-20" }
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
            className={`${logo.width} h-8 bg-muted-foreground/20 rounded flex items-center justify-center text-xs font-medium text-muted-foreground`}
          >
            {logo.name}
          </div>
        ))}
      </div>
    </div>
  );
};