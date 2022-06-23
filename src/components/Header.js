import "../styles/Header.css";
import Logo from "../data/images/logo.jpeg";

function Header({ cartTotalNumber }) {
  return (
    <div className="header">
      <HeaderShow logo={Logo}/>
      <NavBar cartTotalNumber={cartTotalNumber}/>
    </div>
  );
};

function HeaderShow({ logo }) {
  return (
    <div className="header-show">
      <img src={logo} alt="logo" className="header-logo" />
      <h1 className="header-h1">xu leathers</h1>
    </div>
  );
};

function NavBar({ cartTotalNumber }) {
  return (
    <nav className="navbar">
      <li>Home</li>
      <li>Shop</li>
      <li>Cart ({cartTotalNumber})</li>
    </nav>
  );
};

export default Header;