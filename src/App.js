import { BrowserRouter as Ro, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";



function App() {
  return (
    <Ro>
      <Routes >
        <Route path="/" exact element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/home/apbk/monitoring" element={<Dashboard />} />
        <Route path="/home/apbk/realisasi" element={<Dashboard />} />

        <Route path="/home/config/ubahpassword" element={<Dashboard />} />
        <Route path="/home/config/pejabat" element={<Dashboard />} />
        <Route path="/home/config/aparat" element={<Dashboard />} />

        <Route path="/home/spp/add-honor" element={<Dashboard />} />
        <Route path="/home/spp/blt" element={<Dashboard />} />
        <Route path="/home/spp/covid" element={<Dashboard />} />
        <Route path="/home/spp/laporan" element={<Dashboard />} />
        <Route path="/home/spp/persetujuan" element={<Dashboard />} />
        <Route path="/home/spp/reguler" element={<Dashboard />} />

        <Route path="/home/spm/blt" element={<Dashboard />} />
        <Route path="/home/spm/covid" element={<Dashboard />} />
        <Route path="/home/spm/laporan" element={<Dashboard />} />
        <Route path="/home/spm/persetujuan" element={<Dashboard />} />
        <Route path="/home/spm/reguler" element={<Dashboard />} />
        <Route path="/home/spm/add-honor" element={<Dashboard />} />

        <Route path="/home/sp2d/blt" element={<Dashboard />} />
        <Route path="/home/sp2d/covid" element={<Dashboard />} />
        <Route path="/home/sp2d/laporan" element={<Dashboard />} />
        <Route path="/home/sp2d/add-honor" element={<Dashboard />} />
        <Route path="/home/sp2d/reguler" element={<Dashboard />} />

      </Routes>
    </Ro>
  );
}

export default App;
