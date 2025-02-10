function Home() 
{
    return (
        <>
            <div className="container">
                <h1>Welcome to Cropix Shopping Cart! 🛒</h1>
                
                <p>
                    Discover a seamless shopping experience with our fully functional shopping cart, 
                    built using <strong>React and Redux</strong>. Easily add, remove, and update item quantities, 
                    all with real-time state management.
                </p>

                <h2>✨ Features of This Project</h2>
                <ul>
                    <li><strong>🛍️ Add & Remove Items:</strong> Effortlessly add items to your cart and remove them when needed.</li>
                    <li><strong>📦 Category-Based Shopping:</strong> Browse through <em>Veg, Non-Veg, and Dairy</em> sections.</li>
                    <li><strong>⚡ Real-Time Updates:</strong> Experience instant state updates with Redux.</li>
                    <li><strong>📊 Order Summary:</strong> View a breakdown of your cart before purchasing.</li>
                    <li><strong>🔐 User Authentication:</strong> Sign in to manage your orders and cart.</li>
                </ul>

                <h2>🚀 Tech Stack Used</h2>
                <ul>
                    <li><strong>React.js:</strong> For building dynamic UI components.</li>
                    <li><strong>Redux:</strong> For managing global state efficiently.</li>
                    <li><strong>React Router:</strong> For smooth navigation between pages.</li>
                    <li><strong>LocalStorage:</strong> For persisting cart and user data.</li>
                </ul>

                <h2>🛒 Start Shopping Now!</h2>
                <p>
                    Explore our categories, add items to your cart, and enjoy a smooth online shopping experience! 
                    Click on <strong>Veg, Non-Veg, Dairy</strong> sections to begin shopping.
                </p>
            </div>
        </>
    );
}

export default Home;
