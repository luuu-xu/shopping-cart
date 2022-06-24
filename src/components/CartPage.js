import { useNavigate, useOutletContext } from "react-router-dom";
import "../styles/CartPage.css";
import PropTypes from "prop-types";

function CartPage() {
  return (
    <div className="cart-page">
      <h3 className="cart-header">Your Cart</h3>
      <CartMain />
    </div>
  );
};

function CartMain() {
  const [cartItems] = useOutletContext();

  return (
    <div className="cart-main">
      <CartItemList cartItems={cartItems} />
      <SubtotalMain cartItems={cartItems} />
    </div>
  );
};

function CartItemList({ cartItems }) {
  return (
    <ul className="cart-item-list">
      {cartItems.map((item) => {
        return (
          <CartItemCard
            item={item}
            key={item.id}
          />
        );
      })}
    </ul>
  );
};

function CartItemCard({ item }) {
  let navigate = useNavigate();

  const onClickItemCard = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <div className="cart-item-card">
      <img
        className="cart-item-image"
        src={item.url}
        alt={item.name}
        onClick={onClickItemCard}
      />
      <CartItemMain item={item} onClickItemCard={onClickItemCard} />
    </div>
  );
};

function CartItemMain({ item, onClickItemCard }) {
  return (
    <div className="cart-item-main">
      <CartItemHeader item={item} onClick={onClickItemCard} />
      <p className="cart-item-price" onClick={onClickItemCard}>
        {item.price}
      </p>
      <QuantityMain item={item} />
    </div>
  );
};

function CartItemHeader({ item }) {
  const priceNumber = (itemPrice) => {
    return Number(itemPrice.replace(/[^0-9]+/g, ''));
  };

  return (
    <div className="cart-item-header">
      <p className="cart-item-name">
        {item.name}
      </p>
      <p className="cart-item-subtotal">
        ${item.number * priceNumber(item.price)}
      </p>
    </div>
  );
};

function QuantityMain({ item }) {
  const [cartItems, setCartItems] = useOutletContext();

  const onChange = (e) => {
    if (Number(e.target.value) < 0) {
      const newCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return (
            {
              ...cartItem,
              number: 1
            }
          );
        } else {
          return cartItem;
        };
      });
      setCartItems(newCartItems);
    } else {
      const newCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return (
            {
              ...cartItem,
              number: Number(e.target.value)
            }
          );
        } else {
          return cartItem;
        };
      });
      setCartItems(newCartItems);
    };
  };

  const onClickMinus = () => {
    const newCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return (
          {
            ...cartItem,
            number: cartItem.number - 1
          }
        );
      } else {
        return cartItem;
      };
    });
    setCartItems(newCartItems);
  };

  const onClickPlus = () => {
    const newCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return (
          {
            ...cartItem,
            number: cartItem.number + 1
          }
        );
      } else {
        return cartItem;
      };
    });
    setCartItems(newCartItems);
  };

  const onClickDelete = () => {
    const newCartItems = cartItems.filter((cartItem) => {
      return cartItem.id !== item.id;
    });
    setCartItems(newCartItems);
  };

  return (
    <div className="quantity-main">
      <QuantityControl
        item={item}
        onChange={onChange}
        onClickMinus={onClickMinus}
        onClickPlus={onClickPlus}
      />
      <button
        className="quantity-button"
        onClick={onClickDelete}
      >
        ×
      </button>
    </div>
  );
};

function QuantityControl({ item, onChange, onClickMinus, onClickPlus }) {
  const minusButtonDisabledClassNames = 
  `quantity-button ${(item.number <= 1) ? 'disabled' : null}`;

  return (
    <div className="quantity-control">
      <button
        className={minusButtonDisabledClassNames}
        onClick={onClickMinus}
        disabled={item.number <= 1 ? true : false}
      >
        -
      </button>
      <label htmlFor="quantity">
        <input
          id="quantity"
          type="number"
          className="quantity-input"
          value={item.number}
          onChange={onChange}
        />
      </label>
      <button
        className="quantity-button"
        onClick={onClickPlus}
      >
        +
      </button>
    </div>
  );
};

function SubtotalMain({ cartItems }) {
  const priceNumber = (itemPrice) => {
    return Number(itemPrice.replace(/[^0-9]+/g, ''));
  };

  const getAmount = (previous, current) => {
    return previous + (current.number * priceNumber(current.price));
  };

  return (
    <div className="subtotal-main">
      <h4 className="subtotal-header">
        Subtotal
      </h4>
      <p className="subtotal-amount">
        ${cartItems.reduce(getAmount, 0)}
      </p>
      <button
        className="subtotal-button"
        onClick={() => alert('in construction...')}
      >
        Checkout
      </button>
    </div>
  );
};

CartItemList.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape(
      {
        number: PropTypes.number.isRequired
      }
    )
  )
};

CartItemCard.propTypes = {
  item: PropTypes.object.isRequired
};

CartItemMain.propTypes = {
  item: PropTypes.object.isRequired,
  onClickItemCard: PropTypes.func.isRequired
};

CartItemHeader.propTypes = {
  item: PropTypes.object.isRequired
};

QuantityMain.propTypes = {
  item: PropTypes.object.isRequired
};

QuantityControl.propTypes = {
  item: PropTypes.object.isRequired, 
  onChange: PropTypes.func.isRequired, 
  onClickMinus: PropTypes.func.isRequired,
  onClickPlus: PropTypes.func.isRequired
};

SubtotalMain.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape(
      {
        number: PropTypes.number.isRequired
      }
    )
  )
};

export default CartPage;