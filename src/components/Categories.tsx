const categories = [
  { id: 1, name: "Pizza", emoji: "🍕", color: "bg-red-100" },
  { id: 2, name: "Hamburguesas", emoji: "🍔", color: "bg-amber-100" },
  { id: 3, name: "Sushi", emoji: "🍣", color: "bg-pink-100" },
  { id: 4, name: "Tacos", emoji: "🌮", color: "bg-yellow-100" },
  { id: 5, name: "Pollo", emoji: "🍗", color: "bg-orange-100" },
  { id: 6, name: "Pasta", emoji: "🍝", color: "bg-red-100" },
  { id: 7, name: "Ensaladas", emoji: "🥗", color: "bg-green-100" },
  { id: 8, name: "Postres", emoji: "🧁", color: "bg-purple-100" },
];

const Categories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Explora por categoría
          </h2>
          <p className="text-muted-foreground">
            Encuentra exactamente lo que se te antoja
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                {category.emoji}
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
