import ProductCard from "./ProductCard";

const products = [
  {
    name: "Amber Reserve",
    category: "Whiskey",
    price: 2499,
    rating: 4.7,
  },
  {
    name: "Oak & Gold",
    category: "Whiskey",
    price: 3199,
    rating: 4.8,
  },
  {
    name: "Silver Frost",
    category: "Vodka",
    price: 1899,
    rating: 4.5,
  },
  {
    name: "Cask No. 7",
    category: "Rum",
    price: 2199,
    rating: 4.6,
  },
];

function TrendingProducts() {
  return (
    <section className="px-[8%] py-20">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-xs font-bold tracking-[2px] text-primary">
            CUSTOMER FAVOURITES
          </p>

          <h2 className="font-heading text-4xl font-semibold text-foreground">
            Trending right now
          </h2>
        </div>

        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          Discover bottles customers are loving right now.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default TrendingProducts;