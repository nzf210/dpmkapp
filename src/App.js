import { BrowserRouter as Ro, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import Login from "./components/Login";


function App() {
  return (
    <Ro>
      <div>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Ro >
  );
}

export default App;
