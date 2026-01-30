import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const CartSheet = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Tu carrito está vacío
        </h3>
        <p className="text-sm text-muted-foreground">
          Añade productos para empezar tu pedido
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Items */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 bg-secondary/50 rounded-xl p-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground text-sm truncate">
                {item.name}
              </h4>
              <p className="text-primary font-bold text-sm mt-1">
                {item.price.toFixed(2)}€
              </p>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-accent transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-accent transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-border pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-semibold text-foreground">{totalPrice.toFixed(2)}€</span>
        </div>
        <div className="flex items-center justify-between text-lg">
          <span className="font-bold text-foreground">Total</span>
          <span className="font-bold text-primary">{totalPrice.toFixed(2)}€</span>
        </div>

        {user ? (
          <Button variant="hero" size="lg" className="w-full" asChild>
            <Link to="/checkout">Finalizar pedido</Link>
          </Button>
        ) : (
          <Button variant="hero" size="lg" className="w-full" asChild>
            <Link to="/registro">
              Regístrate para pedir
            </Link>
          </Button>
        )}

        <button
          onClick={clearCart}
          className="text-sm text-muted-foreground hover:text-destructive w-full text-center transition-colors"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default CartSheet;
