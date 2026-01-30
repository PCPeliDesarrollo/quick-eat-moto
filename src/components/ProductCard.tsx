import { Plus, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

export const allProducts: Product[] = [
  // PIZZAS
  { id: 1, name: "Pizza Margarita", description: "Tomate, mozzarella fresca y albahaca", price: 9.50, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop", category: "Pizzas", popular: true },
  { id: 2, name: "Pizza 4 Quesos", description: "Mozzarella, gorgonzola, parmesano y emmental", price: 12.00, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop", category: "Pizzas" },
  { id: 3, name: "Pizza Pepperoni", description: "Tomate, mozzarella y pepperoni picante", price: 11.00, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop", category: "Pizzas", popular: true },
  { id: 4, name: "Pizza Barbacoa", description: "Pollo, bacon, cebolla y salsa BBQ", price: 12.50, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", category: "Pizzas" },
  { id: 5, name: "Pizza Vegetal", description: "Pimiento, champiñones, cebolla y aceitunas", price: 10.50, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop", category: "Pizzas" },
  { id: 6, name: "Pizza Hawaiana", description: "Jamón york y piña natural", price: 10.00, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", category: "Pizzas" },

  // HAMBURGUESAS
  { id: 10, name: "Hamburguesa Clásica", description: "Carne de ternera, lechuga, tomate, cebolla y salsa especial", price: 8.90, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", category: "Hamburguesas", popular: true },
  { id: 11, name: "Hamburguesa BBQ", description: "Doble carne, bacon, cheddar y salsa barbacoa", price: 11.50, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop", category: "Hamburguesas", popular: true },
  { id: 12, name: "Hamburguesa Cheese", description: "Carne de ternera con doble queso cheddar", price: 9.50, image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop", category: "Hamburguesas" },
  { id: 13, name: "Hamburguesa Crispy", description: "Pollo crujiente, lechuga y mayonesa", price: 8.50, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop", category: "Hamburguesas" },
  { id: 14, name: "Hamburguesa Doble", description: "Doble carne, bacon, huevo y queso", price: 13.00, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop", category: "Hamburguesas" },
  { id: 15, name: "Hamburguesa Vegana", description: "Burger vegetal, aguacate y verduras frescas", price: 10.00, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop", category: "Hamburguesas" },

  // BOCADILLOS
  { id: 20, name: "Bocadillo de Lomo", description: "Lomo a la plancha con pimientos y queso", price: 6.50, image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=400&h=300&fit=crop", category: "Bocadillos", popular: true },
  { id: 21, name: "Bocadillo de Jamón", description: "Jamón serrano con tomate natural", price: 5.50, image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop", category: "Bocadillos" },
  { id: 22, name: "Bocadillo de Tortilla", description: "Tortilla española casera con cebolla", price: 4.50, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop", category: "Bocadillos" },
  { id: 23, name: "Bocadillo Vegetal", description: "Lechuga, tomate, huevo, atún y mayonesa", price: 5.00, image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop", category: "Bocadillos" },
  { id: 24, name: "Bocadillo de Calamares", description: "Calamares a la romana con alioli", price: 6.00, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop", category: "Bocadillos" },

  // RACIONES
  { id: 30, name: "Patatas Bravas", description: "Patatas fritas con salsa brava casera", price: 4.50, image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop", category: "Raciones", popular: true },
  { id: 31, name: "Alitas de Pollo", description: "Alitas crujientes con salsa buffalo", price: 7.90, image: "https://images.unsplash.com/photo-1608039829572-f56e0c51e842?w=400&h=300&fit=crop", category: "Raciones", popular: true },
  { id: 32, name: "Nachos con Queso", description: "Nachos crujientes con queso fundido y jalapeños", price: 6.50, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop", category: "Raciones" },
  { id: 33, name: "Aros de Cebolla", description: "Aros de cebolla rebozados y crujientes", price: 5.00, image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop", category: "Raciones" },
  { id: 34, name: "Nuggets de Pollo", description: "8 nuggets de pollo con salsa a elegir", price: 6.00, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop", category: "Raciones" },
  { id: 35, name: "Patatas Fritas", description: "Patatas fritas crujientes", price: 3.50, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop", category: "Raciones" },

  // POSTRES
  { id: 40, name: "Tarta de Chocolate", description: "Tarta casera de chocolate belga", price: 4.90, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop", category: "Postres", popular: true },
  { id: 41, name: "Brownie con Helado", description: "Brownie caliente con helado de vainilla", price: 5.50, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop", category: "Postres" },
  { id: 42, name: "Tiramisú", description: "Tiramisú italiano casero", price: 4.50, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop", category: "Postres" },
  { id: 43, name: "Cheesecake", description: "Tarta de queso con coulis de frutos rojos", price: 5.00, image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=300&fit=crop", category: "Postres" },
  { id: 44, name: "Helado (3 bolas)", description: "Elige entre vainilla, chocolate o fresa", price: 3.50, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop", category: "Postres" },

  // BEBIDAS
  { id: 50, name: "Coca-Cola", description: "Coca-Cola 33cl", price: 2.00, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop", category: "Bebidas" },
  { id: 51, name: "Fanta Naranja", description: "Fanta Naranja 33cl", price: 2.00, image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400&h=300&fit=crop", category: "Bebidas" },
  { id: 52, name: "Agua Mineral", description: "Agua mineral 50cl", price: 1.50, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop", category: "Bebidas" },
  { id: 53, name: "Cerveza", description: "Cerveza Mahou 33cl", price: 2.50, image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop", category: "Bebidas" },
  { id: 54, name: "Nestea", description: "Nestea Limón 33cl", price: 2.00, image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop", category: "Bebidas" },
  { id: 55, name: "Café", description: "Café solo o con leche", price: 1.50, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop", category: "Bebidas" },

  // COMPLEMENTOS
  { id: 60, name: "Extra de Queso", description: "Queso cheddar o mozzarella extra", price: 1.50, image: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=400&h=300&fit=crop", category: "Complementos" },
  { id: 61, name: "Extra de Bacon", description: "Bacon crujiente extra", price: 1.50, image: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=300&fit=crop", category: "Complementos" },
  { id: 62, name: "Salsa BBQ", description: "Tarrina de salsa barbacoa", price: 0.50, image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=300&fit=crop", category: "Complementos" },
  { id: 63, name: "Salsa Alioli", description: "Tarrina de alioli casero", price: 0.50, image: "https://images.unsplash.com/photo-1600699899277-6b586084e983?w=400&h=300&fit=crop", category: "Complementos" },
  { id: 64, name: "Ensalada", description: "Ensalada mixta con tomate y cebolla", price: 3.50, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", category: "Complementos" },
];

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, items } = useCart();
  const { toast } = useToast();

  const handleAddItem = () => {
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

  const isInCart = items.some(item => item.id === product.id);

  return (
    <article className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-40 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.popular && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full gradient-primary text-primary-foreground text-xs font-bold">
            Popular
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-primary">
            {product.price.toFixed(2)}€
          </span>
          <Button 
            size="icon" 
            variant={isInCart ? "secondary" : "default"}
            className="rounded-full w-8 h-8"
            onClick={handleAddItem}
          >
            {isInCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
