import "../src/assets/css/style.css";
import "../src/assets/css/bootstrap.min.css";
import "../src/assets/css/custom.css";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateAuthRoute from "./Markup/components/Auth/PrivateAuthRoute";
import Activation from "./Markup/pages/Activation";
import PatientProfileSetting from "./Markup/components/ProfileSetting/PatientProfileSetting";
import CustomerProfile from "./Markup/components/ProfileSetting/CustomerProfile";
import AppointmentForm from "./Markup/components/AppointmentForm/AppointmentForm";
import NotificationsList from "./Markup/components/Notifications/NotificationsList ";
import AppointmentDetail from "./Markup/components/Notifications/AppointmentDetail";
import DoctorsList from "./Markup/components/DoctorsList/DoctorsList";
import DoctorHeader from "./Markup/components/HeaderOther/HeaderOther";
import Contact from "./Markup/components/ContactF/Contact";
const Header = lazy(() => import("./Markup/components/Header/Header"));
const Footer = lazy(() => import("./Markup/components/Footer/Footer"));
const Home = lazy(() => import("./Markup/pages/Home"));
// const Login = lazy(() => import("./Markup/pages/Login"));
const Register = lazy(() => import("./Markup/pages/Register"));
const Forgot = lazy(() => import("./Markup/pages/Forgot"));
const About = lazy(() => import("./Markup/pages/About"));
const ResetPasswordConfirm = lazy(() =>
  import("./Markup/pages/ResetPasswordConfirm")
);

import { useUserRole } from "./context/AuthContext";
import { useIsLogged } from "./context/AuthContext";
import UnAuthorized from "./Markup/pages/UnAuthorized";
import Scan from "./Markup/pages/Scan";
import EducationalResource from "./Markup/pages/RegisterForm";
import ServicesPage from "./Markup/pages/Service/ServicesPage";
// import PatientDetail from "./Markup/components/ProfileSetting/ProfileDetail";
// import PostAdditional from "./Markup/components/ProfileSetting/PostAdditional";
import ChatComponent from "./Markup/components/Chat/ChatComponent";
import MriScan from "./Markup/components/MriScan/MriScan";
import MRIUploadForm from "./Markup/components/MriScan/MRIUploadForm";
import DoctorUpload from "./Markup/components/DoctorsList/DoctorUpload";
import AvailabilityForm from "./Markup/components/Availablity/AvailabilityForm";
import DoctorAvailability from "./Markup/components/Availablity/DoctorAvailability";
import UpdateAvailability from "./Markup/components/Availablity/UpdateAvailability";
import MedicalRecordsForm from "./Markup/components/MedicalRecord/MedicalRecordForm";
import MedicalRecordsFormUpdate from "./Markup/components/MedicalRecord/MedicalRecordsFormUpdate";
import DoctorRadiologistDetail from "./Markup/components/Notifications/DoctorRadiologistDetail";
import DoctorRadiologistNotification from "./Markup/components/Notifications/DoctorRadiologist";
import RadiologistDoctorNotification from "./Markup/components/Notifications/RadiologistDoctor";
import RadiologistDoctorDetail from "./Markup/components/Notifications/RadiologistDoctorDetail";
import RecommendationForm from "./Markup/components/Reccomenddation/RecommendationForm";
// import DoctorRadiologistForm from "./Markup/components/DocRadio/RadiologistDoctorForm";
import RadiologistDoctorForm from "./Markup/components/DocRadio/RadiologistDoctorForm";
import DoctorRadiologistForm from "./Markup/components/DocRadio/DoctorRadiologistForm";
import ViewRecommendation from "./Markup/components/Reccomenddation/ViewRecommendation";
import RadiologistHeader from "./Markup/components/HeaderOther/RadiologistHeader";
import ViewSchedule from "./Markup/components/AppointmentForm/ViewSchedule";
import DoctorspecialistRequest from "./Markup/components/DocSpecialist/DoctorspecialistRequest";
import SpecialistDoctorResponse from "./Markup/components/DocSpecialist/SpecialistDoctorResponse";
import SpecialistRecommendation from "./Markup/components/DocSpecialist/SpecialistRecommendation";
import DoctorSpecialistNotification from "./Markup/components/Notifications/DoctorSpecialist";
import DoctorSpecialistDetail from "./Markup/components/Notifications/DoctorSpecialistDetail";
import SpecialistDoctorNotification from "./Markup/components/Notifications/SpecialistDoctorNotification";
import DoctorRecommendationDetail from "./Markup/components/Notifications/DoctorRecommendationDetail";
import DoctorResponseDetail from "./Markup/components/Notifications/DoctorResponseDetail";
import SpecialistHeader from "./Markup/components/HeaderOther/SpecialistHeader";
import DoctorSpecialistData from "./Markup/components/Notifications/DoctorSpecialistData";
import SpecialistList from "./Markup/components/DoctorsList/SpecialistList";
import SpecialistDataList from "./Markup/components/DoctorsList/SpecialistDataList";
import RadiologistList from "./Markup/components/DoctorsList/RadiologistList";
import DoctorListRadiologist from "./Markup/components/DoctorsList/DoctorListRadiologist";
import SpecialistDoctorsList from "./Markup/components/DoctorsList/SpecialistDoctorsList";
import OrderListForm from "./Markup/components/MedicalRecord/First";
import SpecialistAppointementList from "./Markup/components/AppointmentForm/SpecialistAppointementList";
import ReceptionistHeader from "./Markup/components/HeaderOther/ReceptionistHeader";
import SearchForUpdate from "./Markup/components/MedicalRecord/Second";
import SpecialistDoctorForRecommendation from "./Markup/components/DoctorsList/SpecialistDoctorForRecommendation";
import SearchForRecommendation from "./Markup/components/MedicalRecord/Third";
import DoctorPatient from "./Markup/components/Notifications/DoctorPatient";
import DoctorPatientDetail from "./Markup/components/Notifications/DoctorPatientDetail";
import DoctorPatientMessage from "./Markup/components/Reccomenddation/DoctorPatientMessage";
import SearchForMessage from "./Markup/components/MedicalRecord/Fourth";
import AllDoctorMessage from "./Markup/pages/AllDoctorMessage";
import AllDoctorNotification from "./Markup/pages/AllDoctorNotification";
import AllDoctorRecord from "./Markup/pages/AllDoctorRecord";
import AllDoctorUpload from "./Markup/pages/AllDoctorUpload";
import AllSpecialistResponse from "./Markup/pages/AllSpecialistResponse";
import DoctorSpecialistRequestDetail from "./Markup/components/Notifications/DoctorSpecialistRequestDetail";
import LoginTest from "./Markup/components/LoginForm/LoginTest";
import HeaderFirst from "./Markup/components/Header/HeaderFirst";
import ForOFor from "./Markup/pages/ForOFor";
import PatientList from "./Markup/components/MedicalRecord/Fifth";

function App() {
  const { isLogged } = useIsLogged();
  const { userRole } = useUserRole();

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/activate/*" element={<Activation />} />
        <Route
          path="/"
          element={
            <>
              {!isLogged ? (
                <HeaderFirst />
              ) : (
                <>
                  {userRole === "Doctor" && <DoctorHeader />}
                  {userRole === "Radiologist" && <RadiologistHeader />}
                  {userRole === "Specialist" && <SpecialistHeader />}
                  {userRole !== "Doctor" &&
                    userRole !== "Radiologist" &&
                    userRole !== "Specialist" && <Header />}
                </>
              )}
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole === "Specialist" && <SpecialistHeader />}
              {userRole === "Receptionist" && <ReceptionistHeader />}
              {userRole !== "Doctor" &&
                userRole !== "Radiologist" &&
                userRole !== "Receptionist" &&
                userRole !== "Specialist" && <Header />}
              {!isLogged && <HeaderFirst />}
              <LoginTest />
              <Footer />
            </>
          }
        />

        <Route
          path="/add-patient"
          element={
            <>
              <ReceptionistHeader />
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path="/forgot"
          element={
            <>
              <HeaderFirst />
              <Forgot />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole === "Specialist" && <SpecialistHeader />}
              {userRole === "Receptionist" && <ReceptionistHeader />}
              {userRole !== "Doctor" &&
                userRole !== "Radiologist" &&
                userRole !== "Receptionist" &&
                userRole !== "Specialist" && <Header />}
              {!isLogged && <HeaderFirst />}
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/record"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <MedicalRecordsForm />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/updaterecord"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <MedicalRecordsFormUpdate />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
        <Route
          path="/password/reset/confirm/:uid?/:token"
          element={
            <>
              <HeaderFirst />
              <ResetPasswordConfirm />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole === "Specialist" && <SpecialistHeader />}
              {userRole === "Receptionist" && <ReceptionistHeader />}
              {userRole !== "Doctor" &&
                userRole !== "Radiologist" &&
                userRole !== "Receptionist" &&
                userRole !== "Specialist" && <Header />}

              <PrivateAuthRoute
                roles={[
                  "Patient",
                  "Doctor",
                  "Radiologist",
                  "Specialist",
                  "Receptionist",
                ]}
              >
                <PatientProfileSetting />
                <CustomerProfile />
                {/* {userRole === "Patient" && <PatientDetail />} */}
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/appointment"
          element={
            <>
              {userRole == "Specialist" ? <SpecialistHeader /> : <Header />}
              <AppointmentForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/upload"
          element={
            <>
              {userRole == "Doctor" ? <DoctorHeader /> : <Header />}
              <MRIUploadForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <NotificationsList />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/alldoctormessage"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <AllDoctorMessage />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/alldoctornotification"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <AllDoctorNotification />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/allspecialistresponse"
          element={
            <>
              <SpecialistHeader />
              <PrivateAuthRoute roles={["Specialist"]}>
                <AllSpecialistResponse />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/alldoctorupload"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <AllDoctorUpload />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/alldoctorrecord"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <AllDoctorRecord />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorradiologistnotification"
          element={
            <>
              <RadiologistHeader />
              <PrivateAuthRoute roles={["Radiologist"]}>
                <DoctorRadiologistNotification />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/radiologistdoctornotification"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <RadiologistDoctorNotification />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/scans/:id"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <MriScan />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/appointments/:id"
          element={
            <>
              <DoctorHeader />
              <AppointmentDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorradiologistdetail/:id"
          element={
            <>
              <RadiologistHeader />
              <PrivateAuthRoute roles={["Radiologist"]}>
                <DoctorRadiologistDetail />
              </PrivateAuthRoute>

              <Footer />
            </>
          }
        />
        <Route
          path="/radiologistdoctordetail/:id"
          element={
            <>
              <DoctorHeader />
              <RadiologistDoctorDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorrecommendation"
          element={
            <>
              <DoctorHeader />
              <RecommendationForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/radiologistdoctorpost"
          element={
            <>
              <RadiologistHeader />
              <PrivateAuthRoute roles={["Radiologist"]}>
                <RadiologistDoctorForm />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorradiologistpost"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <DoctorRadiologistForm />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctors"
          element={
            <>
              <Header />
              <PrivateAuthRoute roles={["Patient"]}>
                <DoctorsList />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/viewrecommendation"
          element={
            <>
              <Header />
              <PrivateAuthRoute roles={["Patient"]}>
                <ViewRecommendation />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/schedule"
          element={
            <>
              <Header />
              <PrivateAuthRoute roles={["Patient"]}>
                <ViewSchedule />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/availability"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <AvailabilityForm />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/see-availability"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <DoctorAvailability />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/update-availability/:id"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <UpdateAvailability />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />

        <Route
          path="/doctor"
          element={
            <>
              <Header />
              <PrivateAuthRoute roles={["Patient"]}>
                <DoctorUpload />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorpatientnotifications"
          element={
            <>
              <Header />
              <PrivateAuthRoute roles={["Patient"]}>
                <DoctorPatient />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole === "Specialist" && <SpecialistHeader />}
              {userRole === "Receptionist" && <ReceptionistHeader />}
              {userRole !== "Doctor" &&
                userRole !== "Radiologist" &&
                userRole !== "Receptionist" &&
                userRole !== "Specialist" && <Header />}
              {!isLogged && <HeaderFirst />}
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/unauthorized"
          element={
            <>
              <Header />
              <UnAuthorized />
              <Footer />
            </>
          }
        />
        {/* <Route
          path="/post"
          element={
            <>
              {userRole == "Patient" ? <Header /> : <DoctorHeader />}
              <PrivateAuthRoute roles={["Patient"]}>
                <PostAdditional />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        /> */}
        <Route
          path="/appointement-list"
          element={
            <>
              <SpecialistHeader />
              <PrivateAuthRoute roles={["Specialist"]}>
                <SpecialistAppointementList />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/specialistdoctorforrecommendation"
          element={
            <>
              <SpecialistHeader />
              <PrivateAuthRoute roles={["Specialist"]}>
                <SpecialistDoctorForRecommendation />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/scan"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole === "Specialist" && <SpecialistHeader />}

              <PrivateAuthRoute roles={["Doctor", "Radiologist", "Specialist"]}>
                <Scan />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        {/* <Route
          path="/radioscan"
          element={
            <>
              <RadiologistHeader />
              <PrivateAuthRoute roles={["Radiologist"]}>
                <Scan />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        /> */}
        <Route
          path="/resources"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole === "Specialist" && <SpecialistHeader />}
              <PrivateAuthRoute roles={["Doctor", "Radiologist", "Specialist"]}>
                <EducationalResource />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />

        <Route
          path="/service"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole === "Specialist" && <SpecialistHeader />}
              {userRole === "Receptionist" && <ReceptionistHeader />}
              {userRole !== "Doctor" &&
                userRole !== "Radiologist" &&
                userRole !== "Receptionist" &&
                userRole !== "Specialist" && <Header />}
              {!isLogged && <HeaderFirst />}
              <ServicesPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/chat"
          element={
            <>
              {userRole === "Doctor" && <DoctorHeader />}
              {userRole === "Radiologist" && <RadiologistHeader />}
              {userRole === "Specialist" && <SpecialistHeader />}
              <ChatComponent />
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorspecialistrequest"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <DoctorspecialistRequest />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/specialistdoctorresponse"
          element={
            <>
              <SpecialistHeader />
              <PrivateAuthRoute roles={["Specialist"]}>
                <SpecialistDoctorResponse />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/specialistrecommendation"
          element={
            <>
              <SpecialistHeader />
              <PrivateAuthRoute roles={["Specialist"]}>
                <SpecialistRecommendation />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorspecialistnotification"
          element={
            <>
              <SpecialistHeader />
              <PrivateAuthRoute roles={["Specialist"]}>
                <DoctorSpecialistNotification />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/specialistdoctornotification"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <SpecialistDoctorNotification />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorspecialistdata"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <DoctorSpecialistData />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorspecialistdetail/:id"
          element={
            <>
              <SpecialistHeader />
              <PrivateAuthRoute roles={["Specialist"]}>
                <DoctorSpecialistDetail />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorspecialistrequestdetail/:id"
          element={
            <>
              <SpecialistHeader />
              <PrivateAuthRoute roles={["Specialist"]}>
                <DoctorSpecialistRequestDetail />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/specialistdoctorrecommendationdetail/:id"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <DoctorRecommendationDetail />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/specialistdoctorresponsedetail/:id"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <DoctorResponseDetail />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorpatientdetail/:id"
          element={
            <>
              <Header />
              <PrivateAuthRoute roles={["Patient"]}>
                <DoctorPatientDetail />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/specialists"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <SpecialistList />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/radiologistlists"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <RadiologistList />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/posttospecialistdata"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <SpecialistDataList />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/postradiotodoctor"
          element={
            <>
              <RadiologistHeader />
              <PrivateAuthRoute roles={["Radiologist"]}>
                <DoctorListRadiologist />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/doctorpatientmessage"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <DoctorPatientMessage />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/responsetodoctor"
          element={
            <>
              <SpecialistHeader />
              <PrivateAuthRoute roles={["Specialist"]}>
                <SpecialistDoctorsList />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/search"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <OrderListForm />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/searchformessage"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <SearchForMessage />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/searchforrecommendation"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <SearchForRecommendation />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/searchforupdate"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <SearchForUpdate />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/patients"
          element={
            <>
              <DoctorHeader />
              <PrivateAuthRoute roles={["Doctor"]}>
                <PatientList />
              </PrivateAuthRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <HeaderFirst />
              <ForOFor />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
