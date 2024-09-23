import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RecoilRoot} from "recoil";
import AuthObserver from "./recoil/AuthObserver.jsx";
import {Toaster} from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RecoilRoot>
            <AuthObserver />
            <App />
            <Toaster />
        </RecoilRoot>
    </React.StrictMode>,
)