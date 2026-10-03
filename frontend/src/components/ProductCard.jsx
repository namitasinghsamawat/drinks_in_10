import { useContext } from "react";
import CartContext from "../context/CartContext";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function ProductCard({ product }) {
  const { addToCart, cart, updateQuantity } = useContext(CartContext);
  
  // Check if product is already in cart to show quantity controls
  const cartItem = cart.find(item => item.id === product.id);

  return (
    <div className="flex flex-col bg-white border border-border/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative group">
      
      {/* Delivery tag */}
      <div className="absolute top-3 left-3 bg-white/90 text-[10px] font-bold tracking-wider px-2 py-1 rounded-md text-foreground shadow-sm backdrop-blur-md z-10 border border-border/50">
        10 MINS
      </div>

      {/* Image */}
      <div className="h-44 bg-muted/10 flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-[1.02]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain drop-shadow-sm"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-md">
            <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-widest">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow bg-white">
        <h3 className="text-[0.95rem] font-semibold leading-tight text-foreground line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <p className="text-[0.8rem] text-muted-foreground mt-1.5 font-medium">
          {product.volume || product.brand}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <p className="text-[1.05rem] font-bold text-foreground">
              ₹{product.price}
            </p>
          </div>

          {cartItem ? (
            <div className="flex items-center bg-primary text-primary-foreground rounded-lg h-9 w-[100px] justify-between px-2 shadow-sm">
              <button 
                onClick={() => updateQuantity(product.id, -1)}
                className="w-7 h-7 flex items-center justify-center text-lg font-bold hover:bg-black/10 rounded-md transition-colors"
              >
                -
              </button>
              <span className="text-sm font-bold">{cartItem.quantity}</span>
              <button 
                onClick={() => updateQuantity(product.id, 1)}
                className="w-7 h-7 flex items-center justify-center text-lg font-bold hover:bg-black/10 rounded-md transition-colors"
              >
                +
              </button>
            </div>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="h-9 px-4 font-bold rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground shadow-none transition-all duration-300 border border-primary/20"
              disabled={product.stock === 0}
              onClick={() => addToCart(product)}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;