// import HeroCarousel from "../../components/custom/HeroCarousel/HeroCarousel.jsx";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Discover the Future of Shopping</h1>
          <p>Exclusive Deals. Premium Quality. Seamless Experience.</p>
          <div className={styles.heroButtons}>
            <button className={styles.shopNowBtn}>Shop Now</button>
            <button className={styles.exploreBtn}>Explore More</button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img
            src="https://source.unsplash.com/600x400/?shopping,fashion"
            alt="Hero"
          />
        </div>
      </section>
      {/* <HeroCarousel /> */}
    </div>
  );
};

export default Home;
