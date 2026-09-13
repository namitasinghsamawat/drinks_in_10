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
                    className="h-11 pl-10 rounded-full bg-muted/20 border-border/40 focus-visible:ring-1 shadow-sm transition-all hover:bg-muted/30"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="flex flex-wrap gap-2">
                {["All", "Whisky", "Vodka", "Gin", "Rum", "Wine"].map((cat) => (
                    <Button
                        key={cat}
                        variant={selectedCategory === cat ? "secondary" : "ghost"}
                        className={`rounded-full px-5 text-sm font-medium transition-all ${
                            selectedCategory === cat 
                                ? "shadow-sm bg-secondary text-secondary-foreground" 
                                : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                        }`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default ProductFilters;