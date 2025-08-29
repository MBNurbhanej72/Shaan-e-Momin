import "./OrangeBtn.css";

const OrangeBtn = ({ btnText, navigateTo }) => {
  return (
    <button className="orangeBtn" onClick={navigateTo}>{btnText}</button>
  );
};

export default OrangeBtn;
