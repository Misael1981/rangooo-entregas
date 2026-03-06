const Footer = () => {
  return (
    <footer className="border-t">
      <div className="max-w-105 mx-auto p-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Rangooo
      </div>
    </footer>
  );
};

export default Footer;
