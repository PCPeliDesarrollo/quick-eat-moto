import { Bike, MapPin, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-button">
            <Bike className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">FoodGo</span>
        </div>

        {/* Location */}
        <div className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Seleccionar ubicación</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-primary text-[10px] text-primary-foreground font-bold flex items-center justify-center">
              3
            </span>
          </Button>
          <Button variant="hero" size="sm" className="hidden sm:flex">
            Iniciar sesión
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
