import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/LoginPage/Login.page';
import Signup from './Pages/SignupPages/Signup.page';
import SignupUsername from './Pages/SignupPages/Signup-username.page';
import Error from './Pages/Error/Error.page';
import Dashboard from './Pages/Dashboard/Dashboard.page'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/:email" element={<SignupUsername />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
