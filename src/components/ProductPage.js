import { Link, useOutletContext, useParams } from "react-router-dom";
import "../styles/ProductPage.css";
import PRODUCTS from "../data/PRODUCTS";
import { useState } from "react";

function ProductPage() {
  let params = useParams();
  const product = PRODUCTS.find(product => product.id === params.productId);

  return (
    <div className="product-page">
      <ProductHeaderNav product={product} />
      <ProductMain product={product} />
    </div>
  );
};

function ProductHeaderNav({ product }) {
  return (
    <div className="product-header-nav">
      <Link
        to={`/shop/${product.category}`}
        className="product-header-nav-link"
      >
        {product.category}
      </Link>
      {">"}
      <p className="product-header-name">{product.name}</p>
    </div>
  );
};

function ProductMain({ product }) {
  return (
    <div className="product-main">
      <ProductImage product={product} />
      <ProductShow product={product} />
    </div>
  );
};

function ProductImage({ product }) {
  return (
    <img src={product.url} alt={product.name} className="product-image" />
  );
};

function ProductShow({ product }) {
  return (
    <div className="product-show">
      <p className="product-name">
        {product.name}
      </p>
      <p className="product-price">
        {product.price}
      </p>
      <AddToCartMain product={product} />
    </div>
  );
};

function AddToCartMain({ product }) {
  const [number, setNumber] = useState(1);

  const onChange = (e) => {
    if (e.target.value < 0) {
      setNumber(1);
    } else {
      setNumber(e.target.value);
    };
  };

  const onClickMinus = () => {
    setNumber(number => number - 1);
  };

  const onClickPlus = () => {
    setNumber(number => number + 1);
  };

  const [cartItems, setCartItems] = useOutletContext();

  const onAddToCart = () => {
    if (cartItems.find((item) => item.name === product.name)) {
      const newCartItems = cartItems.map((item) => {
        if (item.name === product.name) {
          return (
            {
              ...item,
              number: item.number + number,
            }
          );
        } else {
          return item;
        };
      });
      setCartItems(newCartItems);
    } else {
      setCartItems(cartItems.concat({
        ...product,
        number: number,
      }));
    }
  };

  return (
    <div className="add-to-cart-main">
      <QuantityControl 
        number={number}
        onChange={onChange}
        onClickMinus={onClickMinus}
        onClickPlus={onClickPlus}
      />
      <button
        type="button"
        className="add-to-cart-button"
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

function QuantityControl({ number, onChange, onClickMinus, onClickPlus }) {
  const minusButtonDisabledClassNames = 
    `quantity-button ${(number <= 1) ? 'disabled' : null}`;

  return (
    <div className="quantity-control">
      <button
        type="button"
        className={minusButtonDisabledClassNames}
        onClick={onClickMinus}
        disabled={number <= 1 ? true : false}
      >
        -
      </button>
      <label htmlFor="quantity">
        <input
          id="quantity"
          className="quantity-input"
          type="number"
          value={number}
          onChange={onChange}
        />
      </label>
      <button
        type="button"
        className="quantity-button"
        onClick={onClickPlus}
      >
        +
      </button>
    </div>
  );
};

export default ProductPage;
