import {
  Wine,
  Martini,
  Beer,
  GlassWater,
  Grape,
} from "lucide-react";

import "./CategorySection.css";

const categories = [
  {
    name: "Whiskey",
    icon: GlassWater,
  },
  {
    name: "Vodka",
    icon: Martini,
  },
  {
    name: "Gin",
    icon: Wine,
  },
  {
    name: "Rum",
    icon: Beer,
  },
  {
    name: "Wine",
    icon: Grape,
  },
];

function CategorySection() {
  return (
    <section className="category-section">
      <div className="category-header">
        <div>
          <p className="section-tag">EXPLORE</p>
          <h2>Shop by Category</h2>
        </div>

        <p className="category-description">
          Find the right pour for every mood and occasion.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button key={category.name} className="category-card">
              <Icon size={30} strokeWidth={1.7} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CategorySection;