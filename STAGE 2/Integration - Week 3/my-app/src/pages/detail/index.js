// import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import hotel from "../../assets/hotel.svg";
import plane from "../../assets/plane.svg";
import meal from "../../assets/meal.svg";
import time from "../../assets/time.svg";
import calendar from "../../assets/calendar.svg";
import * as img from "../../assets";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import Swal from "sweetalert2";
import { UserContext } from "../../context";

export default function Detail(props) {
  // const [data, setData] = useState([]);
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [money, setMoney] = useState(0);
  const [booking, setBooking] = useState(null);
  const [state, dispatch] = useContext(UserContext);

  const { data: detailTrip } = useQuery("detailCache", async () => {
    const response = await API.get(`/trip/${id}`);
    return response.data.data;
  });

  useEffect(() => {
    if (booking) {
      localStorage.setItem("booking", JSON.stringify(booking));
    }
  }, [booking]);

  const images = [img.negara1, img.negara2, img.negara3];

  if (count < 0) {
    setCount(0);
  }

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
  let date = `${getNameDay[dateNow.getDay()]}, ${dateNow.getDate()} ${
    getNameMonth[dateNow.getMonth()]
  } ${dateNow.getFullYear()}`;

  let data = {
    CounterQty: count,
    Status: "Waiting Payment",
    Total: money,
    Attachment: "nothing",
    TripID: detailTrip?.id,
  };

  // handleBook
  const Navigate = useNavigate();
  const handleBookNow = useMutation(async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(data);

      const response = await API.post("/add-transaction", body, config);
      console.log("Transaction Success", response.data.data);

      Swal.fire({
        title: "Success",
        text: `We wait your payment`,
        icon: "success",
      });
      Navigate("/booking");
    } catch (error) {
      console.log("Transaction failed", error);
    }
  });

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
              {state.role == "user" ? (
                <>
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
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <hr
            style={{
              color: "transparent",
            }}
          />
          {state.role == "user" ? (
            <>
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
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="container-btn-book">
          {
            state.role == "user" ?
          <button
            className="btn-book bg-orange fw-900 fs-18 text-avenir"
            onClick={(e) => handleBookNow.mutate(e)}
          >
            BOOK NOW
          </button>
          :
          <></>
          }
        </div>
      </div>
    </>
  );
}
