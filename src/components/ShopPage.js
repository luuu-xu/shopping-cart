import "../styles/ShopPage.css";
import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import PRODUCTS from '../data/PRODUCTS';

function ShopPage() {
  const getCategoryList = (products) => {
    const categoryList = ["Shop All"];
    products.forEach((product) => {
      if (!categoryList.includes(product.category)) {
        categoryList.push(product.category);
      };
    });
    return categoryList;
  };
  const categoryList = getCategoryList(PRODUCTS);
  const [category, setCategory] = useState("Shop All");

  let navigate = useNavigate();

  const onChangeCategory = (e) => {
    setCategory(e.target.id);
    navigate(`/shop/${e.target.id}`);
  };

  return (
    <div className="shop-page">
      <ShopCategorySideNav 
        categoryList={categoryList}
        currentCategory={category}
        onChangeCategory={onChangeCategory}
      />
      <Outlet />
    </div>
  );
};

function ShopCategorySideNav({ categoryList, currentCategory, onChangeCategory }) {
  return (
    <nav className="shop-category-sidenav">
      {categoryList.map((category) => {
        return (
          <li key={category}>
            <button 
              onClick={onChangeCategory}
              id={category}
              className={category === currentCategory
                ?
                "shop-category-sidenav-button selected"
                :
                "shop-category-sidenav-button"
              }
            >
              {category}
            </button>
          </li>
        );
      })}
    </nav>
  );
};

function ShopCategoryMain({ category }) {
  let params = useParams();
  const currentCategory = category || params.category;

  const getItemList = (category, products) => {
    if (category === "Shop All") {
      return products;
    } else {
      return products.filter((product) => product.category === category);
    };
  };
  const itemList = getItemList(currentCategory, PRODUCTS);

  return (
    <div className="shop-category-main">
      <ShopCategoryHeader category={currentCategory} />
      <ShopItemGrid itemList={itemList} />
    </div>
  );
};

function ShopCategoryHeader({ category }) {
  return (
    <h3 className="shop-category-header">{category}</h3>
  );
};

function ShopItemGrid({ itemList }) {
  let navigate = useNavigate();

  const onClickItemCard = (e) => {
    navigate(`/product/${e.target.id}`);
  };

  return (
    <div className="shop-item-grid">
      {itemList.map((item) => {
        return (
          <ShopItemCard 
            item={item}
            key={item.id}
            onClickItemCard={onClickItemCard}
          />
        );
      })}
    </div>
  );
};

function ShopItemCard({ item, onClickItemCard }) {
  return (
    <div 
      className="shop-item-card"
      onClick={onClickItemCard}
      id={item.id}
    >
      <img src={item.url} alt={item.name} className="shop-item-card-image" id={item.id}/>
      <p className="shop-item-card-name" id={item.id}>{item.name}</p>
      <p className="shop-item-card-price" id={item.id}>{item.price}</p>
    </div>
  )
}

export { ShopPage, ShopCategoryMain };