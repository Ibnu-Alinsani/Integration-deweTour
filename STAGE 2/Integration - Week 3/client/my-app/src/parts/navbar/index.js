import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import * as comp from "../../components";

import * as img from "../../assets";
import { useState } from "react";

function Header() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Navbar className="position-absolute top-0 w-100 z-3">
        <Container className="d-flex justify-content-between">
          <div>
            {/* <Navbar.Brand href="#home"> */}
              <Nav.Link as={Link} to="/">
                <img src={img.logo} alt="DeweTour" style={{ height: "52px" }} />
              </Nav.Link>
            {/* </Navbar.Brand> */}
          </div>
          <div>
            <Nav className="me-auto">
              <Button
                variant="outline-light"
                className="me-3 px-4 fw-bold"
                onClick={() => setModalShow(true)}
              >
                Login
              </Button>
              <Button
                variant="warning"
                className="text-white px-3 fw-bold"
                onClick={() => setModalShow(true)}
              >
                Register
              </Button>
            </Nav>
          </div>
          {/* </div> */}
        </Container>
      </Navbar>

      <Container>
        <comp.Login show={modalShow} onHide={() => setModalShow(false)} />
      </Container>
    </>
  );
}

export default Header;
