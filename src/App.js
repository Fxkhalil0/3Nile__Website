import "./App.css";
import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";

// import Card from '../src/Components/card/Card'
import Footer from "../src/Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Description from "./Pages/DescComponent/Description";
import Error from "../src/Pages/ErrorComponent/Error";
import UserProfile from "../src/Pages/Userprofile/UserProfile"; 
import BoatOwnerProfile from "../src/Pages/BoatOwnerProfile/BoatOwnerProfile"; 
import About from "../src/Pages/About/About";
import Login from "../src/Pages/Loginsignup/Login";
import Filter from "../src/Pages/Filter/Filter";
import { Provider, useSelector } from 'react-redux';
import { Store, } from "./redux/Store";
import Navbar from "./Components/newNav/Navbar";
import BoatDetials from "./Pages/BoatDetials/BoatDetials";
import LastFilterPage from "./Components/LastFilterPage/LastFilterPage";
import MayShowNav from "./Components/mayShowNav/MayShowNav";
import SwvlTripDetails from "./Pages/SwvlTripDetails/SwvlTripDetails";
import BusDesc from "./Pages/BusDesc/BusDesc";
import Chat from "./Components/chat/Chat";
import OwnNav from "./Components/ownerNav/OwnNav";
import ContactUs from '../src/Pages/ContactUsPage/ContactUs'
import Loader from "./Components/SplashComponent/Splash";
// const location = useLocation();
function App() {
  const { user } = useSelector((state) => state.UserSlice);
  const { boatOwner } = useSelector((state) => state.UserSlice);

  return (
    <>
  
    <Provider store={Store}>
      <BrowserRouter>
      <MayShowNav>
        <Chat/>
     <Navbar/>
     <OwnNav />
     </MayShowNav>
  
     {/* <Navbarr/> */}
        {/* <NavbarFinal/> */}
      

        <Routes  >
            <Route index element={<Loader />} path="/loader" />
          <Route index element={<Home />} path="/home" />
          <Route index element={<Home />} path="/" />
          <Route  element={<About />} path="/about" />
          <Route  element={<Description />} path="/description/:id" />
          <Route  element={<SwvlTripDetails />} path="/swvlTripDetails/:id" />
          <Route  element={<BusDesc />} path="/BusDesc/:id" />
          <Route
              element={
                user && user.userData ? (
                  <UserProfile />
                ) : (
                  <Navigate to="/login-signup" />
                )
              }
              path="/user-profile"
            />
          <Route
              element={
                boatOwner && boatOwner.boatOwnerData ? (
                  < BoatOwnerProfile/>
                ) : (
                  <Navigate to="/login-signup" />
                )
              }
              path="/owner-profile" 
            />



        
          <Route  element={<Error />} path="/*" />
          <Route  element={<Login />} path="/login-signup" />
          <Route  element={<BoatDetials/>} path="/boat/:id" />
          <Route element={<Filter />} path="/filter/:num/" />
          <Route element={<LastFilterPage />} path="/last-filter-page/:num/" />
          <Route element={<ContactUs />} path="/contactus" />
          
        </Routes>
    
        <MayShowNav> <Footer /> </MayShowNav>
          
      </BrowserRouter>
      </Provider>
   
    </>
  );
}

export default App;
