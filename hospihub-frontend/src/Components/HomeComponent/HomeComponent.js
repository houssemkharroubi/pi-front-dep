import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carousel.css';
import AboutComponent from "./About";
import AppointmentComponent from "./AppointmentComponent";
import ServiceComponent from "./ServiceComponent";
import Alert from "react-bootstrap/Alert";
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./carousel.css"
import NavbarComponent from "../NavBarComponent/NavbarComponent";
import { useSelector } from "react-redux";
import { selectToken } from "../../reduxx/slices/authSlice";



function HomeComponent() {

  const handleBookAppointmentClick = () => {
    window.location.href = '/AppointmentForm';
  };

  useEffect(async () => {

    const jwtCookie = await document.cookie ? document.cookie.split('; ').find(row => row.startsWith('jwt=')) : null;
    console.log(jwtCookie)

    const jwt = await jwtCookie ? jwtCookie.split('=')[1] : null;

    if (jwt) {
      // If JWT cookie exists, redirect to profile page
      console.log(jwt)
      localStorage.setItem("jwtToken", jwt);
      const decodedToken = jwt_decode(jwt);
      axios
        .get(`http://localhost:5000/patient/getUserById/${decodedToken.id}`)
        .then(response => {
          toast.success(`Welcome ${response.data.userName}`, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        })
        .catch(error => {
          console.error(error);
        });

    }

  }, []);



  return (
    <>
      <ToastContainer />
      {/* carousel */}

      <div className="slider-detail">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item ">
              <img className="imgcarousel img-fluid " src="assetsTemplates/template2/images/slider/image2.jpg" alt="First slide" />
              <div className="carousel-caption fvgb d-none d-md-block">
                <h5 className="animated bounceInDown">Welcome to HospiHub !</h5>
                <p className="animated bounceInLeft">With HospiHub, you can easily search for doctors and healthcare facilities, book appointments, and receive personalized healthcare recommendations based on your medical history and preferences. Our advanced scheduling algorithms ensure that you can secure timely appointments with the best doctors in your area, without the hassle of lengthy wait times or complicated booking processes.</p>
                <div className="row vbh divCarousel">
                  <div className="btn animated bounceInUp btn-primary"> Book an Appointment </div>
                </div>
              </div>
            </div>
            <div className="carousel-item active">
              <img className=" imgcarousel img-fluid" src="assetsTemplates/template2/images/slider/image5.jpg" alt="Third slide" />
              <div className="carousel-caption vdg-cur d-none d-md-block">
                <h5 className="animated bounceInDown">Welcome to HospiHub !</h5>
                <p className="animated bounceInLeft">Are you tired of waiting for hours at the doctor's office for a simple check-up? Do you find it difficult to schedule appointments with healthcare professionals who can provide quality care? Look no further than HospiHub, the innovative web application designed to revolutionize healthcare access.</p>
                <div className="row vbh divCarousel">
                  <div className="btn animated bounceInUp btn-primary" onClick={handleBookAppointmentClick}>Book an Appointment</div>
                </div>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      {/* End carousel */}
      <AboutComponent></AboutComponent>
      <ServiceComponent></ServiceComponent>

      {/* Testimonial Start */}
      <div className="testimonial-wrapper">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
          arrows={false}
          className="testimonial-carousel wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div className="testimonial-item text-center">
            <img
              className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4"
              src="../assetsTemplates/template1/img/testimonial-1.jpg"
              style={{ width: "100px", height: "100px" }}
            />
            <div className="testimonial-text rounded text-center p-4">
              <p>
              "HospiHub has transformed the way I manage my health. The scheduling feature is a lifesaver, and the symptom checker provides accurate recommendations. Highly recommended!"
              </p>
              <h5 className="mb-1">Sarah</h5>
            </div>
          </div>
          <div className="testimonial-item text-center">
            <img
              className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4"
              src="../assetsTemplates/template1/img/testimonial-2.jpg"
              style={{ width: "100px", height: "100px" }}
            />
            <div className="testimonial-text rounded text-center p-4">
              <p>
              "I love how HospiHub keeps all my medical records in one place. It's so convenient to access my past consultations whenever I need them." 
              </p>
              <h5 className="mb-1">John</h5>
            </div>
          </div>
          <div className="testimonial-item text-center">
            <img
              className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4"
              src="../assetsTemplates/template1/img/testimonial-3.jpg"
              style={{ width: "100px", height: "100px" }}
            />
            <div className="testimonial-text rounded text-center p-4">
              <p>
              "The chat and video meeting features in HospiHub have made communication with my doctor so much easier. I feel more connected and well-informed about my health." 
              </p>
              <h5 className="mb-1">Brad</h5>
            </div>
          </div>
        </Slider>
      </div>
      {/* Testimonial End */}


      {/* tEAM dOCTOR */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
            <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
            <h1>Our Experience Doctors</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item position-relative rounded overflow-hidden">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="../assetsTemplates/template1/img/team-1.jpg" alt="" />
                </div>
                <div className="team-text bg-light text-center p-4">
                  <h5>Dr. Jennifer Chen</h5>
                  <p className="text-primary">Dermatology</p>
                  <div className="team-social text-center">
                    <a className="btn btn-square" href><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-square" href><i className="fab fa-twitter" /></a>
                    <a className="btn btn-square" href><i className="fab fa-instagram" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item position-relative rounded overflow-hidden">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="../assetsTemplates/template1/img/team-2.jpg" alt="" />
                </div>
                <div className="team-text bg-light text-center p-4">
                  <h5>Dr. David Park</h5>
                  <p className="text-primary">Pulmonology</p>
                  <div className="team-social text-center">
                    <a className="btn btn-square" href><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-square" href><i className="fab fa-twitter" /></a>
                    <a className="btn btn-square" href><i className="fab fa-instagram" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="team-item position-relative rounded overflow-hidden">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="../assetsTemplates/template1/img/team-3.jpg" alt="" />
                </div>
                <div className="team-text bg-light text-center p-4">
                  <h5>Dr. Rachel Kim</h5>
                  <p className="text-primary">Cardiology</p>
                  <div className="team-social text-center">
                    <a className="btn btn-square" href><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-square" href><i className="fab fa-twitter" /></a>
                    <a className="btn btn-square" href><i className="fab fa-instagram" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="team-item position-relative rounded overflow-hidden">
                <div className="overflow-hidden">
                  <img className="img-fluid" src="../assetsTemplates/template1/img/team-4.jpg" alt="" />
                </div>
                <div className="team-text bg-light text-center p-4">
                  <h5>Dr. John Smith</h5>
                  <p className="text-primary">Endocrinology</p>
                  <div className="team-social text-center">
                    <a className="btn btn-square" href><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-square" href><i className="fab fa-twitter" /></a>
                    <a className="btn btn-square" href><i className="fab fa-instagram" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end tEAM dOCTOR */}


      <AppointmentComponent></AppointmentComponent>




    </>

  );
}

export default HomeComponent;