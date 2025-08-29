import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Bounce, ToastContainer } from "react-toastify";
import { Routing } from "./routing/Routing";
import { useMode } from "./store/ModeStore";

const App = () => {

  const { mode } = useMode();

  return (
    <div className="main" style={{ width: "430px", position: "relative" }}>

      <div className={`${mode === "light" ? "lightBg" : "darkBg"} inner`}>
        <RouterProvider router={Routing} />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={mode === "light" ? "light" : "dark"}
          transition={Bounce}
        />
      </div>

    </div>
  );
};

export default App;