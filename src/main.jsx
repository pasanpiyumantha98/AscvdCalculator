
import { createRoot } from 'react-dom/client'
import './index.css'

import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './assets/pages/home.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Home />}/>

  </Routes>
    
  </BrowserRouter>
)
