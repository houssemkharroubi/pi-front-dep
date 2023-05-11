import { Link, NavLink } from "react-router-dom";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import './navbar.css';
import { FaUser, FaUserCircle, FaFileMedicalAlt, FaSignOutAlt } from 'react-icons/fa';

function NavbarComponent() {

  const [UserExist, setUserExist] = useState(false);
  const [UserName, setUserName] = useState('');
  const [UserIsPatient, setUserIsPatient] = useState(false);
  const [test, setTest] = useState(false);
  const token = localStorage.getItem('jwtToken');

  const navigate = useNavigate();

  useEffect(() => {
  
    console.log('navbar')
    if (token) {
      // navigate(0)
      setUserExist(true);
      const decodedToken = jwt_decode(token);
      const id = decodedToken.id;


      axios
        .get(`https://hospihub.onrender.com/patient/getUserById/${decodedToken.id}`)
        .then((response) => {
          console.log(response.data.userName)
          console.log()
          setUserName(response.data['userName'])
          console.log(response.data.role === "patient")
          if (response.data.role === "patient") {
            setUserIsPatient(true);
          }
        })

    }
  }, []);
  const handleReload = () => {
    navigate('/UpdateProfile/publicProfile');
    navigate(0)
  }

  const handleworkspapce = () => {
    navigate('/AddWorktime/WorktimeDoc');
    navigate(0)
  }

  const toMedicalRecord = () => {
    navigate('/Medicalrecord/Summary');
    navigate(0)
  }
  const byyyyy = () => {
    localStorage.clear();

    // Vider les cookies
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }

    navigate('/SignIn')
    navigate(0)
  }
  const goToSignUp = () => {
    navigate('/SignUp')
    navigate(0)
  }

  const goToSignIn = () => {
    navigate('/SignIn')
    navigate(0)
  }


  return (
    <>
    {test &&(<p>test</p>)}
    
      <div
        className="container-fluid bg-light p-0 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-map-marker-alt text-primary me-2" />
              <small>Ariana Ghazela </small>
            </div>
            <div className="h-100 d-inline-flex align-items-center py-3">
              <small className="far fa-clock text-primary me-2" />
              <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
            </div>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-phone-alt text-primary me-2" />
              <small>+216 80 100 100</small>
            </div>
            <div className="h-100 d-inline-flex align-items-center">
              <a
                className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
                href
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
                href
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
                href
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                className="btn btn-sm-square rounded-circle bg-white text-primary me-0"
                href
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}
      {/* Navbar Start */}
      <nav
        className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <NavLink
          to="/"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <img src="logo.png" alt="My Image" style={{width: '220px', height: 'auto'}} />
        </NavLink>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">

            <NavLink to="/" className="nav-item nav-link active">
              Home
            </NavLink>
            <NavLink to="/About" className="nav-item nav-link active">
              About
            </NavLink>
            <NavLink to="/Services" className="nav-item nav-link active">
              Service
            </NavLink>
            <NavLink to="/disease" className="nav-item nav-link active">
              Disease diagnosis
            </NavLink>
            {/* <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </a>
              <div className="dropdown-menu rounded-0 rounded-bottom m-0">
                <NavLink to="/Feature" className="dropdown-item">
                  Feature
                </NavLink>
                <NavLink to="/OurDoctor" className="dropdown-item">
                  Our Doctor
                </NavLink>
                <NavLink to="/Appointment" className="dropdown-item">
                  Appointment
                </NavLink>
                <NavLink to="/Testimonial" className="dropdown-item">
                  Testimonial
                </NavLink>
                <NavLink to="/404" className="dropdown-item">
                  404 Page
                </NavLink>
              </div>
            </div> */}
            <NavLink to="/contacthospi" className="nav-item nav-link active">
              Contact
            </NavLink>
          </div>
          {!UserExist && (<button className="btn btn-primary " on onClick={goToSignUp}>Sign Up</button>

          )}

          {!UserExist && (<button className="btn btn-primary " on onClick={goToSignIn} style={{ marginLeft: "10px",marginRight:"10px"}}>Sign In</button>

          )}
{UserExist && (
  <DropdownButton
    eventKey={3}
    title={
      <span>
        <FaUserCircle /> {UserName}
      </span>
    }
  >
    {UserIsPatient&&(<Dropdown.Item eventKey="1">
      <Link onClick={handleReload}>
      <FaUser /> {UserIsPatient ? 'Patient Profile' : 'Doctor Profile'}
      </Link>
    </Dropdown.Item>)}
    {!UserIsPatient&&(<Dropdown.Item eventKey="1">
      <Link onClick={handleReload}>
        <FaUser /> Doctor Profile
      </Link>
    </Dropdown.Item>)}
    {!UserIsPatient&&(<Dropdown.Item eventKey="4">
      <Link onClick={handleworkspapce}>
        <FaUser /> Doctor workspace
      </Link>
    </Dropdown.Item>)}
    
    {UserIsPatient && (
      <Dropdown.Item eventKey="2">
        <Link  onClick={toMedicalRecord}>
          <FaFileMedicalAlt /> Medical Record
        </Link>
      </Dropdown.Item>
    )}
    <Dropdown.Item eventKey="3">
      <Link  onClick={byyyyy}>
        <FaSignOutAlt /> Log Out
      </Link>
    </Dropdown.Item>
  </DropdownButton>
)}


        </div>      
      </nav>


    </>
  );
}

export default NavbarComponent;
