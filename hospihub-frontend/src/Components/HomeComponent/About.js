function AboutComponent() {


    return (

        <>
            <section>
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                <div className="d-flex flex-column">
                                    <img className="img-fluid rounded w-75 align-self-end" src="../assetsTemplates/template1/img/about-1.jpg" alt="" />
                                    <img className="img-fluid rounded w-50 bg-white pt-3 pe-3" src="../assetsTemplates/template1/img/about-2.jpg" alt="" style={{ marginTop: '-25%' }} />
                                </div>
                            </div>
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                <p className="d-inline-block border rounded-pill py-1 px-4">About Us</p>
                                <h1 className="mb-4">Why You Should Trust Us? Get Know About Us!</h1>
                                <p>HospiHub is an innovative web application developed by a group of skilled developers called the Debuggers. With a strong commitment to the Sustainable Development Goals (SDGs).</p>
                                <p>Developing HospiHub presented a significant challenge rooted in the need for improved access to quality healthcare. In many developing countries and remote areas, accessing healthcare facilities and securing timely appointments has been a persistent concern. </p>
                                <p>The Debuggers team recognized the crucial importance of designing a solution that would address these obstacles and provide a seamless healthcare experience for all patients. </p>
                                <p>Overcoming technical hurdles, integrating complex scheduling algorithms, and creating an accurate recommendation system required meticulous planning and expertise. </p>
                                <p>Despite these challenges, the developers remained committed to their vision of revolutionizing healthcare access. </p>
                                <p>Through determination and innovation, HospiHub emerged as a transformative web application, bridging the gap between patients and doctors, and providing a comprehensive platform for streamlined appointment management and personalized healthcare recommendations. The development journey of HospiHub underscores the team's unwavering dedication to enhancing healthcare processes and ensuring better access to quality care for all.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    );
}

export default AboutComponent;