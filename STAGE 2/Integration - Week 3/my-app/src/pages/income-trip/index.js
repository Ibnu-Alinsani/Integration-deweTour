import { Link } from "react-router-dom";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { API } from "../../config/api";
import { Carousel } from "react-bootstrap";

import { useQuery } from "react-query";

export default function Trip() {
  const [currentIndex, setCurrentIndex] = useState();

  const { data: trip, refetch } = useQuery("IncomeTripCache", async () => {
    const response = await API.get("/trips");
    return response.data.data;
  });
  console.log(trip);

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
          <Link to="/add-country">
            <button className="link-add-trip">Add Country</button>
          </Link>
        </div>
        <div className="wrapper-locate-admin">
          <div className="locate locate-admin">
            {/* <PlaceTour /> */}
            {trip?.map((locate) => {
              return (
                <Link
                  to={`/detail-place/${locate.id}`}
                  className="text-decoration-none"
                >
                  <div className="card-locate">
                    <Carousel fade>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={locate.image}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    </Carousel>
                    <div className="carousel-container">
                      <div>
                        <p className="quota-tour"> 1 /{locate.quota}</p>
                        <h2 className="locate-name text-decoration-none">
                          {locate.title}...
                        </h2>
                        <div className="inform">
                          <p className="locate-price text-decoration-none">
                            IDR {money(locate.price)}
                          </p>
                          <p className="locate-country">
                            {locate.Country.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
