import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import reportWebVitals from './reportWebVitals';
import App from './apps/App';
import './media/css/styles.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
const { PUBLIC_URL } = process.env.REACT_APP_BASE_URL;
root.render(
  <React.StrictMode>
    <App basename={PUBLIC_URL} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
