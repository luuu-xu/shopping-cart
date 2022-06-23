import "../styles/HomePage.css";
import HomeBannerImage from "../data/images/banner.jpeg";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      <HomeBanner image={HomeBannerImage} />
      <HomeShopButton />
    </div>
  );
};

function HomeBanner({ image }) {
  return (
    <img 
      src={image}
      alt="some beautiful leathers"
      className="home-banner-image" 
    />
  );
};

function HomeShopButton() {
  return (
    // <button className="home-shop-button">
    //   Shop Now
    // </button>
    <Link to='shop' className="home-shop-button">
      Shop Now
    </Link>
  );
};

export default HomePage;