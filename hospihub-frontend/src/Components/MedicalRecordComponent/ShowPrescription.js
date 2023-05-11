import axios from "axios";
import { useEffect, useState } from "react";
import SideNavBarComponent from "./SideNavBarComponent";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { saveAs } from 'file-saver';


function ShowPrescription() {
    const [Patient, setPatient] = useState({});
    const { idPrescription } = useParams();
    const [Prescription, setPrescription] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            axios.get(`https://hospihub.onrender.com/patient/getUserById/${decodedToken.id}`)
                .then(response => {
                    setPatient(response.data);
                })
                .catch(error => {
                    console.error(error);
                });

            axios.get(`https://hospihub.onrender.com/prescription/getPrescriptionByid/${idPrescription}`)
                .then(response => {
                    setPrescription(response.data);
                    setIsLoaded(true);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    // const handleDownload = () => {
    //     // Get the prescription details as HTML
    //     const prescriptionDetails = document.getElementById("pdf-container").innerHTML;
    // console.log(prescriptionDetails)
    //     // Set the options for html2pdf
    //     const options = {
    //       margin: 1,
    //       filename: `prescription.pdf`,
    //       image: { type: 'jpeg', quality: 0.98 },
    //       html2canvas: { scale: 2 },
    //       jsPDF: { format: 'letter', orientation: 'portrait' },
    //     };
    
    //     // Use html2pdf to convert the prescription details into a PDF file and download it
    //     html2pdf().from(prescriptionDetails).set(options).save();
    //   };
    const handleDownload = () => {
        axios.post('https://hospihub.onrender.com/doctor/generate-pdf', { prescriptionDetails: Prescription }, {
          responseType: 'arraybuffer'
        })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          saveAs(blob, 'prescription.pdf');
        })
        .catch(error => {
          console.error(error);
        });
      };
    
    

    const date = new Date(Prescription.DateOfVisit);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    return (
        <>
            <div className='container pt-5 pb-5'>
                <div className="row">
                    <div className="col-lg-4">
                        <SideNavBarComponent user={Patient}></SideNavBarComponent>
                    </div>
                    <div className='col-lg-8 mb-5'>
                        <div className="card cardMD cardRes">
                            <div className="card-header "><div></div><i className="fas fa-plus-square" /> Prescription details <div className="text-center">
                                                 <button className="btn btn-primary mt-4" onClick={handleDownload}>Download PDF</button> 
                                            </div></div>
                            <div className="card-body" id="pdf-container">
                                {isLoaded && (
                                    <>
                                        <div className="row">
                                            <div className="col-4">
                                                <label htmlFor="input1" className="mt-2" >Date of Visit: </label>
                                                <input
                                                    className="form-control"
                                                    id="input2"
                                                    type="date"
                                                    value={formattedDate}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <label htmlFor="input3" className="mt-2" >Patient name and firstname: </label>
                                                <div className="d-flex">
                                                    <input
                                                        className="form-control"
                                                        id="input4"
                                                        type="text"
                                                        value={Patient.firstName}
                                                        disabled                                                />
                                                        <input
                                                            className="form-control mx-2"
                                                            id="input5"
                                                            type="text"
                                                            value={Patient.lastName}
                                                            disabled
        
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <label htmlFor="input6" className="mt-3" >Treatments: </label>
                                            <textarea
                                                className="form-control"
                                                id="input7"
                                                name="Treatments"
                                                value={Prescription.Treatments}
                                                disabled
        
                                            />
                                            <label htmlFor="input8" className="mt-3" >Instruction: </label>
                                            <textarea
                                                className="form-control"
                                                id="input9"
                                                name="Instruction"
                                                value={Prescription.Instruction}
                                                disabled
        
                                            />
                                            <label htmlFor="input10" className="mt-3" >Note: </label>
                                            <textarea
                                                className="form-control"
                                                id="input11"
                                                name="Note"
                                                value={Prescription.Note}
                                                disabled
        
        
                                            />
        
                                            {/* Adding download button */}
                                            
        
                                            <p className="img-preview-wrapper mt-5  ">
                                                {
                                                    <img src={`http://127.0.0.1:8887/DoctorSignature/${Prescription.Signature}`} alt="preview" className="img-preview " style={{marginLeft:"20%",width:"50%"}}/>
                                                }
                                            </p>
                                            </>
                                            )}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
        
        
            </>
        );
}

export default ShowPrescription;        
