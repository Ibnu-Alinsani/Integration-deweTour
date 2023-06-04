import { useContext, useEffect, useState } from "react";
import { user } from "../../data/data";
import name from "../../assets/name.png";
import email from "../../assets/email.png";
import phone from "../../assets/phone.png";
import maps from "../../assets/maps.png";
import logo from "../../assets/Icon.svg";
import qr from "../../assets/qr.png";
import profil from "../../assets/profil.jpg";
import { UserContext } from "../../context";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";

export default function Profile(props) {
  const [state, dispatch] = useContext(UserContext);
  const [image, setImage] = useState();
  const [form, setForm] = useState()

  const { data: user } = useQuery("userCache", async () => {
    const response = await API.get(`/user/${state.user.id}`);
    console.log(response.data.data);
    return response.data.data;
  });
  console.log(user)

  const handleSubmit = useMutation( async (e) => {
    e.preventDefault()

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const response = await API.patch(`/update-user/${state.user.id}`, form, config)
  })

  // console.log(user);

  // function getIDR(money) {
  //   return money?.toLocaleString(["ban", "id"]);
  // }
  // const IDR = getIDR(props.sendTotal);

  // const dataad = props.sendData;

  // const dataMap = dataad.map((e) => {
  //   return (
  //     <div className="history-trip">
  //       <p className="text-avenir fw-900 fs-36 title-history">History Trip</p>
  //       <div className="wrapper-booking wrapper-booking-history">
  //         <div className="header-booking">
  //           <img src={logo} style={{ border: "none" }} />
  //           <div className="wrapper-date-booking">
  //             <p className="p-booking fw-800 text-avenir">Booking</p>
  //             <p className="date-booking text-avenir text-grey">
  //               <span className="text-grey text-avenir">{props.sendDay}</span>,{" "}
  //               {props.sendDate} {props.sendMonth} {props.sendYear}
  //             </p>
  //           </div>
  //         </div>
  //         <div className="info-trip-booking">
  //           <div className="title-and-status-trip w-100">
  //             <div className="wrapper-title-trip">
  //               <p className="fw-900 text-avenir fs-24 m-0">{e.nama}</p>
  //               <p className="m-0 text-avenir fs-14 text-grey">{e.negara}</p>
  //             </div>
  //             {props.sendStatusPayment ? (
  //               <p className="wait-approve-payment text-avenir">
  //                 Waiting Approve
  //               </p>
  //             ) : (
  //               <p className="wait-payment text-avenir">Waiting Payment </p>
  //             )}
  //           </div>
  //           <div className="wrapper-info-trip-booking w-100">
  //             <div className="detail-info-trip-booking">
  //               <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
  //                 Date Trip
  //               </p>
  //               <p className="content-info-trip-booking fs-14 text-avenir text-grey">
  //                 {e.dateTrip}
  //               </p>
  //             </div>
  //             <div className="detail-info-trip-booking">
  //               <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
  //                 Duration
  //               </p>
  //               <p className="content-info-trip-booking fs-14 text-avenir text-grey">
  //                 {e.duration}
  //               </p>
  //             </div>
  //             <div className="detail-info-trip-booking">
  //               <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
  //                 Accomodation
  //               </p>
  //               <p className="content-info-trip-booking fs-14 text-avenir text-grey">
  //                 {e.hotel}
  //               </p>
  //             </div>
  //             <div className="detail-info-trip-booking">
  //               <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
  //                 Transportation
  //               </p>
  //               <p className="content-info-trip-booking fs-14 text-avenir text-grey">
  //                 {e.penerbangan}
  //               </p>
  //             </div>
  //           </div>
  //           <div className="input-photo-booking">
  //             <label className="custom-qr border">
  //               <img src={qr} alt=".." className="qr-profil" />
  //             </label>
  //             <p className="text-avenir fs-13 text-grey">TCK0101</p>
  //           </div>
  //         </div>
  //         <div className="wrapper-table-info-user">
  //           <table className="table-info-user w-100" cellSpacing={0}>
  //             <tr className="w-100">
  //               <th>No</th>
  //               <th className="text-avenir fw-800 fs-18">Full Name</th>
  //               <th className="text-avenir fw-800 fs-18">Gender</th>
  //               <th className="text-avenir fw-800 fs-18">Phone</th>
  //               <th></th>
  //               <th></th>
  //             </tr>
  //             <tr className="w-100">
  //               <td className="fw-400 fs-18 text-grey">1</td>
  //               <td className="fw-400 fs-18 text-grey">{user?.nama}</td>
  //               <td className="fw-400 fs-18 text-grey">{user?.gender}</td>
  //               <td className="fw-400 fs-18 text-grey">{user?.handphone}</td>
  //               <td className="text-avenir fs-18 fw-800">
  //                 Qty : {props.sendCount}
  //               </td>
  //               <td></td>
  //             </tr>
  //           </table>
  //           <div className="text-end total-booking">
  //             <p className="text-avenir fs-18 fw-800">Total : IDR. {IDR}</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });

  // const name = user?.full-name
  // console.log(name);

  return (
    <div className="container-profil">
      <div className="wrapper-content-profil">
        <div className="wrapper-info-profil ">
          <div className="content-profil ">
            <p className="fw-900 text-avenir fs-36">Personal info</p>
            <div className="wrapper-info-section">
              <img src={name} alt="..." />
              <div>
                <p className="text-avenir fw-900 fs-14">{user?.fullname}</p>
                <p className="text-avenir fs-12">Fullname</p>
              </div>
            </div>
            <div className="wrapper-info-section">
              <img src={email} alt="..." />
              <div>
                <p className="text-avenir fw-900 fs-14">{user?.email}</p>
                <p className="text-avenir fs-12">Email</p>
              </div>
            </div>
            <div className="wrapper-info-section">
              <img src={phone} alt="..." />
              <div>
                <p className="text-avenir fw-900 fs-14">{user?.phone}</p>
                <p className="text-avenir fs-12">Mobile phone</p>
              </div>
            </div>
            <div className="wrapper-info-section">
              <img src={maps} alt="..." />
              <div>
                <p className="text-avenir fw-900 fs-14">{user?.address}</p>
                <p className="text-avenir fs-1">Address</p>
              </div>
            </div>
          </div>
          <div className="photo-user">
            <img src={user?.image ? user?.image : profil} alt="..." />
            <form className="label-change-photo bg-orange" onSubmit={(e) => handleSubmit(e)}>
              <button
                className="text-avenir fs-18 w-100 h-100 bg-warning"
                type="submit"
                style={{ cursor: "pointer" }}
              >
                Change Photo Profile
              <input type="file" id="chance-photo" name="chance-photo" />
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* {dataMap} */}
      {/* {props.sendCount > 0 ?
            <div className="history-trip">
                <p className="text-avenir fw-900 fs-36 title-history">History Trip</p>
                <div className='wrapper-booking wrapper-booking-history'>
                    <div className='header-booking'>
                        <img src={logo} style={{border:'none'}}/>
                        <div className='wrapper-date-booking'>
                            <p className='p-booking fw-800 text-avenir'>Booking</p>
                            <p className="date-booking text-avenir text-grey">
                                <span className='text-grey text-avenir'>{props.sendDay}</span>, {props.sendDate} {props.sendMonth} {props.sendYear}
                            </p>
                        </div>
                    </div>
                    <div className='info-trip-booking'>
                        <div className='title-and-status-trip w-100'>
                            <div className='wrapper-title-trip'>
                                <p className='fw-900 text-avenir fs-24 m-0'
                                >{e.nama}</p>
                                <p className='m-0 text-avenir fs-14 text-grey'
                                >{e.negara}</p>
                            </div>
                            {props.sendStatusPayment ? 
                            <p className='wait-approve-payment text-avenir'>Waiting Approve</p>
                            :
                            <p className='wait-payment text-avenir'>Waiting Payment </p>
                            }
                        </div>
                        <div className='wrapper-info-trip-booking w-100'>
                            <div className='detail-info-trip-booking'>
                                <p className='title-info-trip-booking fw-800 fs-18 text-avenir'>Date Trip</p>
                                <p className='content-info-trip-booking fs-14 text-avenir text-grey'>{e.dateTrip}</p>
                            </div>
                            <div className='detail-info-trip-booking'>
                                <p className='title-info-trip-booking fw-800 fs-18 text-avenir'>Duration</p>
                                <p className='content-info-trip-booking fs-14 text-avenir text-grey'>{e.duration}</p>
                            </div>
                            <div className='detail-info-trip-booking'>
                                <p className='title-info-trip-booking fw-800 fs-18 text-avenir'>Accomodation</p>
                                <p className='content-info-trip-booking fs-14 text-avenir text-grey'>{e.hotel}</p>
                            </div>
                            <div className='detail-info-trip-booking'>
                                <p className='title-info-trip-booking fw-800 fs-18 text-avenir'>Transportation</p>
                                <p className='content-info-trip-booking fs-14 text-avenir text-grey'>{e.penerbangan}</p>
                            </div>
                        </div>
                        <div className='input-photo-booking'>
                            <label className='custom-qr border'>
                                <img src={qr} alt='..' className="qr-user"/>
                            </label>
                            <p className='text-avenir fs-13 text-grey'>TCK0101</p>
                        </div>
                    </div>
                    <div className='wrapper-table-info-user'>
                        <table className='table-info-user w-100' cellSpacing={0}>
                            <tr className='w-100'>
                                <th>No</th>
                                <th className='text-avenir fw-800 fs-18'>Full Name</th>
                                <th className='text-avenir fw-800 fs-18'>Gender</th>
                                <th className='text-avenir fw-800 fs-18'>Phone</th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr className='w-100'>
                                <td className='fw-400 fs-18 text-grey'>1</td>
                                <td className='fw-400 fs-18 text-grey'>{profil?.nama}</td>
                                <td className='fw-400 fs-18 text-grey'>{profil?.gender}</td>
                                <td className='fw-400 fs-18 text-grey'>{profil?.handphone}</td>
                                <td className='text-avenir fs-18 fw-800'>Qty   :    {props.sendCount}</td>
                                <td></td>
                            </tr>
                        </table>
                        <div className='text-end total-booking'>
                            <p className='text-avenir fs-18 fw-800'>
                                Total   :   IDR. {IDR}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div></div>
            } */}
    </div>
  );
}
