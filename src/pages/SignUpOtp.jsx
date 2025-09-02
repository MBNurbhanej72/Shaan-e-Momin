import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useMode } from "../store/ModeStore";
import { api } from "../api/Api";
import { toast } from "react-toastify";
import { OtpBox } from "../components/OtpBox/OtpBox";
import GreenBtn from "../components/GreenBtn/GreenBtn";

const SignUpOtp = () => {
  const [otpVal, setOtpVal] = useState("");
  const [resetOtp, setResetOtp] = useState(false);

  const navigate = useNavigate();

  const { state } = useLocation();

  const countryCode = state?.country_code;
  const mobileNum = state?.mobile_number;

  useEffect(() => {
    if (!countryCode || !mobileNum) {
      navigate("/signup", { replace: true });
    }
  }, [countryCode, mobileNum]);

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
        navigate("/login");
        localStorage.setItem("isLoggedIn", loginToken);
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
    <div className={`${mode === "light" ? "light-signup" : "dark-signup"} bg-main`}>
      <div className="d-flex flex-column align-items-center justify-content-center signup-otp-upper">
        <h2 className="signup-otp-heading">Enter Verification Code</h2>

        <img src="assets/images/signup-otp-img.svg" width={165} height={143} className="signup-otp-img" alt="Image" />

        <p>ENTER OTP</p>

        <p>Enter the OTP sent to <span className={`${mode === "light" ? "light-text" : "dark-text"}`}>{countryCode} - {mobileNum}</span></p>
      </div>

      <div className={`${mode === "light" ? "light-bg" : "dark-bg"} signup-lower-main p-5 mt-5`}>
        <div className="d-flex flex-column justify-content-center align-items-center h-100 pt-5">
          <form onSubmit={handleSubmit(handleVerifyOtp)}>

            <div className="d-flex align-items-center gap-3 justify-content-center">
              <OtpBox mode={mode} setOtpVal={setOtpVal} resetTrigger={resetOtp} />
            </div>

            <p className="signup-resend-otp resend-otp">Donot receive the OTP? <span onClick={resendOtp}>RESEND OTP</span></p>

            <div className="d-flex flex-column align-items-center btns-main">
              <GreenBtn btnText="VERIFY" bgColorClass={mode === "light" ? "light-btn" : "dark-btn"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpOtp;