const Footer = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Legal Links */}
          <div className="flex items-center space-x-6 text-sm">
            <a 
              href="https://elnumae.notion.site/Legal-Notice-1e67cb57d5fb805e9a06c02fc2c0b676?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Imprint
            </a>
            <a 
              href="mailto:hi@emanuelmorhard.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Footer Signature */}
          <div className="text-sm text-muted-foreground">
            Built with 🫶🏻 by{" "}
            <a 
              href="https://emanuelmorhard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Emanuel
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };