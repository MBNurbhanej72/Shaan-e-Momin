import GreenBtn from "../components/GreenBtn/GreenBtn";
import OrangeBtn from "../components/OrangeBtn/OrangeBtn";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/Api";
import { toast } from "react-toastify";
import { useMode } from "../store/ModeStore";


const schema = z.object({
  country_code: z.string(),
  mobile_number: z.string().min(1, "Mobile number is required.").regex(/^[0-9]+$/, "Digits only.").min(10, "Minimum 10 digit required.").max(10, "Maximum 10 digit required."),
});

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });


  const submitData = async (d) => {
    try {
      const data = {
        ...d,
        otp: 123456
      };

      const res = await api.post("login-with-otp", data);

      if (res.data.status === "success") {
        reset();
        toast.success("Login successfully!");
        navigate("/login-otp", { state: { country_code: d.country_code, mobile_number: d.mobile_number } });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const { mode } = useMode();


  return (
    <div className="bg-main">
      <div className="d-flex justify-content-center">
        <img src="assets/images/login-img.svg" className="login-img" alt="Image" />
      </div>

      <div className={`${mode === "light" ? "light-bg" : "dark-bg"} p-5 mt-5`}>
        <div className="d-flex flex-column justify-content-center align-items-center h-100">

          <form onSubmit={handleSubmit(submitData)}>
            <p className="login-placeholder">Mobile Number</p>

            <div className="d-flex align-items-center input-box">
              <div className="d-flex align-items-center gap-1">
                <select className={`${mode === "light" ? "lightCdoe" : "darkCode"} country-select`} {...register("country_code")}>
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+49">+49</option>
                  <option value="+33">+33</option>
                  <option value="+39">+39</option>
                  <option value="+34">+34</option>
                  <option value="+86">+86</option>
                </select>
              </div>
              <div className="divider"></div>
              <input type="text" className={`${mode === "light" ? "lightInput" : "darkInput"}`} {...register("mobile_number")} />
            </div>
            <p className="text-danger mt-1">{errors?.mobile_number?.message}</p>

            <div className="d-flex flex-column align-items-center btns-main">
              <GreenBtn btnText="Login" />

              <a className="new-user-link text-decoration-none">New User ?</a>

              <OrangeBtn btnText="Sign Up" navigateTo={() => navigate("/signup")} />

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
