import "./styles/App.css";
import Header from "./components/Header";
import { useState } from "react";
import HomePage from "./components/HomePage";
import ShopPage from "./components/ShopPage";
import PRODUCTS from "./data/PRODUCTS";

function App() {
  const [cartItems, setCartItems] = useState([
    {
      id: "0001",
      number: 1
    }
  ]);

  return (
    <div className="App">
      <Header cartTotalNumber={cartItems.length} />
      {/* <HomePage /> */}
      <ShopPage products={PRODUCTS} />
    </div>
  );
}

export default App;
