import "./App.css";
import Navbar from "./parts/navbar";
import LandingPages from "./pages/landing-pages/landing-page";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Footer from "./parts/Footer/footer";
import Detail from "./pages/detail";
import Booking from "./pages/booking";
import { useState, useContext, useEffect } from "react";
import navbarCrop from "./assets/navbar-crop.png";
import Profile from "./pages/profil";
import AdminList from "./pages/list-transaction";
import Trip from "./pages/income-trip";
import AddTrip from "./pages/add-trip";
import { UserContext } from "./context";
import { API, setAuthToken } from "./config/api";
import Swal from "sweetalert2";
import AddCountry from "./pages/add-country";

function App() {
  const [state, dispatch] = useContext(UserContext);
  
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (!isLoading) {
      if (state.isLogin === false) {
        <Navigate to="/" replace/>
        // alert("silahkan login mas")
      }
    }
  }, [isLoading]);

  
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log("check user success ", response);

      let payload = response.data.data;

      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      setIsLoading(false);
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };


  function ProtectedRoute({ user, Children }) {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return Children;
  }

  function PrivateRouteAdmin(props) {
    if (props.login != "admin") {
      // Swal.fire({
      //   title: "wait",
      //   text: `Tunggu Sebentar`,
      //   icon: "info",
      // });
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }

  function PrivateRouteUser(props) {
    if (props.login != "user") {
      // Swal.fire({
      //   title: "wait",
      //   text: `Tunggu Sebentar`,
      //   icon: "info",
      // });
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }

  // const decode = jwt_decode(localStorage.token).role
  // const decode = "ayam"
  // console.log(decode)

  return (
    <>
      <main>
        {isLoading ? null : (
          // <Router>
          <>
            <Navbar/>
            <img src={navbarCrop} className="navbar-crop" />
            <Routes>
              <Route
                path="/"
                element={
                  state.user.role == "admin" ? (
                    <AdminList />
                  ) : (
                    <LandingPages />
                  )
                }
              />
              <Route
                path="/detail-place/:id"
                element={
                  <Detail/>
                }
              />

              <Route
                exact
                path="/"
                element={<PrivateRouteAdmin login={state.role} />}
              >
                <Route path="/trip-income" element={<Trip />} />
                <Route path="/add-trip" element={<AddTrip />} />
                <Route path="/add-country" element={<AddCountry />}/>
              </Route>

              <Route
                exact
                path="/"
                element={<PrivateRouteUser login={state.role} />}
              >
                <Route
                  exact
                  path="/booking"
                  element={
                    <Booking />
                  }
                />
                <Route
                  exact
                  path="/profile"
                  element={
                    <Profile/>
                  }
                />
              </Route>
              {/* private route */}
            </Routes>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
