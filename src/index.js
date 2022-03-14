import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Ro } from "react-router-dom"
// import './index.css';
import App from './App';
import './style.css';

ReactDOM.render(
  <React.StrictMode>
    <Ro>
      <App />
    </Ro>
  </React.StrictMode>,
  document.getElementById('root')
);



