import { useContext, useEffect, useState, useTransition } from "react";
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
import Swal from "sweetalert2";

export default function Profile(props) {
  const [state, dispatch] = useContext(UserContext);
  const [image, setImage] = useState({
    image: "",
  });
  const [preview, setPreview] = useState();

  // GET DATA FROM DATABASE
  const { data: user, refetch } = useQuery("userCache", async () => {
    const response = await API.get(`/user/${state.user.id}`);
    return response.data.data;
  });
  console.log(user);

  const handleChange = (e) => {
    setImage({
      [e.target.name]: e.target.files,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      console.log(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", image.image[0], image.image[0].name);

      const response = await API.patch(
        `/update-user/${state.user.id}`,
        image,
        config
      );
    } catch (error) {
      console.log("update failed", error);
      Swal.fire({
        title: "UpdateFailed",
        text: `Please Try Again`,
        icon: "Error",
      });
    }
  });

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
                <p className="text-avenir fs-5">Address</p>
              </div>
            </div>
          </div>
          <div className="photo-user">
            {/* <img src={preview ? preview : user?.image ? user?.image : profil} alt="..." /> */}
            <img src={preview ? preview : profil} alt="..." />
            <form
              className="label-change-photo bg-orange"
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                type="file"
                id="chance-photo"
                name="chance-photo"
                onChange={handleChange}
              />
              <button
                className="text-avenir fs-18 w-100 h-100 bg-warning"
                type="submit"
                style={{ cursor: "pointer" }}
              >
                Change Photo Profile
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* {dataMap} */}
      {user?.transaction.map((e) => {
        if (e.status == "Approve") {
          return (
          <div className="history-trip">
            <p className="text-avenir fw-900 fs-36 title-history">
              History Trip
            </p>
            <div className="wrapper-booking wrapper-booking-history">
              <div className="header-booking">
                <img src={logo} style={{ border: "none" }} />
                <div className="wrapper-date-booking">
                  <p className="p-booking fw-800 text-avenir">Booking</p>
                  <p className="date-booking text-avenir text-grey">
                    
                  </p>
                </div>
              </div>
              <div className="info-trip-booking">
                <div className="title-and-status-trip w-100">
                  <div className="wrapper-title-trip">
                    <p className="fw-900 text-avenir fs-24 m-0">{e.title}</p>
                    <p className="m-0 text-avenir fs-14 text-grey">
                      {e.trip.country.name}
                    </p>
                  </div>
                    <p className="wait-approve-payment text-avenir">
                      {e.status}
                    </p>
                </div>
                <div className="wrapper-info-trip-booking w-100">
                  <div className="detail-info-trip-booking">
                    <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                      Date Trip
                    </p>
                    <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                      {/* {e.dateTrip} */}
                    </p>
                  </div>
                  <div className="detail-info-trip-booking">
                    <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                      Duration
                    </p>
                    <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                      {e.trip.day} Day - {e.trip.night} Night
                    </p>
                  </div>
                  <div className="detail-info-trip-booking">
                    <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                      Accomodation
                    </p>
                    <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                      {e.trip.accomodation}
                    </p>
                  </div>
                  <div className="detail-info-trip-booking">
                    <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                      Transportation
                    </p>
                    <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                      {e.trip.transportation}
                    </p>
                  </div>
                </div>
                <div className="input-photo-booking">
                  <label className="custom-qr border">
                    <img src={qr} alt=".." className="qr-user" />
                  </label>
                  <p className="text-avenir fs-13 text-grey">TCK0101</p>
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
                    <td className="fw-400 fs-18 text-grey">{user?.fullname}</td>
                    <td className="fw-400 fs-18 text-grey">{user?.gender}</td>
                    <td className="fw-400 fs-18 text-grey">
                      {user?.phone}
                    </td>
                    <td className="text-avenir fs-18 fw-800">
                      Qty : {e.counterQty}
                    </td>
                  </tr>
                  <div className="">
                    <p className="">
                      Total: {e.total}
                    </p>
                  </div>
                </table>
                <div className="text-end total-booking">
                  <p className="text-avenir fs-18 fw-800"></p>
                </div>
              </div>
            </div>
          </div>
          );
        }})}
    </div>
  );
}
