import { Package, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_ORDERS = [
  {
    id: "ORD-98234-AX",
    date: "Oct 01, 2026",
    status: "Delivered",
    total: 12450,
    items: [
      { name: "Vintage Oak Reserve", quantity: 2, image: null },
      { name: "Highland Single Malt", quantity: 1, image: null },
    ]
  },
  {
    id: "ORD-98201-BZ",
    date: "Sep 24, 2026",
    status: "Processing",
    total: 4500,
    items: [
      { name: "Spiced Craft Rum", quantity: 3, image: null },
    ]
  }
];

function Orders() {
  return (
    <div className="max-w-4xl mx-auto p-6 py-12 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Package className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Your Orders</h1>
      </div>

      <div className="space-y-6">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md">
            
            {/* Order Header */}
            <div className="bg-muted/30 p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50">
              <div className="grid grid-cols-2 sm:flex sm:gap-8 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order Placed</p>
                  <p className="text-sm font-medium">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total</p>
                  <p className="text-sm font-medium">₹{order.total}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order #</p>
                  <p className="text-sm font-medium">{order.id}</p>
                </div>
              </div>
              
              <Button variant="outline" className="rounded-full shadow-none whitespace-nowrap">
                View Invoice
              </Button>
            </div>

            {/* Order Body */}
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-6">
                {order.status === "Delivered" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Clock className="w-5 h-5 text-orange-500" />
                )}
                <h3 className="font-semibold text-lg">{order.status}</h3>
              </div>

              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted/20 rounded-lg flex items-center justify-center flex-shrink-0">
                       <Package className="w-6 h-6 text-muted-foreground/50" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <Button variant="ghost" className="rounded-full px-4 text-primary hover:text-primary hover:bg-primary/5">
                      Buy Again
                    </Button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}

        {MOCK_ORDERS.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-xl font-medium mb-2">No orders found</h2>
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;