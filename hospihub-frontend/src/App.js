import logo from './logo.svg';
import './App.css';
import { Routes , Route } from 'react-router-dom';
import NavbarComponent from './Components/NavBarComponent/NavbarComponent';
import FooterComponent from './Components/FooterComponent/FooterComponent';
import HomeComponent from './Components/HomeComponent/HomeComponent';
import SignInComponent from './Components/FormsComponent/SignInComponent';
import SignUpComponent from './Components/FormsComponent/SignUpComponent';
import ResetPasswordComponent from './Components/FormsComponent/ResetPassComponent';
import ForgotPasswordComponent from './Components/FormsComponent/ForgetPassComponent';
import EmailVerificationMessage from './Components/FormsComponent/EmailVerificationMessage';
import MedicalRecordComponent from './Components/MedicalRecordComponent/MedicalRecordComponent';
import UpdateMedicalRecordComponent from './Components/MedicalRecordComponent/UpdateMedRec';
import BloodComponent from './Components/MedicalRecordComponent/BloodComponent';
import VitalSignsComponent from './Components/MedicalRecordComponent/VitalSignsComponent';
import ErrorSignInPage from './Components/FormsComponent/ErrorSignInPage';
import UpdateProfile from './Components/HomeComponent/UpdateProfile';
import AboutComponent from './Components/HomeComponent/About';
import ServiceComponent from './Components/HomeComponent/ServiceComponent';
import UpdatePassword from './Components/HomeComponent/updatePassword';
import WorktimeDoc from './Components/FormsComponent/WorktimeDoc';
import SeeAppointments from './Components/FormsComponent/SeeAppointments';
import MedicalRecForDoc from './Components/PatientInfoFromDoc/MedicalRecForDoc';
import HamzaBlood from './Components/PatientInfoFromDoc/HamzaBlood';
import HamzaVital from './Components/PatientInfoFromDoc/HamzaVital';
import AppointmentForm from './Components/AppointmentComponent/AppointmentForm';
import AppointmentListDialog from './Components/AppointmentComponent/AppointmentListDialog';
import DoctorsListComponent from './Components/MedicalRecordComponent/doctorsListComponent';
import PatientList from './Components/MedicalRecordComponent/patientList';
import SingleChat from './Components/MedicalRecordComponent/SingleChat';
import SingleChatPatient from './Components/MedicalRecordComponent/SingleChatPatient';
import List from './Components/MedicalRecordComponent/list';
import PatientAppComponent from './Components/MedicalRecordComponent/PatientAppComponent';
import AddPrescriptionComponent from './Components/PatientInfoFromDoc/AddPrescription';
import ListPrescription from './Components/PatientInfoFromDoc/prescriptionList';
import UpdatePrescription from './Components/PatientInfoFromDoc/updatePrescription';
import ListPrescriptionsforPatient from './Components/MedicalRecordComponent/ListPrescriptions';
import ShowPrescription from './Components/MedicalRecordComponent/ShowPrescription';
import Contacthospti from './Components/HomeComponent/Contacthospi';

import ConfirmedApp from './Components/AppointmentComponent/ConfirmedApp';
import DeniedApp from './Components/AppointmentComponent/DeniedApp';
import JitsiMett from './Components/MedicalRecordComponent/JitsiMett';
import DiseaseAi from './Components/AppointmentComponent/DiseaseAi'
function App() {
  return (
    <>
    <NavbarComponent></NavbarComponent>
    
    <Routes>
      <Route path='/' element={<HomeComponent></HomeComponent>} ></Route>
      <Route path='/SignIn' element={<SignInComponent></SignInComponent>} ></Route>
      <Route path='/SignUp' element={<SignUpComponent></SignUpComponent>} ></Route>
      <Route path='/reset-password/:token' element={<ResetPasswordComponent></ResetPasswordComponent>} ></Route>
      <Route path='/ForgetPassword' element={<ForgotPasswordComponent></ForgotPasswordComponent>} ></Route>
      <Route path='/EmailVerifiaction/:id' element={<EmailVerificationMessage></EmailVerificationMessage>} ></Route>
      <Route path='/ErrorSignInPage' element={<ErrorSignInPage></ErrorSignInPage>} ></Route>
      <Route path='/About' element={<AboutComponent></AboutComponent>} ></Route>
      <Route path='/Services' element={<ServiceComponent></ServiceComponent>} ></Route>
      <Route path='/Contact' element={<doctorsListComponent></doctorsListComponent>}></Route>
      <Route path='/AppointmentForm'  element={<AppointmentForm></AppointmentForm>} ></Route>
      <Route path='/contacthospi'  element={<Contacthospti></Contacthospti>} ></Route>
      <Route path='/ConfirmedApp/:patientName/:appointmentDate'  element={<ConfirmedApp></ConfirmedApp>} ></Route>
      <Route path='/DeniedApp/:patientName/:appointmentDate'  element={<DeniedApp></DeniedApp>} ></Route>
      <Route path='/Meet' element={<JitsiMett></JitsiMett>}></Route>
      <Route path='/disease' element={<DiseaseAi></DiseaseAi>}></Route>
   

      <Route path='/Contact' element={<></>}></Route>

      <Route path='/UpdateProfile'>
        <Route path='publicProfile'  element={<UpdateProfile></UpdateProfile>} ></Route>
        <Route path='UpdatePassword' element={<UpdatePassword></UpdatePassword>} ></Route>
        <Route path='patientList' element={<PatientList></PatientList>} ></Route> 
        <Route path='chat' element={<SingleChat></SingleChat>} ></Route> 
      </Route>
    
      <Route  path='/Medicalrecord' >
          <Route index  element={<MedicalRecordComponent></MedicalRecordComponent>} ></Route>
          <Route path='Summary' element={<UpdateMedicalRecordComponent></UpdateMedicalRecordComponent>} ></Route>
          <Route path='BloodandMeasurements' element={<BloodComponent></BloodComponent>} ></Route>
          <Route path='VitalSigns' element={<VitalSignsComponent></VitalSignsComponent>} ></Route>
          <Route path='listPrescriptionsforPatient' element={<ListPrescriptionsforPatient></ListPrescriptionsforPatient>} ></Route>
          <Route path='ShowPrescription/:idPrescription' element={<ShowPrescription></ShowPrescription>} ></Route>



          <Route path='SummaryAlpha/:id' element={<MedicalRecForDoc></MedicalRecForDoc>} ></Route>
          <Route path='BloodandMeasurementsAlpha/:id' element={<HamzaBlood></HamzaBlood>} ></Route>
          <Route path='VitalSignsAlpha/:id' element={<HamzaVital></HamzaVital>} ></Route>
          <Route path='chat' element={<SingleChatPatient></SingleChatPatient>} ></Route> 
          <Route path='DoctorsList' element={<DoctorsListComponent></DoctorsListComponent>} ></Route>
          <Route path='PatientApp' element={<PatientAppComponent></PatientAppComponent>} ></Route>
          <Route path='addPrescription/:id' element={<AddPrescriptionComponent></AddPrescriptionComponent>}></Route>
          <Route path='listPrescriptionsForDoctor/:id' element={<ListPrescription></ListPrescription>}></Route>
          <Route path='updatePrescription/:id/:idPrescription' element={<UpdatePrescription></UpdatePrescription>}></Route>

      </Route>

      <Route path='/AddWorktime'>
        <Route path='WorktimeDoc'  element={<WorktimeDoc></WorktimeDoc>} ></Route>
        <Route path='AppointmentsList'  element={<SeeAppointments></SeeAppointments>} ></Route>
      </Route>
    <Route path='/PatientMedicalRecord/:id'  element={<MedicalRecForDoc></MedicalRecForDoc>} ></Route>
      
    </Routes> 
   
    <FooterComponent></FooterComponent>
  
  
  
   </>
  );
}

export default App;
