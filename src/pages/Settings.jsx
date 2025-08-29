import { FaAngleLeft, FaChevronRight, FaRegUser } from "react-icons/fa";
import { useMode } from "../store/ModeStore";
import { IoLanguage, IoLogOutOutline, IoNotificationsOutline, IoShareSocialOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { VscColorMode } from "react-icons/vsc";
import { useState } from "react";

const Settings = () => {
  const [notificationCheck, setNotificationCheck] = useState(JSON.parse(localStorage.getItem("Notifications")) || false);

  const navigate = useNavigate();

  const { mode, changeMode } = useMode();

  const handleNotification = () => {
    const newValue = !notificationCheck;
    setNotificationCheck(newValue);
    localStorage.setItem("Notifications", JSON.stringify(newValue));
  };

  return (
    <div className="container position-relative">
      <div className="position-absolute">
        <FaAngleLeft size={25} onClick={() => navigate("/")} cursor={"pointer"} color={mode === "light" ? "black" : "white"} />
      </div>

      <div className="settings-profile d-flex flex-column align-items-center">
        <h2 className={`${mode === "light" ? "light-text" : "dark-text"}`}>Settings</h2>

        <div>
          <img src="/assets/images/pfp.jpg" alt="Profile Image" />
        </div>

        <p className={`${mode === "light" ? "light-text" : "dark-text"}`}>Name</p>
      </div>

      <div className="settings-options">
        <div className="option-div d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <div className="icon-div"><IoLanguage size={18} color="white" /></div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} mb-0`}>Language</p>
          </div>

          <div className="d-flex align-items-center gap-3">
            <p className="lang-name mb-0">English</p>
            <div className="lang-select-box"><FaChevronRight color={mode === "light" ? "black" : "white"} size={16} /></div>
          </div>
        </div>

        <div className="option-div d-flex align-items-center gap-4">
          <div className="icon-div"><FaRegUser size={16} color="white" /></div>

          <p className={`${mode === "light" ? "light-text" : "dark-text"} mb-0`}>User Profile</p>
        </div>

        <div className="option-div d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <div className="icon-div"><IoNotificationsOutline size={18} color="white" /></div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} mb-0`}>Notifications</p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <p className="lang-name mb-0">{notificationCheck ? "On" : "Off"}</p>
            <label className="switch">
              <input type="checkbox" checked={notificationCheck} onChange={handleNotification} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="option-div d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <div className="icon-div"><VscColorMode size={18} color="white" /></div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} mb-0`}>Dark Mode</p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <p className="lang-name mb-0">{mode === "light" ? "Off" : "On"}</p>
            <label className="switch">
              <input type="checkbox" checked={mode === "dark" ? true : false} onChange={changeMode} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="option-div d-flex align-items-center gap-4">
          <div className="icon-div"><IoShareSocialOutline size={20} color="white" /></div>

          <p className={`${mode === "light" ? "light-text" : "dark-text"} mb-0`}>Share Link</p>
        </div>

        <div className="d-flex align-items-center gap-4">
          <div className="icon-div"><IoLogOutOutline size={20} color="white" /></div>

          <p className={`${mode === "light" ? "light-text" : "dark-text"} mb-0`}>Log Out</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;