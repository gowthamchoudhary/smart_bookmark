import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Auth from "./pages/Auth/Auth";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
};
export default App;
