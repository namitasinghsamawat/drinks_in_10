import {
  BadgeCheck,
  MapPin,
  Truck,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const features = [
  {
    title: "Verified Sellers",
    description:
      "Shop from trusted sellers whose licenses are verified before they can sell.",
    icon: BadgeCheck,
  },
  {
    title: "Nearby Stores",
    description:
      "Discover verified stores around you and find what is available nearby.",
    icon: MapPin,
  },
  {
    title: "Easy Delivery",
    description:
      "Choose your favourites, checkout in a few steps, and track your order.",
    icon: Truck,
  },
];

function WhyAmberBarrel() {
  return (
    <section className="bg-secondary/40 px-[8%] py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-bold tracking-[2px] text-primary">
            WHY AMBER BARREL
          </p>

          <h2 className="font-heading text-4xl font-semibold text-foreground">
            Made for a better way to shop.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            A simple, trusted way to discover products from verified local
            sellers and get them delivered to your doorstep.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="border-border/70 bg-background transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-7">
                  <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyAmberBarrel;