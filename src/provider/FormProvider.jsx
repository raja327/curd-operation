import { useForm } from "react-hook-form";
import { FormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export const FormProvider = ({ children }) => {
  // global state for

  const navigate = useNavigate();
  const [formDataList, setFormDataList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // console.log(hasFormData);
  const [country, setCountry] = useState([]);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const getData = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountry(response.data); // Assuming response.data is an array of countries
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Function to handle file change and store in localStorage
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  // function to handle form submission
  const onSubmit = (data) => {
    console.log(data);
    const newData = {
      ...data,
      photo: imagePreview,
      // You may need to adjust how you handle photo here based on your form structure
      // photo: data.photo.length > 0 ? data.photo[0] : "",
    };
    setFormDataList([...formDataList, newData]);
    reset(); // Reset form fields
  };

  const editFormData = (index) => {
    setEditIndex(index);
    // Reset the form and populate with current row's data
    reset({
      name: formDataList[index].name,
      email: formDataList[index].email,
      phone: formDataList[index].phone,
      photo: formDataList[index].photo,
      // Add other fields as needed
    });
  };

  const saveEditedData = (data) => {
    // Update formDataList with edited data
    const updatedFormDataList = formDataList.map((item, index) =>
      editIndex === index
        ? {
            ...item,
            name: data.name,
            email: data.email,
            phone: data.phone,
            photo: imagePreview,
          }
        : item
    );
    setFormDataList(updatedFormDataList);
    setEditIndex(null); // Clear edit mode
    reset(null);
  };
  

  return (
    <FormContext.Provider
      value={{
        onSubmit,
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors },
        country,
        handleFileChange,
        formDataList,
        setFormDataList,
        editFormData,
        editIndex,
        setEditIndex,
        saveEditedData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
