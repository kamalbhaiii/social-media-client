import './App.css';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Pages/LoginPage/Login.page';
import Signup from './Pages/SignupPages/Signup.page';
import SignupUsername from './Pages/SignupPages/Signup-username.page';
import Error from './Pages/Error/Error.page';
import Dashboard from './Pages/Dashboard/Dashboard.page'
import Navbar from './Components/Navbar/Navbar.component';
import * as React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from './redux';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword.page';
import ResetPassword from './Pages/ForgetPassword/ResetPassword.page';
import EmailVerified from './Pages/EmailVerified/EmailVerified.page';

const ProtectedRoutes = () => {
  const dispatch = useDispatch()
  let token = localStorage.getItem("token")
  if (token === null) {
    return <Navigate to={"/"} replace />
  }
  dispatch(loginActions.loginApiCall(localStorage.getItem("token")))
  return <Outlet />;
}

const UnprotectedRoutes = () => {
  let token = localStorage.getItem("token")
  if (token === null) {
    return <Outlet />
  }
  return <Navigate to={"/dashboard"} replace />
}


function App() {
  const [navbarDisplay, setNavbarDisplay] = React.useState("none")
  const location = useLocation()
  React.useEffect(() => {
    const token = localStorage.getItem("token")
    if (token === null) {
      setNavbarDisplay("none")
    } else {
      setNavbarDisplay("flex")
    }
  }, [location])
  return (
    <div className="App">
      <Navbar display={navbarDisplay} />
      <Routes>
        <Route element={<UnprotectedRoutes />} >
          <Route path="/" exact element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/:email" element={<SignupUsername />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
          <Route path="/emailVerified" element={<EmailVerified />} />
        </Route>
        <Route element={<ProtectedRoutes />} >
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
