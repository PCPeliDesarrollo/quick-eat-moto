import { Plus, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { allProducts } from "./ProductCard";

const Menu = () => {
  const { addItem, items } = useCart();
  const { toast } = useToast();

  // Solo mostrar productos populares
  const popularProducts = allProducts.filter(p => p.popular).slice(0, 8);

  const handleAddItem = (product: typeof popularProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast({
      title: "¡Añadido!",
      description: `${product.name} añadido al carrito`,
    });
  };

  const isInCart = (id: number) => items.some(item => item.id === id);

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Productos destacados
            </h2>
            <p className="text-muted-foreground">
              Los favoritos de nuestros clientes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-bold">
                  Popular
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-card/90 backdrop-blur-sm text-xs font-medium text-muted-foreground">
                  {product.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {product.price.toFixed(2)}€
                  </span>
                  <Button 
                    size="icon" 
                    variant={isInCart(product.id) ? "secondary" : "default"}
                    className="rounded-full w-9 h-9"
                    onClick={() => handleAddItem(product)}
                  >
                    {isInCart(product.id) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
