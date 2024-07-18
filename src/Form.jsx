import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useContext } from "react";
import { FormContext } from "./context/FormContext";

function CreateForm() {
  let {
    onSubmit,
    handleSubmit,
    register,
    formState: { errors },
    country,
    handleFileChange,
  } = useContext(FormContext);

  return (
    <Container className="mt-10 max-w-screen-xl">
      <h2 className="text-center text-3xl font-semibold text-slate-600/90">
        Personal Information
      </h2>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                placeholder="Enter your name"
                {...register("name", { required: "This is required" })}
                isInvalid={!!errors.name}
              />
              <Form.Text className="text-danger" type="invalid">
                {errors.name && errors.name.message}
              </Form.Text>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="i.e. name@example.com"
                {...register("email", { required: "This is required" })}
                isInvalid={!!errors.email}
              />
              <Form.Text className="text-danger" type="invalid">
                {errors.email && errors.email.message}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                id="phone"
                placeholder="Enter phone number"
                {...register("phone", {
                  required: "This is required field",
                  minLength: {
                    value: 7,
                    message: "Phone number must be 7 character long",
                  },
                  pattern: {
                    value: /^\d{7,}$/, // Regex pattern for at least 7 digits
                    message: "Invalid phone number format",
                  },
                })}
                isInvalid={!!errors.phone}
              />
              <Form.Text className="text-danger" type="invalid">
                {errors.phone && errors.phone.message}
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                id="dob"
                placeholder="Enter date of birth"
                {...register("dob")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <div className="d-flex">
            <Form.Select
              className="mb-2"
              id="province"
              {...register("province")}
            >
              <option value="province-1" className="province-1">
                province-1
              </option>
              <option value="province-2" className="province-2">
                province-2
              </option>
              <option value="province-3" className="province-3">
                province-3
              </option>
              <option value="province-4" className="province-4">
                province-4
              </option>
              <option value="province-5" className="province-5">
                province-5
              </option>
              <option value="province-6" className="province-6">
                province-6
              </option>
              <option value="province-7" className="province-7">
                province-7
              </option>
            </Form.Select>

            <Form.Select className="mb-2" id="city" {...register("city")}>
              <option>Bidur</option>
              <option value="kathmandu" className="city-1">
                Kathmandu
              </option>
              <option value="dhangadi" className="city-2">
                Dhangadi
              </option>
              <option value="rajbiraj" className="city-3">
                Rajbiraj
              </option>
            </Form.Select>

            <Form.Select
              className="mb-2"
              id="district"
              {...register("district")}
            >
              <option value="Nuwakot">Nuwakot</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="bhaktapur">Bhaktapur</option>
            </Form.Select>

            <Form.Select className="mb-2" id="country" {...register("country")}>
              {country.map((item, index) => (
                <option key={index} value={item.name.common}>
                  {item.name.common}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form.Group>

        <Form.Group controlId="photo" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            {...register('photo')}
            onChange={handleFileChange}
            accept=".png"
          />
          <Form.Text className="text-danger" type="invalid">
            {errors.photo && errors.photo.message}
          </Form.Text>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">
            Submit
          </Button>
        </div>
      </Form>

      {/* showing form data in table  */}
    </Container>
  );
}

export default CreateForm;
