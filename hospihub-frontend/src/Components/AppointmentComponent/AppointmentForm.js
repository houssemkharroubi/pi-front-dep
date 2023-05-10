import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { ToastContainer } from 'react-toastify';
import AppointmentListDialog from './AppointmentListDialog';
import { Button } from '@mui/material';
import Alert from "react-bootstrap/Alert";




function AppointmentForm() {
  const [hospitals, setHospitals] = useState([]);
  const [hospitalServices, setHospitalServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [showNoAppointmentsMessage, setShowNoAppointmentsMessage] = useState(false);


  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    async function fetchHospitals() {
      const response = await axios.get('http://localhost:5000/patient/hospitals');
      setHospitals(response.data);
    }
    fetchHospitals();
    console.log(decodedToken.id)
  }, []);

  async function handleHospitalChange(event) {
    const hospitalId = event.target.value;

    const response = await axios.get(`http://localhost:5000/patient/services/${hospitalId}`);
    setHospitalServices(response.data);
  }

  async function handleSearch ()  {
    try {
    const response = await axios.get(`http://localhost:5000/doctor/getDoctorAppointmentsWithLeastPatients/${selectedServiceId}`);
    setAppointments(response.data);
    setShowNoAppointmentsMessage(false);
    console.log("testtt :", response.data)
    setOpenDialog(true);
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.message === "Failed to get doctor appointments with least patients.") {
      setShowNoAppointmentsMessage(true);
    }
  }
 
  }

  const handleClose = () => {
    setOpenDialog(false); 
  }
  
  return (
    <div className="">
      <img
        className=" imgForm img-fluid d-none d-lg-block position-absolute "
        src="../assetsTemplates/templateForm/images/img2.jpg"
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
                    <h3 className="font-weight-bold mb-3">Take Appointment</h3>
                  </div>
                  <div class="container">
                    <div class="row">
                      <div class="col-md-6">
                        <label class="form-label" for="hospital-select">Choose a hospital:</label>
                        <select class="form-select" id="hospital-select" onChange={handleHospitalChange}>
                          <option value="">Select a hospital</option>
                          {hospitals.map(hospital => (
                            <option key={hospital._id} value={hospital._id}>
                              {hospital.HospitalName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div class="col-md-6">
                        <label class="form-label" for="service-select">Choose a service:</label>
                        <select class="form-select" id="service-select" onChange={(e) => setSelectedServiceId(e.target.value)}> 
                          <option value="">Select a service</option> 
                          {hospitalServices.map(service => (
                            <option key={service._id} value={service._id}>
                              {service.ServiceName}
                            </option>
                          ))}
                        </select> 
                        <div class="row">
                        <div class="col-md-10">
                        <button class="btn btn-primary mt-5 " onClick={handleSearch}>Show available Appointments</button>
                       
                        </div>
                        </div>
                        
                        <AppointmentListDialog appointments={appointments} open={openDialog} onClose={handleClose} />

                      </div>
                      {showNoAppointmentsMessage && (
                        <Alert
                          className="form-group"
                          variant="danger"
                          style={{ marginTop: "30px" }}
                        >
                          <div
                            className="form-icon-wrapper  text-danger"
                            style={{ marginTop: "10px", marginBottom: "10px" }}
                          >
                               We Are sorry , there is No appointment available in this service                          </div>
                        </Alert>
                      )}
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;