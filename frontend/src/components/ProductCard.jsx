import { ShoppingCart } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

function ProductCard({ product }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">

      {/* Product Image */}
      <div className="flex h-60 shrink-0 items-center justify-center bg-secondary">
        <span className="text-sm text-muted-foreground">
          Product Image
        </span>
      </div>

      <CardContent className="flex flex-col flex-grow p-6">

        {/* Category */}
        <p className="text-sm text-muted-foreground">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="mt-1 text-lg font-semibold line-clamp-2">
          {product.name}
        </h3>

        {/* Brand + Volume */}
        <p className="mt-2 text-sm text-muted-foreground">
          {product.brand} • {product.volume}
        </p>

        <div className="mt-auto pt-4">
          {/* Price */}
          <p className="text-lg font-bold">
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

      <CardFooter className="mt-auto p-6 pt-0">
        <Button
          className="w-full"
          disabled={product.stock === 0}
        >
          <ShoppingCart />
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>

    </Card>
  );
}

export default ProductCard;