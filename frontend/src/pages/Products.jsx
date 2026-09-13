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
        <ProductFilters
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="mb-12 flex flex-col items-center text-center">
          <h1 className="font-heading text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Find your perfect pour.
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground/80">
            Explore spirits from verified sellers near you.
          </p>
        </div>

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