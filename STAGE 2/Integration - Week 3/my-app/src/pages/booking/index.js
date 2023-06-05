import { useParams, Link, Form, json } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { user } from "../../data/data";
import logo from "../../assets/Icon.svg";
import image from "../../assets/camera.png";
import { UserContext } from "../../context";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import Swal from "sweetalert2";

export default function Booking(props) {
  const { id } = useParams();
  const [popUp, setPopUp] = useState(false);
  const [statusPayment, setStatusPayment] = useState(false);
  const [preview, setPreview] = useState()
  const [dataUser, setDataUser] = useState()

  const [ state, _ ] = useContext(UserContext) 

  const { data: user} = useQuery("transactionCache", async () => {
    try {
      const response = await API.get(`/user/${state?.user.id}`)
      return response.data.data
    } catch(error) {
      console.log(error, "ini error")
    }
  })

  // console.log(user.transaction);

  const [form, setForm] = useState({
    Status : "Waiting Approve",
    Attachment : ""
  }) 

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name] : e.target.files
    })
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      console.log(url);
    }
  }
  console.log(form)

  const handleUpdate = useMutation( async (id) => {
    try {

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData()
      formData.set("status", form.Status)
      formData.set("image", form.Attachment[0].form.Attachment[0].name)

      // const body = JSON.stringify(form)

      const response = await API.patch(`/edit-transaction/${id}`, formData, config)
      console.log("Update berhasil ", response.data.data)

      Swal.fire({
        title: "Payment Success",
        text: `Enjoy Your Trip`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Pay Failed`,
        icon: "Error",
      });
      console.log("Update gagal ", error)
    }
  }) 

  // function getIDR(money) {
  //   return money?.toLocaleString(["ban", "id"]);
  // }
  // // function visible()
  // const IDR = getIDR(props.sendTotal);

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

  return (
    <>
    {user?.transaction.map((trans) => {
      return (<div className="container-booking">
        <div className="wrapper-booking">
          <div className="header-booking">
            <img src={logo} />
            <div className="wrapper-date-booking">
              <p className="p-booking fw-800 text-avenir">Booking</p>
              <p className="date-booking text-avenir text-grey">
                {trans.date}
              </p>
            </div>
          </div>
          <div className="info-trip-booking">
            <div className="title-and-status-trip w-100">
              <div className="wrapper-title-trip">
                <p className="fw-900 text-avenir fs-24 m-0">{trans.trip.title}</p>
                <p className="m-0 text-avenir fs-14 text-grey">{trans.trip.country.name}</p>
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
                  {trans.trip.date_trip}
                </p>
              </div>
              <div className="detail-info-trip-booking">
                <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                  Duration
                </p>
                <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                  {trans.trip.day} day - {trans.trip.night} night
                </p>
              </div>
              <div className="detail-info-trip-booking">
                <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                  Accomodation
                </p>
                <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                  {trans.trip.accomodation}
                </p>
              </div>
              <div className="detail-info-trip-booking">
                <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                  Transportation
                </p>
                <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                  {trans.trip.transportation}
                </p>
              </div>
            </div>
            <div className="input-photo-booking">
              <label className="custom-input-file">
                <img src={preview ? preview : image} alt="..." />
                <input type="file" id="input-photo" name="Attachment" onChange={handleChange}/>
              </label>
              <button className="text-avenir fs-13 text-grey">
                Upload Payment Proof
              </button>
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
                  Qty : {trans.counterQty}
                </td>
                <td></td>
              </tr>
            </table>
            <div className="text-end total-booking">
              <p className="text-avenir fs-18 fw-800">Total : IDR. {trans.trip.price}</p>
            </div>
          </div>
        </div>
        <div className="w-100 text-end wrap-btn-popup">
          {statusPayment ? (
            <div></div>
          ) : (
            <button
              className="btn-pay bg-orange fw-900 fs-18 text-avenir"
              onClick={(e) => {
                // setStatusPayment(true)
                handleUpdate.mutate(trans.id)
                setPopUp(!popUp);
              }}
              >
              PAY
            </button>
          )}
        </div>
      </div>
      )
    })}
    </>
  );
}

              {/* {popUp ? (
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
              )} */}