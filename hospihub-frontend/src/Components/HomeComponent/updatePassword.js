import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "./sideNavBarProfile.css";
import "react-toastify/dist/ReactToastify.css";
import Alert from "react-bootstrap/Alert";
import SideNavBarUpdateProfile from "./sideNavbarUpdateProfile";
import { Button, Modal } from "react-bootstrap";
function UpdateProfile() {
  const [User, setUser] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showoldPassword, setShowOldPassword] = useState(false);
  const [shownewPassword, setShowNewPassword] = useState(false);
  const [showconfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [showSuccesfullySaved, setshowSuccesfullySaved] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      axios
        .get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  const handleUpdatePassword = () => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwt_decode(token);
    axios
      .put(
        `http://localhost:5000/doctor/updatePasswordDoctor/${decodedToken.id}`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        }
      )
      .then((response) => {
        setshowSuccesfullySaved(true);
        setShowConfirmNewPassword(false);
        setShowOldPassword(false);
        setShowNewPassword(false);

        setTimeout(() => {
          setshowSuccesfullySaved(false);
          setShowConfirmNewPassword(false);
          setShowOldPassword(false);
          setShowNewPassword(false);
        }, 3000); // 3 seconds
      })
      .catch((err) => {
        if (err.response.data["error"] === "Wrong password !") {
          setshowSuccesfullySaved(false);
          setShowConfirmNewPassword(false);
          setShowOldPassword(true);
          setShowNewPassword(false);
        } else if (err.response.data["error"] === "wrong confirm password") {
          setshowSuccesfullySaved(false);
          setShowConfirmNewPassword(true);
          setShowOldPassword(false);
          setShowNewPassword(false);
        }
      });
      handleClose2();
  };
  const handleSubmit = (e) => {
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/.test(
        newPassword
      )
    ) {
      setPasswordErrorMessage(true);
      return;
    }
  };

  return (
    <>
      <div className="container pt-5 pb-5  ">
        <div className=" row  ">
          <div className="col-lg-4">
            <SideNavBarUpdateProfile user={User}></SideNavBarUpdateProfile>
          </div>

          <div className="col-lg-8  mb-5">
            <div className="  ">
              {/* Account details card*/}
              <div className="card cardMD px-5 cardRes">
                <div className="card-header ">
                  <i className="fas fa-user-md iconMed" />
                  Update password {User.userName}
                </div>
                <div className="card-body">
                  <form>
                    {/* Form Group (username)*/}
                    <div className="mb-3">
                      <label className="small mb-1">Old Password</label>
                      <input
                        className="form-control"
                        id="inputpassword"
                        type="password"
                        placeholder="Enter your old password"
                        name="password"
                        required
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    {showoldPassword && (
                      <Alert
                        className="form-group"
                        variant="danger"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-danger"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          Password incorrect
                        </div>
                      </Alert>
                    )}

                    {/* Form Group (email address)*/}
                    <div className="mb-3">
                      <label className="small mb-1">New Password</label>
                      <input
                        className="form-control"
                        id="inputpassword"
                        type="password"
                        placeholder="Enter your new password"
                        name="newPassword"
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                        onBlur={() =>
                          setPasswordErrorMessage(
                            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/.test(
                              newPassword
                            )
                          )
                        }
                      />
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
                          Password must contain at least one uppercase letter,
                          one lowercase letter, one number, and be at least 8
                          characters long.
                        </div>
                      </Alert>
                    )}

                    <div className="mb-3">
                      <label className="small mb-1">Confirm New Password</label>
                      <input
                        className="form-control"
                        id="inputpassword"
                        type="password"
                        placeholder="Confirm your new password"
                        name="Confirmpassword"
                        required
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                    </div>
                    {showconfirmNewPassword && (
                      <Alert
                        className="form-group"
                        variant="danger"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text-danger"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          verif your confirm password !
                        </div>
                      </Alert>
                    )}

                    {/* Save changes button*/}
                    <button
                      className="btn btn-primary ml-0 mt-3"
                      style={{ width: "180px" }}
                      type="button"
                      onClick={handleShow2}
                    >
                      Save Password
                    </button>
                    {showSuccesfullySaved && (
                      <Alert
                        className=" mt-3"
                        variant="success"
                        style={{ marginTop: "-13px" }}
                      >
                        <div
                          className="form-icon-wrapper  text"
                          style={{ marginTop: "-11px", marginBottom: "-13px" }}
                        >
                          Password updated succesfully !
                        </div>
                      </Alert>
                    )}
                  </form>

                  <></>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to change your password ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdatePassword}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateProfile;
