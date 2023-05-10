import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";


function SignUpComponent() {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [role, setRole] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enableTwoFactorAuth, setEnableTwoFactorAuth] = useState(false);
  const [hospital, setHospital] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [services, setServices] = useState([]);
  const [service, setService] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  // const [code, setCode] = useState('');
  // const [phoneNotVerif, setphoneNotVerif] = useState('');


  const navigate = useNavigate();
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [passwordErrorMessage1, setPasswordErrorMessage1] = useState(false);
  const [emailErrorMessage1, setEmailErrorMessage1] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);




  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName)) {
      setLastNameErrorMessage(true);
      return;
    }
    if (!/^[a-zA-Z0-9]{3,}$/.test(userName)) {
      setUsernameErrorMessage(true);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErrorMessage(true);
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/.test(password)) {
      setPasswordErrorMessage(true);
      return
    }
    if (password !== confirmPassword) {
      setPasswordErrorMessage1(true);
      return
    }


    try {
      axios.post('http://localhost:5000/signup/', {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        address: address,
        email: email,
        password: password,
        dateOfBirth: dateOfBirth,
        role: role,
        confirmPassword: confirmPassword,
        enableTwoFactorAuth: enableTwoFactorAuth,
        code: "",
        phoneNotVerif: ""
      }).then(
        (response) => {
          console.log(response);
          if (response.data.message === 'User already exists!') {
            setEmailErrorMessage(true);
            return;
          }
          if (service) {
            axios.put(`http://localhost:5000/doctor/updateDoctorService/${response.data.data._id}/${service}/${hospital}`);
          }
          navigate(`/EmailVerifiaction/${response.data.data._id}`);
        }
      )

      console.log(userName)
    } catch (error) {

    }
  };



  const handleRoleChange = (event) => {
    setRole(event.target.value);
    console.log(event.target.value);
  };

  const handleHospitalChange = (event) => {
    setHospital(event.target.value);
  }

  const handleServiceChange = (event) => {
    setService(event.target.value);
  }



  useEffect(() => {
    async function fetchHospitals() {
      const response = await axios.get('http://localhost:5000/hospital/getAllHospitals');
      setHospitals(response.data);
    }
    fetchHospitals();
  }, []);

  useEffect(() => {
    async function fetchServices() {
      if (hospital) {
        setServices()
        const response = await axios.get(`http://localhost:5000/service/gethospitalservices/${hospital}`);
        setServices(response.data);
      }
    }
    if (hospital) {
      fetchServices();
    }
  }, [hospital]);



  return (
    <>
      <div>
        <img
          className=" imgForm img-fluid d-none d-lg-block position-absolute "
          src="../assetsTemplates/templateForm/images/img.jpg"
          style={{ width: "100%", height: "100%" }}
        />'
        <div className=" pb-4">
          <div className=" container pt-lg-5 pb-lg-5 ">
            <div className="  card col-12  col-lg-7  offset-lg-6 " >
              <div className="card-body styleCard">
                <div className="row align-items-center">
                  <div className="">
                    <div className="text-center my-5">
                      <h3 className="font-weight-bold mb-3">Sign Up</h3>
                      <p className="text-muted">Create a free account now.</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} onBlur={() => setLastNameErrorMessage(!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName))} required />

                        </div>


                        <div className="col-md-6">
                          <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} onBlur={() => setLastNameErrorMessage(!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName))} required />
                        </div>
                      </div>

                      {lastNameErrorMessage && (
                        <Alert
                          className="form-group"
                          variant="danger"
                          style={{ marginTop: "-13px" }}
                        >
                          <div
                            className="form-icon-wrapper  text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                          >
                            First name and Last name should only contains alphabetical characters.
                          </div>
                        </Alert>
                      )}

                      <div className="form-group">
                        <div className="form-icon-wrapper">
                          <input type="text" className="form-control" id="fullname" placeholder="Enter username" value={userName} onChange={(e) => setUserName(e.target.value)} onBlur={() => setUsernameErrorMessage(!/^[a-zA-Z0-9]{3,}$/.test(userName))} required />
                          <i className="form-icon-left mdi mdi-account " />
                        </div>
                      </div>
                      {usernameErrorMessage && (
                        <Alert
                          className="form-group"
                          variant="danger"
                          style={{ marginTop: "-13px" }}
                        >
                          <div
                            className="form-icon-wrapper  text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                          >
                            Username must contain at least 3 characters and should not contain special characters
                          </div>
                        </Alert>
                      )}





                      <div className="row gx-3 mb-3">
                        <div className="col-md-4">
                          <label className="small mb-1" htmlFor="inputOrgName">Date of birth</label>
                          <input className="form-control" id="inputOrgName" type="date" placeholder="Date of birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                        </div>
                        <div className="col-md-6 offset-md-1 ">
                          <div className="row gx-3 mt-4">
                            <label className="small col-md-4" htmlFor="inputOrgName">Gender:</label>

                            <div className="col-md-3">
                              <label className="small mb-1" htmlFor="inputFirstName">male</label>
                              <input
                                type="radio"
                                name="gender"
                                value="MALE"
                                checked={gender === "MALE"}
                                onChange={(e) => setGender(e.target.value)}
                              />
                            </div>



                            <div className="col-md-5">
                              <label className="small mb-1" htmlFor="inputFirstName">Female</label>
                              <input
                                type="radio"
                                name="gender"
                                value="FEMALE"
                                checked={gender === "FEMALE"}
                                onChange={(e) => setGender(e.target.value)}
                              />
                            </div>



                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="form-icon-wrapper">
                          <input type="text" className="form-control" id="fullname" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} required />

                        </div>
                      </div>


                      <div className="form-group">

                        <div className="form-icon-wrapper ">
                          <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => { setEmailErrorMessage1(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)); setEmailErrorMessage(false); }} required />
                          <i className="form-icon-left mdi mdi-email" />
                        </div>
                        {emailErrorMessage1 && (
                          <Alert
                            className="form-group"
                            variant="danger"
                            style={{ marginTop: "6px" }}
                          >
                            <div
                              className="form-icon-wrapper  text-danger"
                              style={{ marginTop: "-11px", marginBottom: "-13px" }}
                            >
                              please enter a valid email
                            </div>
                          </Alert>
                        )}
                        {emailErrorMessage && (
                          <Alert
                            className="form-group"
                            variant="danger"
                            style={{ marginTop: "6px" }}
                          >
                            <div
                              className="form-icon-wrapper  text-danger"
                              style={{ marginTop: "-11px", marginBottom: "-13px" }}
                            >
                              email is already used
                            </div>
                          </Alert>
                        )}
                      </div>
                      <div className="form-group">
                        <div className="form-icon-wrapper">
                          <input type={showPassword ? 'text' : 'password'}
                            className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={() => setPasswordErrorMessage(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/.test(password))} required />
                          <i
                            className={`form-icon-left mdi mdi-${showPassword ? 'eye' : 'eye-off'}`}
                            onClick={toggleShowPassword}
                          />

                        </div>
                      </div>
                      {passwordErrorMessage && (
                        <Alert
                          className="form-group"
                          variant="danger"
                          style={{ marginTop: "-13px" }}
                        >
                          <div
                            className="form-icon-wrapper  text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                          >
                            Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.
                          </div>
                        </Alert>
                      )}
                      <div className="form-group">
                        <label htmlFor="password-repeat"></label>
                        <div className="form-icon-wrapper">
                          <input type="password" className="form-control" id="password-repeat" placeholder="Retype password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={() => setPasswordErrorMessage1(password !== confirmPassword)} required />
                          <i className="form-icon-left mdi mdi-lock" />

                        </div>
                      </div>
                      {passwordErrorMessage1 && (
                        <Alert
                          className="form-group"
                          variant="danger"
                          style={{ marginTop: "-13px" }}
                        >
                          <div
                            className="form-icon-wrapper  text-danger"
                            style={{ marginTop: "-11px", marginBottom: "-13px" }}
                          >
                            Passwords do not match. Please try again
                          </div>
                        </Alert>
                      )}
                      <div className="form-group">

                        <select className="form-control bg-light p-2" onChange={handleRoleChange}>
                          <option value="">Choose Role</option>
                          <option value="patient">Patient</option>
                          <option value="doctor">Doctor</option>
                        </select>

                      </div>
                      {/* {role=='doctor'&&
                                              <select className="  form-control bg-light p-2" onChange={handleRoleChange}>
                                              <option value="">Choose Hospital</option>
                                              {Hospitals.map((H) => (
                                                <option key={H} value={H.HospitalName}>
                                                    {H.HospitalName}
                                                </option>
                                            ))}
                                            </select>
                        } */}


                      {role === 'doctor' && (
                        <div className="form-group">
                          <select className="form-control bg-light p-2" onChange={handleHospitalChange} required>
                            <option value="">Choose hospital</option>
                            {hospitals.map((hospital) => (
                              <option key={hospital._id} value={hospital._id}>
                                {hospital.HospitalName}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {services && services.length > 0 && (
                        <div className="form-group">
                          <select className="form-control bg-light p-2" onChange={handleServiceChange} required>
                            <option value="">Choose a service</option>
                            {services.map((s) => (
                              <option key={s._id} value={s._id}>
                                {s.ServiceName}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}


                      <div className="form-group">
                        <div className="custom-control custom-checkbox  ">

                          <input type="checkbox" className="custom-control-input" id="customCheck1" checked={enableTwoFactorAuth} onChange={(e) => setEnableTwoFactorAuth(e.target.checked)} />
                          <label className="custom-control-label px-5" htmlFor="customCheck1">Enable Two Factor Authentication</label>
                        </div>
                      </div>

                      <div className="d-flex  justify-content-between ">

                        <div>

                          <button className="btn btn-primary ">Sign Up</button>

                        </div>

                        <div className=" ">
                          <p className="mt-2">
                            Do you already have an account?
                            <Link to='/signIn'>Sign in</Link>.
                          </p>
                        </div>
                      </div>

                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpComponent;