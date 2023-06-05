import { useEffect, useState } from "react";
import { payment } from "../../data/data";
import logo from "../../assets/Icon.svg";
import admin from "../../assets/action-admin.png";
import close from "../../assets/close.svg";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { json } from "react-router-dom";

export default function AdminList(props) {
  const [show, setShow] = useState(false);
  const [idx, setIdx] = useState();
  const [data, setData] = useState();

  const [statusApprove, setStatusApprove] = useState({
    status: "Cancel",
  });
  const [statusCancel, setStatusCancel] = useState({
    status: "Approve",
  });

  // console.log(status);

  const handleActionApprove = useMutation(async (e) => {
    try {

      const id = e
      console.log(e, "ini e");
      let config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("status", statusApprove);
      const body = JSON.stringify(statusApprove)

      const response = await API.patch(
        `/edit-transactionStatus/12`,
        body,
        config
      );

      console.log("success", response);
    } catch (error) {
      console.log("approve failed : ", error);
    }
  });

  const handleActionCancel = useMutation(async (e) => {
    try {
      const id = e;
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("status", body, config);

      const body = JSON.stringify(statusCancel)

      const response = await API.patch(
        `/edit-transactionStatus/12`,
        body,
        config
      );
      console.log("success", response);
    } catch (error) {
      console.log("approve failed : ", error);
    }
  });

  const { data: trans, refetch } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    // setData(response.data.data)
    return response.data.data;
  });

  useEffect(() => {
    trans?.filter((item) => {
      if (item.id == idx) {
        setData(item);
      }
    });
  }, [idx]);

  const color = [
    { color: "green" },
    { color: "orange" },
    { color: "red" },
    { color: "blue" },
  ];

  function closePopUpClose() {
    setShow(false);
  }
  function closePopUpApprove() {
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
            {trans?.map((e, idx) => {
              if (
                e.status == "Waiting Approve" ||
                e.status == "Approve" ||
                e.status == "Cancel"
              ) {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{e.user.fullName}</td>
                    <td>{e.trip.title}</td>
                    <td>{e.attachment.substr(30)}</td>
                    {e.status == "Waiting Payment" ? (
                      <td style={color[3]}>{e.status}</td>
                    ) : e.status == "Approve" ? (
                      <td style={color[0]}>Approve</td>
                    ) : e.status == "Waiting Approve" ? (
                      <td style={color[1]}>Pending</td>
                    ) : e.status == "Cancel" ? (
                      <td style={color[2]}>Cancel</td>
                    ) : (
                      <></>
                    )}
                    <td>
                      <button
                        className="btn-popup-transactions"
                        onClick={() => {
                          setIdx(e.id);
                          setShow(true);
                        }}
                      >
                        <img src={admin} alt="Click" />
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </table>
        </div>
      </div>
      {trans && show ? (
        <div className="container-modal-approve" onClick={() => setShow(false)}>
          <div className="history-trip ps-relative">
            {/* <img src={close} alt="..." className="close-popup"/> */}
            <div className="wrapper-booking wrapper-booking-history">
              <div className="header-booking">
                <img src={logo} />
                <div className="wrapper-date-booking">
                  <p className="p-booking fw-800 text-avenir">Booking</p>
                  <p className="date-booking text-avenir text-grey">
                    {/* {transId[idx]} */}
                  </p>
                </div>
              </div>
              <div className="info-trip-booking">
                <div className="title-and-status-trip w-100">
                  <div className="wrapper-title-trip">
                    <p className="fw-900 text-avenir fs-24 m-0">
                      {data?.user.fullName}
                    </p>
                    <p className="m-0 text-avenir fs-14 text-grey">
                      {data?.trip.country.name}
                    </p>
                  </div>
                  {data?.status == "Approve" ? (
                    <p className="approve-payment text-avenir">Approve</p>
                  ) : data?.status == "Waiting Approve" ? (
                    <p className="wait-payment text-avenir">Pending </p>
                  ) : data?.status == "Waiting Payment" ? (
                    <p
                      className="wait-payment text-avenir"
                      style={{ color: "blue", background: "lightBlue" }}
                    >
                      Waiting Payment
                    </p>
                  ) : (
                    <p className="cancel-payment text-avenir">Cancel</p>
                  )}
                </div>
                <div className="wrapper-info-trip-booking w-100">
                  <div className="detail-info-trip-booking">
                    <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                      Date Trip
                    </p>
                    <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                      {data?.trip.date_trip}
                    </p>
                  </div>
                  <div className="detail-info-trip-booking">
                    <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                      Duration
                    </p>
                    <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                      {data?.trip.day} Day - {data?.trip.night} Night
                    </p>
                  </div>
                  <div className="detail-info-trip-booking">
                    <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                      Accomodation
                    </p>
                    <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                      {data?.trip.accomodation}
                    </p>
                  </div>
                  <div className="detail-info-trip-booking">
                    <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                      Transportation
                    </p>
                    <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                      {data?.trip.transportation}
                    </p>
                  </div>
                </div>
                <div className="input-photo-booking">
                  <label className="custom-qr border">
                    <img
                      src={data?.attachment}
                      alt=".."
                      className="qr-profil"
                    />
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
                    <td className="fw-400 fs-18 text-grey">
                      {data?.user.fullName}
                    </td>
                    <td className="fw-400 fs-18 text-grey">
                      {data?.user.gender}
                    </td>
                    <td className="fw-400 fs-18 text-grey">
                      {data?.user.phone}
                    </td>
                    <td className="text-avenir fs-18 fw-800">
                      Qty : {data?.counterQty}
                    </td>
                    <td></td>
                  </tr>
                </table>
                <div className="text-end total-booking">
                  <p className="text-avenir fs-18 fw-800 total-booking-p">
                    Total : {data?.total}
                  </p>
                </div>
                <div className="approve-btn text-end">
                  {data?.status == "Approve" || data?.status == "Cancel" ? (
                    <></>
                  ) : (
                    <>
                      <button
                        className="cancel"
                        onClick={(e) => {
                          handleActionCancel.mutate(data?.id);
                          closePopUpClose();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="approve"
                        onClick={(e) => {
                          handleActionApprove.mutate(data?.id);
                          closePopUpClose();
                        }}
                      >
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
