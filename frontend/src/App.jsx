import { Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Workspaces from "./pages/Workspaces/Workspaces";
import Demo from "./pages/Demo/Demo";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspace/:workspaceId"
        element={
          <ProtectedRoute>
            <Workspaces />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
export default App;
