import { useMode } from "../../store/ModeStore";
import "./GreenBtn.css";

const GreenBtn = ({ btnText, borderRadius }) => {

  const { mode } = useMode();


  return (
    <button type="submit" style={{ "borderRadius": borderRadius }} className={`${mode === "light" ? "white-greenBtn" : "dark-greenBtn"} greenBtn`} >{btnText}</button>
  );
};

export default GreenBtn;
