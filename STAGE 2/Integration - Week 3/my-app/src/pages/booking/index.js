import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { user } from "../../data/data";
import logo from "../../assets/Icon.svg";
import image from "../../assets/camera.png";
import { UserContext } from "../../context";

export default function Booking(props) {
  const { id } = useParams();
  const [dataUser, setDataUser] = useState();
  const [popUp, setPopUp] = useState(false);
  const [statusPayment, setStatusPayment] = useState(false);
  // props.callStatusPayment(statusPayment)
  // console.log(popUp, 'ini popup')
  console.log(props.sendData, "ini adalah data");

  function getIDR(money) {
    return money?.toLocaleString(["ban", "id"]);
  }
  // function visible()
  const IDR = getIDR(props.sendTotal);

  useEffect(() => {
    user.filter((e, i) => {
      if (id == i) {
        setDataUser({
          order: e.order,
          name: e.name,
          gender: e.gender,
          handphone: e.handphone,
          id: e.id,
        });
        console.log(i, "ini index");
      }
    });
  }, []);

  // const btn = document.querySelector('.btn-pay')
  // useEffect(() => {
  //         setStatusPayment(true)
  // }, [popUp])
  // const data = props.sendData;

  // const dataMap = data.map((e) => {
  //   return (
  //     <>
  //       <div className="container-booking">
  //         <div className="wrapper-booking">
  //           <div className="header-booking">
  //             <img src={logo} />
  //             <div className="wrapper-date-booking">
  //               <p className="p-booking fw-800 text-avenir">Booking</p>
  //               <p className="date-booking text-avenir text-grey">
  //                 <span className="text-grey text-avenir">{props.sendDay}</span>
  //                 , {props.sendDate} {props.sendMonth} {props.sendYear}
  //               </p>
  //             </div>
  //           </div>
  //           <div className="info-trip-booking">
  //             <div className="title-and-status-trip w-100">
  //               <div className="wrapper-title-trip">
  //                 <p className="fw-900 text-avenir fs-24 m-0">{e.nama}</p>
  //                 <p className="m-0 text-avenir fs-14 text-grey">{e.negara}</p>
  //               </div>
  //               {statusPayment ? (
  //                 <p className="wait-approve-payment text-avenir">
  //                   Waiting Approve
  //                 </p>
  //               ) : (
  //                 <p className="wait-payment text-avenir">Waiting Payment </p>
  //               )}
  //             </div>
  //             <div className="wrapper-info-trip-booking w-100">
  //               <div className="detail-info-trip-booking">
  //                 <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
  //                   Date Trip
  //                 </p>
  //                 <p className="content-info-trip-booking fs-14 text-avenir text-grey">
  //                   {e.dateTrip}
  //                 </p>
  //               </div>
  //               <div className="detail-info-trip-booking">
  //                 <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
  //                   Duration
  //                 </p>
  //                 <p className="content-info-trip-booking fs-14 text-avenir text-grey">
  //                   {e.duration}
  //                 </p>
  //               </div>
  //               <div className="detail-info-trip-booking">
  //                 <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
  //                   Accomodation
  //                 </p>
  //                 <p className="content-info-trip-booking fs-14 text-avenir text-grey">
  //                   {e.hotel}
  //                 </p>
  //               </div>
  //               <div className="detail-info-trip-booking">
  //                 <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
  //                   Transportation
  //                 </p>
  //                 <p className="content-info-trip-booking fs-14 text-avenir text-grey">
  //                   {e.penerbangan}
  //                 </p>
  //               </div>
  //             </div>
  //             <div className="input-photo-booking">
  //               <label className="custom-input-file">
  //                 <img src={image} alt=".." />
  //                 <input type="file" id="input-photo" name="input-photo" />
  //               </label>
  //               <p className="text-avenir fs-13 text-grey">
  //                 Upload Payment Proof
  //               </p>
  //             </div>
  //           </div>
  //           <div className="wrapper-table-info-user">
  //             <table className="table-info-user w-100" cellSpacing={0}>
  //               <tr className="w-100">
  //                 <th>No</th>
  //                 <th className="text-avenir fw-800 fs-18">Full Name</th>
  //                 <th className="text-avenir fw-800 fs-18">Gender</th>
  //                 <th className="text-avenir fw-800 fs-18">Phone</th>
  //                 <th></th>
  //                 <th></th>
  //               </tr>
  //               <tr className="w-100">
  //                 <td className="fw-400 fs-18 text-grey">1</td>
  //                 <td className="fw-400 fs-18 text-grey">{dataUser?.name}</td>
  //                 <td className="fw-400 fs-18 text-grey">{dataUser?.gender}</td>
  //                 <td className="fw-400 fs-18 text-grey">
  //                   {dataUser?.handphone}
  //                 </td>
  //                 <td className="text-avenir fs-18 fw-800">
  //                   Qty : {props.sendCount}
  //                 </td>
  //                 <td></td>
  //               </tr>
  //             </table>
  //             <div className="text-end total-booking">
  //               <p className="text-avenir fs-18 fw-800">Total : IDR. {IDR}</p>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="w-100 text-end wrap-btn-popup">
  //           {popUp ? (
  //             <div className="wrapper-popup-payment">
  //               <div className="popup-payment text-center">
  //                 <p className="fs-24 text-avenir">
  //                   Your payment will be confirmed within 1 x 24 hours
  //                   <br />
  //                   To see orders{" "}
  //                   <button
  //                     className="btn-close-popup fs-24 text-avenir text-decoration-none"
  //                     onClick={() => {
  //                       setPopUp(setStatusPayment(true));
  //                     }}
  //                   >
  //                     {" "}
  //                     click here
  //                   </button>
  //                   thank you
  //                 </p>
  //               </div>
  //             </div>
  //           ) : (
  //             <div></div>
  //           )}
  //           {statusPayment ? (
  //             <div></div>
  //           ) : (
  //             <button
  //               className="btn-pay bg-orange fw-900 fs-18 text-avenir"
  //               onClick={() => {
  //                 // setStatusPayment(true)
  //                 setPopUp(!popUp);
  //               }}
  //             >
  //               PAY
  //             </button>
  //           )}
  //         </div>
  //       </div>
  //     </>
  //   );
  // });

  const [state, dispatch] = useContext(UserContext)

  const booking = JSON.parse(localStorage.getItem("booking"))
  console.log(booking);
  return (
    <>
      <div className="container-booking">
        <div className="wrapper-booking">
          <div className="header-booking">
            <img src={logo} />
            <div className="wrapper-date-booking">
              <p className="p-booking fw-800 text-avenir">Booking</p>
              <p className="date-booking text-avenir text-grey">
                {booking.date}
              </p>
            </div>
          </div>
          <div className="info-trip-booking">
            <div className="title-and-status-trip w-100">
              <div className="wrapper-title-trip">
                <p className="fw-900 text-avenir fs-24 m-0">{booking.title}</p>
                <p className="m-0 text-avenir fs-14 text-grey">{booking.country}</p>
              </div>
              {statusPayment ? (
                <p className="wait-approve-payment text-avenir">
                  Waiting Approve
                </p>
              ) : (
                <p className="wait-payment text-avenir">Waiting Payment</p>
              )}
            </div>
            <div className="wrapper-info-trip-booking w-100">
              <div className="detail-info-trip-booking">
                <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                  Date Trip
                </p>
                <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                  {booking.dateTrip}
                </p>
              </div>
              <div className="detail-info-trip-booking">
                <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                  Duration
                </p>
                <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                  {booking.day} day - {booking.night} night
                </p>
              </div>
              <div className="detail-info-trip-booking">
                <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                  Accomodation
                </p>
                <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                  {booking.accomodation}
                </p>
              </div>
              <div className="detail-info-trip-booking">
                <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                  Transportation
                </p>
                <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                  {booking.transportation}
                </p>
              </div>
            </div>
            <div className="input-photo-booking">
              <label className="custom-input-file">
                <img src={image} alt=".." />
                <input type="file" id="input-photo" name="input-photo" />
              </label>
              <p className="text-avenir fs-13 text-grey">
                Upload Payment Proof
              </p>
            </div>
          </div>
          <div className="wrapper-table-info-user">
            <table className="table-info-user w-100" cellSpacing={0}>
              <tr className="w-100">
                <th>No</th>
                <th className="text-avenir fw-800 fs-18">Full Name</th>
                <th className="text-avenir fw-800 fs-18">Gender</th>
                <th className="text-avenir fw-800 fs-18">Phone</th>
                <th></th>
                <th></th>
              </tr>
              <tr className="w-100">
                <td className="fw-400 fs-18 text-grey">1</td>
                <td className="fw-400 fs-18 text-grey">{state.user.fullname}</td>
                <td className="fw-400 fs-18 text-grey">{state.user.gender}</td>
                <td className="fw-400 fs-18 text-grey">
                  {state.user.phone}
                </td>
                <td className="text-avenir fs-18 fw-800">
                  Qty : {booking.qty}
                </td>
                <td></td>
              </tr>
            </table>
            <div className="text-end total-booking">
              <p className="text-avenir fs-18 fw-800">Total : IDR. {booking.price}</p>
            </div>
          </div>
        </div>
        <div className="w-100 text-end wrap-btn-popup">
          {popUp ? (
            <div className="wrapper-popup-payment">
              <div className="popup-payment text-center">
                <p className="fs-24 text-avenir">
                  Your payment will be confirmed within 1 x 24 hours
                  <br />
                  To see orders{" "}
                  <button
                    className="btn-close-popup fs-24 text-avenir text-decoration-none"
                    onClick={() => {
                      setPopUp(setStatusPayment(true));
                    }}
                  >
                    {" "}
                    click here
                  </button>
                  thank you
                </p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {statusPayment ? (
            <div></div>
          ) : (
            <button
              className="btn-pay bg-orange fw-900 fs-18 text-avenir"
              onClick={() => {
                // setStatusPayment(true)
                setPopUp(!popUp);
              }}
            >
              PAY
            </button>
          )}
        </div>
      </div>
    </>
  );
}
