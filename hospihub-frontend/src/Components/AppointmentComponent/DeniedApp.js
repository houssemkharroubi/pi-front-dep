
import React from 'react';
import './ConfirmedApp.css';
import { useParams } from "react-router-dom";

function DeniedApp() {
    const {patientName,appointmentDate}= useParams()
    return (
        
        <div className="confirmed-app">
            <div className="container " style={{width: "100vh", borderRadius: "10px", backdropFilter: "blur(30px)" }}>
            <h1 className='mt-5'>Your appointment for {appointmentDate} has been denied.</h1>
            <p className='mb-5'><b>Wishing you good health and safety, {patientName}.</b></p>
        </div>
        </div>
    );
}
export default DeniedApp;