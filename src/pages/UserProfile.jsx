import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useMode } from "../store/ModeStore";
import { IoAddCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { api } from "../api/Api";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [pfp, setPfp] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);


  const getUserData = async () => {
    const token = localStorage.getItem("isLoggedIn");

    try {
      const res = await api.get("get-user-data", {
        headers: {
          Authorization: `Bearer ${token}`
        }, timeout: 5000,
      });
      console.log("🚀 ~ getUserData ~ res:", res.data.data);

      setName(res?.data?.data?.name);
      setPfp(res?.data?.data?.photo_full_url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { getUserData(); }, []);

  const navigate = useNavigate();

  const { mode } = useMode();

  const handleLogOut = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  };



  return (
    <div className={`${mode === "light" ? "light-profile-bg" : "dark-profile-bg"}`}>
      <div className="profile-container">
        <div className="profile-uppr settings-profile d-flex flex-column align-items-center">
          <div className="d-flex w-100 justify-content-between align-items-center" style={{ marginBottom: 23 }}>
            <div className={`${mode === "light" ? "light-icon-div" : "dark-icon-div"} d-flex justify-content-center align-items-center profile-icon-div`} onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              <FaChevronLeft size={18} color="black" />
            </div>

            <h2 className={`${mode === "light" ? "light-text" : "dark-text"}`}>Your Profile</h2>

            <div className={`${mode === "light" ? "light-icon-div" : "dark-icon-div"} d-flex justify-content-center align-items-center profile-icon-div position-relative`} onClick={() => setOpenPopup(!openPopup)} style={{ cursor: "pointer" }}>
              <IoSettingsOutline size={20} color="black" />

              {openPopup &&
                <div className={`${mode === "light" ? "popup-light" : "popup-dark"} user-setting-popup`}>
                  <div className="d-flex align-items-center gap-1">
                    <IoAddCircleOutline size={20} color={mode === "light" ? "black" : "white"} />
                    <span className={`${mode === "light" ? "light-text" : "dark-text"}`}>Edit Profile</span>
                  </div>

                  <div className="popup-hr" />

                  <div className="d-flex align-items-center gap-1" onClick={handleLogOut}>
                    {mode === "light" ?
                      <img src="/public/assets/images/logout-dark-icon.svg" alt="Logout Icon" /> :
                      <img src="/public/assets/images/logout-light-icon.svg" alt="Logout Icon" />
                    }
                    <span className={`${mode === "light" ? "light-text" : "dark-text"}`}>Log Out</span>
                  </div>
                </div>
              }
            </div>
          </div>

          <div className="position-relative">

            <img src={pfp === null ? '/assets/images/pfp.jpg' : pfp} alt="Profile Image" />

            <div className={`${mode === "light" ? "light-bg" : "dark-bg"} profile-edit-pic`}>
              {mode === "light" ?
                <img src="/assets/images/edit-dark-icon.svg" className="profile-edit-icon" alt="Edit Icon" /> :
                <img src="/assets/images/edit-light-icon.svg" className="profile-edit-icon" alt="Edit Icon" />
              }
            </div>
          </div>

          <p className={`${mode === "light" ? "light-text" : "dark-text"}`}>{name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;