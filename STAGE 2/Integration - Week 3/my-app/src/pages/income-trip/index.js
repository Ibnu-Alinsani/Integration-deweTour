import { Link } from "react-router-dom";
// import PlaceTour from "./landing-pages/place-tour";
import { useState } from "react";
import { Locates } from "../../data/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { API } from "../../config/api";

import { useQuery } from "react-query";

export default function Trip() {
  const [currentIndex, setCurrentIndex] = useState();
  function handleCarousel(index) {
    setCurrentIndex(index);
  }

  function money(value) {
    return value?.toLocaleString(["ban", "id"]);
  }

  return (
    <>
      <div className="container-locate-admin">
        <div className="header-trip">
          <p className="text-avenir fw-800 fs-36 trip-p">Income Trip</p>
          <Link to="/add-trip">
            <button className="link-add-trip">Add Trip</button>
          </Link>
        </div>
        <div className="wrapper-locate-admin">
          <div className="locate locate-admin">
            {/* <PlaceTour /> */}
            {Locates.map((locate) => {
              return (
                // <Link to={`/detail-place/${locate.id}`} className="text-decoration-none">
                <div className="card-locate">
                  <Carousel
                    onChange={handleCarousel}
                    showArrows={true}
                    autoPlay={true}
                    infiniteLoop={true}
                    selectedItem={locate.gambar[currentIndex]}
                    className="carousel-container"
                  >
                    {locate.gambar.map((image) => {
                      return (
                        <div className="carousel">
                          <img src={image} alt={image} />
                        </div>
                      );
                    })}
                  </Carousel>
                  <p className="quota-tour">
                    {locate.fillQuota} / {locate.quota}
                  </p>
                  <h2 className="locate-name text-decoration-none">
                    {locate.nama.substr(0, 20)}...
                  </h2>
                  <div className="inform">
                    <p className="locate-price text-decoration-none">
                      IDR {money(locate.harga * locate.fillQuota)}
                    </p>
                    <p className="locate-country">{locate.negara}</p>
                  </div>
                </div>
                // </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
