import "../styles/ShopPage.css";
import { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

function ShopPage({ products }) {
  const getCategoryList = (products) => {
    const categoryList = ["Shop All"];
    products.forEach((product) => {
      if (!categoryList.includes(product.category)) {
        categoryList.push(product.category);
      };
    });
    return categoryList;
  };

  const categoryList = getCategoryList(products);

  const [category, setCategory] = useState("Shop All");

  const onChangeCategory = (e) => {
    setCategory(e.target.id);
  };

  return (
    <div className="shop-page">
      <ShopCategorySideNav 
        categoryList={categoryList}
        currentCategory={category}
        onChangeCategory={onChangeCategory}
      />
      {/* <ShopCategoryMain
        category={category}
        products={products}
      /> */}
      <Outlet />
    </div>
  );
};

function ShopCategorySideNav({ categoryList, currentCategory, onChangeCategory }) {
  return (
    <nav className="shop-category-sidenav">
      {categoryList.map((category) => {
        return (
          // <li key={category}>
          //   <button 
          //     onClick={onChangeCategory}
          //     id={category}
          //     className={category === currentCategory
          //       ?
          //       "shop-category-sidenav-button selected"
          //       :
          //       "shop-category-sidenav-button"
          //     }
          //   >
          //     {category}
          //   </button>
          // </li>
          <Link
            to={category}
            key={category}
          >
            {category}
          </Link>
        );
      })}
    </nav>
  );
};

function ShopCategoryMain({ products }) {
  let params = useParams();

  const getItemList = (category, products) => {
    if (category === "Shop All") {
      return products;
    } else {
      return products.filter((product) => product.category === category);
    };
  };

  // const itemList = getItemList(category, products);
  // console.log(params.category);
  const itemList = getItemList(params.category, products);

  return (
    <div className="shop-category-main">
      <ShopCategoryHeader category={params.category} />
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
  const onClickItemCard = (e) => {
    console.log(e.target.id + 'card clicked');
    // Link to specific ProductPage
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