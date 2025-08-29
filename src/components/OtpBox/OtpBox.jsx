import { useEffect, useRef, useState } from "react";
import "./OtpBox.css";

export function OtpBox({ mode, setOtpVal, resetTrigger }) {
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    if (resetTrigger) {
      setOtp(Array(length).fill(""));
      setOtpVal("");
      inputsRef.current[0]?.focus();
    }
  }, [resetTrigger]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only digits
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value[0];
      setOtp(newOtp);

      if (index < length - 1) inputsRef.current[index + 1].focus();
    } else {
      newOtp[index] = "";
      setOtp(newOtp);
    }

    // Send combined OTP to parent
    setOtpVal && setOtpVal(newOtp.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }

      setOtpVal && setOtpVal(newOtp.join(""));
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    if (!paste) return;
    const newOtp = Array(length).fill("");
    paste.split("").forEach((d, i) => (newOtp[i] = d));
    setOtp(newOtp);
    const lastIndex = Math.min(paste.length, length - 1);
    inputsRef.current[lastIndex].focus();

    setOtpVal && setOtpVal(newOtp.join(""));
  };

  return (
    <div className="d-flex align-items-center gap-3 justify-content-center">
      {Array(length)
        .fill("")
        .map((_, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={(el) => (inputsRef.current[i] = el)}
            value={otp[i]}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            className={`otp-box ${mode === "light" ? "light-box" : "dark-box"} text-center`}
          />
        ))}
    </div>
  );
}
