import { useNavigate } from "react-router-dom";
import GreenBtn from "../components/GreenBtn/GreenBtn";
import OrangeBtn from "../components/OrangeBtn/OrangeBtn";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/Api";
import { toast } from "react-toastify";
import { useMode } from "../store/ModeStore";


const schema = z.object({
  name: z.string().min(1, "Name is required.").min(2, "Name must be at least 2 characters.").regex(/^[a-zA-Z\s]+$/, "Letters only."),
  email: z.string().min(6, "Email is required.").email("Invalid email address."),
  country_code: z.string(),
  mobile_number: z.string().min(1, "Mobile number is required.").regex(/^[0-9]+$/, "Digits only.").min(10, "Mobile number must be at least 10 digits.").max(10, "Mobile number should be maximum 10 digits."),
  birthdate: z.string().min(1, "Birthdate is required."),
  native_place: z.string().min(1, "City name is required.").min(3, "City name must be at least 3 characters.")
});


const SignUp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      coutry_code: +91
    }
  });


  const { mode } = useMode();


  const submitData = async (d) => {
    try {
      const data = {
        ...d,
        status: "A"
      };

      const res = await api.post("user-register-save", data);

      if (res.data.status === "success") {
        reset();
        toast.success(res.data.message);
        navigate("/signup-otp", { state: { country_code: d.country_code, mobile_number: d.mobile_number } });
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
        <img src="assets/images/signup-img.svg" className="signup-img" alt="Image" />
      </div>

      <div className={`${mode === "light" ? "light-bg" : "dark-bg"} p-5`}>
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <form onSubmit={handleSubmit(submitData)}>

            <div className="w-100">
              <p className="login-placeholder">Full Name :</p>

              <div className="d-flex align-items-center input-box">
                <input className={`${mode === "light" ? "lightInput" : "darkInput"} w-100`} type="text" {...register("name")} />
              </div>
              <p className="text-danger mt-1">{errors?.name?.message}</p>
            </div>

            <div className="w-100 mt-4">
              <p className="login-placeholder">Email :</p>

              <div className="d-flex align-items-center input-box">
                <input className={`${mode === "light" ? "lightInput" : "darkInput"} w-100`} type="email" {...register("email")} />
              </div>
              <p className="text-danger mt-1">{errors?.email?.message}</p>
            </div>

            <div className="w-100 mt-4">
              <p className="login-placeholder">Mobile Number</p>

              <div className="d-flex align-items-center input-box">
                <div className="d-flex align-items-center gap-1">
                  <select className={`${mode === "light" ? "lightCode" : "darkCode"} country-select`} {...register("country_code")}>
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
                <input className={`${mode === "light" ? "lightInput" : "darkInput"} w-100`} type="text" {...register("mobile_number")} />
              </div>
              <p className="text-danger mt-1">{errors?.mobile_number?.message}</p>
            </div>

            <div className="w-100 mt-4">
              <p className="login-placeholder">Birth Date :</p>

              <div className="d-flex align-items-center input-box">
                <input className={`${mode === "light" ? "lightInput" : "darkInput"} w-100`} type="date" {...register("birthdate")} />
              </div>
              <p className="text-danger mt-1">{errors?.birthdate?.message}</p>
            </div>

            <div className="w-100 mt-4">
              <p className="login-placeholder">City/Village Name :</p>

              <div className="d-flex align-items-center input-box">
                <input className={`${mode === "light" ? "lightInput" : "darkInput"} w-100`} type="text" {...register("native_place")} />
              </div>
              <p className="text-danger mt-1">{errors?.native_place?.message}</p>
            </div>


            <div className="d-flex flex-column align-items-center btns-main">
              <GreenBtn btnText="Submit" borderRadius="40px" />

              <a className="new-user-link text-decoration-none">Already Register?</a>

              <OrangeBtn btnText="Login" navigateTo={() => navigate("/login")} />

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
