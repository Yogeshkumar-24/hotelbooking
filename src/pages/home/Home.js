import { Header } from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.css";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedHotel from "../../components/featuredHotel/FeaturedHotel";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Featured Hotels</h1>
        <FeaturedHotel />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
