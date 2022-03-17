import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Ro } from "react-router-dom";
import App from './App';
import './style.css';
import { RecoilRoot } from 'recoil';


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<div>Sedang Memuat Data ... </div>}>
        <Ro>
          <App />
        </Ro>
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);



