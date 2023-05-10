import"./carousel.css"

function ServiceComponent() {
    return (  
        <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp " data-wow-delay="0.1s" style={{maxWidth: '600px'}}>
            <p className="d-inline-block border rounded-pill py-1 px-4">Services</p>
            <h1>Health Care Solutions</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeInUp " data-wow-delay="0.1s">
              <div className="service-item bg-serv rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{width: '65px', height: '65px'}}>
                  <i className="fa fa-heartbeat text-primary fs-4" />
                </div>
                <h4 className="mb-3">Cardiology</h4>
                <p className="mb-4">Our cardiology services offer advanced care for heart and vascular conditions, including diagnosis and treatment of arrhythmias, heart attacks, heart failure, and congenital heart defects. Our experienced team utilizes state-of-the-art technology and personalized care to help patients achieve optimal heart health and well-being.</p>
                <a className="btn" href><i className="fa fa-plus text-primary me-3" />Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp " data-wow-delay="0.3s">
              <div className="service-item bg-serv rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{width: '65px', height: '65px'}}>
                  <i className="fa fa-x-ray text-primary fs-4" />
                </div>
                <h4 className="mb-3">Pulmonary</h4>
                <p className="mb-4">Our pulmonary services offer advanced care for respiratory conditions such as COPD, asthma, and lung cancer. Our team of specialists uses the latest methods to help patients manage symptoms and improve lung function for better health and quality of life. </p>
                <a className="btn" href><i className="fa fa-plus text-primary me-3" />Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp " data-wow-delay="0.5s">
              <div className="service-item bg-serv rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{width: '65px', height: '65px'}}>
                  <i className="fa fa-brain text-primary fs-4" />
                </div>
                <h4 className="mb-3">Neurology</h4>
                <p className="mb-4">Our neurology services offer specialized care for patients with a wide range of neurological disorders, from headaches and seizures to stroke and neurodegenerative diseases. Our team of skilled neurologists utilizes state-of-the-art diagnostic tools and treatment options to provide personalized care that addresses each patient's unique needs.</p>
                <a className="btn" href><i className="fa fa-plus text-primary me-3" />Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp " data-wow-delay="0.1s">
              <div className="service-item bg-serv rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{width: '65px', height: '65px'}}>
                  <i className="fa fa-wheelchair text-primary fs-4" />
                </div>
                <h4 className="mb-3">Orthopedics</h4>
                <p className="mb-4">Our orthopedic services offer expert care for musculoskeletal conditions, including fractures, sports injuries, arthritis, and spinal disorders. Our skilled team of orthopedic surgeons utilizes advanced techniques to help patients regain mobility and improve quality of life, providing personalized care tailored to individual needs and goals.</p>
                <a className="btn" href><i className="fa fa-plus text-primary me-3" />Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp " data-wow-delay="0.3s">
              <div className="service-item bg-serv rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{width: '65px', height: '65px'}}>
                  <i className="fa fa-tooth text-primary fs-4" />
                </div>
                <h4 className="mb-3">Dental Surgery</h4>
                <p className="mb-4">Our dental surgery services provide comprehensive care for a range of oral health needs, from routine cleanings to complex oral surgery procedures. Our experienced team of dental professionals utilizes the latest technology to help patients achieve optimal oral health and maintain functional, beautiful smiles.</p>
                <a className="btn" href><i className="fa fa-plus text-primary me-3" />Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp " data-wow-delay="0.5s">
              <div className="service-item bg-serv rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{width: '65px', height: '65px'}}>
                  <i className="fa fa-vials text-primary fs-4" />
                </div>
                <h4 className="mb-3">Laboratory</h4>
                <p className="mb-4">Our laboratory services provide accurate and timely diagnostic testing for a range of medical conditions, using state-of-the-art technology and methods. Staffed by highly trained technicians, we are committed to delivering reliable results and exceptional service to our patients and healthcare providers.</p>
                <a className="btn" href><i className="fa fa-plus text-primary me-3" />Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ServiceComponent;