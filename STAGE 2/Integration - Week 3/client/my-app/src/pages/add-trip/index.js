import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/api';

function AddTrip() {

  const {data : countries} =  useQuery('countriesCache', async () => {
    const response =  await API.get('/country')
    return response.data.data
  })

  const [preview, setPreview] = useState('')
  const [form, setForm] = useState({
    title : '',
    country_id : null,
    accomodation: '',
    transportation: '',
    eat: '',
    day: '',
    night: '',
    dateTrip: '',
    price: '',
    quota: '',
    description: '',
    image: '',
  })

  
  
  function handleOnChange(e) {
    setForm({
      ...form, 
      [e.target.name] :
        e.target.type === 'file' ? e.target.files : e.target.value
    })
    
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
      console.log(url)
    }
  }
  
  const handleSubmit = useMutation(async (e) => {
    console.log(form)
    try {
      e.preventDefault();

      const config = {
        headers : {
          "Content-type" : "multipart/form-data"
        }, 
      }

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("country_id", form.country_id);
      formData.set("accomodation", form.accomodation);
      formData.set("transportation", form.transportation);
      formData.set("eat", form.eat);
      formData.set("day", form.day);
      formData.set("nighth", form.nigt);
      formData.set("dateTrip", form.dateTrip);
      formData.set("price", form.price);
      formData.set("quota", form.quota);
      formData.set("description", form.description);
      formData.set("image", form.image[0], form.image[0]?.name)

      const response = await API.post("/add-trip", formData, config)
      console.log("add product success : ", response)
      
    } catch (error) {
      console.log("add product failed " + error)
    }
  })


  return (
    <Container className="w-75 mt-5 pt-5">
      <h1
        style={{ fontSize: "48px" }}
        className="text-center text-product-sans mb-4"
      >
        Add Trip
      </h1>
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        {/* title */}
        <Form.Group className="mb-3" controlId="title">
          <Form.Label className="text-avenir fw-900 fs-18">
            Title Trip
          </Form.Label>
          <Form.Control type="text" name="title" onChange={handleOnChange}/>
        </Form.Group>

        {/* country */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="text-avenir fw-900 fs-18">
            Select Country Destination
          </Form.Label>
          <Form.Select aria-label="Default select example" name="country_id" onChange={handleOnChange}>
            <option>Country</option>
            {
              countries?.map((item) => {
                return <option value={item.id}>{item.name}</option>
              }) 
            }
          </Form.Select>
        </Form.Group>

        {/* accomodation */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="text-avenir fw-900 fs-18">
            Accomodation
          </Form.Label>
          <Form.Control type="text" name="accomodation" onChange={handleOnChange}/>
        </Form.Group>

        {/* transportation */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="text-avenir fw-900 fs-18">
            Transportation
          </Form.Label>
          <Form.Control type="text" name="transportation" onChange={handleOnChange}/>
        </Form.Group>

        {/* eat */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="text-avenir fw-900 fs-18">Eat</Form.Label>
          <Form.Control type="text" name="eat" onChange={handleOnChange}/>
        </Form.Group>

        {/* duration */}
        <Form.Group className="w-50" controlId="exampleForm.ControlInput1">
          <Form.Label className="text-avenir fw-900 fs-18">Duration</Form.Label>
          <Row>
            <Col>
              <Form.Group
                className="mb-3 d-flex align-items-center"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="text" name="day" onChange={handleOnChange}/>
                <Form.Label className="ms-2 text-avenir fw-900 fs-18">
                  Day
                </Form.Label>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3 d-flex align-items-center"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="text" name="night" onChange={handleOnChange}/>
                <Form.Label className="ms-2 text-avenir fw-900 fs-18">
                  Night
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>
        </Form.Group>

        {/* date trip */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="text-avenir fw-900 fs-18">
            Date Trip
          </Form.Label>
          <Form.Control type="date" name="dateTrip" onChange={handleOnChange}/>
        </Form.Group>

        {/* price */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="text-avenir fw-900 fs-18">Price</Form.Label>
          <Form.Control type="text" name="price" onChange={handleOnChange}/>
        </Form.Group>

        {/* quota */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="text-avenir fw-900 fs-18">Quota</Form.Label>
          <Form.Control type="text" name="quota" onChange={handleOnChange}/>
        </Form.Group>

        {/* description */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="text-avenir fw-900 fs-18">Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" onChange={handleOnChange}/>
        </Form.Group>

        {/* image */}
        <Form.Group controlId="formFileMultiple" className="mb-3 w-50">
          <Form.Label className="text-avenir fw-900 fs-18">
            Image Trip
          </Form.Label>
          <Form.Control type="file" name="image" onChange={handleOnChange}/>
        </Form.Group>

        <div className="w-25 m-auto mt-5">
          <Button
            variant="warning"
            size="md"
            type="submit"
            className="text-white w-100 fw-bold text-product-sans"
          >
            ADD TRIP
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddTrip;
