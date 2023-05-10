import { useEffect, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

import Table from "react-bootstrap/Table";
import jwt_decode from "jwt-decode";
import axios from "axios";

import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  selectReceiver,
  selectMeetWithPatient,
  selectUser,
} from "../../reduxx/slices/userSelectedSlice";
import SidebarApp from "../FormsComponent/SidebarApp";

function PatientList() {
  const dispatch = useDispatch();
  const [User, setUser] = useState({});
  const [doctorUsername, setDoctorUsername] = useState("");
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage, setPatientsPerPage] = useState(5);
  const [showMeeting, setShowMeeting] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const token = localStorage.getItem("jwtToken");
  var decodedToken = jwt_decode(token);


  useEffect(() => {
    axios
      .get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:5000/doctor/getPatientList", {
        doctorId: decodedToken.id,
      })
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // Remove duplicates from patients array
  const uniquePatients = patients.filter(
    (patient, index, self) =>
      index === self.findIndex((p) => p._id === patient._id)
  );

  // Get current patients
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = uniquePatients
    .filter((patient) =>
      patient.userName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstPatient, indexOfLastPatient);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = async (patient) => {
    dispatch(selectUser(patient.userName));
    dispatch(selectReceiver(patient));
    await axios.post("http://localhost:5000/chat", {
      userId: patient._id,
      userConnectedId: decodedToken.id,
    });
    navigate("/UpdateProfile/chat");
  };

  const handleLaunchMeeting = async(a) => {
    dispatch(selectMeetWithPatient(a));
    navigate("/Meet");
    await axios.post(`http://localhost:5000/patient/appointments/${a.email}/${User.userName}/${a._id}`)
  };

  return (
    <>
      <div className="container  pt-5 pb-5">
        <div className=" row  ">
          <div className="col-lg-4">
            <SidebarApp user={User}></SidebarApp>
          </div>
          <div className="col-lg-8  mb-5">
            <div className="card cardMD cardRes ">
              <div className="card-header ">
                <i className="fas fa-plus-square" /> Patient List
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search patient by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Table className="table table-bordered table-striped table-hover w-100">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPatients.map((patient, index) => (
                      <tr key={index}>
                        <td>{patient.userName}</td>
                        <td>{patient.email}</td>
                        <td>
                          <button
                            onClick={() => handleClick(patient)}
                           
                            style={{
                              padding: "0.375rem 0.75rem",
                              border: "none",
                              borderRadius: "0.25rem",
                              backgroundColor: "#007bff",
                              color: "#fff",
                              cursor: "pointer",
                              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              transition: "all 0.3s ease",
                            }}
                          >
                            <i class="bi bi-chat"></i>
                          </button>
                          <button
                          onClick={()=>handleLaunchMeeting(patient)}
                          className="mt-1"
                            style={{
                              padding: "0.375rem 0.75rem",
                              border: "none",
                              borderRadius: "0.25rem",
                              backgroundColor: "#007bff",
                              color: "#fff",
                              cursor: "pointer",
                              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              transition: "all 0.3s ease",
                              marginLeft: "1px",
                            }}
                          >
                            <i class="bi bi-camera-video"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <nav>
                  <ul className="pagination">
                    {patientsPerPage > 0 &&
                      patients.length > patientsPerPage &&
                      Array.from(
                        {
                          length: Math.ceil(patients.length / patientsPerPage),
                        },
                        (v, i) => i + 1
                      ).map((number) => (
                        <li
                          className={
                            number === currentPage
                              ? "page-item active"
                              : "page-item"
                          }
                          key={number}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(number)}
                          >
                            {number}
                          </button>
                        </li>
                      ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default PatientList;
