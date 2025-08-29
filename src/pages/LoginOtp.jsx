import { useForm } from "react-hook-form";
import { useMode } from "../store/ModeStore";
import GreenBtn from "../components/GreenBtn/GreenBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { OtpBox } from "../components/OtpBox/OtpBox";
import { useState } from "react";
import { api } from "../api/Api";
import { toast } from "react-toastify";


const LoginOtp = () => {
  const [otpVal, setOtpVal] = useState("");
  const [resetOtp, setResetOtp] = useState(false);

  const navigate = useNavigate();

  const { state } = useLocation();

  const countryCode = state.country_code;
  const mobileNum = state.mobile_number;

  const { handleSubmit, reset } = useForm();

  const { mode } = useMode();

  const handleVerifyOtp = async () => {
    try {
      const data = {
        country_code: countryCode,
        mobile_number: mobileNum,
        otp: +otpVal
      };

      const res = await api.post("user-otp-verify", data);

      const loginToken = res.data.jwt;

      if (res.data.status === "success") {
        reset();
        toast.success(res.data.message);
        navigate("/");
        localStorage.setItem("isLoggedIn", JSON.stringify(loginToken));
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      toast.error(error);
    }
  };

  const resendOtp = async () => {
    try {
      const data = {
        country_code: countryCode,
        mobile_number: mobileNum,
      };

      const res = await api.post("resend-otp", data);

      if (res.data.status === "success") {
        toast.success(res.data.message);
        setResetOtp(prev => !prev);
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-main">
      <div className="d-flex justify-content-center">
        <img src="assets/images/login-otp-img.svg" className="login-img" alt="Image" />
      </div>

      <div className={`${mode === "light" ? "light-bg" : "dark-bg"} p-5 mt-5`}>
        <div className="d-flex flex-column justify-content-center align-items-center h-100">

          <div>
            <h3 className={`${mode === "light" ? "light-text" : "dark-text"} login-otp-heading`}>OTP Verification</h3>

            <p className="otp-fill-num">Enter the OTP sent to <span className={`${mode === "light" ? "light-text" : "dark-text"}`}>{countryCode} - {mobileNum}</span></p>
          </div>

          <form onSubmit={handleSubmit(handleVerifyOtp)}>

            <div className="d-flex align-items-center gap-3 justify-content-center">
              <OtpBox mode={mode} setOtpVal={setOtpVal} resetTrigger={resetOtp} />
            </div>

            <p className={`${mode === "light" ? "light-text" : "dark-text"} resend-otp`}>Donot receive the OTP? <span onClick={resendOtp}>RESEND OTP</span></p>

            <div className="d-flex flex-column align-items-center btns-main">
              <GreenBtn btnText="VERIFY" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginOtp;