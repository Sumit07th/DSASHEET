import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RecoilRoot} from "recoil";
import AuthObserver from "./recoil/AuthObserver.jsx";
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RecoilRoot>
          <AuthObserver />
          <App />
          <Toaster />
      </RecoilRoot>
  </StrictMode>,
)
