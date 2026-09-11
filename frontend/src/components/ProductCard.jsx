import { ShoppingCart, Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

function ProductCard({ product }) {
  return (
    <Card>
      <div className="flex h-60 items-center justify-center bg-secondary">
        Product Image
      </div>

      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">
          {product.category}
        </p>

        <h3 className="mt-1 text-lg font-semibold">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-primary">
          <Star size={15} fill="currentColor" />
          <span className="text-sm">{product.rating}</span>
        </div>

        <p className="mt-3 text-lg font-bold">
          ₹{product.price}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button className="w-full">
          <ShoppingCart />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;