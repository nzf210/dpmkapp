import { BrowserRouter as Ro, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import Login from "./components/Login";


function App() {
  return (
    <Ro>
      <Routes >
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Ro>
  );
}

export default App;
