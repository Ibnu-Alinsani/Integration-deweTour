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


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [idUser, setIdUser] = useState();
  const [count, setCount] = useState();
  const [total, setTotal] = useState();
  const [day, setDay] = useState();
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [data, setData] = useState([]);

  const [state, dispatch] = useContext(UserContext);
  console.log(state);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (!isLoading) {
      if (state.isLogin === false) {
        // <Navigate to="/" replace/>
        // alert("silahkan login mas")
      }
    }
  }, [isLoading]);

  
  useEffect(() => {
    if (localStorage.token) {
      checkUser();
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

  function callUser(value) {
    setUser(value);
  }
  function callAdmin(value) {
    setAdmin(value);
  }
  function callId(value) {
    setIdUser(value);
  }
  function callCount(value) {
    setCount(value);
  }
  function callTotal(value) {
    setTotal(value);
  }
  function callDay(value) {
    setDay(value);
  }
  function callDate(value) {
    setDate(value);
  }
  function callMonth(value) {
    setMonth(value);
  }
  function callYear(value) {
    setYear(value);
  }
  function callData(value) {
    setData((prev) => [...prev, value]);
  }

  function ProtectedRoute({ user, Children }) {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return Children;
  }

  function PrivateRouteAdmin(props) {
    if (props.login != "admin") {
      Swal.fire({
        title: "wait",
        text: `Tunggu Sebentar`,
        icon: "info",
      });
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }

  function PrivateRouteUser(props) {
    if (props.login != "user") {
      Swal.fire({
        title: "wait",
        text: `Tunggu Sebentar`,
        icon: "info",
      });
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
            <Navbar
              call={callUser}
              callId={callId}
              callAdmin={callAdmin}
              sendCount={count}
            />
            <img src={navbarCrop} className="navbar-crop" />
            <Routes>
              <Route
                path="/"
                element={
                  state.user.role == "admin" ? (
                    <AdminList
                      sendCount={count}
                      sendTotal={total}
                      sendDay={day}
                      sendDate={date}
                      sendMonth={month}
                      sendYear={year}
                    />
                  ) : (
                    <LandingPages />
                  )
                }
              />
              <Route
                path="/detail-place/:id"
                // <ProtectedRoute>

                // </ProtectedRoute>
                element={
                  <Detail
                    sendUser={user}
                    sendId={idUser}
                    callData={callData}
                    callCount={callCount}
                    callTotal={callTotal}
                    callDay={callDay}
                    callDate={callDate}
                    callMonth={callMonth}
                    callYear={callYear}
                  />
                }
              />

              <Route
                exact
                path="/"
                element={<PrivateRouteAdmin login={state.role} />}
              >
                <Route path="/trip-income" element={<Trip />} />
                <Route path="/add-trip" element={<AddTrip />} />
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
                    <Booking
                      sendData={data}
                      sendId={idUser}
                      // callStatusPayment={callStatusPayment}
                      sendCount={count}
                      sendTotal={total}
                      sendDay={day}
                      sendDate={date}
                      sendMonth={month}
                      sendYear={year}
                    />
                  }
                />
                <Route
                  exact
                  path="/profile"
                  element={
                    <Profile
                      sendId={idUser}
                      sendData={data}
                      // sendStatusPayment={statusPaymentSend}
                      sendCount={count}
                      sendTotal={total}
                      sendDay={day}
                      sendDate={date}
                      sendMonth={month}
                      sendYear={year}
                    />
                  }
                />
              </Route>

              {/* <Route exact 
          path="/admin" 
          element={<AdminList 
            sendCount={count}
            sendTotal={total}
            sendDay={day}
            sendDate={date}
            sendMonth={month}
            sendYear={year}
          />}/> */}

              {/* private route */}
              {/*  */}
            </Routes>
          {/* // </Router> */}
          </>
        )}
        
        {/* <Detail /> */}
      </main>
      <Footer />
    </>
  );
}

export default App;
