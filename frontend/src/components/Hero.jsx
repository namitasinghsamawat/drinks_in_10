import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-tag">YOUR SPIRITS, DELIVERED</p>

        <h1>
          Good taste,
          <br />
          right at your door.
        </h1>

        <p className="hero-description">
          Discover your favourite spirits from trusted local sellers and get
          them delivered to your doorstep.
        </p>

        <Link to="/products">
          <Button size="lg">
            Explore Collection
          </Button>
        </Link>
      </div>

      <div className="hero-visual">
        <div className="hero-bottle">
          <span>Amber</span>
          <strong>Barrel</strong>
        </div>
      </div>
    </section>
  );
}

export default Hero;