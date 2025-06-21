import { Routes, Route } from "react-router-dom";
import Hero from "./Pages/Hero";
import PreLoginHome from "./Components/PreLoginHome";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Pages/Home";
import Dashboard from "./Components/DashBoard";
import FundDetail from "./Components/FundDetail";
import SavedFunds from "./Components/SavedFund";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Components/Profile";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <Routes>
        <Route path="/" element={<Hero />}>
          <Route index element={<PreLoginHome />} />
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="details/:schemeCode" element={<FundDetail />} />
          <Route path="saved" element={<SavedFunds />} />
        </Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
