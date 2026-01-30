import { Bike, Clock, Star } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="gradient-hero py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <Bike className="w-4 h-4" />
              <span>Entrega rápida a domicilio</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
              Tu comida favorita,{" "}
              <span className="text-primary">en minutos</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Descubre los mejores restaurantes de tu zona. Pide para llevar o recíbelo directamente en la puerta de tu casa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl">
                <Bike className="w-5 h-5" />
                Pedir ahora
              </Button>
              <Button variant="outline" size="xl">
                Ver restaurantes
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">30 min</p>
                  <p className="text-xs text-muted-foreground">Entrega promedio</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">4.8/5</p>
                  <p className="text-xs text-muted-foreground">Calificación</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main circle */}
              <div className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center animate-float">
                <div className="w-3/4 h-3/4 rounded-full bg-card shadow-card-hover flex items-center justify-center">
                  <Bike className="w-24 h-24 text-primary" />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 bg-card rounded-2xl p-4 shadow-card animate-bounce-slow">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍕</span>
                  <span className="text-sm font-semibold text-foreground">Pizza</span>
                </div>
              </div>
              
              <div className="absolute bottom-8 left-0 bg-card rounded-2xl p-4 shadow-card animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍔</span>
                  <span className="text-sm font-semibold text-foreground">Hamburguesa</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-8 bg-card rounded-2xl p-4 shadow-card animate-bounce-slow" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌮</span>
                  <span className="text-sm font-semibold text-foreground">Tacos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
