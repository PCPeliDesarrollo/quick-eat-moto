import { Bike } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Bike className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">FoodGo</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#" className="hover:text-primary transition-colors">Sobre nosotros</a>
            <a href="#" className="hover:text-primary transition-colors">Restaurantes</a>
            <a href="#" className="hover:text-primary transition-colors">Repartidores</a>
            <a href="#" className="hover:text-primary transition-colors">Ayuda</a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 FoodGo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
