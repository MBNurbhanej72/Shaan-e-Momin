import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { useMode } from "../../store/ModeStore";

const Footer = () => {

  const navigate = useNavigate();

  const { mode, changeMode } = useMode();

  return (
    <div className={`${mode === "light" ? "footer-main-light" : "footer-main-dark"} footer-main d-flex justify-content-between align-items-center`}>
      <div className="text-center">
        <img src={`/assets/images/about-icon-${mode === "light" ? "light" : "dark"}.png`} alt="Icon" width={33} height={33} />

        <p className="footer-text">About</p>
      </div>

      <div className="text-center">
        <img src={`/assets/images/ad-icon-${mode === "light" ? "light" : "dark"}.png`} alt="Icon" width={33} height={33} />

        <p className="footer-text">Advertisement</p>
      </div>

      <div className="text-center" onClick={() => navigate("/contact")}>
        <img src={`/assets/images/contact-icon-${mode === "light" ? "light" : "dark"}.png`} alt="Icon" width={33} height={33} />

        <p className="footer-text">Contact</p>
      </div>

    </div>
  );
};

export default Footer;