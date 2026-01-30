const categories = [
  { 
    id: 1, 
    name: "Pizzas", 
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop"
  },
  { 
    id: 2, 
    name: "Hamburguesas", 
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop"
  },
  { 
    id: 3, 
    name: "Bocadillos", 
    image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=200&h=200&fit=crop"
  },
  { 
    id: 4, 
    name: "Raciones", 
    image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=200&h=200&fit=crop"
  },
  { 
    id: 5, 
    name: "Postres", 
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop"
  },
  { 
    id: 6, 
    name: "Bebidas", 
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop"
  },
  { 
    id: 7, 
    name: "Complementos", 
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop"
  },
  { 
    id: 8, 
    name: "Ofertas", 
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&h=200&fit=crop"
  },
];

const Categories = () => {
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

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
