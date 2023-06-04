import "./App.css";
import AddTrip from "./pages/add-trip";
import Home from "./pages/home";
import * as img from "./assets";

import Header from "./parts/navbar";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./parts/footer";

function App() {
  return (
    <>
      <Header />
      <Container
        fluid
        style={{ padding: "0" }}
        className="position-absolute top-0"
      >
        <img src={img.navbar} alt="..." className="w-100" />
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-trip" element={<AddTrip />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
