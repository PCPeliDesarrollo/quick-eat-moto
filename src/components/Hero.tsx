import { Bike, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

const Hero = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  const firstName = profile?.full_name?.split(' ')[0];

  return (
    <section className="gradient-hero py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <Bike className="w-4 h-4" />
              <span>Pedidos a domicilio y para llevar</span>
            </div>
            
            {user && firstName ? (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                ¡Hola,{" "}
                <span className="text-primary">{firstName}!</span>
                <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground mt-2">
                  ¿Qué te apetece hoy?
                </span>
              </h1>
            ) : (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                Bienvenido a{" "}
                <span className="text-primary">Tu Sitio</span>
              </h1>
            )}
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Pizzas artesanales, hamburguesas gourmet, bocadillos, raciones y mucho más. Recógelo o te lo llevamos a casa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {user ? (
                <Button variant="hero" size="xl">
                  <Bike className="w-5 h-5" />
                  Pedir a domicilio
                </Button>
              ) : (
                <Button variant="hero" size="xl" asChild>
                  <Link to="/registro">
                    <Bike className="w-5 h-5" />
                    Pedir a domicilio
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="xl">
                Recoger en local
              </Button>
            </div>

            {/* Info */}
            <div className="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">12:00 - 23:00</p>
                  <p className="text-xs text-muted-foreground">Horario</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">Calle Principal, 1</p>
                  <p className="text-xs text-muted-foreground">Ubicación</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main image */}
              <div className="aspect-square rounded-3xl overflow-hidden shadow-card-hover">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop" 
                  alt="Pizza artesanal"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-3 shadow-card-hover animate-bounce-slow">
                <img 
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop" 
                  alt="Hamburguesa"
                  className="w-16 h-16 rounded-xl object-cover"
                />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-3 shadow-card-hover animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                <img 
                  src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=80&h=80&fit=crop" 
                  alt="Postre"
                  className="w-16 h-16 rounded-xl object-cover"
                />
              </div>
              
              <div className="absolute bottom-8 -right-6 bg-card rounded-2xl p-3 shadow-card-hover animate-bounce-slow" style={{ animationDelay: '1s' }}>
                <img 
                  src="https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=80&h=80&fit=crop" 
                  alt="Bocadillo"
                  className="w-16 h-16 rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
