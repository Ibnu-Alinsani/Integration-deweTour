import { useEffect, useState } from "react";
import { payment } from "../../data/data";
import logo from "../../assets/Icon.svg";
import admin from "../../assets/action-admin.png";
import close from "../../assets/close.svg";
import { useQuery } from "react-query";
import { API } from "../../config/api";

export default function AdminList(props) {
  // const [idPay, setIdPay] = useState()
  const [pay, setPay] = useState({});
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState({
    approve: false,
    cancel: false,
  });

  const { data : trans} = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions")
    return response.data.data
  })
  console.log(trans)

  useEffect(() => {
    payment.find((e, i) => {
      if (i == pay.id) {
        setPay({
          ...pay,
          name: e.user.name,
          gender: e.user.gender,
          handphone: e.user.handphone,
          order: e.user.order,
          img: e.buktiImg,
          date: e.date,
        });
      }
    });
    console.log(pay.id, "ini id");
  }, [pay.id]);

  const color = [{ color: "green" }, { color: "orange" }, { color: "red" }];

  function closePopUpClose() {
    setStatus({ cancel: true });
    setShow(false);
  }
  function closePopUpApprove() {
    setStatus({ approve: true });
    setShow(false);
  }

  return (
    <>
      <div className="container-list-admin">
        <p className="text-avenir fw-900 fs-36">Incoming Transaction</p>
        <div className="wrapper-list-admin">
          <table className="table-transactions" cellSpacing={0}>
            <tr>
              <th>No</th>
              <th>Users</th>
              <th>Trip</th>
              <th>Transaction Proof</th>
              <th>Status Payment</th>
              <th>Action</th>
            </tr>
            {payment.map((e) => {
              return (
                <tr>
                  <td>{e.id + 1}</td>
                  <td>{e.user.name}</td>
                  <td>{e.user.order.nama}</td>
                  <td>{e.buktiTransfer}</td>
                  {e.statusPayment == "Approve" ? (
                    <td style={color[0]}>{e.statusPayment}</td>
                  ) : e.statusPayment == "Pending" ? (
                    <td style={color[1]}>{e.statusPayment}</td>
                  ) : (
                    <td style={color[2]}>{e.statusPayment}</td>
                  )}
                  {/* {
                    status.approve ?
                    <td style={color[0]}>Approve</td>
                    :
                    status.cancel ? 
                    <td style={color[2]}>Cancel</td>
                    :
                    <td style={color[1]}>Pending</td>
                  } */}
                  <td>
                    <button
                      className="btn-popup-transactions"
                      onClick={() => {
                        setPay({
                          id: e.id,
                          qty: e.qty,
                          total: e.total,
                          statusPayment: e.statusPayment,
                        });
                        setShow(true);
                      }}
                    >
                      <img src={admin} alt="Click" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      {show ? (
        <div className="container-modal-approve" onClick={() => setShow(false)}>
          <div className="history-trip ps-relative">
            {/* <img src={close} alt="..." className="close-popup"/> */}
            <div className="wrapper-booking wrapper-booking-history">
              <div className="header-booking">
                <img src={logo} />
                <div className="wrapper-date-booking">
                  <p className="p-booking fw-800 text-avenir">Booking</p>
                  <p className="date-booking text-avenir text-grey">
                    {pay?.date}
                  </p>
                </div>
              </div>
              <div className="info-trip-booking">
                <div className="title-and-status-trip w-100">
                  <div className="wrapper-title-trip">
                    <p className="fw-900 text-avenir fs-24 m-0">
                      {pay?.order?.nama}
                    </p>
                    <p className="m-0 text-avenir fs-14 text-grey">
                      {pay?.order?.negara}
                    </p>
                  </div>
                  {pay?.statusPayment == "Approve" ? (
                    <p className="approve-payment text-avenir">Approve</p>
                  ) : pay?.statusPayment == "Pending" ? (
                    <p className="wait-payment text-avenir">Pending </p>
                  ) : (
                    <p className="cancel-payment text-avenir">Cancel </p>
                  )}
                </div>
                <div className="wrapper-info-trip-booking w-100">
                  <div className="detail-info-trip-booking">
                    <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                      Date Trip
                    </p>
                    <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                      {pay?.order?.dateTrip}
                    </p>
                  </div>
                  <div className="detail-info-trip-booking">
                    <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                      Duration
                    </p>
                    <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                      {pay?.order?.duration}
                    </p>
                  </div>
                  <div className="detail-info-trip-booking">
                    <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                      Accomodation
                    </p>
                    <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                      {pay?.order?.hotel}
                    </p>
                  </div>
                  <div className="detail-info-trip-booking">
                    <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                      Transportation
                    </p>
                    <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                      {pay?.order?.penerbangan}
                    </p>
                  </div>
                </div>
                <div className="input-photo-booking">
                  <label className="custom-qr border">
                    <img src={pay?.img} alt=".." className="qr-profil" />
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
                    <td className="fw-400 fs-18 text-grey">{pay?.name}</td>
                    <td className="fw-400 fs-18 text-grey">{pay?.gender}</td>
                    <td className="fw-400 fs-18 text-grey">{pay?.handphone}</td>
                    <td className="text-avenir fs-18 fw-800">
                      Qty : {pay?.qty}
                    </td>
                    <td></td>
                  </tr>
                </table>
                <div className="text-end total-booking">
                  <p className="text-avenir fs-18 fw-800 total-booking-p">
                    Total : {pay?.total}
                  </p>
                </div>
                <div className="approve-btn text-end">
                  {pay?.statusPayment == "Approve" ||
                  pay?.statusPayment == "Cancel" ? (
                    <></>
                  ) : (
                    <>
                      <button className="cancel" onClick={closePopUpClose}>
                        Cancel
                      </button>
                      <button className="approve" onClick={closePopUpApprove}>
                        Approve
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
