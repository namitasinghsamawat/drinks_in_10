import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ProductFilters({
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
}) {
    return (
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <Input
                    placeholder="Search products..."
                    className="h-11 pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="flex flex-wrap gap-2">
                <Button
                    variant={selectedCategory === "All" ? "secondary" : "outline"}
                    onClick={() => setSelectedCategory("All")}
                >
                    All
                </Button>
                <Button
                    variant={selectedCategory === "Whisky" ? "secondary" : "outline"}
                    onClick={() => setSelectedCategory("Whisky")}
                >
                    Whisky
                </Button>
                <Button
                    variant={selectedCategory === "Vodka" ? "secondary" : "outline"}
                    onClick={() => setSelectedCategory("Vodka")}
                >
                    Vodka
                </Button>
                <Button
                    variant={selectedCategory === "Gin" ? "secondary" : "outline"}
                    onClick={() => setSelectedCategory("Gin")}
                >
                    Gin
                </Button>
                <Button
                    variant={selectedCategory === "Rum" ? "secondary" : "outline"}
                    onClick={() => setSelectedCategory("Rum")}
                >
                    Rum
                </Button>
                <Button
                    variant={selectedCategory === "Wine" ? "secondary" : "outline"}
                    onClick={() => setSelectedCategory("Wine")}
                >
                    Wine
                </Button>
            </div>
        </div>
    );
}

export default ProductFilters;