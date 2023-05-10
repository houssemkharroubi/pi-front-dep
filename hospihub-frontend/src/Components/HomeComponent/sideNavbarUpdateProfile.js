import { NavLink, Navigate, useNavigate } from "react-router-dom";
import './sideNavBarProfile.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faList, faPencil, faPlus, faTrash, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
function SideNavBarUpdateProfile(props) {
const [uploadedFile, setUploadedFile] = useState()
const navigate=useNavigate()
  const handleChange = (event) => {
    setUploadedFile(event.target.files[0]);
    console.log(uploadedFile)

  };

  const addImageprofile = (e) => {

    const formData = new FormData();
    // uploadedFile.forEach(file => {
    //   console.log(file)
    //   formData.append('file', uploadedFile, uploadedFile.name);
    //   console.log(formData)
    // });
     formData.append('file', uploadedFile, uploadedFile.name);

    axios.put(`http://localhost:5000/patient/addImageProfile/${props.user._id}`, formData)
      .then((response) => {
        console.log(response.data)
        navigate(0)
       
      })
      .catch((error) => {
        console.log(error);
      });


  }

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
              
          <NavLink to="/UpdateProfile/publicProfile" className="nav-item nav-link "><i className="fas fa-user" /><span>Public Profile</span></NavLink>
          <NavLink to="/UpdateProfile/UpdatePassword" className="nav-item nav-link "><i className="fas fa-key" /><span>Password</span></NavLink>
            </div>
          </div>
        </div>
        {/*mobile navigation bar end*/}



        {/*sidebar start*/}
        <div className="sidebar  ">

          <div className="image-upload ">
            <label htmlFor="file-input">
              <img src="../assetsTemplates/images/rotate.png" className="image-upload " alt="" />
            </label>
            <input id="file-input" onChange={(e) => handleChange(e)} type="file" />
          </div>

          <div className="profile_info">
            <img src={`http://127.0.0.1:8887/userProfile/${props.user.image}`} className="profile_image  " alt="" />
            
            <Button  onClick={()=>addImageprofile()}>
            <FontAwesomeIcon icon={faPlus} className="px-2" />Change Image
            </Button>
            <h4 className="title mt-2">{props.user.userName}</h4>
            <h4 className="title">{`Welcome Back ${props.user.userName} !`}</h4>
          </div>




          <NavLink to="/UpdateProfile/publicProfile" className="nav-item nav-link "><i className="fas fa-user" /><span>Public Profile</span></NavLink>
          <NavLink to="/UpdateProfile/UpdatePassword" className="nav-item nav-link "><i className="fas fa-key" /><span>Password</span></NavLink>
          {/* <NavLink to="/UpdateProfile/patientList" className="nav-item nav-link "><i className="fas fa-user" /><span>Patient List</span></NavLink> */}
        </div>

        {/*sidebar end*/}

      </div>
    </>
  );
}

export default SideNavBarUpdateProfile;
