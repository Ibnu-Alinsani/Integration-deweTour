import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddCountry() {
  const [country, setCountry] = useState({
    name: "",
  });

  let navigate = useNavigate();
  console.log(country);

  const handleChange = (e) => {
    setCountry({
      ...country,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitAdd = useMutation(async (e) => {
    // e.PreventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(country);

      const response = API.post("/add-country", body, config);
      Swal.fire({
        title: "Success",
        text: `Add Country Success`,
        icon: "success",
      });
      navigate("/trip-income");
      console.log("Success", response);
    } catch (error) {
      console.log("failed ", error);
    }
  });

  return (
    <>
      <Container style={{ marginTop: "15rem", marginBottom: "15rem" }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Add Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              name="name"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Insert The best Country
            </Form.Text>
            <Form.Group></Form.Group>
          </Form.Group>
        </Form>
        <Button
          type="submit"
          className="mt-5 ms-0"
          style={{ width: "10rem" }}
          onClick={(e) => handleSubmitAdd.mutate(e)}
        >
          ADD
        </Button>
      </Container>
    </>
  );
}
export default AddCountry;
