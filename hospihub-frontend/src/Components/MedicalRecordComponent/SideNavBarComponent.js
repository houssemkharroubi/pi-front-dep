import { NavLink, useNavigate } from "react-router-dom";
import "./sideNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

function SideNavBarComponent(props) {
  const [uploadedFile, setUploadedFile] = useState();
  const navigate = useNavigate();
  const handleChange = (event) => {
    setUploadedFile(event.target.files[0]);
    console.log(uploadedFile);
  };

  const addImageprofile = (e) => {
    const formData = new FormData();
    // uploadedFile.forEach(file => {
    //   console.log(file)
    //   formData.append('file', uploadedFile, uploadedFile.name);
    //   console.log(formData)
    // });
    formData.append("file", uploadedFile, uploadedFile.name);

    axios
      .put(
        `https://hospihub.onrender.com/patient/addImageProfile/${props.user._id}`,
        formData
      )
      .then((response) => {
        console.log(response.data);
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="col-lg-4" style={{ marginBottom: "5px" }}>
        {/*mobile navigation bar start*/}
        <div className="mobile_nav">
          <div className="nav_barr">
            <img
              src="../assetsTemplates/template1/img/testimonial-1.jpg"
              className="mobile_profile_imagee"
              alt=""
            />
            <button
              type="button"
              className="navbar-toggler me-4"
              data-bs-toggle="collapse"
              data-bs-target="#sideNavbarCollapse"
            >
              <span className="fa fa-bars" />
            </button>
          </div>
          <div
            className="collapse navbar-collapse"
            id="sideNavbarCollapse"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div
              className="navbar-nav ms-auto p-4 p-lg-0"
              style={{ display: "flex", alignItems: "center" }}
            >
              <NavLink
                to="/Medicalrecord/Summary"
                className="nav-item nav-link "
              >
                <i className="fas fa-user" />
                <span>Summary Of the medical record</span>
              </NavLink>
              <NavLink
                to="/Medicalrecord/BloodandMeasurements"
                className="nav-item nav-link "
              >
                <i className="fas fa-plus-square" />
                <span>Blood groups and measurements</span>
              </NavLink>
              <NavLink
                to="/Medicalrecord/VitalSigns"
                className="nav-item nav-link "
              >
                <i className="fas fa-heartbeat" />
                <span>Vital Signs</span>
              </NavLink>
              <NavLink
                to="/Medicalrecord/PatientApp"
                className="nav-item nav-link "
              >
                <i className="fas fa-th" />
                <span>Appointments</span>
              </NavLink>
              <NavLink
                to="/Medicalrecord/DoctorsList"
                className="nav-item nav-link "
              >
                <i className="fas  fa-user" />
                <span>Doctors List</span>
              </NavLink>
              <NavLink
                to="/Medicalrecord/listPrescriptionsforPatient"
                className="nav-item nav-link "
              >
                <i className="fas fa-list" />
                <span>Prescriptions</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="sidebar">
          <div className="image-upload ">
            <label htmlFor="file-input">
              <img
                src="../assetsTemplates/images/rotate.png"
                className="image-upload "
                alt=""
              />
            </label>
            <input
              id="file-input"
              onChange={(e) => handleChange(e)}
              type="file"
            />
          </div>

          <div className="profile_info">
            <img
              src={`http://127.0.0.1:8887/userProfile/${props.user.image}`}
              className="profile_image  "
              alt=""
            />

            <Button onClick={() => addImageprofile()}>
              <FontAwesomeIcon icon={faPlus} className="px-2" />
              Change Image
            </Button>
            <h4 className="title mt-2">{props.user.userName}</h4>
            <h4 className="title">{`Welcome Back ${props.user.userName} !`}</h4>
          </div>

          <NavLink to="/Medicalrecord/Summary" className="nav-item nav-link ">
            <i className="fas fa-user" />
            <span>Summary Of the medical record</span>
          </NavLink>
          <NavLink
            to="/Medicalrecord/BloodandMeasurements"
            className="nav-item nav-link "
          >
            <i className="fas fa-plus-square" />
            <span>Blood groups and measurements</span>
          </NavLink>
          <NavLink
            to="/Medicalrecord/VitalSigns"
            className="nav-item nav-link "
          >
            <i className="fas fa-heartbeat" />
            <span>Vital Signs</span>
          </NavLink>
          <NavLink
            to="/Medicalrecord/PatientApp"
            className="nav-item nav-link "
          >
            <i className="fas fa-th" />
            <span>Appointments</span>
          </NavLink>
          <NavLink
            to="/Medicalrecord/DoctorsList"
            className="nav-item nav-link "
          >
            <i className="fas  fa-user" />
            <span>Doctors List</span>
          </NavLink>
          <NavLink
            to="/Medicalrecord/listPrescriptionsforPatient"
            className="nav-item nav-link "
          >
            <i className="fas fa-list" />
            <span>Prescriptions</span>
          </NavLink>

          <div className="cardd cardMD col-lg-9 mx-5 mt-4">
            <div className="card-header ">
              <i className="fas fa-plus" />
              <button className="btn btn-secondary">
                Make an appointment
              </button>{" "}
            </div>
          </div>
          <div className="cardd cardMD col-lg-9 mx-5 mt-4 mb-5">
            <div className="card-header ">
              <i className="fas fa-plus" />
              <button className="btn btn-secondary">Update your profile</button>
            </div>
          </div>
        </div>

        {/*sidebar end*/}
      </div>
    </>
  );
}

export default SideNavBarComponent;
