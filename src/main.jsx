
import { createRoot } from 'react-dom/client'
import './index.css'

import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './assets/pages/index/home.jsx';
import Privacy from './assets/pages/privacy.jsx';
import Contact from './assets/pages/contact.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Home />}/>
  <Route path="/privacy-policy" element={<Privacy />}/>
  <Route path="/contact-us" element={<Contact />}/>

  </Routes>
    
  </BrowserRouter>
)
