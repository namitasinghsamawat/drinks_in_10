import { CheckCircle2, Clock3, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const sellers = [
  {
    name: "Royal Spirits",
    distance: "1.8 km away",
    delivery: "20–25 min",
  },
  {
    name: "The Barrel House",
    distance: "2.4 km away",
    delivery: "25–30 min",
  },
  {
    name: "Urban Liquor Mart",
    distance: "3.1 km away",
    delivery: "30–35 min",
  },
];

function NearbySellers() {
  return (
    <section className="px-[8%] py-20">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-xs font-bold tracking-[2px] text-primary">
            NEAR YOU
          </p>

          <h2 className="font-heading text-4xl font-semibold text-foreground">
            Nearby Verified Sellers
          </h2>
        </div>

        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          Shop from verified local sellers and discover what's available
          around you.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {sellers.map((seller) => (
          <Card
            key={seller.name}
            className="transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {seller.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin size={15} />
                    {seller.distance}
                  </div>
                </div>

                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 size={13} />
                  Verified
                </Badge>
              </div>

              <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 size={16} />
                Delivery in {seller.delivery}
              </div>

              <Button variant="outline" className="w-full">
                Shop Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default NearbySellers;