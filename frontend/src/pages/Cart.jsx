import { useContext } from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import CartContext from "../context/CartContext";
import { Button } from "@/components/ui/button";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-primary/60" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Looks like you haven't added anything to your cart yet. Discover our latest products!
        </p>
        <Button asChild className="rounded-full px-8">
          <Link to="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 py-12 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <Button variant="ghost" onClick={clearCart} className="text-muted-foreground hover:text-destructive">
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-card rounded-2xl border border-border/50 shadow-sm gap-4 transition-all hover:shadow-md">
              
              <div className="w-24 h-24 bg-muted/20 rounded-xl p-2 flex-shrink-0 flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                ) : (
                  <ShoppingBag className="w-8 h-8 text-muted-foreground/50" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{item.category}</p>
                <h3 className="font-semibold text-lg text-foreground truncate">{item.name}</h3>
                <p className="text-muted-foreground text-sm">{item.volume}</p>
                <p className="font-semibold mt-2">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center bg-muted/30 rounded-full border border-border/50">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.id, -1)}>
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.id, 1)}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-border/50 rounded-3xl p-6 h-fit shadow-sm sticky top-24">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div className="space-y-4 text-sm mb-6">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-foreground font-medium">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-foreground font-medium">Free</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span className="text-foreground font-medium">Calculated at checkout</span>
            </div>
            
            <div className="border-t border-border/50 pt-4 mt-4 flex justify-between items-center">
              <span className="font-semibold text-base">Total</span>
              <span className="font-bold text-xl text-primary">₹{cartTotal}</span>
            </div>
          </div>

          <Button className="w-full rounded-full py-6 text-base shadow-lg shadow-primary/20">
            Proceed to Checkout
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            Secure checkout powered by AmberBarrel
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;