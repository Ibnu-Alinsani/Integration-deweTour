// import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import hotel from "../../assets/hotel.svg";
import plane from "../../assets/plane.svg";
import meal from "../../assets/meal.svg";
import time from "../../assets/time.svg";
import calendar from "../../assets/calendar.svg";
import * as img from "../../assets";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import Swal from "sweetalert2";
import { UserContext } from "../../context";

export default function Detail(props) {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [popUp, setPopUp] = useState(false);
  const [alert, setAlert] = useState(false);
  const [count, setCount] = useState(1);
  const [money, setMoney] = useState(0);
  const [booking, setBooking] = useState(null);

  useEffect(() => {    
    if(booking) {
      localStorage.setItem("booking", JSON.stringify(booking))
    }
  }, [booking])

  const [state, dispatch] = useContext(UserContext)

  const images = [img.negara1, img.negara2, img.negara3];

  props.callCount(count);

  if (count < 0) {
    setCount(0);
  }

  const { data: detailTrip } = useQuery("detailCache", async () => {
    const response = await API.get(`/trip/${id}`);
    return response.data.data;
  });

  useEffect(() => {
    if (detailTrip) {
      setMoney(detailTrip?.price * count);
    }
  }, [count, detailTrip]);

  // increment
  function handleAdd() {
    setCount(count + 1);
  }

  // decrement
  function handleSub() {
    setCount(count - 1);
  }

  // handle for get Date
  const getNameMonth = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const getNameDay = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];

  let dateNow = new Date();
  let date = `${getNameDay[dateNow.getDay()]}, ${dateNow.getDate()} ${getNameMonth[dateNow.getMonth()]} ${dateNow.getFullYear()}`

  // handleBook
  const Navigate = useNavigate();
  function handleBookNow() {
    // if (props.sendUser) {
      props.callData(data);
      props.callDate(dateNow.getDate());
      props.callMonth(getNameMonth[dateNow.getMonth()]);
      props.callYear(dateNow.getFullYear());
      props.callDay(getNameDay[dateNow.getDay()]);

      setBooking({
        dateBooking: date,
        title: detailTrip.title,
        country: detailTrip.Country.name,
        accomodation: detailTrip.accomodation,
        transportation: detailTrip.transportation,
        eat: detailTrip.eat,
        day: detailTrip.day,
        night: detailTrip.night,
        dateTrip: detailTrip.date_trip,
        price: detailTrip.price,
        quota: detailTrip.quota,
        description: detailTrip.description,
        qty: count, 
        total: money,
      });

      if (booking) {
        Navigate("/")
      }
      // return <Navigate to="/" replace />;
      // Navigate('/booking');
      // console.log("ini sudah login");
    // } else if (count < 1) {
    //   // setAlert(true);
    //   Swal.fire({
    //     title: "Kurang!",
    //     text: "Minimal satu mas",
    //     icon: "error",
    //     confirmButtonText: "oke",
    //   });
    // } else {
      // setPopUp(true);
      if (!state.isLogin) {
      Swal.fire({
        title: "Warning!",
        text: "Monggo Login dulu mas",
        icon: "warning",
        confirmButtonText: "oke",
      });
      // console.log("belum login");
    }
  }

  return (
    <>
      <div className="container-detail">
        <div className="header-detail">
          <h1>{detailTrip?.title}</h1>
          <p>{detailTrip?.Country.name}</p>
        </div>
        <div className="carousel-detail">
          {/* Nuka carousel */}
          <div className="w-100 img-detail">
            <img
              src={detailTrip?.image}
              alt={detailTrip?.image}
              className="w-50 h-50"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className="w-100">
            <div className="d-flex container-img-group">
              {images.map((e) => {
                return (
                  <div>
                    <img src={e} alt={e} className="img-group-detail" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <p className="slash-info text-avenir fw-900 fs-18">Information Trip</p>
        <div className="container-detail-trip text-avenir">
          <div className="wrapper-detail-trip text-avenir">
            <p className="text-avenir fw-800 fs-13 text-grey ">Accomodation</p>
            <div className="wrapper-icon-trip">
              <img src={hotel} alt="" />
              <strong className="text-avenir fw-800 fs-18">
                {detailTrip?.accomodation}
              </strong>
            </div>
          </div>
          <div className="wrapper-detail-trip">
            <p className="text-avenir fw-800 fs-13 text-grey ">
              Transportation
            </p>
            <div className="wrapper-icon-trip">
              <img src={plane} alt="" />
              <strong className="text-avenir fw-800 fs-18">
                {detailTrip?.transportation}
              </strong>
            </div>
          </div>
          <div className="wrapper-detail-trip">
            <p className="text-avenir fw-800 fs-13 text-grey ">Eat</p>
            <div className="wrapper-icon-trip">
              <img src={meal} alt="" />
              <strong className="text-avenir fw-800 fs-18">
                {detailTrip?.eat}
              </strong>
            </div>
          </div>
          <div className="wrapper-detail-trip">
            <p className="text-avenir fw-800 fs-13 text-grey ">Duration</p>
            <div className="wrapper-icon-trip">
              <img src={time} alt="" />
              <strong className="text-avenir fw-800 fs-18">
                {detailTrip?.day} day - {detailTrip?.night} night
              </strong>
            </div>
          </div>
          <div className="wrapper-detail-trip">
            <p className="text-avenir fw-800 fs-13 text-grey ">Date Trip</p>
            <div className="wrapper-icon-trip">
              <img src={calendar} alt="" />
              <strong className="text-avenir fw-800 fs-18">
                {detailTrip?.date_trip}
              </strong>
            </div>
          </div>
        </div>
        <div className="description">
          <p className="text-avenir fs-18 fw-800 mb">Description</p>
          <p className="text-avenir fw-900 fs-14 text-grey text-justify">
            {detailTrip?.description}
          </p>
        </div>
        <div>
          <div className="info-price">
            <p className="text-avenir fs-24 fw-900">
              <span className="text-orange text-avenir">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(detailTrip?.price)}
              </span>{" "}
              / Person
            </p>
            <div className="btn-count">
              <button
                onClick={handleSub}
                className="btn-count-add text-avenir bg-orange"
              >
                -
              </button>
              <p className="text-avenir fw-900 fs-18 mt-3">{count}</p>
              <button
                onClick={handleAdd}
                className="btn-count-sub  text-avenir bg-orange"
              >
                +
              </button>
            </div>
          </div>
          <hr
            style={{
              color: "transparent",
            }}
          />
          <div className="total mt-4">
            <p className="text-avenir fw-900 fs-24">Total : </p>
            <p className="text-avenir text-orange fw-900 fs-24">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(parseInt(money))}
            </p>
          </div>
          <hr
            style={{
              color: "transparent",
            }}
          />
        </div>
        <div className="container-btn-book">
          <button
            className="btn-book bg-orange fw-900 fs-18 text-avenir"
            onClick={handleBookNow}
          >
            BOOK NOW
          </button>
          {popUp ? (
            <div className="popup-should-login ">
              <p className="text-avenir">Silahkan login terlebih dahulu</p>
            </div>
          ) : alert ? (
            <div className="popup-should-login ">
              <p className="text-avenir">Minimal Satu Bruhh...</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}
