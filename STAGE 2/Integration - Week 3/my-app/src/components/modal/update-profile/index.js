import { useContext, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { API } from "../../../config/api";
import { UserContext } from "../../../context";

function UpdateProfile(props) {
    const [state, _] = useContext(UserContext)
  const [preview, setPreview] = useState();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    no_handphone: "",
    address: "",
    image: "",
  });
  
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      console.log(url);
    }
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("fullname", form.fullname);
      formData.set("email", form.email);
      formData.set("no_handphone", form.no_handphone);
      formData.set("address", form.address);
      formData.set("image", form.image[0], form.image[0]?.name);
      console.log(formData.getAll("fullname"))
      console.log(formData.getAll("email"))
      console.log(formData.getAll("no_handphone"))
      console.log(formData.getAll("address"))

      const response = await API.patch(`/update-user/${state?.user.id}`, formData, config);
      console.log("Update success : ", response);
      Swal.fire({
        title: "SUCCESS",
        text: `Update Success, Enjoy`,
        icon: "success",
      });
      props.setShow(false);
    } catch (error) {
      Swal.fire({
        title: "ERROR!",
        text: `Sorry, Please try again later`,
        icon: "error",
      });
      console.log("update failed " + error);
    }
  });

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Container className="py-5 px-5">
          {preview ? (
            <img
              src={preview}
              alt="..."
              className="h-25 rounded"
              style={{
                height: "20rem",
                width: "20rem"  ,
                marginBottom: "1rem",
                objectFit:"cover"
              }}
            />
          ) : (
            <></>
          )}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            {/* name */}
            <Form.Group className="mb-3" controlId="fullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                onChange={handleChange}
              />
            </Form.Group>

            {/* email */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleChange} />
            </Form.Group>

            {/* phone */}
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>No. Handphone</Form.Label>
              <Form.Control
                type="number"
                name="no_handphone"
                onChange={handleChange}
              />
            </Form.Group>

            {/* address */}
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                onChange={handleChange}
              />
            </Form.Group>

            {/* image */}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
            </Form.Group>
            <Button variant="warning" className="text-light w-25 ms-0 mt-3" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Modal>
    </>
  );
}

export default UpdateProfile;
