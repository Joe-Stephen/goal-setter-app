import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/user/Profile";
import Header from "./components/Header";
import Dashboard from "./pages/user/Dashboard";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/Adminlogin";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<Header />} />
          </Routes>
          {/*user routes */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/" element={<AdminDashboard />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />

            {/*admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
