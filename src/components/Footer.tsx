import { Bike, Phone, MapPin, Clock, Instagram, Facebook, Mail, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* CTA Section */}
      <div className="gradient-primary py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-primary-foreground">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                ¿Tienes hambre?
              </h3>
              <p className="opacity-90">
                Haz tu pedido ahora y recíbelo en menos de 30 minutos
              </p>
            </div>
            <Button 
              size="xl" 
              className="bg-card text-foreground hover:bg-card/90 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Pedir ahora
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-foreground text-background py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Logo & description */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-button">
                  <Bike className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold">Tu Sitio</span>
              </div>
              <p className="text-sm opacity-70 mb-6 leading-relaxed">
                Tu restaurante de confianza. Pizzas artesanales, hamburguesas gourmet, bocadillos y mucho más. ¡Te esperamos!
              </p>
              {/* Social */}
              <div className="flex items-center gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-5">Contacto</h4>
              <div className="space-y-4">
                <a href="tel:+34612345678" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-background/10 group-hover:bg-primary flex items-center justify-center transition-all duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Llámanos</p>
                    <p className="font-semibold">+34 612 345 678</p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Encuéntranos</p>
                    <p className="font-semibold">Calle Principal, 1</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Horario</p>
                    <p className="font-semibold">12:00 - 23:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-5">Nuestra Carta</h4>
              <nav className="space-y-3">
                {['Pizzas', 'Hamburguesas', 'Bocadillos', 'Raciones', 'Postres', 'Bebidas'].map((item) => (
                  <a 
                    key={item}
                    href="#" 
                    className="block text-sm opacity-70 hover:opacity-100 hover:text-primary hover:translate-x-1 transition-all duration-200"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Hours detail */}
            <div>
              <h4 className="font-bold text-lg mb-5">Horarios</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-70">Lunes - Jueves</span>
                  <span className="font-semibold">12:00 - 23:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Viernes - Sábado</span>
                  <span className="font-semibold">12:00 - 00:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Domingo</span>
                  <span className="font-semibold">13:00 - 23:00</span>
                </div>
                <div className="pt-4 mt-4 border-t border-background/20">
                  <p className="text-primary font-semibold">🛵 Reparto a domicilio</p>
                  <p className="opacity-70 mt-1">Hasta 30 min antes del cierre</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-50">
              © 2025 Tu Sitio. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm opacity-50">
              <a href="#" className="hover:opacity-100 hover:text-primary transition-all">Aviso legal</a>
              <a href="#" className="hover:opacity-100 hover:text-primary transition-all">Privacidad</a>
              <a href="#" className="hover:opacity-100 hover:text-primary transition-all">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
