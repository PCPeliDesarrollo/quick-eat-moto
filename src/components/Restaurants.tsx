import { Clock, Star, Bike } from "lucide-react";

const restaurants = [
  {
    id: 1,
    name: "La Pizzería Italiana",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    category: "Italiana • Pizza",
    rating: 4.8,
    deliveryTime: "25-35",
    deliveryFee: "Gratis",
    featured: true,
  },
  {
    id: 2,
    name: "Burger House",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "Americana • Hamburguesas",
    rating: 4.6,
    deliveryTime: "20-30",
    deliveryFee: "$15",
    featured: false,
  },
  {
    id: 3,
    name: "Sushi Master",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop",
    category: "Japonesa • Sushi",
    rating: 4.9,
    deliveryTime: "30-40",
    deliveryFee: "$20",
    featured: true,
  },
  {
    id: 4,
    name: "Taquería El Sol",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
    category: "Mexicana • Tacos",
    rating: 4.7,
    deliveryTime: "15-25",
    deliveryFee: "Gratis",
    featured: false,
  },
  {
    id: 5,
    name: "Pasta Fresca",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
    category: "Italiana • Pasta",
    rating: 4.5,
    deliveryTime: "25-35",
    deliveryFee: "$10",
    featured: false,
  },
  {
    id: 6,
    name: "Green Garden",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    category: "Saludable • Ensaladas",
    rating: 4.8,
    deliveryTime: "20-30",
    deliveryFee: "Gratis",
    featured: true,
  },
];

const Restaurants = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Restaurantes cerca de ti
            </h2>
            <p className="text-muted-foreground">
              Los mejores lugares para comer en tu zona
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:underline">
            Ver todos
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <article
              key={restaurant.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {restaurant.featured && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-bold">
                    Destacado
                  </div>
                )}
                {restaurant.deliveryFee === "Gratis" && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                    Envío gratis
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {restaurant.category}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-foreground">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.deliveryTime} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Bike className="w-4 h-4" />
                    <span>{restaurant.deliveryFee}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="sm:hidden text-primary font-semibold hover:underline">
            Ver todos los restaurantes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Restaurants;
