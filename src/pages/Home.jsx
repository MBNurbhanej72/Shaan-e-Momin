import { useNavigate } from "react-router-dom";
import { useMode } from "../store/ModeStore";
import { IoSettingsOutline } from "react-icons/io5";
import Footer from "../components/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "../App.css";
import { useEffect, useState } from "react";
import { api } from "../api/Api";

const Home = () => {
  const [pfp, setPfp] = useState(null);

  const getUserData = async () => {
    const token = localStorage.getItem("isLoggedIn");

    try {
      const res = await api.get("get-user-data", {
        headers: {
          Authorization: `Bearer ${token}`
        }, timeout: 5000,
      });

      setPfp(res?.data?.data?.photo_full_url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { getUserData(); }, []);

  const navigate = useNavigate();

  const { mode } = useMode();

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <img src="/assets/images/home-logo.png" alt="Logo Image" height={82} width={82} />

        <div className="d-flex align-items-center">
          <IoSettingsOutline onClick={() => navigate("/user-setting")} size={30} cursor={"pointer"} color={mode === "light" ? "black" : "white"} />

          <div className="pfp" onClick={() => navigate("/user-profile")}>
            <label htmlFor="pfp">
              <img src={pfp === "https://shaan-e-momin.emaad-infotech.com/public/image/no_image.jpg" ? "/assets/images/pfp.jpg" : pfp} alt="Profile Image" />
            </label>
            <div className="pfp-active">
              <div className="pfp-active-inside"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="slider-main">
        <Swiper
          pagination={{
            dynamicBullets: true,
            dynamicMainBullets: 3,
          }}
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper mt-3 overflow-visible"
        >
          <SwiperSlide><img src="/assets/images/slider-img.jpg" alt="Slider Image" /></SwiperSlide>
          <SwiperSlide><img src="/assets/images/slider-img.jpg" alt="Slider Image" /></SwiperSlide>
          <SwiperSlide><img src="/assets/images/slider-img.jpg" alt="Slider Image" /></SwiperSlide>
        </Swiper>
      </div>

      <div style={{ marginBottom: 130 }}>
        <h2 className="home-listing-heading">Business Listing</h2>

        <div className="row mt-5">
          <div className="col-4 d-flex flex-column align-items-center justify-content-center">
            <div className={`${mode === "light" ? "home-listing-img-div-light" : "home-listing-img-div-dark"}`}>
              <img src="/assets/images/education.svg" alt="Icon" />
            </div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} home-listing-text`}>Educational</p>
          </div>

          <div className="col-4 d-flex flex-column align-items-center justify-content-center">
            <div className={`${mode === "light" ? "home-listing-img-div-light" : "home-listing-img-div-dark"}`}>
              <img src="/assets/images/ad.svg" alt="Icon" />
            </div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} home-listing-text`}>Advertisement</p>
          </div>

          <div className="col-4 d-flex flex-column align-items-center justify-content-center">
            <div className={`${mode === "light" ? "home-listing-img-div-light" : "home-listing-img-div-dark"}`}>
              <img src="/assets/images/mayyat-news.svg" alt="Icon" />
            </div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} home-listing-text`}>Mayyat News</p>
          </div>

          <div className="col-4 d-flex flex-column align-items-center justify-content-center mt-5">
            <div className={`${mode === "light" ? "home-listing-img-div-light" : "home-listing-img-div-dark"}`}>
              <img src="/assets/images/service.svg" alt="Icon" />
            </div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} home-listing-text`}>Memorial service</p>
          </div>

          <div className="col-4 d-flex flex-column align-items-center justify-content-center mt-5">
            <div className={`${mode === "light" ? "home-listing-img-div-light" : "home-listing-img-div-dark"}`}>
              <img src="/assets/images/settings.svg" alt="Icon" />
            </div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} home-listing-text`}>Settings</p>
          </div>

          <div className="col-4 d-flex flex-column align-items-center justify-content-center mt-5">
            <div className={`${mode === "light" ? "home-listing-img-div-light" : "home-listing-img-div-dark"}`}>
              <img src="/assets/images/live-stream.svg" alt="Icon" />
            </div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} home-listing-text`}>Live Streaming</p>
          </div>

          <div className="col-4 d-flex flex-column align-items-center justify-content-center mt-5">
            <div className={`${mode === "light" ? "home-listing-img-div-light" : "home-listing-img-div-dark"}`}>
              <img src="/assets/images/job-vacancy.svg" alt="Icon" />
            </div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} home-listing-text`}>Job Vacancy</p>
          </div>

          <div className="col-4 d-flex flex-column align-items-center justify-content-center mt-5">
            <div className={`${mode === "light" ? "home-listing-img-div-light" : "home-listing-img-div-dark"}`}>
              <img src="/assets/images/greeting.svg" alt="Icon" />
            </div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} home-listing-text`}>Greeting</p>
          </div>

          <div className="col-4 d-flex flex-column align-items-center justify-content-center mt-5">
            <div className={`${mode === "light" ? "home-listing-img-div-light" : "home-listing-img-div-dark"}`}>
              <img src="/assets/images/social.svg" alt="Icon" />
            </div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} home-listing-text`}>Social</p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
