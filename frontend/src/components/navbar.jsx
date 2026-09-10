


function Navbar() {
    return (
        <nav classname="navbar">
            <div className="logo">Amber Barrel</div>

            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/products">Shop</a>
                <a href="/orders">Orders</a>
            </div>

            <div className="nav-actions">
                <a href="/cart" className="cart-links">Cart</a>
                <a href="/login">
                <button className="login-btn">Login</button> 
                </a>
            </div>
        </nav>
    );
}

export default Navbar;