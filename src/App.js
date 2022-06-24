import "./styles/App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);

  // const cartTotalNumber = cartItems.reduce((previous, current) => {
  //   return previous + current.number}, 0
  // );

  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <Outlet context={[cartItems, setCartItems]} />
    </div>
  );
}

export default App;
