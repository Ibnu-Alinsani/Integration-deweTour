import { Container, Row, Col, Form, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import * as img from "../../assets";
import { useQuery } from "react-query";
import { API } from "../../config/api";

function Home() {
  const images = [img.guarantee, img.heart, img.support, img.agent];

  //   const {data : countries} =  useQuery('countriesCache', async () => {
  //     const response =  await API.get('/country')
  //     return response.data.data
  //   })
  // const { data : products, refetch} = useQuery()

  const { data: trips } = useQuery("tripsCache", async () => {
    const response = await API.get("/trips");
    return response.data.data;
  });

  console.log(trips);

  return (
    <>
      <Container fluid style={{ padding: "0" }}>
        <div className="hero">
          <img
            src={img.hero}
            alt="..."
            className="w-100 img-hero"
            style={{
              filter: "brightness(50%)",
            }}
          />
        </div>

        <Container
          className="position-absolute"
          style={{ top: "8rem", left: "7rem" }}
        >
          <strong
            style={{ fontSize: "64px" }}
            className="fw-700 text-product-sans text-white"
          >
            Explore
          </strong>
          <p
            style={{ fontSize: "64px" }}
            className="fw-300 text-product-sans text-white"
          >
            your amazing city together
          </p>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className=""
              aria-label="Search"
              style={{
                borderRadius: "5px 0 0 5px",
              }}
            />
            <Button
              variant="warning"
              className="text-white text-product-sans btn-search"
              style={{
                borderRadius: "0 5px 5px 0",
                height: "50px",
                width: "136px",
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              Search
            </Button>
          </Form>
        </Container>

        <div
          className="performance ps-4"
          style={{
            transform: "translateY(-3.6rem)",
          }}
        >
          <Container>
            <Row>
              {images.map((e) => {
                return (
                  <Col>
                    <img src={e} alt="..." />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>

        <h1 className="text-center" style={{ fontSize: "48px" }}>
          Group Tour
        </h1>
        <Container>
          <Row xs={1} md={2} className="g-4">
            {trips?.map((e) => {
              return (
                <Col key={e}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={e.image} />
                    <Card.Body>
                      <Card.Title>{e.title}</Card.Title>
                      <Card.Text>
                        <p>{e.price}</p>
                        <p>{e.Country.name}</p>
                        <p>{e.quota}</p>
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Home;

/* <Card className="bg-white">
                                    <Card.Body>
                                        <img src={e.image} alt="..."/>
                                        <Card.Title>{e.title}</Card.Title>
                                        <Card.Subtitle>{e.desc}</Card.Subtitle>
                                    </Card.Body>
                                </Card> */
