import react, { useState } from "react";
import { Locates } from "../../data/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { Carousel } from "react-bootstrap";

export default function Locate() {
  const [currentIndex, setCurrentIndex] = useState();
  function handleCarousel(index) {
    setCurrentIndex(index);
  }
  function money(value) {
    return value?.toLocaleString(["ban", "id"]);
  }

  const { data: trip } = useQuery("tripCache", async () => {
    const response = await API.get("/trips");
    return response.data.data;
  });
  // console.log(trip);

  return (
    <>
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
                  <p className="locate-country">{locate.Country.name}</p>
                </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
