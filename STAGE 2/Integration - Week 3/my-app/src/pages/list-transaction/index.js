import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useQuery } from "react-query";
import * as IMG from "../../assets";
import logo from "../../assets/Icon.svg";
import admin from "../../assets/action-admin.png";
import { API } from "../../config/api";

export default function AdminList(props) {
  const [show, setShow] = useState(false);
  const [idx, setIdx] = useState();
  const [data, setData] = useState();
  const [transac, setTransac] = useState();
  const [search, setSearch] = useState("");

  const { data: trans, refetch } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    setTransac(response.data.data);
    return response.data.data;
  });
  
  console.log(data, "ini data");

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
      {trans?.length !== 0 ? (
        <div className="container-list-admin">
          <p className="text-avenir fw-900 fs-36">Incoming Transaction</p>
          <Form.Control
            type="text"
            placeholder="Search Transaction"
            name="search"
            className="mt-4"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="wrapper-list-admin">
            <table className="table-transactions" cellSpacing={0}>
              <tr>
                <th>No</th>
                <th>Users</th>
                <th>Trip</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
              {transac
                ?.filter((e) => {
                  if (search === "") {
                    return e;
                  } else if (
                    e.trip.title.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return e;
                  } else if (
                    e.trip.country.name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return e;
                  } else if (
                    e.status.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return e;
                  } else if (
                    e.user.fullName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return e;
                  }
                })
                .map((e, idx) => {
                  if (e.trip.title != "") {
                    return (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{e.user.fullName}</td>
                        <td>{e.trip.title}</td>
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
      ) : (
        <Container>
          <img src={IMG.noTrans} alt="..." />
        </Container>
      )}

      {trans && show ? (
        <div className="container-modal-approve" onClick={() => setShow(false)}>
          <div className="history-trip ps-relative">
            <div className="wrapper-booking wrapper-booking-history">
              <div className="header-booking">
                <img src={logo} />
                <div className="wrapper-date-booking">
                  <p className="p-booking fw-800 text-avenir">Booking</p>
                  <p className="date-booking text-avenir text-grey"></p>
                </div>
              </div>
              <div className="info-trip-booking">
                <div className="title-and-status-trip w-100">
                  <div className="wrapper-title-trip">
                    <p className="fw-900 text-avenir fs-24 m-0">
                      {data?.trip.title}
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
              </div>
              <div className="wrapper-table-info-user">
                <table className="table-info-user w-100" cellSpacing={0}>
                  <tr className="w-100">
                    <th>No</th>
                    <th className="text-avenir fw-800 fs-18" style={{width:"25.3rem"}}>Full Name</th>
                    <th className="text-avenir fw-800 fs-18" style={{width:"13.5rem"}}>Phone</th>
                    <th></th>
                    <th></th>
                  </tr>
                  <tr
                    className="w-100"
                    style={{ borderBottom: "1px solid black" }}
                  >
                    <td className="fw-400 fs-18 text-grey">1</td>
                    <td className="fw-400 fs-18 text-grey">
                      {data?.user.fullName}
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
                <div className="text-end total-booking d-flex justify-content-end">
                  <p
                    className="text-avenir fs-18 fw-800 total-booking-p text-start"
                    style={{ width: "16.4rem" }}
                  >
                    Total :{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(data?.total)}
                  </p>
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
