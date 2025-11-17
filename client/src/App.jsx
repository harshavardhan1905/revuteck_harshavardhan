import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';  
import AdminDashboard from './components/AdminDashboard';
// import AddUser from './components/addUser';
import RegisterUser from './components/Register';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import UserDashboard from './components/UserDashboard';
import './App.css';
import './assets/css/styles.css';

function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
        {/*  routes here */}
        
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* <Route path="/add-user" element={<AddUser />} /> */}
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} / >
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
