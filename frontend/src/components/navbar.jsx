import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { ShoppingCart, MapPin, ChevronDown, X, LocateFixed, Search } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("Select your location");

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSelectAddress = (address) => {
    setDeliveryAddress(address);
    setIsLocationOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="flex items-center gap-8">
          <div className="logo">
            <Link to="/">Amber Barrel</Link>
          </div>

          {/* Location Selector */}
          <button 
            onClick={() => setIsLocationOpen(true)}
            className="hidden md:flex flex-col items-start hover:bg-muted/40 p-2 rounded-lg transition-colors border border-transparent hover:border-border/50"
          >
            <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">Deliver to</span>
            <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <span className="truncate max-w-[150px]">{deliveryAddress}</span>
              <ChevronDown className="w-4 h-4 text-primary" />
            </div>
          </button>
        </div>

        <div className="nav-links hidden lg:flex">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/orders">Orders</Link>
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="cart-link relative flex items-center gap-1">
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {cartItemCount}
              </span>
            )}
          </Link>

          {user ? (
            <button onClick={handleLogout} className="login-btn">
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Location Modal */}
      {isLocationOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-4 border-b border-border/60 flex items-center justify-between bg-muted/10">
              <h2 className="font-semibold text-lg">Select Delivery Location</h2>
              <button 
                onClick={() => setIsLocationOpen(false)}
                className="p-1 hover:bg-black/5 rounded-full transition-colors text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <button 
                onClick={() => handleSelectAddress("Current Location (GPS)")}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary/5 text-primary hover:bg-primary/10 transition-colors font-medium text-sm mb-4 border border-primary/20"
              >
                <LocateFixed className="w-5 h-5" />
                Detect my current location
              </button>

              <div className="relative mb-6">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search your area, pincode or building..." 
                  className="w-full h-11 pl-9 pr-4 rounded-lg border border-border/80 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Saved Addresses</p>
                <div className="space-y-1">
                  <button onClick={() => handleSelectAddress("Home - 421 Baker St")} className="w-full flex items-start gap-3 p-3 hover:bg-muted/30 rounded-xl transition-colors text-left group">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 group-hover:text-primary transition-colors" />
                    <div>
                      <p className="font-semibold text-sm">Home</p>
                      <p className="text-xs text-muted-foreground">421 Baker Street, London, UK 10023</p>
                    </div>
                  </button>
                  <button onClick={() => handleSelectAddress("Office - Cyber Hub")} className="w-full flex items-start gap-3 p-3 hover:bg-muted/30 rounded-xl transition-colors text-left group">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 group-hover:text-primary transition-colors" />
                    <div>
                      <p className="font-semibold text-sm">Office</p>
                      <p className="text-xs text-muted-foreground">Tower B, Cyber Hub, Tech Park Phase 2</p>
                    </div>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;