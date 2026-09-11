function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="flex flex-col gap-4 px-[8%] py-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Amber Barrel
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Your spirits. Your city. Delivered.
          </p>
        </div>

        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Amber Barrel
        </div>
      </div>
    </footer>
  );
}

export default Footer;