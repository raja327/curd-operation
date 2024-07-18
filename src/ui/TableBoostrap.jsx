import { useContext, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { FormContext } from "../context/FormContext";

function TableBootstrap() {
  const {
    formDataList,
    setFormDataList,
    editIndex,
    setEditIndex,
    editFormData,
    register,
    handleSubmit,
    saveEditedData,
    handleFileChange,
  } = useContext(FormContext);

  // pagination calculation
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); /* number of items per page */

  // index Calculation for pagination
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  const currentItems = formDataList.slice(indexOfFirstItems, indexOfLastItems);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteFormData = (indexToDelete) => {
    const updatedFormDataList = formDataList.filter(
      (_, index) => index !== indexToDelete
    );
    setFormDataList(updatedFormDataList);
  };

  function cancelEdit() {
    setEditIndex(null); // Clear edit mode without saving
  }
  return (
    <>
      <h2 style={{ color: "gray", textAlign: "center" }}>
        Personal Information table
      </h2>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((data, index) => (
            <tr key={indexOfFirstItems + index}>
              <td>{indexOfFirstItems + index + 1}</td>
              <td>
                {editIndex === indexOfFirstItems + index ? (
                  <Form.Control
                    type="file"
                    accept=".png"
                    {...register(
                      `formDataList[${indexOfFirstItems + index}].photo`
                    )}
                    onChange={handleFileChange}
                  />
                ) : (
                  // Display existing photo or placeholder
                  <img
                    src={
                      typeof data.photo === "string"
                        ? data.photo // Already a URL
                        : data.photo instanceof File
                        ? URL.createObjectURL(data.photo) // Create object URL for new photo
                        : "" // Default or placeholder value
                    }
                    alt="User"
                    style={{ maxWidth: "100px", height: "30px" }}
                  />
                )}
              </td>
              <td>
                {editIndex === indexOfFirstItems + index ? (
                  <input
                    type="text"
                    {...register("name")}
                    defaultValue={data.name}
                  />
                ) : (
                  data.name
                )}
              </td>
              <td>
                {editIndex === indexOfFirstItems + index ? (
                  <input
                    type="email"
                    {...register("email")}
                    defaultValue={data.email}
                  />
                ) : (
                  data.email
                )}
              </td>
              <td>
                {editIndex === indexOfFirstItems + index ? (
                  <input
                    type="text"
                    {...register("phone")}
                    defaultValue={data.phone}
                  />
                ) : (
                  data.phone
                )}
              </td>
              <td>{`${data.province}, ${data.city}, ${data.district}`}</td>
              <td>{`${data.country}`}</td>
              <td>
                {editIndex === indexOfFirstItems + index ? (
                  <>
                    <Button
                      variant="success"
                      onClick={handleSubmit(saveEditedData)}
                    >
                      Save
                    </Button>
                    &nbsp;
                    <Button variant="secondary" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <div className="flex">
                    <Button
                      variant="danger"
                      onClick={() => deleteFormData(indexOfFirstItems + index)}
                    >
                      Delete
                    </Button>
                    &nbsp;
                    <Button
                      variant="outline-danger"
                      onClick={() => editFormData(indexOfFirstItems + index)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ textAlign: "right", marginRight: "25px" }}>
        {/* {currentPage > 1 && ( */}
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>{" "}
        {/* {indexOfLastItems < formDataList.length && ( */}
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItems >= formDataList.length}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default TableBootstrap;
