import "./styles/App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="App">
      <Header cartTotalNumber={cartItems.length} />
      <Outlet context={[cartItems, setCartItems]} />
    </div>
  );
}

export default App;
