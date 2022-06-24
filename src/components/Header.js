import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../data/images/logo.jpeg";

function Header({ cartItems }) {
  const cartTotalNumber = cartItems.reduce((previous, current) => {
    return previous + current.number}, 0
  );

  return (
    <div className="header">
      <HeaderShow logo={Logo}/>
      <NavBar cartTotalNumber={cartTotalNumber}/>
    </div>
  );
};

function HeaderShow({ logo }) {
  let navigate = useNavigate();

  const onClickHeaderShow = () => {
    navigate('/');
  };

  return (
    <div className="header-show" onClick={onClickHeaderShow}>
      <img src={logo} alt="logo" className="header-logo" />
      <h1 className="header-h1">xu leathers</h1>
    </div>
  );
};

function NavBar({ cartTotalNumber }) {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="shop">Shop</Link>
      <Link to="cart">Cart({cartTotalNumber})</Link>
    </nav>
  );
};

export default Header;