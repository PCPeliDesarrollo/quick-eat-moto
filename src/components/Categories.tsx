import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import ProductCard, { allProducts } from "./ProductCard";

const categories = [
  { id: "Pizzas", name: "Pizzas", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop" },
  { id: "Hamburguesas", name: "Hamburguesas", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop" },
  { id: "Bocadillos", name: "Bocadillos", image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=200&h=200&fit=crop" },
  { id: "Raciones", name: "Raciones", image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=200&h=200&fit=crop" },
  { id: "Postres", name: "Postres", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop" },
  { id: "Bebidas", name: "Bebidas", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop" },
  { id: "Complementos", name: "Complementos", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop" },
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory 
    ? allProducts.filter(p => p.category === selectedCategory)
    : [];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Nuestra carta
          </h2>
          <p className="text-muted-foreground">
            Elige tu categoría favorita
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`group flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                selectedCategory === category.id 
                  ? "bg-primary text-primary-foreground shadow-button" 
                  : "bg-card shadow-card hover:shadow-card-hover"
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl overflow-hidden transition-transform duration-300 ${
                selectedCategory === category.id ? "scale-110 ring-2 ring-primary-foreground" : "group-hover:scale-110"
              }`}>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`text-sm font-semibold ${
                selectedCategory === category.id ? "text-primary-foreground" : "text-foreground"
              }`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Products Panel */}
        {selectedCategory && (
          <div className="bg-secondary/50 rounded-3xl p-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">
                {selectedCategory}
              </h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
