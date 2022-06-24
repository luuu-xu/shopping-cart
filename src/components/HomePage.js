import "../styles/HomePage.css";
import HomeBannerImage from "../data/images/banner.jpeg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function HomePage() {
  return (
    <div className="home-page">
      <HomeBanner homeBannerImage={HomeBannerImage} />
      <HomeShopButton />
    </div>
  );
};

function HomeBanner({ homeBannerImage }) {
  return (
    <img 
      src={homeBannerImage}
      alt="some beautiful leathers"
      className="home-banner-image" 
    />
  );
};

function HomeShopButton() {
  return (
    <Link to='shop' className="home-shop-button">
      Shop Now
    </Link>
  );
};

HomeBanner.propTypes = {
  homeBannerImage: PropTypes.string.isRequired
};

export default HomePage;