import { Routes, Route } from "react-router-dom";
import "./App.css";
import SuperAdminLogin from "./page/SuperAdminLogin";
import AdminPanel from "./page/AdminPanel";
import "bootstrap/dist/css/bootstrap.min.css";

/*import axios from "axios";

// Bearer token'ı al
const token = localStorage.getItem("token");

// Axios için bir varsayılan ayar yap
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;*/

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin-login" element={<SuperAdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
