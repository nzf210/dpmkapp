import React from 'react';
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";



import ApbkMonitoring from "./components/sub/apbk/ApbkMonitoring";
import ApbkRealiasai from "./components/sub/apbk/ApbkRealisasi";

/* CONFIG */
import ConfigAparatKampung from "./components/sub/config/ConfigAparatKampung";
import ConfigPejabatPengesahan from "./components/sub/config/ConfigPejabatPengesahan";
import ConfigUbahPassword from "./components/sub/config/ConfigUbahPassword";
/* CONFIG */

/* SPD */
import SpdAdd from "./components/sub/spd/SpdAdd";
import SpdBlt from "./components/sub/spd/SpdBlt";
import SpdCovid from "./components/sub/spd/SpdCovid";
import SpdLaporan from "./components/sub/spd/SpdLaporan";
import SpdReguler from "./components/sub/spd/SpdReguler";
/* SPD */

/* SP2D */
import Sp2dAdd from "./components/sub/sp2d/Sp2dAdd";
import Sp2dBlt from "./components/sub/sp2d/Sp2dBlt";
import Sp2dCovid from "./components/sub/sp2d/Sp2dCovid";
import Sp2dLaporan from "./components/sub/sp2d/Sp2dLaporan";
import Sp2dReguler from "./components/sub/sp2d/Sp2dReguler";
/* SP2D */

/* SPM */
import SpmAdd from "./components/sub/spm/SpmAdd";
import SpmBlt from "./components/sub/spm/SpmBlt";
import SpmCovid from "./components/sub/spm/SpmCovid";
import SpmLaporan from "./components/sub/spm/SpmLaporan";
import SpmPersetujuan from "./components/sub/spm/SpmPersetujuan";
import SpmReguler from "./components/sub/spm/SpmReguler";
/* SPM */

/* SPP */
import SppAdd from "./components/sub/spp/SppAdd";
import SppBlt from "./components/sub/spp/SppBlt";
import SppCovid from "./components/sub/spp/SppCovid";
import SppLaporan from "./components/sub/spp/SppLaporan";
import SppPersetujuan from "./components/sub/spp/SppPersetujuan";
import SppReguler from "./components/sub/spp/SppReguler";
import Atvis from "./components/Atvis";
import RealisasiAnggaran from "./components/RealisasiAnggaran";
/* SPP */

import NotFound from "./components/NotFound";


function App() {
  return (
    <div>
      <Routes >
        <Route path='*' element={<NotFound />}></Route>
        <Route exact path="/" element={<Login />} />
        <Route path="home" element={<Dashboard />} >
          <Route path="apbk/monitoring" element={<ApbkMonitoring />} />
          <Route path="apbk/realisasi" element={<ApbkRealiasai />} />
          <Route path="atvis" element={<Atvis />} />
          <Route path="realisasi" element={<RealisasiAnggaran />} />

          <Route path="config/ubahpassword" element={<ConfigUbahPassword />} />
          <Route path="config/ubahpassword/:id" element={<ConfigUbahPassword />} />
          <Route path="config/pejabat" element={<ConfigPejabatPengesahan />} />
          <Route path="config/aparat" element={<ConfigAparatKampung />} />
          <Route path="config/aparat/:id" element={<ConfigAparatKampung />} />

          <Route path="spp/add-honor" element={<SppAdd />} />
          <Route path="spp/blt" element={<SppBlt />} />
          <Route path="spp/covid" element={<SppCovid />} />
          <Route path="spp/laporan" element={<SppLaporan />} />
          <Route path="spp/persetujuan" element={<SppPersetujuan />} />
          <Route path="spp/reguler" element={<SppReguler />} />

          <Route path="spm/blt" element={<SpmBlt />} />
          <Route path="spm/covid" element={<SpmCovid />} />
          <Route path="spm/laporan" element={<SpmLaporan />} />
          <Route path="spm/persetujuan" element={<SpmPersetujuan />} />
          <Route path="spm/reguler" element={<SpmReguler />} />
          <Route path="spm/add-honor" element={<SpmAdd />} />

          <Route path="sp2d/blt" element={<Sp2dBlt />} />
          <Route path="sp2d/covid" element={<Sp2dCovid />} />
          <Route path="sp2d/laporan" element={<Sp2dLaporan />} />
          <Route path="sp2d/add-honor" element={<Sp2dAdd />} />
          <Route path="sp2d/reguler" element={<Sp2dReguler />} />

          <Route path="spd/blt" element={<SpdBlt />} />
          <Route path="spd/covid" element={<SpdCovid />} />
          <Route path="spd/laporan" element={<SpdLaporan />} />
          <Route path="spd/add-honor" element={<SpdAdd />} />
          <Route path="spd/reguler" element={<SpdReguler />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
