import ProductFilters from "../components/ProductFilters";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

function Products() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  return (
    <main className="min-h-screen bg-background px-[6%] py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold tracking-[2px] text-primary">
            AMBER BARREL SHOP
          </p>

          <h1 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
            Find your perfect pour.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Explore spirits from verified sellers near you.
          </p>
        </div>
        <ProductFilters
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Products;