import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './theme/style/index.css';
import './theme/style/app.css';
import { BrowserRouter } from 'react-router-dom';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyledEngineProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
