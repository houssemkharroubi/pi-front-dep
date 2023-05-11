import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { NavLink } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import {setToken , selectToken} from "../../reduxx/slices/authSlice"
//import { setToken, selectToken } from "../../Redux/slices/authSlice"

function SignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [secret, setSecret] = useState("");
  const [errorEmailMessage, setEmailErrorMessage] = useState(false);
  const [errorConfirmeMessage, setConfirmeErrorMessage] = useState(false);
  const [errorValideMessage, setValideErrorMessage] = useState(false);
  const [errorPasswordMessage, setPasswordErrorMessage] = useState(false);
  const [errorSecretMessage, setSecretErrorMessage] = useState(false);
  const [errorBlockedMessage, setBlockedErrorMessage] = useState(false);
  const [errorArchivedMessage, setArchivedErrorMessage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password1, setPassword1] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  //passport Sign In 
  // const navigate = useNavigate();


  if (showAlert && show) {
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  useEffect(() => {

    const jwtCookie = document.cookie ? document.cookie.split('; ').find(row => row.startsWith('jwt=')) : null;
    console.log(jwtCookie)

    const jwt = jwtCookie ? jwtCookie.split('=')[1] : null;

    if (jwt) {
      // If JWT cookie exists, redirect to profile page
      console.log(jwt)
      localStorage.setItem("jwtToken", jwt);
    }
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();

    // envoyer une requête POST à la fonction backend avec les paramètres email et password
    axios
      .post("https://hospihub.onrender.com/login", {
        email: email,
        password: password,
        secret: secret,
      })
      .then((response) => {
        Cookies.set("jwt", response.data.token);
        const jwtCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("jwt="));
        if (jwtCookie) {
          const jwtToken = jwtCookie.split("=")[1];
          const decodedToken = jwt_decode(jwtToken);
          const id = decodedToken.id;

          axios
            .get(`https://hospihub.onrender.com/patient/getUserById/${id}`)
            .then((response) => {
              console.log('here')
              if (response.data.secret) {

                setShow(true);

                // toast.success('Check your email inbox for the secret code we just sent you', {
                //   position: toast.POSITION.TOP_RIGHT
                // });

                if (secret === response.data.secret) {
                  console.log(show)

                  localStorage.clear();
                  // Vider les cookies

                  localStorage.setItem("jwtToken", jwtToken);
                  setTimeout(function () {
                    console.log('La fonction anonyme a été exécutée !');
                  }, 500);

                  navigate('/');
                  navigate(0)
                } else {
                  setEmailErrorMessage(false);
                  setPasswordErrorMessage(false);
                  setValideErrorMessage(false);
                  setConfirmeErrorMessage(false)
                  setBlockedErrorMessage(false);
                  setArchivedErrorMessage(false);
                }
              } else {
                setShow(false);
                localStorage.setItem("jwtToken", jwtToken);
                setTimeout(function () {
                  console.log('La fonction anonyme a été exécutée !');
                }, 500);

                navigate('/');
                navigate(0)
              }
            });
        }
      })
      .catch((error) => {
        if (error.response.data["message"]) {
          setSecretErrorMessage(true);
          setEmailErrorMessage(false);
          setPasswordErrorMessage(false);
          setValideErrorMessage(false);
          setConfirmeErrorMessage(false)
          setBlockedErrorMessage(false);
          setArchivedErrorMessage(false);
        }
        if (error.response.data.errors.validated) {
          setValideErrorMessage(true);
          setConfirmeErrorMessage(false)
          setEmailErrorMessage(false);
          setPasswordErrorMessage(false);
          setSecretErrorMessage(false);
          setBlockedErrorMessage(false);
          setArchivedErrorMessage(false);
        }
        if (error.response.data.errors.email) {
          setEmailErrorMessage(true);
          setPasswordErrorMessage(false);
          setSecretErrorMessage(false);
          setValideErrorMessage(false);
          setConfirmeErrorMessage(false)
          setBlockedErrorMessage(false);
          setArchivedErrorMessage(false);
        }
        if (error.response.data.errors.confirmed) {
          setEmailErrorMessage(false);
          setPasswordErrorMessage(false);
          setSecretErrorMessage(false);
          setValideErrorMessage(false);
          setConfirmeErrorMessage(true)
          setBlockedErrorMessage(false);
          setArchivedErrorMessage(false);
        }
        if (error.response.data.errors.password) {
          setEmailErrorMessage(false);
          setPasswordErrorMessage(true);
          setSecretErrorMessage(false);
          setValideErrorMessage(false);
          setConfirmeErrorMessage(false)
          setBlockedErrorMessage(false);
          setArchivedErrorMessage(false);
        }
        if (error.response.data.errors.blocked) {
          setEmailErrorMessage(false);
          setPasswordErrorMessage(false);
          setSecretErrorMessage(false);
          setValideErrorMessage(false);
          setConfirmeErrorMessage(false)
          setBlockedErrorMessage(true);
          setArchivedErrorMessage(false);
        }
        if (error.response.data.errors.archived) {
          setEmailErrorMessage(false);
          setPasswordErrorMessage(false);
          setSecretErrorMessage(false);
          setValideErrorMessage(false);
          setConfirmeErrorMessage(false)
          setBlockedErrorMessage(false);
          setArchivedErrorMessage(true);
        }
      });
  };

  return (
    <div className="">
      <img
        className=" imgForm img-fluid d-none d-lg-block position-absolute "
        src="../assetsTemplates/templateForm/images/img.jpg"
        style={{ width: "100%", height: "100%" }}
      />'
      <ToastContainer />
      <div className="pb-5">
        <div className=" container pt-lg-5 pb-lg-5 ">
          <div className="  card col-12  col-lg-5  offset-lg-7 " >
            <div className="card-body styleCard">
              <div className="row align-items-center">
                <div className="">
                  <div className="text-center my-5">
                    <h3 className="font-weight-bold mb-3">Sign In</h3>
                    <p className="text-muted">Sign in to Latform to continue</p>
                  </div>
                  <div className="text-center d-none d-lg-inline">
                    <p>
                      Don't have an account?
                      <NavLink to="/SignUp">Create a free account</NavLink>.
                    </p>
                  </div>
                  <div className="social-links justify-content-center">
                    <a
                      href="https://hospihub.onrender.com/auth/google"
                      className="bg-google"
                    >
                      <i className="mdi mdi-google" /> Connect with Google
                    </a>
                  </div>
                  <div className="text-divider">or sign in with email</div>
                  <form onSubmit={handleSignIn}>
                    <div className="form-group">
                      <label htmlFor="email">Email*</label>
                      <div className="form-icon-wrapper">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter email"
                          autoFocus
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className="form-icon-left mdi mdi-email" />
                      </div>
                    </div>

                    {errorEmailMessage && (
                      <Alert
                        className="form-group"
                        variant="danger"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-danger"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          email is not used
                        </div>
                      </Alert>
                    )}
                    {errorConfirmeMessage && (
                      <Alert
                        className="form-group"
                        variant="danger"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-danger"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          Your account is not confirmed
                        </div>
                      </Alert>
                    )}
                    {errorValideMessage && (
                      <Alert
                        className="form-group"
                        variant="danger"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-danger"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          Your account is not validated yet
                        </div>
                      </Alert>
                    )}
                    {errorBlockedMessage && (
                      <Alert
                        className="form-group"
                        variant="danger"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-danger"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          Sorry your account is blocked
                        </div>
                      </Alert>
                    )}
                    {errorArchivedMessage && (
                      <Alert
                        className="form-group"
                        variant="danger"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-danger"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          Sorry your account is archived
                        </div>
                      </Alert>
                    )}


                    {/* //////////////////////////////// */}
                    <div className="form-group">
                      <label htmlFor="password">Password*</label>
                      <div className="form-icon-wrapper">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control"
                          id="password"
                          placeholder="Enter password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <i
                          className={`form-icon-left mdi mdi-${showPassword ? 'eye' : 'eye-off'}`}
                          onClick={toggleShowPassword}
                        />
                      </div>
                    </div>

                    {errorPasswordMessage && (
                      <Alert
                        className="form-group"
                        variant="danger"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-danger"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          incorrect password
                        </div>
                      </Alert>
                    )}

                    {show && (
                      <div className="form-group">
                        <label htmlFor="password">Secret</label>
                        <div className="form-icon-wrapper">
                          <input
                            type="Secret"
                            className="form-control"
                            id="password"
                            placeholder="Enter secret code"
                            required
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                          />
                          <i className="form-icon-left mdi mdi-lock" />
                        </div>
                      </div>
                    )}

                    {show && showAlert && (
                      <Alert
                        className="form-group"
                        variant="success"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-success"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          Check your email inbox for the secret code we just sent you
                        </div>
                      </Alert>
                    )}

                    {errorSecretMessage && (
                      <Alert
                        className="form-group"
                        variant="danger"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-danger"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          incorrect Secret
                        </div>
                      </Alert>
                    )}

                    <div className="form-group">
                      <div className="d-md-flex justify-content-between align-items-center">
                        <button className="btn btn-primary">Sign In</button>
                        <div className="mt-3 mt-md-0">
                          <NavLink to="/ForgetPassword">
                            I forgot my password!
                          </NavLink>
                        </div>
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
  );
}

export default SignInComponent;
