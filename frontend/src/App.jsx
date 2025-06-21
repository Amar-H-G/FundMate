import { Routes, Route } from "react-router-dom";
import Hero from "./Pages/Hero";
import PreLoginHome from "./Components/PreLoginHome";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      {/* Hero acts as a layout */}
      <Route path="/" element={<Hero />}>
        <Route index element={<PreLoginHome />} />
        <Route path="signin" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
      </Route>

      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
