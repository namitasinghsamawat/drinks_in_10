import { ShoppingCart } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

function ProductCard({ product }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-transparent bg-transparent shadow-none hover:bg-card/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 rounded-[2rem] group p-2">

      {/* Product Image */}
      <div className="flex h-60 items-center justify-center bg-muted/20 p-6 rounded-[1.5rem] transition-colors duration-500 group-hover:bg-muted/30">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-sm text-muted-foreground">
            Product Image
          </span>
        )}
      </div>

      <CardContent className="flex flex-col flex-grow p-4 px-2">

        {/* Category */}
        <p className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground/70">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="mt-1.5 text-[1.1rem] font-medium leading-tight tracking-tight text-foreground">
          {product.name}
        </h3>

        {/* Brand + Volume */}
        <p className="mt-1.5 text-sm text-muted-foreground/80">
          {product.brand} • {product.volume}
        </p>

        <div className="mt-auto pt-4">
          {/* Price */}
          <p className="text-base font-semibold text-foreground">
            ₹{product.price}
          </p>

          {/* Stock */}
          <p className="mt-1 text-xs text-muted-foreground">
            {product.stock > 0
              ? `${product.stock} available`
              : "Out of stock"}
          </p>
        </div>

      </CardContent>

      <CardFooter className="mt-auto p-4 px-2 pt-0">
        <Button
          variant="outline"
          className="w-full rounded-full border-border/40 text-sm font-medium shadow-none transition-all group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="w-4 h-4 mr-2 opacity-70" />
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>

    </Card>
  );
}

export default ProductCard;