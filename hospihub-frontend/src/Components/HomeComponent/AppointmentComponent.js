function AppointmentComponent () {
  const handleBookAppointmentClick = () => {
    window.location.href = '/AppointmentForm';
  };
    return ( 
        <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <p className="d-inline-block border rounded-pill py-1 px-4">Appointment</p>
              <h1 className="mb-4">Make An Appointment To Visit Our Doctor</h1>
              <p className="mb-4">Are you feeling unwell or experiencing symptoms that are concerning you? Don't let your health suffer, make an appointment to visit our experienced and caring doctor today.</p>
              <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit" onClick={handleBookAppointmentClick}>Book Appointment</button>
                    </div>
              <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: '55px', height: '55px'}}>
                  <i className="fa fa-phone-alt text-primary" />
                </div>
                <div className="ms-4">
                  <p className="mb-2">Call Us Now</p>
                  <h5 className="mb-0">+216 80 100 100</h5>
                </div>
              </div>
              <div className="bg-light rounded d-flex align-items-center p-5">
                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: '55px', height: '55px'}}>
                  <i className="fa fa-envelope-open text-primary" />
                </div>
                <div className="ms-4">
                  <p className="mb-2">Mail Us Now</p>
                  <h5 className="mb-0">hospihubconfirmation@gmail.com</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="bg-light rounded h-100 d-flex align-items-center p-5">
              </div>
            </div>
          </div>
        </div>
      </div> 
     );
}

export default AppointmentComponent;