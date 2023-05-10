function FooterComponent() {
    return (  

        <div className="container-fluid bg-dark text-light footer position-sticky wow fadeIn " data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Address</h5>
              <p className="mb-2"><i className="fa fa-map-marker-alt me-3" />Ariana Ghazela</p>
              <p className="mb-2"><i className="fa fa-phone-alt me-3" />+216 80 100 100</p>
              <p className="mb-2"><i className="fa fa-envelope me-3" />hospihubconfirmation@gmail.com</p>
              <div className="d-flex pt-2">
                <a className="btn btn-outline-light btn-social rounded-circle" href><i className="fab fa-twitter" /></a>
                <a className="btn btn-outline-light btn-social rounded-circle" href><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-outline-light btn-social rounded-circle" href><i className="fab fa-youtube" /></a>
                <a className="btn btn-outline-light btn-social rounded-circle" href><i className="fab fa-linkedin-in" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Services</h5>
              <a className="btn btn-link" href>Cardiology</a>
              <a className="btn btn-link" href>Pulmonary</a>
              <a className="btn btn-link" href>Neurology</a>
              <a className="btn btn-link" href>Orthopedics</a>
              <a className="btn btn-link" href>Laboratory</a>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Quick Links</h5>
              <a className="btn btn-link" href>About Us</a>
              <a className="btn btn-link" href>Contact Us</a>
              <a className="btn btn-link" href>Our Services</a>
              <a className="btn btn-link" href>Terms &amp; Condition</a>
              <a className="btn btn-link" href>Support</a>
            </div>
            
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                © <a className="border-bottom" href="#">HospiHub</a>, All Right Reserved.
              </div>

            </div>
          </div>
        </div>
      </div>
    );
}

export default FooterComponent ;