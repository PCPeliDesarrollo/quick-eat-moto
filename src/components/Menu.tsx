import { Plus, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const products = [
  {
    id: 1,
    name: "Pizza Margarita",
    description: "Tomate, mozzarella fresca y albahaca",
    price: 9.50,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    category: "Pizzas",
    popular: true,
  },
  {
    id: 2,
    name: "Pizza 4 Quesos",
    description: "Mozzarella, gorgonzola, parmesano y emmental",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    category: "Pizzas",
    popular: false,
  },
  {
    id: 3,
    name: "Hamburguesa Clásica",
    description: "Carne de ternera, lechuga, tomate, cebolla y salsa especial",
    price: 8.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "Hamburguesas",
    popular: true,
  },
  {
    id: 4,
    name: "Hamburguesa BBQ",
    description: "Doble carne, bacon, cheddar y salsa barbacoa",
    price: 11.50,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
    category: "Hamburguesas",
    popular: true,
  },
  {
    id: 5,
    name: "Bocadillo de Lomo",
    description: "Lomo a la plancha con pimientos y queso",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=400&h=300&fit=crop",
    category: "Bocadillos",
    popular: false,
  },
  {
    id: 6,
    name: "Patatas Bravas",
    description: "Patatas fritas con salsa brava casera",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop",
    category: "Raciones",
    popular: true,
  },
  {
    id: 7,
    name: "Tarta de Chocolate",
    description: "Tarta casera de chocolate belga",
    price: 4.90,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    category: "Postres",
    popular: false,
  },
  {
    id: 8,
    name: "Alitas de Pollo",
    description: "Alitas crujientes con salsa buffalo",
    price: 7.90,
    image: "https://images.unsplash.com/photo-1608039829572-f56e0c51e842?w=400&h=300&fit=crop",
    category: "Raciones",
    popular: true,
  },
];

const Menu = () => {
  const { addItem, items } = useCart();
  const { toast } = useToast();

  const handleAddItem = (product: typeof products[0]) => {
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
          <button className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:underline">
            Ver carta completa
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
                {product.popular && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-bold">
                    Popular
                  </div>
                )}
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

        <div className="text-center mt-10">
          <Button variant="outline" size="lg">
            Ver toda la carta
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
