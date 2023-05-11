import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
function SidebarApp() {
  const [doctor, setDoctor] = useState({});
  const [uploadedFile, setUploadedFile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      axios
        .get(`https://hospihub.onrender.com/patient/getUserById/${decodedToken.id}`)
        .then((response) => {
          setDoctor(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
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
        `https://hospihub.onrender.com/patient/addImageProfile/${doctor._id}`,
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
        <>
          <div>
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
              <div className="collapse navbar-collapse" id="sideNavbarCollapse" style={{ backgroundColor: '#f8f9fa' }}>
  <div className="navbar-nav ms-auto p-4 p-lg-0" style={{ display: 'flex', alignItems: 'center' }}>
    <NavLink to="/AddWorktime/WorktimeDoc" className="nav-item nav-link" style={{ color: '#333', marginRight: '10px', textDecoration: 'none', transition: 'color 0.3s ease' }}>
      <i className="far fa-clock" style={{ marginRight: '5px' }} />
      <span className="nav-text" style={{ marginLeft: '5px' }}>Worktime</span>
    </NavLink>
    <NavLink to="/AddWorktime/AppointmentsList" className="nav-item nav-link" style={{ color: '#333', marginRight: '10px', textDecoration: 'none', transition: 'color 0.3s ease' }}>
      <i className="fas fa-th" style={{ marginRight: '5px' }} />
      <span className="nav-text" style={{ marginLeft: '5px' }}>Appointments</span>
    </NavLink>
    <NavLink to="/UpdateProfile/patientList" className="nav-item nav-link" style={{ color: '#333', marginRight: '10px', textDecoration: 'none', transition: 'color 0.3s ease' }}>
      <i className="fas fa-user" style={{ marginRight: '5px' }} />
      <span className="nav-text" style={{ marginLeft: '5px' }}>Patient List</span>
    </NavLink>
  </div>
</div>

            </div>
            {/*mobile navigation bar end*/}

            {/*sidebar start*/}

            <div className="sidebar  ">
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
                  src={`http://127.0.0.1:8887/userProfile/${doctor.image}`}
                  className="profile_image  "
                  alt=""
                />

                <Button onClick={() => addImageprofile()}>
                  <FontAwesomeIcon icon={faPlus} className="px-2" />
                  Change Image
                </Button>
                <h4 className="title">{doctor.userName}</h4>
                <h4 className="title">{`Welcome Back ${doctor.userName} !`}</h4>
              </div>

              <NavLink
                to="/AddWorktime/WorktimeDoc"
                className="nav-item nav-link "
              >
                <i className="far fa-clock" />
                <span>Worktime</span>
              </NavLink>
              <NavLink
                to="/AddWorktime/AppointmentsList"
                className="nav-item nav-link "
              >
                <i className="fas fa-th" />
                <span>Appointments</span>
              </NavLink>
              <NavLink
                to="/UpdateProfile/patientList"
                className="nav-item nav-link "
              >
                <i className="fas fa-user" />
                <span>Patient List</span>
              </NavLink>
            </div>

            {/*sidebar end*/}
          </div>
        </>
      </div>
    </>
  );
}

export default SidebarApp;
