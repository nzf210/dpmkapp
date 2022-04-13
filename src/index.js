import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Ro } from "react-router-dom";
import App from './App';
import './style.css';
import './responsivetable.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import axios from 'axios';
axios.defaults.withCredentials = true;

axios.defaults.baseURL = 'http://localhost:3002';
// axios.defaults.baseURL = 'http://202.157.176.42:3002';
//axios.defaults.baseURL = 'https://appin.id';
// axios.defaults.baseURL = window.Location; yahiko2547

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Ro>
      <App />
    </Ro>
  </Provider>
  ,//</React.StrictMode>,
  document.getElementById('root')
);



