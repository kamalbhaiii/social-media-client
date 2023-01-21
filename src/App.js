import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login.page';
import Signup from './Pages/Signup.page';
import SignupUsername from './Pages/Signup-username.page';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/username" element={<SignupUsername />} />
      </Routes>
    </div>
  );
}

export default App;
