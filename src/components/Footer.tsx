import { Bike, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Bike className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Tu Sitio</span>
            </div>
            <p className="text-sm opacity-70">
              Tu restaurante de confianza. Pizzas artesanales, hamburguesas gourmet y mucho más.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm opacity-70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+34 612 345 678</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Calle Principal, 1</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>12:00 - 23:00</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Enlaces</h4>
            <nav className="space-y-2 text-sm opacity-70">
              <a href="#" className="block hover:opacity-100 transition-opacity">Nuestra carta</a>
              <a href="#" className="block hover:opacity-100 transition-opacity">Ofertas</a>
              <a href="#" className="block hover:opacity-100 transition-opacity">Sobre nosotros</a>
              <a href="#" className="block hover:opacity-100 transition-opacity">Contacto</a>
            </nav>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 text-center text-sm opacity-50">
          © 2025 Tu Sitio. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
