import "../styles/HomePage.css";
import HomeBannerImage from "../data/images/banner.jpeg";

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
    <button className="home-shop-button">
      Shop Now
    </button>
  );
};

export default HomePage;